Ext.define('tms.module.BPMModule', {
    extend:'Ext.ux.desktop.Module',
    id:'bpm-win',
    titleText : i18n.t("BPM"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-bpm'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bpm-win');
        if (!win) {
            win = desktop.createWindow({
                id:'bpm-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-bpm',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                	{xtype:'panel', layout: {type: 'vbox', align: 'stretch'},title: '任务列表',items:[{xtype:'taskList',flex:1}],region:'center'}
                	,{xtype:'panel',title:'任务类别',layout: {type: 'vbox',align: 'stretch'},items: [{xtype:'bpmNavPanel',flex:1},{xtype:'processDefPanel',title:'启动流程',flex:1}],  split:true, width: 300,collapsible: true,region: 'west'}
                	],
            	listeners:{
            		show : function() {
            			win.loadNavTreeTask = {
                    	    run: function(){
                    	    	var navTreeStore = Ext.data.StoreManager.lookup('BpmNavTreeStore');
                    	    	if(navTreeStore && !navTreeStore.isLoading()) {
                    	    		navTreeStore.load();
                    	    	}
                    	    },
                    	    interval: 10000 //5 second
                    	};
                        
                        Ext.TaskManager.start(win.loadNavTreeTask);
            		},
            		hide :function() {
            			Ext.TaskManager.stop(win.loadNavTreeTask);
            		}

            	}
            });
        }
        return win;
    }
});

