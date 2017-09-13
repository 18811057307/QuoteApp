Ext.define('tms.view.productSupplierinfo.List', {
    extend:'tms.base.Grid',
    alias:'widget.productSupplierinfoList',
    store:'ProductSupplierinfoStore',
    columns:[
		{width: 50,  header:i18n.t('productSupplierinfo_create_uid'), sortable:true, dataIndex:'createUid', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_create_date'), sortable:true, dataIndex:'createDate', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_delay'), sortable:true, dataIndex:'delay', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_sequence'), sortable:true, dataIndex:'sequence', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_date_start'), sortable:true, dataIndex:'dateStart', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_date_end'), sortable:true, dataIndex:'dateEnd', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_company_id'), sortable:true, dataIndex:'companyId', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_company_name'), sortable:true, dataIndex:'companyName', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_product_name'), sortable:true, dataIndex:'productName', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_product_code'), sortable:true, dataIndex:'productCode', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_min_qty'), sortable:true, dataIndex:'minQty', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_price'), sortable:true, dataIndex:'price', filter:true}
		,{width: 50,  header:i18n.t('productSupplierinfo_product_id'), sortable:true, dataIndex:'productId', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'ProductSupplierinfoStore',
        displayInfo: true
    }]
});