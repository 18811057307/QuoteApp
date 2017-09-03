Ext.define('tms.view.salesOrder.GridField', {
    extend:'Ext.ux.form.field.Grid',
    alias:'widget.salesOrderGridField',
    store:'SalesOrderStore',
    columns:[
		{width: 50,  header:i18n.t('salesOrder_form_instance_id'), sortable:true, dataIndex:'formInstanceId', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_category_code'), sortable:true, dataIndex:'categoryCode', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_category_name'), sortable:true, dataIndex:'categoryName', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_series_code'), sortable:true, dataIndex:'seriesCode', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_series_name'), sortable:true, dataIndex:'seriesName', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_product_code'), sortable:true, dataIndex:'productCode', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_product_name'), sortable:true, dataIndex:'productName', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_process_type'), sortable:true, dataIndex:'processType', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_delivery_date'), sortable:true, dataIndex:'deliveryDate', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_amount'), sortable:true, dataIndex:'amount', filter:true}
		,{width: 50,  header:i18n.t('salesOrder_comment'), sortable:true, dataIndex:'comment', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'SalesOrderStore',
        displayInfo: true
    }]
});