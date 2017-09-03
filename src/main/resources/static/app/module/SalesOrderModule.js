Ext.define('tms.module.SalesOrderModule', {
    extend:'Ext.ux.desktop.Module',
    id:'salesOrder-win',
    titleText : i18n.t("salesOrder"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-salesOrder'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('salesOrder-win');
        if (!win) {
            win = desktop.createWindow({
                id:'salesOrder-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-salesOrder',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'salesOrderList'}]
            });
        }
        return win;
    }
});

