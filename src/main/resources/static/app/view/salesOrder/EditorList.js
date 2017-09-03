Ext.define('tms.view.salesOrder.EditorList', {
    extend:'Ext.grid.Panel',
    selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.ux.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            saveBtnText  : '确认修改',
            cancelBtnText: '取消'
        })
    ],
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    alias:'widget.salesOrderEditorList',
    formInstanceId: '',
    columns:[
		{width: 50,  header:i18n.t('salesOrder_category_name'), sortable:true, dataIndex:'categoryName'}
		//,{width: 50,  header:i18n.t('salesOrder_series_name'), sortable:true, dataIndex:'seriesName'}
		,{width: 50,  header:i18n.t('salesOrder_product_code'), sortable:true, dataIndex:'productCode', summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(共计 ' + value + ' 种产品)' : '(共计 1 种产品)');
            }}
		,{width: 50,  header:i18n.t('salesOrder_process_type'), sortable:true, dataIndex:'processType'}
		,{width: 50,  header:i18n.t('salesOrder_delivery_date'), sortable:true, dataIndex:'deliveryDate', xtype:'datecolumn', format:'y年m月d日'}
		,{width: 50,  header:i18n.t('salesOrder_amount'), sortable:true, dataIndex:'amount',editor: {xtype: 'textfield'}}
		,{width: 50,  header:i18n.t('salesOrder_price'), sortable:true, dataIndex:'unitPrice',editor: {xtype: 'textfield'}}
		,{width: 50,  header:'小计', renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            return Ext.util.Format.usMoney(record.get('amount') * record.get('unitPrice'));
	        },summaryType: function(records){
	            var i = 0, length = records.length, total = 0, record;
		        for (; i < length; ++i) {
		            record = records[i];
		            total += record.get('amount') * record.get('unitPrice');
		        }
		        return total;
	    },
	    summaryRenderer: Ext.util.Format.usMoney}
    ],
    initComponent: function() {
        this.store = Ext.create('tms.store.SalesOrderStore', {
            groupField: 'processType',
            listeners: {
                update: function (sender, node, records) {
                    sender.sync();
                }
            }
        });
        this.callParent(arguments);
    }
});