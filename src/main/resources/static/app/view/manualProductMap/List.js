Ext.define('tms.view.manualProductMap.List', {
    extend:'tms.base.Grid',
    alias:'widget.manualProductMapList',
    store:'ManualProductMapStore',
    selType: 'checkboxmodel',
    selModel:{mode:'MULTI'},
    columns:[
    	{width: 50,  header:i18n.t('manualProductMap_at_product_name'), sortable:true, dataIndex:'atProductName'}		
    	,{width: 50,  header:i18n.t('manualProductMap_at_product_code'), sortable:true, dataIndex:'id'}
    	,{width: 50,  header:i18n.t('manualProductMap_mi_product_code'), sortable:true, dataIndex:'miProductCode'}
		,{width: 50,  header:i18n.t('manualProductMap_factory_quote'), sortable:true, dataIndex:'factoryQuote'}
		,{width: 50,  header:i18n.t('manualProductMap_uni_quote'), sortable:true, dataIndex:'uniQuote'}
		,{width: 50,  header:i18n.t('manualProductMap_at_product_quote'), sortable:true, dataIndex:'atProductQuote'}
		,{width: 50,  header:i18n.t('manualProductMap_mi_product_quote'), sortable:true, dataIndex:'miProductQuote'}
		//,{width: 50,  header:i18n.t('manualProductMap_date_added'), sortable:true, dataIndex:'dateAdded'}
    ],
    initComponent:function () {
        this.callParent();
        this.uploadBtn = Ext.create('Ext.ux.upload.Button', {
            text: i18n.t('Select a file to upload'),
            //singleFile: true,
            plugins: [{
                ptype: 'ux.upload.window',
                title: i18n.t('Upload'),
                width: 520,
                height: 350
            }
            ],
            uploader:
            {
                url: tms.getContextPath() + 'api/manualProductMap/upload',
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

                fileuploaded: function(uploader, file)
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
        this.topToolbar.add({
            xtype: 'searchfield',
            fieldLabel: '按型号查找',
            name: 'searchField',
            width: 300,
            store: this.store,
            paramName : 'productCode'
        });
        this.topToolbar.add('->');        
        this.topToolbar.add(this.uploadBtn);
    },

    onTextFieldChange: function(txtField,newValue,oldValue) {
    	this.store.load({params:{limit:100, productCode:newValue}});
    }
});