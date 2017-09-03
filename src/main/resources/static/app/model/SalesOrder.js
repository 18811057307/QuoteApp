Ext.define('tms.model.SalesOrder', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('salesOrder'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'formInstanceId', type:'string'}
    		,{name:'categoryCode', type:'string'}
    		,{name:'categoryName', type:'string'}
    		,{name:'seriesCode', type:'string'}
    		,{name:'seriesName', type:'string'}
    		,{name:'productCode', type:'string'}
    		,{name:'productName', type:'string'}
    		,{name:'processType', type:'string'}
    		,{name:'deliveryDate', type:'date', dateFormat: 'time'}
    		,{name:'amount', type:'string'}
    		,{name:'unit', type:'string'}
    		,{name:'unitPrice', type:'string'}
    		,{name:'comment', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});