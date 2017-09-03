Ext.define('tms.view.bpm.TaskProcessWindow', {
    extend: 'tms.base.Window',
    requires : ['tms.view.bpm.SalesOrderTaskForm'],
    alias:'widget.bpmTaskProcessWindow',
    title: '应该取自当前的环节名称',
    buttons: [
        { text: i18n.t('Complete'), action: 'complete' },
        { text: i18n.t('button_cancel'), action: 'cancelForm' }
    ],
    layout:'border',
    items:[
    	{xtype:'panel',layout:'fit',items: [{xtype:'salesOrderTaskForm'}], border:false,  region: 'center'}
    	,{xtype:'historicActivityList',split:true, width: 450,collapsible: false,region: 'east'}
    	] 
});