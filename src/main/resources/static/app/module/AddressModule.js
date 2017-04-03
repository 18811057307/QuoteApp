Ext.define('tms.module.AddressModule', {
    extend:'Ext.ux.desktop.Module',
    id:'address-win',
    titleText : i18n.t("address"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-address'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('address-win');
        if (!win) {
            win = desktop.createWindow({
                id:'address-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-address',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'addressList'}]
            });
        }
        return win;
    }
});

