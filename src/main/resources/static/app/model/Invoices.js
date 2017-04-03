Ext.define('tms.model.Invoices', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('invoices'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'user_id', type:'string'}
    		,{name:'order_id', type:'string'}
    		,{name:'address_id', type:'int'}
    		,{name:'invoice_number', type:'string'}
    		,{name:'delivery_number', type:'string'}
    		,{name:'delivery_date', type:'date'}
    		,{name:'contact_id', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});