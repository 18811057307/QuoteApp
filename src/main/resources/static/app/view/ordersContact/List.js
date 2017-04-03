Ext.define('tms.view.ordersContact.List', {
    extend:'tms.base.Grid',
    alias:'widget.ordersContactList',
    store:'OrdersContactStore',
    columns:[
		{width: 50,  header:i18n.t('ordersContact_order_id'), sortable:true, dataIndex:'order_id', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_user_id'), sortable:true, dataIndex:'user_id', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_gender'), sortable:true, dataIndex:'gender', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_firstname'), sortable:true, dataIndex:'firstname', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_lastname'), sortable:true, dataIndex:'lastname', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_email_address'), sortable:true, dataIndex:'email_address', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_default_address_id'), sortable:true, dataIndex:'default_address_id', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_telephone'), sortable:true, dataIndex:'telephone', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_mobile'), sortable:true, dataIndex:'mobile', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_password'), sortable:true, dataIndex:'password', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_ip_address'), sortable:true, dataIndex:'ip_address', filter:true}
		,{width: 50,  header:i18n.t('ordersContact_credits'), sortable:true, dataIndex:'credits', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'OrdersContactStore',
        displayInfo: true
    }]
});