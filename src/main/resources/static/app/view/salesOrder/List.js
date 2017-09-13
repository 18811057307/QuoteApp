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
    store: 'SalesOrderStore',
    formInstanceId: '',
    columns:[
		{width: 20,  header:i18n.t('salesOrder_category_name'), sortable:true, dataIndex:'categoryName'}
		,{width: 50,  header:i18n.t('salesOrder_product_code'), sortable:true, dataIndex:'productCode'}
		,{width: 50,  header:i18n.t('salesOrder_delivery_date'), sortable:true, dataIndex:'deliveryDate', xtype:'datecolumn', format:'y年m月d日'}
		,{width: 20,  header:i18n.t('salesOrder_amount'), sortable:true, dataIndex:'amount'}
		//,{width: 20,  header:i18n.t('salesOrder_price'), sortable:true, dataIndex:'unitPrice'}
		//,{width: 30,  header:i18n.t('salesOrder_process_type'), sortable:true, dataIndex:'processType'}
    ],
    initComponent:function () {
        this.dockedItems = [{xtype: 'toolbar',dock: 'top',items:["->",{
            xtype: 'button',
            action: 'delete',
            text: "全部删除",
            iconCls: 'remove'
        }, {
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
        }]}];
        
        this.callParent(arguments);
    }
});