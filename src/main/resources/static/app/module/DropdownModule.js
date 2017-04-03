Ext.define('tms.module.DropdownModule', {
    extend:'Ext.ux.desktop.Module',
    id:'dropdown-win',
    titleText : i18n.t("dropdown"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-dropdown'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('dropdown-win');
        if (!win) {
            win = desktop.createWindow({
                id:'dropdown-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-dropdown',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'dropdownList'}]
            });
        }
        return win;
    }
});

