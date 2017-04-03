Ext.define('tms.view.tripMethod.List', {
    extend:'tms.base.Grid',
    alias:'widget.tripMethodList',
    store:'TripMethodStore',
    columns:[
		{width: 50,  header:i18n.t('tripMethod_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('tripMethod_subdomain'), sortable:true, dataIndex:'subdomain', filter:true}
		,{width: 50,  header:i18n.t('tripMethod_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('tripMethod_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripMethodStore',
        displayInfo: true
    }]
});