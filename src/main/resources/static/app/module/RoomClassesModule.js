Ext.define('tms.module.RoomClassesModule', {
    extend:'Ext.ux.desktop.Module',
    id:'roomClasses-win',
    titleText : i18n.t("roomClasses"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-roomClasses'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('roomClasses-win');
        if (!win) {
            win = desktop.createWindow({
                id:'roomClasses-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-roomClasses',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'roomClassesList'}]
            });
        }
        return win;
    }
});

