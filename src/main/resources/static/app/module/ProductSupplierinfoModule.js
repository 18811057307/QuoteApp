Ext.define('tms.module.ProductSupplierinfoModule', {
    extend:'Ext.ux.desktop.Module',
    id:'productSupplierinfo-win',
    titleText : i18n.t("productSupplierinfo"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-productSupplierinfo'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('productSupplierinfo-win');
        if (!win) {
            win = desktop.createWindow({
                id:'productSupplierinfo-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-productSupplierinfo',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'productSupplierinfoList'}]
            });
        }
        return win;
    }
});

