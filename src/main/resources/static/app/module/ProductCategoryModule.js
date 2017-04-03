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

            var progressTask = {
        	    run: function(){
        	    	Ext.Ajax.request({
                    	url: tms.getContextPath() + 'api/crawler/priceCrawlerStatus',
                        method: 'GET',
                        success: function(result, request) {
                            var json = Ext.decode(result.responseText);
                            progressbar.updateProgress(json.finished / json.total, '待获取价格的产品总数：' + json.total + ' 已完成 ' + json.finished + ' 个 ...');                            
                        },
                        failure: function(result, request) {
                        }
                    });
        	    },
        	    interval: 1000 //1 second
        	};       
            
            var productCrawlerTask = {
        	    run: function(){
        	    	Ext.Ajax.request({
                    	url: tms.getContextPath() + 'api/crawler/productCrawlerStatus',
                        method: 'GET',
                        success: function(result, request) {
                            var json = Ext.decode(result.responseText);
                            progressbar.updateProgress(json.finished / json.total, '待获取规格型号的产品总数：' + json.total + ' 已完成 ' + json.finished + ' 个 ...');                            
                        },
                        failure: function(result, request) {
                        }
                    });
        	    },
        	    interval: 1000 //1 second
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
                        text: '异步产品规格型号处理',
                    	handler: function() {
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
                    },
                    {
                        xtype: 'button',
                        id:'asyncPriceBtn',
                        text: '异步价格处理',
                    	handler: function() {
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
                    },
                    {
                        xtype: 'button',
                        text: '停止爬虫',
                    	handler: function() {
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
                    }]
                }]
            });
        }
        return win;
    }
});

