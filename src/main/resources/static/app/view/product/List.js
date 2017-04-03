Ext.define('tms.view.product.List', {
    extend:'tms.base.Grid',
    alias:'widget.productList',
    store:'ProductStore',
    columns:[
		{width: 50,  header:i18n.t('product_category_id'), sortable:true, dataIndex:'categoryId', filter:true}
		,{width: 50,  header:i18n.t('product_product_name'), sortable:true, dataIndex:'productName', filter:true}
		,{width: 50,  header:i18n.t('product_product_code'), sortable:true, dataIndex:'productCode', filter:true}
		,{width: 50,  header:i18n.t('product_product_url'), sortable:true, dataIndex:'productUrl', filter:true}
		,{width: 50,  header:i18n.t('product_product_quote'), sortable:true, dataIndex:'productQuote', filter:true}
		,{width: 50,  header:i18n.t('product_date_added'), sortable:true, dataIndex:'dateAdded', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'ProductStore',
        displayInfo: true
    }]
});