Ext.define('tms.view.ordersDetail.List', {
    extend:'tms.base.Grid',
    alias:'widget.ordersDetailList',
    store:'OrdersDetailStore',
    columns:[
		{width: 50,  header:i18n.t('ordersDetail_orders_id'), sortable:true, dataIndex:'orders_id', filter:true}
		,{width: 50,  header:i18n.t('ordersDetail_trip_id'), sortable:true, dataIndex:'trip_id', filter:true}
		,{width: 50,  header:i18n.t('ordersDetail_property_id'), sortable:true, dataIndex:'property_id', filter:true}
		,{width: 50,  header:i18n.t('ordersDetail_room_classes_id'), sortable:true, dataIndex:'room_classes_id', filter:true}
		,{width: 50,  header:i18n.t('ordersDetail_insurance_id'), sortable:true, dataIndex:'insurance_id', filter:true}
		,{width: 50,  header:i18n.t('ordersDetail_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('ordersDetail_price'), sortable:true, dataIndex:'price', filter:true}
		,{width: 50,  header:i18n.t('ordersDetail_final_price'), sortable:true, dataIndex:'final_price', filter:true}
		,{width: 50,  header:i18n.t('ordersDetail_quantity'), sortable:true, dataIndex:'quantity', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'OrdersDetailStore',
        displayInfo: true
    }]
});