Ext.define('tms.view.tripQuote.List', {
    extend:'tms.base.Grid',
    alias:'widget.tripQuoteList',
    store:'TripQuoteStore',
    columns:[
		{width: 50,  header:i18n.t('tripQuote_title'), sortable:true, dataIndex:'title', filter:true}
		,{width: 50,  header:i18n.t('tripQuote_validTo'), sortable:true, dataIndex:'validTo', renderer: Ext.util.Format.dateRenderer('Y-m-d')}
		,{width: 50,  header:i18n.t('tripQuote_maxPeople'), sortable:true, dataIndex:'maxPeople', filter:true}
		,{width: 50,  header:i18n.t('tripQuote_adult_price'), sortable:true, dataIndex:'adult_price', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripQuoteStore',
        displayInfo: true
    }],
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'trip_id',comparison:'eq',value:this.tripRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setTripRecord : function(record) {
        this.tripRecord = record;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    }
});