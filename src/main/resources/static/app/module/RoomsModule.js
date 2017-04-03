Ext.define('tms.module.RoomsModule', {
    extend:'Ext.ux.desktop.Module',
    id:'rooms-win',
    titleText : i18n.t("rooms"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-rooms'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('rooms-win');
        if (!win) {
            win = desktop.createWindow({
                id:'rooms-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-rooms',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'roomsList'}]
            });
        }
        return win;
    }
});

