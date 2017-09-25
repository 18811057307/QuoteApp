Ext.define('tms.model.StockQuant', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('stockQuant'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'productId', type:'string'}
    		,{name:'productName', type:'string'}
    		,{name:'qty', type:'string'}
    		,{name:'useQty', type:'string'}
    		,{name:'unit', type:'string'}
    		,{name:'createUid', type:'string'}
    		,{name:'createDate', type:'date'}
    		,{name:'cost', type:'string'}
    		,{name:'propagatedFromId', type:'string'}
    		,{name:'packageId', type:'string'}
    		,{name:'lotId', type:'string'}
    		,{name:'locationId', type:'string'}
    		,{name:'lot', type:'string'}
    		,{name:'lotCata1', type:'string'}
    		,{name:'lotCata2', type:'string'}
    		,{name:'location', type:'string'}
    		,{name:'reservationId', type:'string'}
    		,{name:'packagingTypeId', type:'string'}
    		,{name:'negativeMoveId', type:'string'}
    		,{name:'inDate', type:'date'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});