Ext.define('tms.view.stockQuant.List', {
    extend:'tms.base.Grid',
    alias:'widget.stockQuantList',
    store:'StockQuantStore',
    columns:[
    	{width: 50,  header:i18n.t('stockQuant_location_id'), sortable:true, dataIndex:'location', filter:true}
    	,{width: 50,  header:i18n.t('stockQuant_lot_id'), sortable:true, dataIndex:'lot', filter:true}
    	,{width: 50,  header:i18n.t('stockQuant_product_name'), sortable:true, dataIndex:'productName', filter:true}
		,{width: 50,  header:i18n.t('stockQuant_product_id'), sortable:true, dataIndex:'productId', filter:true}
		,{width: 50,  header:i18n.t('stockQuant_unit'), sortable:true, dataIndex:'unit', filter:true}
		,{width: 50,  header:i18n.t('stockQuant_qty'), sortable:true, dataIndex:'qty', filter:true}
		,{width: 50,  header:i18n.t('stockQuant_use_qty'), sortable:true, dataIndex:'useQty', filter:true}	
		,{width: 50,  header:i18n.t('stockQuant_lot_cata1'), sortable:true, dataIndex:'lotCata1', filter:true}
		,{width: 50,  header:i18n.t('stockQuant_lot_cata2'), sortable:true, dataIndex:'lotCata2', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'StockQuantStore',
        displayInfo: true
    }],
    initComponent:function () {
    	this.callParent(arguments);
    	
        this.topToolbar.add('->');        
        this.topToolbar.add({
            xtype:'uploadbutton',
        	text: i18n.t('Select a file to upload'),
            //singleFile: true,
            plugins: [{
                ptype: 'ux.upload.window',
                title: '上传库存信息',
                width: 520,
                height: 350
            }
            ],
            uploader:
            {
                url: tms.getContextPath() + 'api/stockQuant/upload',
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

	                this.store.load();
                },

                uploadcomplete: function(uploader, success, failed)
                {
                },
                scope: this
            }
        });
        
    }
});