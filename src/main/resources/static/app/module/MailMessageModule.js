Ext.define('tms.module.MailMessageModule', {
    extend:'Ext.ux.desktop.Module',
    id:'mailMessage-win',
    titleText : i18n.t("mailMessage"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-mailMessage'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('mailMessage-win');
        if (!win) {
            win = desktop.createWindow({
                id:'mailMessage-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-mailMessage',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'mailMessageList'}]
            });
        }
        return win;
    }
});

