Ext.define('tms.model.OrdersDetail', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('ordersDetail'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'orders_id', type:'string'}
    		,{name:'trip_id', type:'string'}
    		,{name:'property_id', type:'string'}
    		,{name:'room_classes_id', type:'string'}
    		,{name:'insurance_id', type:'string'}
    		,{name:'name', type:'string'}
    		,{name:'price', type:'string'}
    		,{name:'final_price', type:'string'}
    		,{name:'quantity', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});