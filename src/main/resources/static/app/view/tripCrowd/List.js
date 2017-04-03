Ext.define('tms.view.tripCrowd.List', {
    extend:'tms.base.Grid',
    alias:'widget.tripCrowdList',
    store:'TripCrowdStore',
    columns:[
		{width: 50,  header:i18n.t('tripCrowd_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('tripCrowd_subdomain'), sortable:true, dataIndex:'subdomain', filter:true}
		,{width: 50,  header:i18n.t('tripCrowd_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('tripCrowd_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripCrowdStore',
        displayInfo: true
    }]
});