Ext.define('tms.module.InsuranceModule', {
    extend:'Ext.ux.desktop.Module',
    id:'insurance-win',
    titleText : i18n.t("insurance"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-insurance'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('insurance-win');
        if (!win) {
            win = desktop.createWindow({
                id:'insurance-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-insurance',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'insuranceList'}]
            });
        }
        return win;
    }
});

