Ext.define('tms.view.productCategory.Progress', {
    extend: 'Ext.window.Window',
    requires: ['tms'],
    autoScroll: true,
    animCollapse :false,
    modal: true,
    requires : ['Ext.ProgressBar'],
    alias:'widget.productCategoryProgress',
    title: '爬虫进度',
    items: [{
    	xtype: 'progressbar'
    }]
});