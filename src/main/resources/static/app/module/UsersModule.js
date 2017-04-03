Ext.define('tms.module.UsersModule', {
    extend:'Ext.ux.desktop.Module',
    id:'users-win',
    titleText : i18n.t("users"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-users'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('users-win');
        if (!win) {
            win = desktop.createWindow({
                id:'users-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-users',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                    {xtype:'companyList',split:true, border:false, region:'west', width:200},
                    {xtype:'usersList', region:'center'},
                    {xtype:'panel',items: [{xtype:'profilesForm'}], split:true,border:false, width: 400,  region: 'east'}
                ]
            });
        }
        return win;
    }
});

