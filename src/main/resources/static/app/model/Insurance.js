Ext.define('tms.model.Insurance', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('insurance'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'price', type:'string'}
    		,{name:'term', type:'string'}
    		,{name:'desc', type:'string'}
    		,{name:'summary', type:'string'}
    		,{name:'seqence', type:'int'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});