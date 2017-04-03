Ext.define('tms.model.RoomClasses', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('roomClasses'),
    fields:[
        {name:'id', type:'int'}
        ,{name:'property_id', type:'int'}
        ,{name:'room_classes_name', type:'string'}
        ,{name:'room_classes_features', type:'string'}
        ,{name:'bed', type:'string'}
        ,{name:'add_bed', type:'string'}
        ,{name:'floor', type:'string'}
        ,{name:'area', type:'string'}
        ,{name:'total_rooms', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});