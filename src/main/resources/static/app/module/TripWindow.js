Ext.define('tms.module.TripWindow', {
    extend:'Ext.ux.desktop.Module',
    id:'trip-win',
    titleText:i18n.t("trip"),
    iconCls:'trip-module',
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:this.iconCls
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('trip-win');
        if (!win) {
            win = desktop.createWindow({
                id:'trip-win',
                title:i18n.t('tripManage'),
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:this.iconCls,
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                    {xtype:'tripList', region:'center'},
                    {xtype:'panel', split:true, border:false, layout:{
                        type:'vbox', align:'stretch'
                    }, region:'east', width:500, items:[
                        {xtype:'tripScheduleList',title: i18n.t('tripSchedule'),flex: 1},
                        {xtype:'tripQuoteList',title: i18n.t('tripQuote'),flex: 1}
                    ] }
                ]
            });
        }
        return win;
    }
});

