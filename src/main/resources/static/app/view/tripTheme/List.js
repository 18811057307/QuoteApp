Ext.define('tms.view.tripTheme.List', {
    extend:'tms.base.Grid',
    alias:'widget.tripThemeList',
    store:'TripThemeStore',
    columns:[
		{width: 50,  header:i18n.t('tripTheme_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('tripTheme_subdomain'), sortable:true, dataIndex:'subdomain', filter:true}
		,{width: 50,  header:i18n.t('tripTheme_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('tripTheme_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripThemeStore',
        displayInfo: true
    }]
});