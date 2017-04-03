Ext.define('tms.module.ManualProductMapModule', {
    extend:'Ext.ux.desktop.Module',
    id:'manualProductMap-win',
    titleText : i18n.t("manualProductMap"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-manualProductMap'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('manualProductMap-win');
        
        var helpHtml = '<div class="card  light-blue"><div class="card-content white-text"><span class="card-title">批量导入新建</span><p>点击表格上【选择文件】按钮，可批量导入型号对应表.</p></div><div class="card-action"><a href="' + tms.getContextPath() + 'xls/型号对应测试.xlsx" class="lime-text text-accent-1">下载批量添加Excel模板</a></div></div>';
        helpHtml += '<div class="card  light-blue"><div class="card-content white-text"><span class="card-title">批量导入调价</span><p>点击表格上【选择文件】按钮，可批量导入调价后的型号对应表.</p></div><div class="card-action"><a href="' + tms.getContextPath() + 'xls/型号对应测试.xlsx" class="lime-text text-accent-1">下载批量调价Excel模板</a></div></div>';
        helpHtml += '<div class="card  light-blue"><div class="card-content white-text"><span class="card-title">批量删除</span><p>通过表格第一列的多选框，选中要删除的数据，点击表格上方的【删除】按钮，即可批量删除所有选中的数据.</p></div></div>';
        
        if (!win) {
            win = desktop.createWindow({
                id:'manualProductMap-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-manualProductMap',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',                
                items:[
                	{xtype:'manualProductMapList', region:'center'},
                	{xtype:'panel',
                	 html: helpHtml, 
                	 split:true,border:false, width: 400,  region: 'east'
                	}
                ]
            });
        }
        return win;
    }
});

