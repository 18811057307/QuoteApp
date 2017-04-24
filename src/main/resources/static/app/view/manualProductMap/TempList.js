Ext.define('tms.view.manualProductMap.TempList', {
    extend:'Ext.grid.Panel',
    requires: ['Ext.ux.exporter.Exporter','Ext.ux.exporter.Button'],
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    alias:'widget.tempProductMapList',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    
    columns:[
    	{width: 50,  header:i18n.t('manualProductMap_at_product_name'), sortable:true, dataIndex:'atProductName'}		
    	,{width: 50,  header:i18n.t('manualProductMap_at_product_code'), sortable:true, dataIndex:'atProductCode'}
    	,{width: 50,  header:i18n.t('manualProductMap_mi_product_code'), sortable:true, dataIndex:'miProductCode'}
		,{width: 50,  header:i18n.t('manualProductMap_factory_quote'), sortable:true, dataIndex:'factoryQuote'}
		,{width: 50,  header:i18n.t('manualProductMap_uni_quote'), sortable:true, dataIndex:'uniQuote'}
		,{width: 50,  header:i18n.t('manualProductMap_at_product_quote'), sortable:true, dataIndex:'atProductQuote'}
		,{width: 50,  header:i18n.t('manualProductMap_mi_product_quote'), sortable:true, dataIndex:'miProductQuote'}
		,{
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 30,
            items: [{
                align:'center',
            	iconCls: 'quotemap-icon',
                tooltip: '查询Mi价格',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var miInquiryMask = new Ext.LoadMask(grid, {msg:"查询价格中..."});
                    miInquiryMask.show();
                    var miUserForm = Ext.getCmp('miUserForm');
                    var userid = miUserForm.getForm().findField('userid').getValue();
                    var password = miUserForm.getForm().findField('password').getValue();
        	    	Ext.Ajax.request({
                    	url: tms.getContextPath() + 'api/manualProductMap/inquiryMiPrice',
                        method: 'GET',
                        params: {
                        	miProductCode: rec.get('miProductCode'),
                        	atProductCode: rec.get('id'),
                        	userid:userid,
                        	password:password
                        },
                        success: function(result, request) {
                            var json = Ext.decode(result.responseText);
                            if(json.success) {
                            	rec.set('miProductQuote',json.data[0].unitPrice);
                            	tms.notify(json.message, "查询价格成功");                            	
                            } else {
                            	tms.notify(json.message, "查询价格失败");                            	
                            }
                            
                            miInquiryMask.hide(grid);

                        },
                        failure: function(result, request) {
                        	miInquiryMask.hide(grid);
                        }
                    });
                }
            }]
        }
		//,{width: 50,  header:i18n.t('manualProductMap_date_added'), sortable:true, dataIndex:'dateAdded', filter:true}
    ],
    initComponent:function () { 
    	
    	var tempMapstore = Ext.create('Ext.data.JsonStore', {
    		storeId: 'tempProductMap',
    	    fields   : [
        		{name:'id', type:'string'}
        		,{name:'miProductName', type:'string'}
        		,{name:'miProductCode', type:'string'}
        		,{name:'miProductDesc', type:'string'}
        		,{name:'atProductName', type:'string'}
        		,{name:'atProductCode', type:'string'}
        		,{name:'atProductDesc', type:'string'}
        		,{name:'miProductQuote', type:'string'}
        		,{name:'atProductQuote', type:'string'}
        		,{name:'factoryQuote', type:'string'}
        		,{name:'uniQuote', type:'string'}
        		,{name:'dateAdded', type:'date'}
    	    ],
    	    proxy: {
    	    	type:'ajax',
                api:{
                    read:tms.getContextPath() + 'api/manualProductMap/page'
                },
                reader:{
                    totalProperty:'total',
                    successProperty:'success',
                    idProperty:'id',
                    root:'data',
                    messageProperty:'message',
                    type:'json'
                }
    	     },
    	     pageSize: 100
    	});
    	
    	this.store = tempMapstore;
    	
        var productCompareProgressbar = Ext.create('Ext.ProgressBar', {
            text    : "报价处理进度",
            width   : 600,
            style: {
                cursor: 'pointer'
            }
        });
        var productCompareTask = {
    	    run: function(){
    	    	Ext.Ajax.request({
                	url: tms.getContextPath() + 'api/manualProductMap/compareStatus',
                    method: 'GET',
                    success: function(result, request) {
                        var json = Ext.decode(result.responseText);
                        
                        var miUserForm = Ext.getCmp('miUserForm');
	                    var needPrice = miUserForm.getForm().findField('needPrice').checked;
	                    
	                    if(needPrice) {
	                    	productCompareProgressbar.updateProgress(json.finished / json.total, '总计：' + json.total + '， 已完成 ：' + json.finished + ' 个 ... Mi报价查询数量：' + json.activeCount);	 	
	                    	if(json.total > 0 && json.finished == json.total && json.activeCount == json.total) {
	                    		Ext.TaskManager.stop(productCompareTask);
	                	    	Ext.Ajax.request({
	                            	url: tms.getContextPath() + 'api/manualProductMap/getMyQuotation',
	                                method: 'GET',
	                                success: function(result, request) {
	                                	tempMapstore.loadRawData(result);
	                                }
	                	    	});
	                    	}
	                    } else {
	                    	productCompareProgressbar.updateProgress(json.finished / json.total, '总计：' + json.total + '， 已完成 ：' + json.finished + ' 个 ...');
	                    	if(json.total > 0 && json.finished == json.total) {
	                    		Ext.TaskManager.stop(productCompareTask);
	                	    	Ext.Ajax.request({
	                            	url: tms.getContextPath() + 'api/manualProductMap/getMyQuotation',
	                                method: 'GET',
	                                success: function(result, request) {
	                                	tempMapstore.loadRawData(result);
	                                }
	                	    	});
	                    	}
	                    }
                        
                    },
                    failure: function(result, request) {
                    }
                });
    	    },
    	    interval: 5000 //5 second
    	};  

        this.dockedItems = [{xtype: 'toolbar',dock: 'bottom',items:['->','报价处理进度:',productCompareProgressbar]},{xtype: 'toolbar',dock: 'top',
        	items: [{
	                xtype: 'searchfield',
	                fieldLabel: '按型号查找',
	                name: 'searchField',
	                width: 500,
	                store: this.store,
	                paramName : 'productCode',
	                onTrigger1Click : function(){
	                    var me = this;

	                    if (me.hasSearch) {
	                        me.setValue('');
	                        me.store.clearFilter(true);
	                        me.store.loadData([]);
	                        me.hasSearch = false;
	                        me.triggerCell.item(0).setDisplayed(false);
	                        me.updateLayout();
	                    }
	                },
	                onTrigger2Click : function(){
	                    var me = this,
	                        value = me.getValue();

	                    if (value.length > 0) {	                    	
                	    	Ext.Ajax.request({
                            	url: tms.getContextPath() + 'api/manualProductMap/quoteQuery',
                                method: 'GET',
                                params: {
                                	productCode:value
                                },
                                success: function(result, request) {
                                	var json = Ext.decode(result.responseText);
                                    tms.notify(json.message,"报价查询");
                                    tempMapstore.loadData([]);
                                    Ext.TaskManager.start(productCompareTask);                                    
                                }
                	    	});
	                        me.hasSearch = true;
	                        me.triggerCell.item(0).setDisplayed(true);
	                        me.updateLayout();
	                    }
	                }
	            }
        		,"->",
        		{
                    xtype:'uploadbutton',
                	text: i18n.t('Select a file to upload'),
                    //singleFile: true,
                    plugins: [{
                        ptype: 'ux.upload.window',
                        title: i18n.t('Upload_mi_quote'),
                        width: 520,
                        height: 350
                    }
                    ],
                    uploader:
                    {
                        url: tms.getContextPath() + 'api/manualProductMap/compare',
                        uploadpath: '/Root/files',
                        autoStart: false,
                        max_file_size: '2020mb',
                        drop_element: 'dragload',
                        filters : [
                            {title : "Excel files", extensions : "xls,xlsx"}
                        ],

                        //statusQueuedText: i18n.t('Ready to upload'),
                        //statusUploadingText: i18n.t('Uploading ({0}%)'),
                        //statusFailedText: '<span style="color: red">Error</span>',
                        //statusDoneText: '<span style="color: green">Complete</span>'
                        //statusInvalidSizeText: i18n.t('File too large'),
                        statusInvalidExtensionText: i18n.t('Invalid file type')
                    },
                    listeners:
                    {
                        filesadded: function(uploader, files)
                        {
                            return true;
                        },

                        beforeupload: function(uploader, file)
                        {
                        },

                        fileuploaded: function(uploader, file, resp)
                        {
                        	//this.store.loadData(resp.data);
                            tms.notify(file.name + i18n.t("uploaded"),i18n.t("File Upload"));
                            Ext.TaskManager.start(productCompareTask);
                            tempMapstore.loadData([]);
                        },

                        uploadcomplete: function(uploader, success, failed)
                        {
                        },
                        scope: this
                    }
                },
                {
                    text: '导出对照报价单'
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