Ext.define('tms.view.rooms.List', {
    extend:'tms.base.Grid',
    alias:'widget.roomsList',
    store:'RoomsStore',
    columns:[
		{width: 50,  header:i18n.t('rooms_property_id'), sortable:true, dataIndex:'property_id', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_classes_id'), sortable:true, dataIndex:'room_classes_id', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_features'), sortable:true, dataIndex:'room_features', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_name'), sortable:true, dataIndex:'room_name', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_number'), sortable:true, dataIndex:'room_number', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_floor'), sortable:true, dataIndex:'room_floor', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_disabled_access'), sortable:true, dataIndex:'room_disabled_access', filter:true}
		,{width: 50,  header:i18n.t('rooms_max_people'), sortable:true, dataIndex:'max_people', filter:true}
		,{width: 50,  header:i18n.t('rooms_smoking'), sortable:true, dataIndex:'smoking', filter:true}
		,{width: 50,  header:i18n.t('rooms_singleperson_suppliment'), sortable:true, dataIndex:'singleperson_suppliment', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'RoomsStore',
        displayInfo: true
    }]
});