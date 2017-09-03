Ext.define('tms.model.FormInstance', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('formInstance'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'title', type:'string'}
    		,{name:'seqNumber', type:'string'}
    		,{name:'drafterId', type:'string'}
    		,{name:'drafter', type:'string'}
    		,{name:'draftOrg', type:'string'}
    		,{name:'comment', type:'string'}
    		,{name:'description', type:'string'}
    		,{name:'createDate',type:'date', dateFormat: 'time'}
    		,{name:'lastModified',type:'date', dateFormat: 'time'}
    		,{name:'processInstanceId', type:'string'}
    		,{name:'processDefinitionId', type:'string'}
    		,{name:'document', type:'string'}
    		,{name:'priority', type:'string'}
        ],
    getRecordName: function () {
        return this.get("title");
    }
});