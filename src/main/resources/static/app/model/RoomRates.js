Ext.define('tms.model.RoomRates', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('roomRates'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'property_id', type:'int'}
    		,{name:'room_classes_id', type:'int'}
    		,{name:'rate_title', type:'string'}
    		,{name:'rate_description', type:'string'}
    		,{name:'validfrom', type:'date'}
    		,{name:'validto', type:'date'}
    		,{name:'roomrateperday', type:'string'}
    		,{name:'mindays', type:'string'}
    		,{name:'maxdays', type:'string'}
    		,{name:'minpeople', type:'string'}
    		,{name:'maxpeople', type:'string'}
    		,{name:'ignore_pppn', type:'string'}
    		,{name:'allow_ph', type:'string'}
    		,{name:'allow_we', type:'string'}
    		,{name:'weekendonly', type:'string'}
    		,{name:'dayofweek', type:'string'}
    		,{name:'minrooms_alreadyselected', type:'string'}
    		,{name:'maxrooms_alreadyselected', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});