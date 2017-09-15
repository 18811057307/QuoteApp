Ext.define('tms.module.SysUserModule', {
    extend:'Ext.ux.desktop.Module',
    id:'sysUser-win',
    titleText : i18n.t("sysUser"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-sysUser'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('sysUser-win');
        if (!win) {
            win = desktop.createWindow({
                id:'sysUser-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-sysUser',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                	{xtype:'companyList',split:true, border:false, region:'west', width:200},
                    {xtype:'sysUserList', region:'center'},
                    {xtype:'panel',items: [{xtype:'sysRoleCheckTree'}], split:true,border:false, width: 400,  region: 'east'}
                ]
            });
        }
        return win;
    }
});

