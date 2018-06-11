Ext.define('tms.view.salesOrder.EditorList', {
    extend:'Ext.grid.Panel',
    selType: 'rowmodel',
    requires: [ 'tms.view.sysUser.UserCombo' ],
    plugins: [
        Ext.create('Ext.ux.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            saveBtnText  : '确认修改',
            cancelBtnText: '取消',
            listeners:{
            	beforeedit : function(editor,context) {
            		/*
            		if(context.record.get("processType") == "自动报价") {
            			return false;
            		} else {
            			return true;
            		}*/            		
            	}
            }
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
    autoScroll : true,
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
    metaChange: function() {
        this.columns = [
        	{width: 40,  header:i18n.t('salesOrder_product_name'),  dataIndex:'productName'}
    		,{width: 60,  header:i18n.t('salesOrder_product_code'), dataIndex:'productCode', summaryType: 'count',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(共计 ' + value + ' 种产品)' : '(共计 1 种产品)');
                }}
    		,{width: 60,  header:i18n.t('salesOrder_at_product_code'),  dataIndex:'atProductCode'}
    		,{width: 40,  header:i18n.t('salesOrder_process_type'),  dataIndex:'processType'}
    		,{width: 30,  header:i18n.t('salesOrder_drawing_url'), sortable:true, dataIndex:'drawingUrl', renderer: function(value, metaData, record) {
  	   			 if(""!=value) {
  	   				 return "<a href='" + tms.getContextPath() + "api/salesOrder/drawingDownload?salesOrderId=" + record.get("id") + "'>下载</a>";
  	   			 } 		     
  	        }}
    		,{width: 30,  header:'单位', sortable:true, dataIndex:'unit'}
    		,{width: 30,  header:i18n.t('salesOrder_amount'), sortable:true, dataIndex:'amount',editor: {xtype: 'textfield'}}
    		,{width: 30,  header:i18n.t('salesOrder_unit_price'), sortable:true, dataIndex:'unitPrice',editor: {xtype: 'textfield'}}
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
    		//,{width: 40,  header:'货期', dataIndex:'deliveryDate', xtype: 'datecolumn', format:'y-m-d'}
    		,{width: 40,  header:'货期', dataIndex:'deliveryTime',editor: {xtype: 'numberfield'}}
    		,{width: 40,  header:'报价有效期', dataIndex:'validDate',xtype: 'datecolumn', format:'y-m-d'}
    		,{width: 30,  header:'备注', dataIndex:'comment',editor: {xtype: 'textfield'}}
        ];
    	this.reconfigure(this.store,this.columns);
    },
    initComponent: function() {
    	var me = this;
    	this.store = Ext.create('tms.store.SalesOrderStore', {
            groupField: 'processType',
            listeners: {
                update: function (sender, node, records) {
                    sender.sync();
                }
            }
        });
        
    	me.store.load({
    		params:{
    			formInstanceId: me.formInstanceId,
    			taskDefinitionKey: me.taskDefinitionKey,
    			taskId:me.taskId
    		},
    	    scope: this
    	});
    	
        var userStore = Ext.data.StoreManager.lookup('SysUserStore');
        if(userStore.getCount() == 0) {
        	userStore.load({start:0, limit:50000});
        }

        if("manual_allocation" == me.taskDefinitionKey) {
        	
        	this.columns = [
            	{width: 40,  header:'品牌', dataIndex:'brand'}
        		,{width: 40,  header:i18n.t('salesOrder_category_name'), sortable:true, dataIndex:'categoryName'}
        		
        		,{width: 60,  header:i18n.t('salesOrder_product_code'), sortable:true, dataIndex:'productCode', summaryType: 'count',
                    summaryRenderer: function(value, summaryData, dataIndex) {
                        return ((value === 0 || value > 1) ? '(共计 ' + value + ' 种产品)' : '(共计 1 种产品)');
                    }}
        		,{width: 60,  header:i18n.t('salesOrder_at_product_code'), sortable:true, dataIndex:'atProductCode'}
        		,{width: 40,  header:i18n.t('salesOrder_process_type'), sortable:true, dataIndex:'processType'}
        		,{width: 30,  header:i18n.t('salesOrder_drawing_url'), sortable:true, dataIndex:'drawingUrl', renderer: function(value, metaData, record) {
	   	   			 if(""!=value) {
	   	   				 return "<a href='" + tms.getContextPath() + "api/salesOrder/drawingDownload?salesOrderId=" + record.get("id") + "'>下载</a>";
	   	   			 } 		     
	   	        }}
        		,{width: 30,  header:'单位', sortable:true, dataIndex:'unit'}
        		,{width: 30,  header:i18n.t('salesOrder_amount'), sortable:true, dataIndex:'amount'} 
        		,{width: 50,  header:'产品技术', sortable:true, dataIndex:'quoterId',editor: {xtype:'userCombo', roleCode:'AUDITOR_AGENT'},renderer: function(value) {
      	   			 var record = userStore.findRecord("loginName", value);
      			     return record ? record.get("name") : value;
      	
           		}}
           		,{width: 50,  header:'审核员', sortable:true, dataIndex:'auditorId',editor: {xtype:'userCombo', roleCode:'AUDITOR_AGENT'},renderer: function(value) {
       	   			 var record = userStore.findRecord("loginName", value);
       			     return record ? record.get("name") : value;
       	
       	        }}
        		/**
        		,{width: 30,  header:i18n.t('salesOrder_unit_price'), sortable:true, dataIndex:'unitPrice',editor: {xtype: 'numberfield'}}
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
        	    summaryRenderer: Ext.util.Format.usMoney}**/
            ];
        } else if("order_status" == me.taskDefinitionKey) {
        	
        	this.columns = [
        	 {width: 40,  header:i18n.t('salesOrder_product_code'), dataIndex:'productCode', summaryType: 'count',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(共计 ' + value + ' 种产品)' : '(共计 1 种产品)');
                }}
    		,{width: 40,  header:i18n.t('salesOrder_at_product_code'),  dataIndex:'atProductCode'}
    		,{width: 30,  header:i18n.t('salesOrder_drawing_url'), dataIndex:'drawingUrl', renderer: function(value, metaData, record) {
   	   			 if(""!=value) {
   	   				 return "<a href='" + tms.getContextPath() + "api/salesOrder/drawingDownload?salesOrderId=" + record.get("id") + "'>下载</a>";
   	   			 } 		     
   	        }}
    		,{width: 30,  header:i18n.t('salesOrder_process_type'), dataIndex:'processType'}
    		,{width: 30,  header:'单位', sortable:true, dataIndex:'unit'}
    		,{width: 30,  header:i18n.t('salesOrder_amount'),  dataIndex:'amount'}    		
    		,{width: 40,  header:i18n.t('salesOrder_unit_price'), dataIndex:'unitPrice'}
    		
    		,{width: 30,  header:'小计', renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
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
    		,{width: 30,  header:'库存', dataIndex:'stockAmount'}
    		//,{width: 40,  header:'货期', dataIndex:'deliveryDate', xtype: 'datecolumn', format:'y-m-d'}
    		,{width: 40,  header:'货期', dataIndex:'deliveryTime',editor: {xtype: 'numberfield'}}
    		,{width: 40,  header:'报价有效期', dataIndex:'validDate',xtype: 'datecolumn', format:'y-m-d'}
    		,{width: 30,  header:'备注', dataIndex:'comment',editor: {xtype: 'textfield'}}
            ];
        } else {
        
	        this.columns = [
	        	//{width: 40,  header:'品牌', dataIndex:'brand'}
	    		//,{width: 40,  header:i18n.t('salesOrder_category_name'), sortable:true, dataIndex:'categoryName'}
	    		//,{width: 50,  header:'审批人', sortable:true, dataIndex:'auditorId',editor: {xtype:'userCombo', roleCode:'AUDITOR_AGENT'},renderer: function(value) {
		   		//	 var record = userStore.findRecord("loginName", value);
				//     return record ? record.get("name") : value;
		        //}}
	    		{width: 100,  header:i18n.t('salesOrder_product_code'), sortable:true, dataIndex:'productCode', summaryType: 'count',
	                summaryRenderer: function(value, summaryData, dataIndex) {
	                    return ((value === 0 || value > 1) ? '(共计 ' + value + ' 种产品)' : '(共计 1 种产品)');
	                }}
	    		,{width: 100,  header:i18n.t('salesOrder_at_product_code'), sortable:true, dataIndex:'atProductCode',editor: {xtype: 'textfield'}}
	    		,{width: 100,  header:i18n.t('salesOrder_drawing_url'), sortable:true, dataIndex:'drawingUrl', renderer: function(value, metaData, record) {
	   	   			 if(""!=value) {
	   	   				 return "<a href='" + tms.getContextPath() + "api/salesOrder/drawingDownload?salesOrderId=" + record.get("id") + "'>下载</a>";
	   	   			 } 		     
	   	        }}
	    		,{width: 100,  header:'供应商', dataIndex:'supplierName',editor: {xtype: 'resPartnerCombo',partnerType:'Supplier'}} 
	    		,{width: 100,  header:i18n.t('salesOrder_process_type'), sortable:true, dataIndex:'processType'}
	    		,{width: 100,  header:'单位', sortable:true, dataIndex:'unit'}
	    		,{width: 100,  header:i18n.t('salesOrder_amount'), sortable:true, dataIndex:'amount',editor: {xtype: 'numberfield'}}    		
	    		
	    		,{width: 100,  header:i18n.t('salesOrder_cost_price'), sortable:true, dataIndex:'costPrice',editor: {xtype: 'numberfield'}}
	    		,{width: 100,  header:i18n.t('salesOrder_factory_price'), sortable:true, dataIndex:'factoryPrice',editor: {xtype: 'numberfield'}}
	    		,{width: 100,  header:i18n.t('salesOrder_unit_price'), sortable:true, dataIndex:'unitPrice',editor: {xtype: 'numberfield'}}
	    		
	    		,{width: 100,  header:'小计', renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
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
	    		,{width: 100,  header:'库存', dataIndex:'stockAmount'}
	    		//,{width: 100,  header:'货期', dataIndex:'deliveryDate',editor: {xtype: 'datefield'}, xtype: 'datecolumn', format:'y-m-d'}
	    		,{width: 100,  header:'货期', dataIndex:'deliveryTime',editor: {xtype: 'numberfield'}}
	    		,{width: 120,  header:'报价有效期', dataIndex:'validDate',editor: {xtype: 'datefield'},xtype: 'datecolumn', format:'y-m-d'}
	    		,{width: 100,  header:'备注', dataIndex:'comment',editor: {xtype: 'textfield'}}
	    		,{width: 100,  header:'办理人', dataIndex:'quoterName'}
	        ];
        }
        
    	this.drawingUploadBtn =  Ext.create('Ext.ux.upload.Button',{
            xtype:'uploadbutton',
        	text: '选择要上传的图纸',
            singleFile: true,
            plugins: [{
                ptype: 'ux.upload.window',
                title: '上传图纸',
                width: 520,
                height: 350
            }
            ],
            uploader:
            {
                url: tms.getContextPath() + 'api/salesOrder/drawingUpload',
                uploadpath: '/Root/files',
                autoStart: false,
                max_file_size: '2020mb',
                drop_element: 'dragload',
                multipart_params:{},
                statusInvalidExtensionText: i18n.t('Invalid file type')
            },
            listeners:
            {
                filesadded: function(uploader, files)
                {
                	
                    var grid = Ext.ComponentQuery.query('salesOrderEditorList')[0];
                    var record = grid.getSelectionModel().getSelection()[0];
                	
                    if(record) {
            	    	uploader.multipart_params.salesOrderId = record.get("id");
            	    	return true;
                    } else {
                    	tms.notify("请在列表中选择一个要添加图纸的产品.");
                    	return false;
                    }
                },

                beforeupload: function(uploader, file)
                {
                },

                fileuploaded: function(uploader, file, resp)
                {
                    tms.notify(file.name + i18n.t("uploaded"),i18n.t("File Upload"));

	                this.store.load({params:{
	                	formInstanceId: this.formInstanceId,
	                	taskDefinitionKey: me.taskDefinitionKey
	        	    }});
                },

                uploadcomplete: function(uploader, success, failed)
                {
                },
                scope: this
            }
        });
        
        this.dockedItems = [{xtype: 'toolbar',dock: 'top',
        	items: ["->",
                {
                    text: '导出询价单'
                    ,handler: function(){
                    	var formater = Ext.create("Ext.ux.exporter.excelFormatter.ExcelFormatter");
                    	var vExportContent =formater.getExcelXml(this);
                    	document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(vExportContent);
                    }
                    ,scope :this
                }
        	]
        },{xtype: 'toolbar',dock: 'bottom',items:["->",this.drawingUploadBtn]}];
        
        this.callParent(arguments);
    }
});