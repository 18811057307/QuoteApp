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
    		,{name:'validDate', type:'date', dateFormat: 'time'}
    		,{name:'amount', type:'int'}
    		,{name:'stockAmount', type:'int'}
    		,{name:'unit', type:'string'}
    		,{name:'unitPrice', type:'double'}
    		,{name:'factoryPrice', type:'double'}
    		,{name:'costPrice', type:'double'}
    		,{name:'quoterId', type:'string'}
    		,{name:'quoterName', type:'string'}
    		,{name:'auditorId', type:'string'}
    		,{name:'auditorName', type:'string'}
    		,{name:'drawingUrl', type:'string'}
    		,{name:'atProductCode', type:'string'}
    		,{name:'brand', type:'string'}
    		,{name:'supplierName', type:'string'}
    		,{name:'needProc', type:'boolean'}
    		,{name:'comment', type:'string'}    		
        ],
    getRecordName: function () {
        return this.get("id");
    }
});