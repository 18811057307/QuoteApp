Ext.define('tms.module.TripTypeModule', {
    extend:'Ext.ux.desktop.Module',
    id:'tripType-win',
    titleText : i18n.t("tripType"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripType'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripType-win');
        if (!win) {
            win = desktop.createWindow({
                id:'tripType-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripType',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'tripTypeList'}]
            });
        }
        return win;
    }
});

