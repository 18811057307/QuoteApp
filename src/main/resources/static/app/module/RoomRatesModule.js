Ext.define('tms.module.RoomRatesModule', {
    extend:'Ext.ux.desktop.Module',
    id:'roomRates-win',
    titleText : i18n.t("roomRates"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-roomRates'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('roomRates-win');
        if (!win) {
            win = desktop.createWindow({
                id:'roomRates-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-roomRates',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'roomRatesList'}]
            });
        }
        return win;
    }
});

