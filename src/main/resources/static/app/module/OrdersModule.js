Ext.define('tms.module.OrdersModule', {
    extend:'Ext.ux.desktop.Module',
    id:'orders-win',
    titleText:i18n.t("orders"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-orders'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('orders-win');
        if (!win) {
            win = desktop.createWindow({
                id:'orders-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-orders',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                    {xtype:'ordersNav', region:'west', width:200, split:true,
                        stateful:true,
                        stateId:'nav.west',
                        collapsible:true},
                    {xtype:'ordersList', region:'center'},
                    {xtype:'ordersDetail', region:'east', stateful:true,
                        stateId:'mainnav.east',
                        split:true,
                        collapsible:true,
                        width:500
                    }
                ]
            });
        }
        return win;
    }
});

