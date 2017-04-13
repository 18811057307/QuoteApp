Ext.define('tms.view.series.List', {
    extend:'tms.base.Grid',
    alias:'widget.seriesList',
    store:'SeriesStore',
    columns:[
		{width: 50,  header:i18n.t('series_series_name'), dataIndex:'seriesName'}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'SeriesStore',
        displayInfo: true
    }]
});