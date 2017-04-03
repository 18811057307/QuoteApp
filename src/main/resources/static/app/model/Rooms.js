Ext.define('tms.model.Rooms', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('rooms'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'property_id', type:'string'}
    		,{name:'room_classes_id', type:'string'}
    		,{name:'room_features', type:'string'}
    		,{name:'room_name', type:'string'}
    		,{name:'room_number', type:'string'}
    		,{name:'room_floor', type:'string'}
    		,{name:'room_disabled_access', type:'string'}
    		,{name:'max_people', type:'string'}
    		,{name:'smoking', type:'string'}
    		,{name:'singleperson_suppliment', type:'float'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});