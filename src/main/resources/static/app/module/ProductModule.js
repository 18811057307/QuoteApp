Ext.define('tms.module.ProductModule', {
    extend:'Ext.ux.desktop.Module',
    id:'product-win',
    titleText : i18n.t("product"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-product'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('product-win');
        if (!win) {
            win = desktop.createWindow({
                id:'product-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-product',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'productList'}]
            });
        }
        return win;
    }
});

