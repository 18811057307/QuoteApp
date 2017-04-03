Ext.define('tms.model.TripType', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('tripType'),
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