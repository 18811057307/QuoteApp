Ext.define('tms.module.OrdersDetailModule', {
    extend:'Ext.ux.desktop.Module',
    id:'ordersDetail-win',
    titleText : i18n.t("ordersDetail"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-ordersDetail'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('ordersDetail-win');
        if (!win) {
            win = desktop.createWindow({
                id:'ordersDetail-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-ordersDetail',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'ordersDetailList'}]
            });
        }
        return win;
    }
});

