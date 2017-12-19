Ext.define('tms.model.ProcessInstance', {
    extend:'Ext.data.Model',
    proxy: new Ext.data.proxy.Ajax({
    	listeners:{
            exception:function (proxy, response, operation) {
                var data = Ext.JSON.decode(response.responseText);
                tms.notify(data.message, data.error);	
            }
        },
        type:'ajax',
        api:{
            read:tms.getContextPath() + 'api/bpm/processInstances'
        },
        reader:{
            totalProperty:'total',
            successProperty:'success',
            idProperty:'id',
            root:'data',
            messageProperty:'message',
            type:'json'
        }
    }),
    fields:[{name: 'id',type:'int'}
    ,{name: 'version',type:'int'}
    ,{name: 'revision',type:'int'}
    ,{name: 'assignee',type:'string'}
    ,{name: 'name',type:'string'}
    ,{name: 'title',type:'string'}
    ,{name: 'drafter',type:'string'}
    ,{name: 'sales',type:'string'}
    ,{name: 'seqNumber',type:'string'}
    ,{name: 'description',type:'string'}
    ,{name: 'priority',type:'int'}
    ,{name:'createDate',type:'date', dateFormat: 'time'}
    ,{name: 'createTime',type:'date', dateFormat: 'time'}
    ,{name: 'state',type:'string'}
    ,{name: 'isIdentityLinksInitialized',type:'boolean'}
    ,{name: 'executionId',type:'string'}
    ,{name: 'processInstanceId',type:'string'}
    ,{name: 'processDefinitionId',type:'string'}
    ,{name: 'processDefinitionName',type:'string'}
    ,{name: 'taskDefinitionKey',type:'string'}
    ,{name: 'formResourceKey',type:'string'}
    ,{name: 'formInstanceId',type:'int'}],
    getRecordName: function () {
        return this.get("id");
    }
});