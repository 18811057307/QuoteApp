Ext.define('tms.model.ManualProductMap', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('manualProductMap'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'miProductName', type:'string'}
    		,{name:'miProductCode', type:'string'}
    		,{name:'miProductDesc', type:'string'}
    		,{name:'atProductName', type:'string'}
    		,{name:'atProductDesc', type:'string'}
    		,{name:'miProductQuote', type:'string'}
    		,{name:'atProductQuote', type:'string'}
    		,{name:'factoryQuote', type:'string'}
    		,{name:'uniQuote', type:'string'}
    		,{name:'supaQuote', type:'string'}
    		,{name:'supbQuote', type:'string'}
    		,{name:'supcQuote', type:'string'}
    		,{name:'dateAdded', type:'date'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});