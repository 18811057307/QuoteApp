Ext.define('tms.view.tripType.List', {
    extend:'tms.base.Grid',
    alias:'widget.tripTypeList',
    store:'TripTypeStore',
    columns:[
		{width: 50,  header:i18n.t('tripType_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('tripType_subdomain'), sortable:true, dataIndex:'subdomain', filter:true}
		,{width: 50,  header:i18n.t('tripType_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('tripType_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripTypeStore',
        displayInfo: true
    }]
});