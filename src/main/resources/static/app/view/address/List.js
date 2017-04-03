Ext.define('tms.view.address.List', {
    extend:'tms.base.Grid',
    alias:'widget.addressList',
    store:'AddressStore',
    columns:[
		{width: 50,  header:i18n.t('address_user_id'), sortable:true, dataIndex:'user_id', filter:true}
		,{width: 50,  header:i18n.t('address_alias'), sortable:true, dataIndex:'alias', filter:true}
		,{width: 50,  header:i18n.t('address_company'), sortable:true, dataIndex:'company', filter:true}
		,{width: 50,  header:i18n.t('address_lastname'), sortable:true, dataIndex:'lastname', filter:true}
		,{width: 50,  header:i18n.t('address_firstname'), sortable:true, dataIndex:'firstname', filter:true}
		,{width: 50,  header:i18n.t('address_address1'), sortable:true, dataIndex:'address1', filter:true}
		,{width: 50,  header:i18n.t('address_address2'), sortable:true, dataIndex:'address2', filter:true}
		,{width: 50,  header:i18n.t('address_postcode'), sortable:true, dataIndex:'postcode', filter:true}
		,{width: 50,  header:i18n.t('address_city'), sortable:true, dataIndex:'city', filter:true}
		,{width: 50,  header:i18n.t('address_other'), sortable:true, dataIndex:'other', filter:true}
		,{width: 50,  header:i18n.t('address_phone'), sortable:true, dataIndex:'phone', filter:true}
		,{width: 50,  header:i18n.t('address_mobile'), sortable:true, dataIndex:'mobile', filter:true}
		,{width: 50,  header:i18n.t('address_date_add'), sortable:true, dataIndex:'date_add', filter:true}
		,{width: 50,  header:i18n.t('address_date_upd'), sortable:true, dataIndex:'date_upd', filter:true}
		,{width: 50,  header:i18n.t('address_active'), sortable:true, dataIndex:'active', filter:true}
		,{width: 50,  header:i18n.t('address_deleted'), sortable:true, dataIndex:'deleted', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'AddressStore',
        displayInfo: true
    }]
});