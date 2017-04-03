Ext.define('tms.view.ordersStatus.List', {
    extend:'tms.base.Grid',
    alias:'widget.ordersStatusList',
    store:'OrdersStatusStore',
    columns:[
		{width: 50,  header:i18n.t('ordersStatus_orders_id'), sortable:true, dataIndex:'orders_id', filter:true}
		,{width: 50,  header:i18n.t('ordersStatus_orders_status'), sortable:true, dataIndex:'orders_status', filter:true}
		,{width: 50,  header:i18n.t('ordersStatus_date_added'), sortable:true, dataIndex:'date_added', filter:true}
		,{width: 50,  header:i18n.t('ordersStatus_customer_notified'), sortable:true, dataIndex:'customer_notified', filter:true}
		,{width: 50,  header:i18n.t('ordersStatus_comments'), sortable:true, dataIndex:'comments', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'OrdersStatusStore',
        displayInfo: true
    }]
});