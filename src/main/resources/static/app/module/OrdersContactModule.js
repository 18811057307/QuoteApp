Ext.define('tms.module.OrdersContactModule', {
    extend:'Ext.ux.desktop.Module',
    id:'ordersContact-win',
    titleText : i18n.t("ordersContact"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-ordersContact'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('ordersContact-win');
        if (!win) {
            win = desktop.createWindow({
                id:'ordersContact-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-ordersContact',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'ordersContactList'}]
            });
        }
        return win;
    }
});

