Ext.define('tms.module.TripThemeModule', {
    extend:'Ext.ux.desktop.Module',
    id:'tripTheme-win',
    titleText : i18n.t("tripTheme"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripTheme'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripTheme-win');
        if (!win) {
            win = desktop.createWindow({
                id:'tripTheme-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripTheme',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'tripThemeList'}]
            });
        }
        return win;
    }
});

