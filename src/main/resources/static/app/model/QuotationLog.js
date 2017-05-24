Ext.define('tms.model.QuotationLog', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('quotationLog'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'atProductCode', type:'string'}
    		,{name:'atProductName', type:'string'}
    		,{name:'atProductDesc', type:'string'}
    		,{name:'miProductName', type:'string'}
    		,{name:'miProductCode', type:'string'}
    		,{name:'miProductDesc', type:'string'}
    		,{name:'miProductQuote', type:'string'}
    		,{name:'atProductQuote', type:'string'}
    		,{name:'factoryQuote', type:'string'}
    		,{name:'uniQuote', type:'string'}
    		,{name:'supaQuote', type:'string'}
    		,{name:'supbQuote', type:'string'}
    		,{name:'supcQuote', type:'string'}
    		,{name:'loginName', type:'string'}
    		,{name:'orderQuantity', type:'string'}
    		,{name:'name', type:'string'}
    		,{name:'quotationTime', type:'date'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});