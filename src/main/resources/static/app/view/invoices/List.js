Ext.define('tms.view.invoices.List', {
    extend:'tms.base.Grid',
    alias:'widget.invoicesList',
    store:'InvoicesStore',
    columns:[
		{width: 50,  header:i18n.t('invoices_user_id'), sortable:true, dataIndex:'user_id', filter:true}
		,{width: 50,  header:i18n.t('invoices_order_id'), sortable:true, dataIndex:'order_id', filter:true}
		,{width: 50,  header:i18n.t('invoices_address_id'), sortable:true, dataIndex:'address_id', filter:true}
		,{width: 50,  header:i18n.t('invoices_invoice_number'), sortable:true, dataIndex:'invoice_number', filter:true}
		,{width: 50,  header:i18n.t('invoices_delivery_number'), sortable:true, dataIndex:'delivery_number', filter:true}
		,{width: 50,  header:i18n.t('invoices_delivery_date'), sortable:true, dataIndex:'delivery_date', filter:true}
		,{width: 50,  header:i18n.t('invoices_contact_id'), sortable:true, dataIndex:'contact_id', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'InvoicesStore',
        displayInfo: true
    }]
});