Ext.define('tms.module.QuotationLogModule', {
    extend:'Ext.ux.desktop.Module',
    id:'quotationLog-win',
    titleText : i18n.t("quotationLog"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-quotationLog'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('quotationLog-win');
        if (!win) {
            win = desktop.createWindow({
                id:'quotationLog-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-quotationLog',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'quotationLogList'}]
            });
        }
        return win;
    }
});

