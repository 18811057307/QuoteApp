Ext.define('tms.module.CategorySpecModule', {
    extend:'Ext.ux.desktop.Module',
    id:'categorySpec-win',
    titleText : i18n.t("categorySpec"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-categorySpec'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('categorySpec-win');
        if (!win) {
            win = desktop.createWindow({
                id:'categorySpec-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-categorySpec',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'categorySpecList'}]
            });
        }
        return win;
    }
});

