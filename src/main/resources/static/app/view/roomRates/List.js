Ext.define('tms.view.roomRates.List', {
    extend:'tms.base.Grid',
    alias:'widget.roomRatesList',
    store:'RoomRatesStore',
    columns:[
		{width: 50,  header:i18n.t('roomRates_rate_title'), sortable:true, dataIndex:'rate_title', filter:true}
		,{width: 50,  header:i18n.t('roomRates_validfrom'), sortable:true, dataIndex:'validfrom', renderer: Ext.util.Format.dateRenderer('Y-m-d')}
		,{width: 50,  header:i18n.t('roomRates_validto'), sortable:true, dataIndex:'validto', renderer: Ext.util.Format.dateRenderer('Y-m-d')}
		,{width: 50,  header:i18n.t('roomRates_roomrateperday'), sortable:true, dataIndex:'roomrateperday', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'RoomRatesStore',
        displayInfo: true
    }],
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'property_id',comparison:'eq',value:this.roomClassesRecord.get("property_id")});
        filters.push({type:'numeric', field: 'room_classes_id',comparison:'eq',value:this.roomClassesRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setRoomClassesRecord : function(record) {
        this.roomClassesRecord = record;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    }
});