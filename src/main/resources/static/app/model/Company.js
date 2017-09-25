Ext.define('tms.model.Company', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('sysCompany'),
    fields:[
		{name:'id', type:'string'}
		,{name:'name', type:'string'}
		,{name:'parentId', type:'string'}
		,{name:'sequence', type:'string'}
		,{name:'createDate', type:'date', dateFormat: 'time'}
		,{name:'email', type:'string'}
		,{name:'phone', type:'string'}
		,{name:'companyRegistry', type:'string'}
		,{name:'enabled', type:'string'}
		,{name:'remarks', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});