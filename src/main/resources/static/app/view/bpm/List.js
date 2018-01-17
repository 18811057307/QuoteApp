Ext.define('tms.view.bpm.List', {
    extend:'Ext.grid.Panel',
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    alias:'widget.taskList',
    store:'TaskStore',
    showBottomToolbar:false,
    selType: 'checkboxmodel',
    selModel:{mode:'MULTI'},
    columns:[
		{width: 50,  header:i18n.t('task_name'), sortable:true, dataIndex:'name'}
		,{width: 100,  header:i18n.t('task_title'), dataIndex:'title'}
		,{width: 50,  header:i18n.t('task_create_time'), dataIndex:'createTime', xtype:'datecolumn', format:'y年m月d日H:i:s'}
    ],
    initComponent: function() {
        this.dockedItems = new Array();
        this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
            dock: 'top',
            enableOverflow: true,
            items: [
                {
                    xtype: 'button',
                    text: '认领任务',
                    action: 'claim',
                    iconCls: 'add',
                    disabled: true
                },
                {
                    xtype: 'button',
                    text: '处理任务',
                    action: 'process',
                    iconCls: 'add',
                    disabled: true
                },
                {
                    xtype: 'button',
                    text: '查看任务情况',
                    action: 'view',
                    iconCls: 'add',
                    disabled: true
                },
                {
                    xtype: 'button',
                    text: '导出询价单',
                    action: 'export',
                    iconCls: 'save'
                }]
        });
        this.dockedItems.push(this.topToolbar);


        this.callParent(arguments);
    }
});