Ext.define('tms.view.bpm.ProcessAdminList', {
    extend:'Ext.grid.Panel',
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    alias:'widget.processAdminList',
    store:'ProcessInstanceStore',
    showBottomToolbar:false,
    selType: 'checkboxmodel',
    selModel:{mode:'MULTI'},
    columns:[
		{width: 100,  header:'询价日期', dataIndex:'createDate', xtype:'datecolumn', format:'y年m月d日'}
		,{width: 100,  header:'报价单号', dataIndex:'seqNumber'}
		,{width: 100,  header:'内勤', dataIndex:'drafter'}
		,{width: 100,  header:'营业人员', dataIndex:'sales'}
		,{width: 100,  header:'客户名称', dataIndex:'title'}
		,{width: 50,  header:'办理状态', dataIndex:'state', renderer: function(value) {
			if('ACTIVE' == value) {
				return "<span style='color:red'>办理中</span>";
			}
			if('COMPLETED' == value) {
				return "<span style='color:green'>已办结</span>";
			}
        }}

    ],
    initComponent: function() {
    	this.dockedItems = new Array();
    	this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
    		dock: 'top',
    		enableOverflow: true,
    		items: []
    	});
    	
    	this.dockedItems.push(this.topToolbar);
    	
    	 this.bottomToolbar = Ext.create("Ext.toolbar.Paging", {
             store: this.store,
             enableOverflow: true,
             dock: 'bottom',
             displayInfo: true
         });
         this.dockedItems.push(this.bottomToolbar);
    	
    	this.callParent(arguments);
    	
    	this.topToolbar.add({
    		xtype: 'button',
    		text: '流程详细信息',
    		action: 'view',
    		iconCls: 'add',
    		disabled: true
    	},{
    		xtype: 'button',
    		text: '导出选中',
    		action: 'export',
    		iconCls: 'save',
    		disabled: true
    	});
    	this.topToolbar.add('->');
        this.topToolbar.add({
            xtype: 'searchfield',
            fieldLabel: '按名称查找',
            name: 'searchField',
            width: 300,
            store: this.store,
            paramName : 'title'
        });
    }
});