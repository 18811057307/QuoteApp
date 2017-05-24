Ext.define('tms.view.quotationLog.List', {
    extend:'tms.base.Grid',
    alias:'widget.quotationLogList',
    store:'QuotationLogStore',
    columns:[
		{width: 50,  header:i18n.t('quotationLog_at_product_code'), sortable:true, dataIndex:'atProductCode', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_at_product_name'), sortable:true, dataIndex:'atProductName', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_at_product_desc'), sortable:true, dataIndex:'atProductDesc', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_mi_product_name'), sortable:true, dataIndex:'miProductName', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_mi_product_code'), sortable:true, dataIndex:'miProductCode', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_mi_product_desc'), sortable:true, dataIndex:'miProductDesc', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_mi_product_quote'), sortable:true, dataIndex:'miProductQuote', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_at_product_quote'), sortable:true, dataIndex:'atProductQuote', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_factory_quote'), sortable:true, dataIndex:'factoryQuote', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_uni_quote'), sortable:true, dataIndex:'uniQuote', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_supa_quote'), sortable:true, dataIndex:'supaQuote', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_supb_quote'), sortable:true, dataIndex:'supbQuote', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_supc_quote'), sortable:true, dataIndex:'supcQuote', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_login_name'), sortable:true, dataIndex:'loginName', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_order_quantity'), sortable:true, dataIndex:'orderQuantity', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('quotationLog_quotation_time'), sortable:true, dataIndex:'quotationTime', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'QuotationLogStore',
        displayInfo: true
    }]
});