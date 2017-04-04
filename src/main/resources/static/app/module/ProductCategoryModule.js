Ext.define('tms.module.ProductCategoryModule', {
    extend:'Ext.ux.desktop.Module',
    titleText: 'Mi爬虫工具',
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-productCategory'
        };
    },
    
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('productCategory-win');
        if (!win) {
            var progressbar = Ext.create('Ext.ProgressBar',{width:400,region:"north",height:100,title:"爬虫进度"});
            var asyncPriceRetry = 0;
            var asyncProductRetry = 0;
            var progressTask = {
        	    run: function(){
        	    	Ext.Ajax.request({
                    	url: tms.getContextPath() + 'api/crawler/priceCrawlerStatus',
                        method: 'GET',
                        success: function(result, request) {
                            var json = Ext.decode(result.responseText);
                            progressbar.updateProgress(json.finished / json.total, json.activeCount + '个爬虫正在获取价格，总数：' + json.total + '， 已完成 ' + json.finished + ' 个 ...');
                            
                            //如果爬虫数量为0,则在10分钟后，重新发起爬虫任务
                            if(0 == json.activeCount) {
                            	asyncPriceRetry ++;
                            	if(asyncPriceRetry > 120) {
                            		Ext.getCmp('asyncPriceBtn').fireEvent('click');
                            	}	
                            }
                        },
                        failure: function(result, request) {
                        }
                    });
        	    },
        	    interval: 5000 //5 second
        	};       
            
            var productCrawlerTask = {
        	    run: function(){
        	    	Ext.Ajax.request({
                    	url: tms.getContextPath() + 'api/crawler/productCrawlerStatus',
                        method: 'GET',
                        success: function(result, request) {
                            var json = Ext.decode(result.responseText);
                            progressbar.updateProgress(json.finished / json.total, json.activeCount + '个爬虫正在获取产品，总数：' + json.total + '， 已完成 ' + json.finished + ' 个 ...');
                            
                            //如果爬虫数量为0,则重新发起爬虫任务?
                            if(0 == json.activeCount) {
                            	asyncProductRetry ++;
                            	if(asyncProductRetry > 120) {
                            		Ext.getCmp('asyncProductBtn').fireEvent('click');
                            	}
                            }
                        },
                        failure: function(result, request) {
                        }
                    });
        	    },
        	    interval: 5000 //5 second
        	};  
            
            var crawlerForm = Ext.create('Ext.form.Panel', {
                frame: true,
                title: 'Mi爬虫配置',
                region: 'center',
                bodyPadding: 5,

                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 90,
                    anchor: '100%'
                },

                items: [{
                    xtype: 'textfield',
                    name: 'proxyUrl',
                    fieldLabel: '代理地址',
                    value: ''
                },{
                	xtype: 'numberfield',
                    name: 'numOfThread',
                    fieldLabel: '爬虫数量',
                    value: 2,
                    minValue: 0,
                    maxValue: 50
                },{
                    xtype: 'textfield',
                    name: 'userid',
                    value: 'agapanthus',
                    fieldLabel: 'Mi用户'
                },{
                    xtype: 'textfield',
                    name: 'password',
                    value: 'agapanth',
                    fieldLabel: 'Mi密码'
                }]
            });
            
            win = desktop.createWindow({
                id:'productCategory-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-productCategory',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                	crawlerForm,                    
                	progressbar
                ],
                listeners: {
                	close: function(me, opts) {
                		
                	}
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                    {
                        xtype: 'button',
                        id:'asyncProductBtn',
                        text: '异步产品规格型号处理',
                        listeners: {
                            click: function() {
                            		Ext.TaskManager.stop(productCrawlerTask);
                            		Ext.Ajax.request({
                                        url: tms.getContextPath() + 'api/crawler/asynCrawlProduct',
                                        method :"POST",
                                        params: crawlerForm.getValues(),
                                        success: function(response) {
                                            var data = Ext.JSON.decode(response.responseText);
                                            tms.notify(data.message, "启动产品规格型号爬虫");	
                                            Ext.TaskManager.start(productCrawlerTask);
                                        },
                                        scope:this
                                    });
                                }
                        }
                    },
                    {
                        xtype: 'button',
                        id:'asyncPriceBtn',
                        text: '异步价格处理',
                        listeners: {
                            click: function() {
                            	Ext.TaskManager.stop(progressTask);
	                    		Ext.Ajax.request({
	                                url: tms.getContextPath() + 'api/crawler/asynCrawlPrice',
	                                method :"POST",
	                                params: crawlerForm.getValues(),
	                                success: function(response) {
	                                    var data = Ext.JSON.decode(response.responseText);
	                                    tms.notify(data.message, "启动价格页爬虫");
	                                    Ext.TaskManager.start(progressTask);
	                                },
	                                scope:this
	                            });
	                        }
                        }
                    },
                    {
                        xtype: 'button',
                        text: '停止爬虫',
                        listeners: {
                            click: function() {
	                    		Ext.Ajax.request({
	                                url: tms.getContextPath() + 'api/crawler/stopCrawler',
	                                method :"GET",
	                                success: function(response) {
	                                    var data = Ext.JSON.decode(response.responseText);
	                                    tms.notify(data.message, "停止爬虫");	
	                                    Ext.TaskManager.stop(progressTask);
	                                    Ext.TaskManager.stop(productCrawlerTask);                                    
	                                },
	                                scope:this
	                            });
	                        }
                        }
                    }]
                }]
            });
        }
        return win;
    }
});

