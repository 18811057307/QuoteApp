Ext.define('tms.model.Product', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('product'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'categoryId', type:'string'}
    		,{name:'productName', type:'string'}
    		,{name:'productCode', type:'string'}
    		,{name:'productUrl', type:'string'}
    		,{name:'productQuote', type:'string'}
    		,{name:'dateAdded', type:'date'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});