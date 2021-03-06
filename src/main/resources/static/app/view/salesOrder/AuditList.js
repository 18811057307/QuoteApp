Ext.define('tms.view.salesOrder.AuditList', {
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
            		if(context.record.get("processType") == "自动报价") {
            			return false;
            		} else {
            			return true;
            		}
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
    initComponent: function() {
    	
    	var me = this;
    	
        var userStore = Ext.data.StoreManager.lookup('SysUserStore');
        if(userStore.getCount() == 0) {
        	userStore.load({start:0, limit:50000});
        }
        
        var stockStore = Ext.create('Ext.data.Store', {
            model: 'tms.model.StockQuant',
            proxy: {
                type: 'ajax',
                url: tms.getContextPath() + 'api/stockQuant/findStock?formInstanceId='+me.formInstanceId,
        		reader : {
        			root : 'data',
        			type : 'json'
        		}
            }
        });
        
        
    	this.store = Ext.create('tms.store.SalesOrderStore', {
            groupField: 'processType',
            listeners: {
                update: function (sender, node, records) {
                    sender.sync();
                }
            }
        });
    	
    	stockStore.load({
    		scope: this,
    		callback: function(records, operation, success) {
    			me.store.load({
    	    		params:{
    	    			formInstanceId: me.formInstanceId,
    	    			taskDefinitionKey: me.taskDefinitionKey,
    	    			taskId:me.taskId
    	    		},
    	    	    scope: this
    	    	});
    		}
    	});
        
        this.columns = [
        	{width: 40,  header:'品牌', dataIndex:'brand'}
    		,{width: 40,  header:i18n.t('salesOrder_product_name'), sortable:true, dataIndex:'productName'}
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
    		,{width: 30,  header:'供应商', dataIndex:'supplierName',editor: {xtype: 'resPartnerCombo',partnerType:'Supplier'}} 
    		,{width: 30,  header:'单位', sortable:true, dataIndex:'unit'}
    		,{width: 30,  header:i18n.t('salesOrder_amount'), sortable:true, dataIndex:'amount',editor: {xtype: 'textfield'}}
    		,{width: 30,  header:'成本价', sortable:true, dataIndex:'costPrice',editor: {xtype: 'numberfield'}}
    		,{width: 30,  header:'出厂价', sortable:true, dataIndex:'factoryPrice',editor: {xtype: 'numberfield'}}
    		,{width: 30,  header:i18n.t('salesOrder_unit_price'), sortable:true, dataIndex:'unitPrice',editor: {xtype: 'numberfield'}}
    		,{width: 30,  header:'小计', renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                return Ext.util.Format.usMoney(record.get('amount') * record.get('unitPrice'));
    	        },summaryType: function(records){
    	            var i = 0, length = records.length, total = 0, record;
    		        for (; i < length; ++i) {
    		            record = records[i];
    		            total += record.get('amount') * record.get('unitPrice');
    		        }
    		        return total;
    	    }, summaryRenderer: Ext.util.Format.usMoney}
    		,{width: 30,  header:'可用库存', sortable:true, dataIndex:'atProductCode',renderer: function(value,metaData,record) {
    			if(value && value != "") {
    				var stock = stockStore.findRecord("productId", value);
    				return stock ? stock.get("useQty") : 0;
    			}
    			var productCode = record.get("productCode");
    			var stock = stockStore.findRecord("productId", productCode);
			    return stock ? stock.get("useQty") : 0;
            }}
    		,{width: 40,  header:'货期', dataIndex:'deliveryDate', xtype: 'datecolumn', format:'y-m-d'}
    		,{width: 40,  header:'报价有效期', dataIndex:'validDate',xtype: 'datecolumn', format:'y-m-d'}
    		,{width: 30,  header:'产品技术', dataIndex:'quoterId',editor: {xtype:'userCombo',roleCode:'PURCHASING_AGENT',allowBlank: false}, renderer: function(value) {
	   			 var record = userStore.findRecord("loginName", value);
			     return record ? record.get("name") : value;

           }}
    		,{width: 30,  header:'审批人', dataIndex:'auditorId',editor: {xtype:'userCombo',roleCode:'AUDITOR_AGENT',allowBlank: false}, renderer: function(value) {
	   			 var record = userStore.findRecord("loginName", value);
			     return record ? record.get("name") : value;

          }}
    		,{width: 30,  header:'通过?', dataIndex:'needProc',renderer : function(value){
	    	        var cssPrefix = Ext.baseCSSPrefix,
	                cls = [cssPrefix + 'grid-statusheader-checked'];
		            if (value) {
		                cls = cssPrefix + 'grid-statusheader-unchecked';
		            }
		            return '<div class="' + cls + '">&#160;</div>';
		        }, processEvent: function(type, view, cell, recordIndex, cellIndex, e) {
			            var me = this, dataIndex, record, checked;
	
			            if(type === 'mousedown' && e.button === 0) {
			                record = view.panel.store.getAt(recordIndex);
			                dataIndex = me.dataIndex;
			                checked = !record.get(dataIndex);
			                record.set(dataIndex, checked);
			                me.fireEvent('checkchange', me, recordIndex, checked);
			                // cancel selection.
			                return false;
			            } 

			    }
    		}
        ];
        
        this.dockedItems = [{xtype: 'toolbar',dock: 'top',
        	items: ["->",
                {
                    text: '导出询价单'
                    ,handler: function(){
                    	var ids = new Array();
                    	ids.push( me.formInstanceId);
                    	tms.downloadFile({
                    		url: tms.getContextPath() + '/api/salesOrder/exportOrders',
            	            method: 'POST',
            	            params: {
            	            	formInstanceIds:ids
            	            },
                    	});
                    	//var formater = Ext.create("Ext.ux.exporter.excelFormatter.ExcelFormatter");
                    	//var vExportContent =formater.getExcelXml(this);
                    	//document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(vExportContent);
                    }
                    ,scope :this
                }
        	]
        }];
        
        this.callParent(arguments);
    }
});