Ext.define('tms.module.InvoicesModule', {
    extend:'Ext.ux.desktop.Module',
    id:'invoices-win',
    titleText : i18n.t("invoices"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-invoices'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('invoices-win');
        if (!win) {
            win = desktop.createWindow({
                id:'invoices-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-invoices',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'invoicesList'}]
            });
        }
        return win;
    }
});

