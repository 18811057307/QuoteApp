Ext.define('tms.view.profiles.List', {
    extend:'tms.base.Grid',
    alias:'widget.profilesList',
    store:'ProfilesStore',
    columns:[
		{width: 50,  header:i18n.t('profiles_user_id'), sortable:true, dataIndex:'user_id', filter:true}
		,{width: 50,  header:i18n.t('profiles_lastname'), sortable:true, dataIndex:'lastname', filter:true}
		,{width: 50,  header:i18n.t('profiles_firstname'), sortable:true, dataIndex:'firstname', filter:true}
		,{width: 50,  header:i18n.t('profiles_address'), sortable:true, dataIndex:'address', filter:true}
		,{width: 50,  header:i18n.t('profiles_town'), sortable:true, dataIndex:'town', filter:true}
		,{width: 50,  header:i18n.t('profiles_city'), sortable:true, dataIndex:'city', filter:true}
		,{width: 50,  header:i18n.t('profiles_postcode'), sortable:true, dataIndex:'postcode', filter:true}
		,{width: 50,  header:i18n.t('profiles_tel'), sortable:true, dataIndex:'tel', filter:true}
		,{width: 50,  header:i18n.t('profiles_fax'), sortable:true, dataIndex:'fax', filter:true}
		,{width: 50,  header:i18n.t('profiles_preferences'), sortable:true, dataIndex:'preferences', filter:true}
		,{width: 50,  header:i18n.t('profiles_car_regno'), sortable:true, dataIndex:'car_regno', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_no'), sortable:true, dataIndex:'ccard_no', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_issued'), sortable:true, dataIndex:'ccard_issued', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_expiry'), sortable:true, dataIndex:'ccard_expiry', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_iss_no'), sortable:true, dataIndex:'ccard_iss_no', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_name'), sortable:true, dataIndex:'ccard_name', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccv'), sortable:true, dataIndex:'ccv', filter:true}
		,{width: 50,  header:i18n.t('profiles_type'), sortable:true, dataIndex:'type', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'ProfilesStore',
        displayInfo: true
    }]
});