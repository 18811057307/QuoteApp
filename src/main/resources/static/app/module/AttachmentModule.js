Ext.define('tms.module.AttachmentModule', {
    extend:'Ext.ux.desktop.Module',
    id:'attachment-win',
    titleText : i18n.t("attachment"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-attachment'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('attachment-win');
        if (!win) {
            win = desktop.createWindow({
                id:'attachment-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-attachment',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'attachmentList'}]
            });
        }
        return win;
    }
});

