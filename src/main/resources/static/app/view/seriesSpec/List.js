Ext.define('tms.view.seriesSpec.List', {
    extend:'tms.base.Grid',
    alias:'widget.seriesSpecList',
    store:'SeriesSpecStore',
    columns:[
    	{width: 50,  header:i18n.t('seriesSpec_key'), sortable:true, dataIndex:'key'}
		,{width: 50,  header:i18n.t('seriesSpec_title'), sortable:true, dataIndex:'title'}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'SeriesSpecStore',
        displayInfo: true
    }]
});