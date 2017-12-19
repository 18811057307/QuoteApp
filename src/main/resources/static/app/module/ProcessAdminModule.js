Ext.define('tms.module.ProcessAdminModule', {
    extend:'Ext.ux.desktop.Module',
    id:'process-admin-win',
    titleText : i18n.t("ProcessAdmin"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-process-admin'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('process-admin-win');
        if (!win) {
            win = desktop.createWindow({
                id:'process-admin-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-process-admin',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                	{xtype:'panel', layout: {type: 'vbox', align: 'stretch'},title: '流程列表',items:[{xtype:'processAdminList',flex:1}],region:'center'}
                	,{xtype:'panel',title:'流程类别',layout: {type: 'vbox',align: 'stretch'},items: [{xtype:'processAdminNav',flex:1}],  split:true, width: 300,collapsible: true,region: 'west'}
                	]
            });
        }
        return win;
    }
});

