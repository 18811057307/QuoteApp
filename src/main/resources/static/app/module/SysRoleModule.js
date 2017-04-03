Ext.define('tms.module.SysRoleModule', {
    extend:'Ext.ux.desktop.Module',
    id:'sysRole-win',
    titleText : i18n.t("sysRole"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-sysRole'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('sysRole-win');
        if (!win) {
            win = desktop.createWindow({
                id:'sysRole-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-sysRole',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'sysRoleList'}]
            });
        }
        return win;
    }
});

