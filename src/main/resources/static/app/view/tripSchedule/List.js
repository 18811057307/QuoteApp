Ext.define('tms.view.tripSchedule.List', {
    extend:'tms.base.Grid',
    alias:'widget.tripScheduleList',
    store:'TripScheduleStore',
    columns:[
		{width: 50,  header:i18n.t('tripSchedule_days'), sortable:true, dataIndex:'days', filter:true}
		,{width: 50,  header:i18n.t('tripSchedule_schedule'), sortable:true, dataIndex:'schedule', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripScheduleStore',
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