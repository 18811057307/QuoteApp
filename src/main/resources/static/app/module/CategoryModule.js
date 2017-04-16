Ext.define('tms.module.CategoryModule', {
    extend:'Ext.ux.desktop.Module',
    id:'category-win',
    titleText : i18n.t("category"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-category'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('category-win');
        if (!win) {
            win = desktop.createWindow({
                id:'category-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-category',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                	{xtype:'panel', layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },title: '分类规格',items:[{xtype:'categorySpecList',flex:1},{xtype:'seriesSpecList',title:'系列规格',flex:1}],region:'east', split:true, width: 700,collapsible: true}
                	,{xtype:'panel',title:'产品系列',layout:'fit',items: [{xtype:'seriesList'}], border:false,  region: 'center'}
                	,{xtype:'panel',title:'全部分类',layout:'fit',items: [{xtype:'categoryList'}],  split:true, width: 300,collapsible: true,region: 'west'}
                	]
            });
        }
        return win;
    }
});

