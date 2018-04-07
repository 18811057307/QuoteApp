Ext.define('tms.view.resPartner.List', {
    extend:'tms.base.Grid',
    alias:'widget.resPartnerList',
    store:'ResPartnerStore',
    columns:[
		{width: 50,  header:i18n.t('resPartner_name'), sortable:true, dataIndex:'name'}
		,{width: 50,  header:i18n.t('resPartner_display_name'), sortable:true, dataIndex:'displayName'}
		,{width: 50,  header:i18n.t('resPartner_email'), sortable:true, dataIndex:'email'}
		,{width: 50,  header:i18n.t('resPartner_phone'), sortable:true, dataIndex:'phone'}
		,{width: 50,  header:i18n.t('resPartner_mobile'), sortable:true, dataIndex:'mobile'}
		,{width: 50,  header:i18n.t('resPartner_create_date'), sortable:true, dataIndex:'createDate', xtype: 'datecolumn', format:'y-m-d'}
		,{width: 50,  header:i18n.t('resPartner_user_id'), sortable:true, dataIndex:'userId'}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'ResPartnerStore',
        displayInfo: true
    }]
});