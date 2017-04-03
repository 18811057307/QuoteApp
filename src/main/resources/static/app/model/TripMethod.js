Ext.define('tms.model.TripMethod', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('tripMethod'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'subdomain', type:'string'}
    		,{name:'desc', type:'string'}
    		,{name:'seqence', type:'int'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});