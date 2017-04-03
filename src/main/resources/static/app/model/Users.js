Ext.define('tms.model.Users', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('users'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'username', type:'string'}
    		,{name:'password', type:'string'}
    		,{name:'email', type:'string'}
    		,{name:'activkey', type:'string'}
    		,{name:'create_at', type:'date'}
    		,{name:'lastvisit', type:'date'}
    		,{name:'superuser', type:'string'}
    		,{name:'status', type:'string'}
    		,{name:'company_id', type:'string'}
    		,{name:'mobile', type:'string'}
        ],
    getRecordName: function () {
        return this.get("username");
    }
});