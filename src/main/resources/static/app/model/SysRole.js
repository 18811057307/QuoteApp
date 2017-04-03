Ext.define('tms.model.SysRole', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('sysRole'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'name', type:'string'}
    		,{name:'enabled', type:'string'}
    		,{name:'remarks', type:'string'}
    		,{name:'createDate', type:'date'}
    		,{name:'updateDate', type:'date'}
    		,{name:'delFlag', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});