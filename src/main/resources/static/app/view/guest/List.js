Ext.define('tms.view.guest.List', {
    extend:'tms.base.Grid',
    alias:'widget.guestList',
    store:'GuestStore',
    columns:[
		{width: 50,  header:i18n.t('guest_user_id'), sortable:true, dataIndex:'user_id', filter:true}
		,{width: 50,  header:i18n.t('guest_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('guest_en_name'), sortable:true, dataIndex:'en_name', filter:true}
		,{width: 50,  header:i18n.t('guest_gender'), sortable:true, dataIndex:'gender', filter:true}
		,{width: 50,  header:i18n.t('guest_id_no'), sortable:true, dataIndex:'id_no', filter:true}
		,{width: 50,  header:i18n.t('guest_birthday'), sortable:true, dataIndex:'birthday', filter:true}
		,{width: 50,  header:i18n.t('guest_age'), sortable:true, dataIndex:'age', filter:true}
		,{width: 50,  header:i18n.t('guest_phone_no'), sortable:true, dataIndex:'phone_no', filter:true}
		,{width: 50,  header:i18n.t('guest_mobile_no'), sortable:true, dataIndex:'mobile_no', filter:true}
		,{width: 50,  header:i18n.t('guest_aboard_place'), sortable:true, dataIndex:'aboard_place', filter:true}
		,{width: 50,  header:i18n.t('guest_visa_type'), sortable:true, dataIndex:'visa_type', filter:true}
		,{width: 50,  header:i18n.t('guest_travel_type'), sortable:true, dataIndex:'travel_type', filter:true}
		,{width: 50,  header:i18n.t('guest_category'), sortable:true, dataIndex:'category', filter:true}
		,{width: 50,  header:i18n.t('guest_insurance'), sortable:true, dataIndex:'insurance', filter:true}
		,{width: 50,  header:i18n.t('guest_passport'), sortable:true, dataIndex:'passport', filter:true}
		,{width: 50,  header:i18n.t('guest_passport_expiry'), sortable:true, dataIndex:'passport_expiry', filter:true}
		,{width: 50,  header:i18n.t('guest_sign_place'), sortable:true, dataIndex:'sign_place', filter:true}
		,{width: 50,  header:i18n.t('guest_sign_date'), sortable:true, dataIndex:'sign_date', filter:true}
		,{width: 50,  header:i18n.t('guest_remark'), sortable:true, dataIndex:'remark', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'GuestStore',
        displayInfo: true
    }]
});