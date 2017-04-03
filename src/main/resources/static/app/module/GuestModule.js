Ext.define('tms.module.GuestModule', {
    extend:'Ext.ux.desktop.Module',
    id:'guest-win',
    titleText : i18n.t("guest"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-guest'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('guest-win');
        if (!win) {
            win = desktop.createWindow({
                id:'guest-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-guest',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'guestList'}]
            });
        }
        return win;
    }
});

