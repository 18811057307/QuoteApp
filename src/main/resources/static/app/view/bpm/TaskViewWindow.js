Ext.define('tms.view.bpm.TaskViewWindow', {
    extend: 'Ext.window.Window',
    requires : ['tms.view.bpm.SalesOrderViewForm'],
    alias:'widget.bpmTaskViewWindow',
    title: '应该取自当前的环节名称',
    modal: true,
    layout:'border',
    items:[
    	{xtype:'panel',layout:'fit',items: [{xtype:'salesOrderViewForm'}], region: 'center'}
    	,{xtype:'panel',layout: {type: 'vbox',align: 'stretch'}, items: [{xtype:'historicActivityList',flex:1},{xtype:'panel',title:'办理意见',flex:1, items:[{xtype:'mailMessageList'}]}], width:450, region:'east', split:true}
    	] 
});