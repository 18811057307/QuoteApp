Ext.define('tms.model.ProductSupplierinfo', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('productSupplierinfo'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'createUid', type:'string'}
    		,{name:'createDate', type:'date'}
    		,{name:'delay', type:'string'}
    		,{name:'sequence', type:'string'}
    		,{name:'dateStart', type:'date'}
    		,{name:'dateEnd', type:'date'}
    		,{name:'companyId', type:'string'}
    		,{name:'companyName', type:'string'}
    		,{name:'productName', type:'string'}
    		,{name:'productCode', type:'string'}
    		,{name:'minQty', type:'string'}
    		,{name:'price', type:'string'}
    		,{name:'productId', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});