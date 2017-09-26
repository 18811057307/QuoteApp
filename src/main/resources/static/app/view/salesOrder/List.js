Ext.define('tms.view.salesOrder.List', {
    extend:'Ext.grid.Panel',
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    alias:'widget.salesOrderList',
    formInstanceId: '',
    
    initComponent:function () {
    	
    	var me = this;
    	
    	this.store = Ext.create('tms.store.SalesOrderStore');
    	
    	this.uploadBtn =  Ext.create('Ext.ux.upload.Button',{
            xtype:'uploadbutton',
        	text: i18n.t('Select a file to upload'),
            //singleFile: true,
            plugins: [{
                ptype: 'ux.upload.window',
                title: '上传待处理的订单',
                width: 520,
                height: 350
            }
            ],
            uploader:
            {
                url: tms.getContextPath() + 'api/salesOrder/upload',
                uploadpath: '/Root/files',
                autoStart: false,
                max_file_size: '2020mb',
                drop_element: 'dragload',
                filters : [
                    {title : "Excel files", extensions : "xls,xlsx"}
                ],
                multipart_params:{},
                statusInvalidExtensionText: i18n.t('Invalid file type')
            },
            listeners:
            {
                filesadded: function(uploader, files)
                {
                	uploader.multipart_params.formInstanceId = this.formInstanceId;
                    return true;
                },

                beforeupload: function(uploader, file)
                {
                },

                fileuploaded: function(uploader, file, resp)
                {
                    tms.notify(file.name + i18n.t("uploaded"),i18n.t("File Upload"));

	                this.store.load({params:{
	                	formInstanceId: this.formInstanceId
	        	    }});
                },

                uploadcomplete: function(uploader, success, failed)
                {
                },
                scope: this
            }
        });

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
                	
                    var grid = Ext.ComponentQuery.query('salesOrderList')[0];
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
	                	formInstanceId: this.formInstanceId
	        	    }});
                },

                uploadcomplete: function(uploader, success, failed)
                {
                },
                scope: this
            }
        });

    	
        this.dockedItems = [{xtype: 'toolbar',dock: 'top',items:["->",{
					            xtype: 'button',
					            action: 'delete',
					            text: "全部删除",
					            iconCls: 'remove'
					        },this.uploadBtn]},
					        {xtype: 'toolbar',dock: 'bottom',items:["->",this.drawingUploadBtn]}
							];
        
        this.columns = [
        	{width: 30,  header:i18n.t('salesOrder_category_name'), sortable:true, dataIndex:'categoryName'}
        	,{width: 20,  header:'品牌', dataIndex:'brand'}
    		,{width: 50,  header:i18n.t('salesOrder_product_code'), sortable:true, dataIndex:'productCode'}
    		,{width: 20,  header:'单位', sortable:true, dataIndex:'unit'}
    		,{width: 20,  header:i18n.t('salesOrder_amount'), sortable:true, dataIndex:'amount'}
    		,{width: 30,  header:i18n.t('salesOrder_comment'), sortable:true, dataIndex:'comment'}
    		,{width: 30,  header:i18n.t('salesOrder_drawing_url'), sortable:true, dataIndex:'drawingUrl', renderer: function(value, metaData, record) {
	   			 if(""!=value) {
	   				 return "<a href='" + tms.getContextPath() + "api/salesOrder/drawingDownload?salesOrderId=" + record.get("id") + "'>下载图纸</a>";
	   			 } 		     
	        }}
        ];
        
        this.callParent(arguments);
    }
});