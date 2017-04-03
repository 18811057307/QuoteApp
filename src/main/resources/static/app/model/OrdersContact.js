Ext.define('tms.model.OrdersContact', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('ordersContact'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'order_id', type:'string'}
    		,{name:'user_id', type:'string'}
    		,{name:'gender', type:'string'}
    		,{name:'firstname', type:'string'}
    		,{name:'lastname', type:'string'}
    		,{name:'email_address', type:'string'}
    		,{name:'default_address_id', type:'string'}
    		,{name:'telephone', type:'string'}
    		,{name:'mobile', type:'string'}
    		,{name:'password', type:'string'}
    		,{name:'ip_address', type:'string'}
    		,{name:'credits', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});