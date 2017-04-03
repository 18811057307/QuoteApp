Ext.define('tms.view.productCategory.List', {
    extend:'tms.base.Grid',
    alias:'widget.productCategoryList',
    store:'ProductCategoryStore',
    columns:[
		{width: 50,  header:i18n.t('productCategory_category_name'), sortable:true, dataIndex:'categoryName', filter:true}
		,{width: 50,  header:i18n.t('productCategory_category_code'), sortable:true, dataIndex:'categoryCode', filter:true}
		,{width: 50,  header:i18n.t('productCategory_category_url'), sortable:true, dataIndex:'categoryUrl', filter:true}
		,{width: 50,  header:i18n.t('productCategory_childCategoryName'), sortable:true, dataIndex:'childCategoryName', filter:true}
		,{width: 50,  header:i18n.t('productCategory_childCategoryCode'), sortable:true, dataIndex:'childCategoryCode', filter:true}
		,{width: 50,  header:i18n.t('productCategory_childCategoryUrl'), sortable:true, dataIndex:'childCategoryUrl', filter:true}
		,{width: 50,  header:i18n.t('productCategory_grandCategoryName'), sortable:true, dataIndex:'grandCategoryName', filter:true}
		,{width: 50,  header:i18n.t('productCategory_grandCategoryUrl'), sortable:true, dataIndex:'grandCategoryUrl', filter:true}
		,{width: 50,  header:i18n.t('productCategory_date_added'), sortable:true, dataIndex:'dateAdded', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'ProductCategoryStore',
        displayInfo: true
    }]
});