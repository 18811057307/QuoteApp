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
            var progressbar = Ext.create('Ext.ProgressBar',{width:400});

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
                        
            win = desktop.createWindow({
                id:'productCategory-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-productCategory',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[progressbar],
                listeners: {
                	close: function(me, opts) {
                		
                	}
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        text: '首页处理',
                        handler: function() {
                            Ext.Ajax.request({
                                url: tms.getContextPath() + 'api/crawler/crawlIndexPage',
                                params: {
                                	//proxyUrl: "cn-proxy.jp.oracle.com",
                                	urlToCrawl: "http://cn.misumi-ec.com/"
                                },
                                success: function(response) {
                                    var data = Ext.JSON.decode(response.responseText);
                                    tms.notify(data.message, "启动首页爬虫");	
                                },
                                scope:this
                            });
                        }
                    },
                    {
                        xtype: 'button',
                        text: '分类页处理',
                        handler: function() {
                            Ext.Ajax.request({
                                url: tms.getContextPath() + 'api/crawler/crawlCategoryPage',
                                method :"POST",   
                                params: {
                                	//proxyUrl: "cn-proxy.jp.oracle.com",
                                	//urlToCrawl: "http://cn.misumi-ec.com/"
                                },
                                success: function(response) {
                                    var data = Ext.JSON.decode(response.responseText);
                                    tms.notify(data.message, "启动分类页爬虫");	
                                },
                                scope:this
                            });
                        }
                    },
                    {
                        xtype: 'button',
                        text: '产品系列处理',
                        handler: function() {
                        	Ext.Ajax.request({
                                url: tms.getContextPath() + 'api/crawler/crawlSeriesPage',
                                method :"POST",
                                params: {
                                	//proxyUrl: "cn-proxy.jp.oracle.com",
                                	//urlToCrawl: "http://cn.misumi-ec.com/"
                                },
                                success: function(response) {
                                    var data = Ext.JSON.decode(response.responseText);
                                    tms.notify(data.message, "启动产品系列页爬虫");	
                                },
                                scope:this
                            });
                        }
                    },
                    {
                        xtype: 'button',
                        text: '异步产品规格型号处理',
                    	handler: function() {
                    		Ext.Ajax.request({
                                url: tms.getContextPath() + 'api/crawler/asynCrawlProduct',
                                method :"POST",
                                params: {
                                	proxyUrl: "cn-proxy.jp.oracle.com",
                                	numOfThread: 2
                                },
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
                                params: {
                                	proxyUrl: "cn-proxy.jp.oracle.com",
                                	numOfThread: 2
                                },
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

