Ext.define('tms.model.HistoricActivityInstance', {
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
            read:tms.getContextPath() + 'api/bpm/history'
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
    fields:[
    {name: 'id',type:'string'}
    ,{name: 'activityId',type:'string'}
    ,{name: 'activityName',type:'string'}
    ,{name: 'processInstanceId',type:'string'}
    ,{name: 'taskId',type:'string'}
    ,{name: 'executionId',type:'string'}
    ,{name: 'assignee',type:'string'}
    ,{name: 'startTime',type:'date', dateFormat: 'time'}
    ,{name: 'endTime',type:'date', dateFormat: 'time'}
    ,{name: 'durationInMillis',type:'string'}
    ],
    getRecordName: function () {
        return this.get("id");
    }
});