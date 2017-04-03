Ext.define('tms.model.Address', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('address'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'user_id', type:'int'}
    		,{name:'alias', type:'string'}
    		,{name:'company', type:'string'}
    		,{name:'lastname', type:'string'}
    		,{name:'firstname', type:'string'}
    		,{name:'address1', type:'string'}
    		,{name:'address2', type:'string'}
    		,{name:'postcode', type:'string'}
    		,{name:'city', type:'string'}
    		,{name:'other', type:'string'}
    		,{name:'phone', type:'string'}
    		,{name:'mobile', type:'string'}
    		,{name:'date_add', type:'date'}
    		,{name:'date_upd', type:'date'}
    		,{name:'active', type:'string'}
    		,{name:'deleted', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});