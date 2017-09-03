Ext.define('tms.view.bpm.HistoricActivityList', {
    extend:'Ext.grid.Panel',
    selModel:{mode:'SINGLE'},
    columnLines:true,
    border:false,
    title:'处理过程',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    alias:'widget.historicActivityList',
    store:'HistoricActivityStore',
    showBottomToolbar:false,
    columns:[
    	{header:'序号', sortableColumns:false, width:50, renderer : function(v, p, record, rowIndex){
            return this.store.getCount() - rowIndex;
        }}
    	,{header:'步骤', sortableColumns:false, width:75, dataIndex:'activityName'}
		,{header:'办理人', sortableColumns:false, width:75, dataIndex:'assignee'}
		,{header:'开始时间', sortableColumns:false, dataIndex:'startTime', width:120, xtype:'datecolumn', format:'m-d H:i:s'}
		,{header:'完成时间', sortableColumns:false, dataIndex:'endTime', width:120, xtype:'datecolumn', format:'m-d H:i:s'}
    ]
});