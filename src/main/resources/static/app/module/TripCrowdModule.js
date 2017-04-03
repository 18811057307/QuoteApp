Ext.define('tms.module.TripCrowdModule', {
    extend:'Ext.ux.desktop.Module',
    id:'tripCrowd-win',
    titleText : i18n.t("tripCrowd"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripCrowd'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripCrowd-win');
        if (!win) {
            win = desktop.createWindow({
                id:'tripCrowd-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripCrowd',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'tripCrowdList'}]
            });
        }
        return win;
    }
});

