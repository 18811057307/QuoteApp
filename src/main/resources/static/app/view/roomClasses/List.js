Ext.define('tms.view.roomClasses.List', {
    extend:'tms.base.Grid',
    alias:'widget.roomClassesList',
    store:'RoomClassesStore',
    columns:[
		{width: 50,  header:i18n.t('roomClasses_room_classes_name'), sortable:true, dataIndex:'room_classes_name', filter:true}
		,{width: 50,  header:i18n.t('roomClasses_room_classes_features'), sortable:true, dataIndex:'room_classes_features', filter:true}
		,{width: 50,  header:i18n.t('roomClasses_total_rooms'), sortable:true, dataIndex:'total_rooms', filter:true}
    ],
    initComponent:function () {
        this.callParent();
        this.topToolbar.add({
            xtype: 'button',
            text: i18n.t("button_upload"),
            action: 'upload',
            iconCls: 'upload',
            disabled: true
        });
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'RoomClassesStore',
        displayInfo: true
    }],
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'property_id',comparison:'eq',value:this.propertyRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setPropertyRecord : function(record) {
        this.propertyRecord = record;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    }
});