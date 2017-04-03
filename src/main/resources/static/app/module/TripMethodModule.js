Ext.define('tms.module.TripMethodModule', {
    extend:'Ext.ux.desktop.Module',
    id:'tripMethod-win',
    titleText : i18n.t("tripMethod"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripMethod'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripMethod-win');
        if (!win) {
            win = desktop.createWindow({
                id:'tripMethod-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripMethod',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'tripMethodList'}]
            });
        }
        return win;
    }
});

