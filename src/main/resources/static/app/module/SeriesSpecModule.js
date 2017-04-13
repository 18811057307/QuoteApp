Ext.define('tms.module.SeriesSpecModule', {
    extend:'Ext.ux.desktop.Module',
    id:'seriesSpec-win',
    titleText : i18n.t("seriesSpec"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-seriesSpec'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('seriesSpec-win');
        if (!win) {
            win = desktop.createWindow({
                id:'seriesSpec-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-seriesSpec',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'seriesSpecList'}]
            });
        }
        return win;
    }
});

