Ext.define('tms.model.TripQuote', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('tripQuote'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'trip_id', type:'int'}
    		,{name:'title', type:'string'}
    		,{name:'description', type:'string'}
    		,{name:'validFrom', type:'date'}
    		,{name:'validTo', type:'date'}
            ,{name:'rrule', type:'string'}
            ,{name:'rdate', type:'string'}
    		,{name:'minPeople', type:'int'}
    		,{name:'maxPeople', type:'int'}
    		,{name:'adult_price', type:'string'}
    		,{name:'child_price', type:'string'}
    		,{name:'adult_net_price', type:'string'}
    		,{name:'child_net_price', type:'string'}
        ],
    getRecordName: function () {
        return this.get("title");
    }
});