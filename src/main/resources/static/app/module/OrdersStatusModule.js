Ext.define('tms.module.OrdersStatusModule', {
    extend:'Ext.ux.desktop.Module',
    id:'ordersStatus-win',
    titleText : i18n.t("ordersStatus"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-ordersStatus'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('ordersStatus-win');
        if (!win) {
            win = desktop.createWindow({
                id:'ordersStatus-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-ordersStatus',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'ordersStatusList'}]
            });
        }
        return win;
    }
});

