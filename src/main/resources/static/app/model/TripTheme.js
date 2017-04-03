Ext.define('tms.model.TripTheme', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('tripTheme'),
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