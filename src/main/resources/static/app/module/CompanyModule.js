Ext.define('tms.module.CompanyModule', {
    extend:'Ext.ux.desktop.Module',
    id:'company-win',
    titleText : i18n.t("company"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-company'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('company-win');
        if (!win) {
            win = desktop.createWindow({
                id:'company-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-company',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'companyList'}]
            });
        }
        return win;
    }
});

