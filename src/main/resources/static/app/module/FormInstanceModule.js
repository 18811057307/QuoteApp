Ext.define('tms.module.FormInstanceModule', {
    extend:'Ext.ux.desktop.Module',
    id:'formInstance-win',
    titleText : i18n.t("formInstance"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-formInstance'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('formInstance-win');
        if (!win) {
            win = desktop.createWindow({
                id:'formInstance-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-formInstance',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'formInstanceList'}]
            });
        }
        return win;
    }
});

