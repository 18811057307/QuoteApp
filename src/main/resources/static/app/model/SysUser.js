Ext.define('tms.model.SysUser', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('sysUser'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'loginName', type:'string'}
    		,{name:'password', type:'string'}
    		,{name:'name', type:'string'}
    		,{name:'email', type:'string'}
    		,{name:'phone', type:'string'}
    		,{name:'mobile', type:'string'}
    		,{name:'enabled', type:'string'}
    		,{name:'remarks', type:'string'}
    		,{name:'delFlag', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});