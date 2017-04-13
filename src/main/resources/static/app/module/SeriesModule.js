Ext.define('tms.module.SeriesModule', {
    extend:'Ext.ux.desktop.Module',
    id:'series-win',
    titleText : i18n.t("series"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-series'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('series-win');
        if (!win) {
            win = desktop.createWindow({
                id:'series-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-series',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'seriesList'}]
            });
        }
        return win;
    }
});

