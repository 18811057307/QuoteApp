Ext.define('tms.module.ResPartnerModule', {
    extend:'Ext.ux.desktop.Module',
    id:'resPartner-win',
    titleText : i18n.t("resPartner"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-resPartner'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('resPartner-win');
        if (!win) {
            win = desktop.createWindow({
                id:'resPartner-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-resPartner',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                	{xtype:'resPartnerList',region:'center'}
                	,{xtype:'resPartnerNav', split:true, width: 300,collapsible: true,region: 'west'}
                	]
            });
        }
        return win;
    }
});

