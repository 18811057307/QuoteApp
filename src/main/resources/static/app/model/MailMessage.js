Ext.define('tms.model.MailMessage', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('mailMessage'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'createDate', type:'date', dateFormat: 'time'}
    		,{name:'writeDate', type:'date', dateFormat: 'time'}
    		,{name:'writeUid', type:'string'}
    		,{name:'subject', type:'string'}
    		,{name:'createUid', type:'string'}
    		,{name:'parentId', type:'string'}
    		,{name:'subtypeId', type:'string'}
    		,{name:'resId', type:'string'}
    		,{name:'body', type:'string'}
    		,{name:'recordName', type:'string'}
    		,{name:'noAutoThread', type:'string'}
    		,{name:'date', type:'date', dateFormat: 'time'}
    		,{name:'replyTo', type:'string'}
    		,{name:'authorId', type:'string'}
    		,{name:'model', type:'string'}
    		,{name:'messageType', type:'string'}
    		,{name:'emailFrom', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});