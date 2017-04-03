Ext.define('tms.module.TempProductMapModule', {
    extend:'Ext.ux.desktop.Module',
    id:'tempProductMap-win',
    titleText : i18n.t("temp_quote_process"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tempProductMap'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tempProductMap-win');
        var helpHtml = '<div class="card  light-blue"><div class="card-content white-text">' + 
        					'<span class="card-title">报价单处理</span><p>1. 首先点击【选择文件】按钮，导入待处理原始报价单。</p><p>2. 获得对照结果后，再点击【导出对照报价单】按钮，导出处理结果。</p></div>' +
        					'<div class="card-action"><a href="' + tms.getContextPath() + 'xls/报价对应测试.xlsx" class="lime-text text-accent-1">下载报价Excel模板</a></div></div>';
        if (!win) {
            win = desktop.createWindow({
                id:'tempProductMap-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tempProductMap',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                	{xtype:'tempProductMapList',region:'center'},
                	{xtype:'panel',html: helpHtml, split:true,border:false, width: 400,  region: 'east'}
                ]
            });
        }
        return win;
    }
});

