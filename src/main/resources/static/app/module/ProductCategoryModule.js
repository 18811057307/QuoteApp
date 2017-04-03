Ext.define('tms.module.ProductCategoryModule', {
    extend:'Ext.ux.desktop.Module',
    id:'productCategory-win',
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
            win = desktop.createWindow({
                id:'productCategory-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-productCategory',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
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
                        text: '产品页处理',
                    	handler: function() {
                    		Ext.Ajax.request({
                                url: tms.getContextPath() + 'api/crawler/crawlProductPage',
                                method :"POST",
                                params: {
                                	//proxyUrl: "cn-proxy.jp.oracle.com",
                                	//urlToCrawl: "http://cn.misumi-ec.com/"
                                },
                                success: function(response) {
                                    var data = Ext.JSON.decode(response.responseText);
                                    tms.notify(data.message, "启动产品页爬虫");	
                                },
                                scope:this
                            });
                        }
                    },
                    {
                        xtype: 'button',
                        text: '价格处理',
                    	handler: function() {
                    		Ext.Ajax.request({
                                url: tms.getContextPath() + 'api/crawler/crawlPricePage',
                                method :"POST",
                                params: {
                                	//proxyUrl: "cn-proxy.jp.oracle.com",
                                	//urlToCrawl: "http://cn.misumi-ec.com/"
                                },
                                success: function(response) {
                                    var data = Ext.JSON.decode(response.responseText);
                                    tms.notify(data.message, "启动价格页爬虫");	
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

