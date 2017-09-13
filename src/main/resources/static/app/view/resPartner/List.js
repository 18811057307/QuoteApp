Ext.define('tms.view.resPartner.List', {
    extend:'tms.base.Grid',
    alias:'widget.resPartnerList',
    store:'ResPartnerStore',
    columns:[
		{width: 50,  header:i18n.t('resPartner_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('resPartner_website'), sortable:true, dataIndex:'website', filter:true}
		,{width: 50,  header:i18n.t('resPartner_email'), sortable:true, dataIndex:'email', filter:true}
		,{width: 50,  header:i18n.t('resPartner_phone'), sortable:true, dataIndex:'phone', filter:true}
		,{width: 50,  header:i18n.t('resPartner_mobile'), sortable:true, dataIndex:'mobile', filter:true}
		,{width: 50,  header:i18n.t('resPartner_create_date'), sortable:true, dataIndex:'createDate', filter:true}
		,{width: 50,  header:i18n.t('resPartner_user_id'), sortable:true, dataIndex:'userId', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'ResPartnerStore',
        displayInfo: true
    }]
});