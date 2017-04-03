Ext.define('tms.model.OrdersStatus', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('ordersStatus'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'orders_id', type:'string'}
    		,{name:'orders_status', type:'string'}
    		,{name:'date_added', type:'date'}
    		,{name:'customer_notified', type:'string'}
    		,{name:'comments', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});