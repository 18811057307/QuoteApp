Ext.define('tms.model.Company', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('company'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'email', type:'string'}
    		,{name:'mobile', type:'string'}
    		,{name:'tel', type:'string'}
    		,{name:'fax', type:'string'}
    		,{name:'activkey', type:'string'}
    		,{name:'credit_limit', type:'string'}
    		,{name:'status', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});