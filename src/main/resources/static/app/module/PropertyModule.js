Ext.define('tms.module.PropertyModule', {
    extend:'Ext.ux.desktop.Module',
    id:'property-win',
    titleText : i18n.t("property"),
    iconCls:'property-module',
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-property'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('property-win');
        if (!win) {
            win = desktop.createWindow({
                id:'property-win',
                title:this.titleText,
                iconCls:'property-module',
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-property',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                    {xtype:'propertyList',split:true, border:false, region:'west',flex:1},
                    {xtype:'roomClassesList', region:'center',flex:2},
                    {xtype:'roomRatesList', split:true,border:false, flex : 3,  region: 'east'}
                ]
            });
        }
        return win;
    }
});

