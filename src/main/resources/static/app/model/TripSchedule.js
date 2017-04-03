Ext.define('tms.model.TripSchedule', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('tripSchedule'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'trip_id', type:'int'}
    		,{name:'days', type:'string'}
    		,{name:'dest_type', type:'string'}
    		,{name:'location', type:'string'}
    		,{name:'schedule', type:'string'}
    		,{name:'meal', type:'string'}
    		,{name:'accommodation', type:'string'}
    		,{name:'attraction', type:'string'}
    		,{name:'arrangement', type:'string'}
    		,{name:'not_free', type:'string'}
    		,{name:'not_free_price', type:'string'}
    		,{name:'not_free_desc', type:'string'}
    		,{name:'shopping', type:'string'}
    		,{name:'product', type:'string'}
    		,{name:'stay_time', type:'string'}
    		,{name:'shop_desc', type:'string'}
        ],
    getRecordName: function () {
        return this.get("schedule");
    }
});