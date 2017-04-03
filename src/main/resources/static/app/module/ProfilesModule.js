Ext.define('tms.module.ProfilesModule', {
    extend:'Ext.ux.desktop.Module',
    id:'profiles-win',
    titleText : i18n.t("profiles"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-profiles'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('profiles-win');
        if (!win) {
            win = desktop.createWindow({
                id:'profiles-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-profiles',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'profilesList'}]
            });
        }
        return win;
    }
});

