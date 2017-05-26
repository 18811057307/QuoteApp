Ext.define('tms.view.quotationLog.List', {
    extend:'Ext.grid.Panel',
    requires: ['Ext.ux.exporter.Exporter','Ext.ux.exporter.Button'],
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    alias:'widget.quotationLogList',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    columns:[],
    reconfigByProductCode: function() {
    	this.columns = this.staticsByProductCode;
    	this.reconfigure(null, this.columns);
    },
    reconfigByName: function() {
    	this.columns = this.staticsByName;
    	this.reconfigure(null, this.columns);
    },
    staticsByProductCode :[
    	{width: 50,  header:i18n.t('quotationLog_at_product_name'), dataIndex:'atProductName'}
		,{width: 50,  header:i18n.t('quotationLog_at_product_code'), dataIndex:'atProductCode'}
		,{width: 50,  header:i18n.t('quotationLog_mi_product_code'), dataIndex:'miProductCode'}
		,{width: 50,  header:"查询次数", dataIndex:'count'}
    ],
    staticsByName :[
		{width: 50,  header:i18n.t('quotationLog_name'), dataIndex:'name'}
		,{width: 50,  header:"查询次数", dataIndex:'count'}
    ],
    initComponent:function () {     	
    	var logStore = Ext.create('Ext.data.JsonStore', {
    	    fields   : [
        		{name:'miProductName', type:'string'}
        		,{name:'miProductCode', type:'string'}
        		,{name:'atProductName', type:'string'}
        		,{name:'atProductCode', type:'string'}
        		,{name:'count', type:'int'}
        		,{name:'name', type:'string'}
    	    ],
    	    proxy: {
    	    	type:'ajax',
                api:{
                    read:tms.getContextPath() + 'api/manualProductMap/quotationLogStatistic'
                },
                reader:{
                    totalProperty:'total',
                    successProperty:'success',
                    idProperty:'atProductCode',
                    root:'data',
                    messageProperty:'message',
                    type:'json'
                }
    	     },
    	     pageSize: 100
    	});
    	
    	this.store = logStore;
    	
        this.dockedItems = [{xtype: 'toolbar',dock: 'top',
        	items: ["->",
                {
                    text: '导出'
                    ,handler: function(){
                    	var formater = Ext.create("Ext.ux.exporter.excelFormatter.ExcelFormatter");
                    	var vExportContent =formater.getExcelXml(this);
                    	document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(vExportContent);
                    }
                    ,scope :this
                }
        	]
        }];
        
        this.callParent(arguments);
    }
});