Ext.define('tms.view.category.List', {
	extend: 'Ext.tree.Panel', 
    rootVisible: false,
    useArrows: true,
    alias:'widget.categoryList',
    store: 'CategoryTreeStore',
    tbar: [{
    	tooltip: '添加分类',
        iconCls: 'add',
        scope: this,
        action: 'createSubCategory'
    },{
        scope: this,
        action: 'modifyCategory',
        tooltip: i18n.t("button_update"),
        iconCls: 'option'
    },{
    	iconCls: 'remove',
        scope: this,
        action: 'deleteCategory',
        tooltip: i18n.t("button_delete"),
    }],
    initComponent: function() {
        var me = this;

        me.columns = [
            {
                xtype: 'treecolumn',
                dataIndex: 'categoryName',
                flex: 1,
                header: '类别名称'
            },
            {
                dataIndex: 'quoterName',
                flex: 0.5,
                header: '产品技术'
            },
            {
                dataIndex: 'auditorName',
                flex: 0.5,
                header: '审核员'
            },
            {
                dataIndex: 'factoryRatio',
                flex: 0.5,
                header: '出厂价系数'
            },
            {
                dataIndex: 'unitRatio',
                flex: 0.5,
                header: '统一价系数'
            }
        ];
        
        me.callParent(arguments);

    }
});