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
    
    columns:[
    	{width: 50,  header:i18n.t('manualProductMap_at_product_name'), sortable:true, dataIndex:'atProductName', filter:true}		
    	,{width: 50,  header:i18n.t('manualProductMap_at_product_code'), sortable:true, dataIndex:'id', filter:true}
    	,{width: 50,  header:i18n.t('manualProductMap_mi_product_code'), sortable:true, dataIndex:'miProductCode', filter:true}
		,{width: 50,  header:i18n.t('manualProductMap_factory_quote'), sortable:true, dataIndex:'factoryQuote', filter:true}
		,{width: 50,  header:i18n.t('manualProductMap_uni_quote'), sortable:true, dataIndex:'uniQuote', filter:true}
		,{width: 50,  header:i18n.t('manualProductMap_at_product_quote'), sortable:true, dataIndex:'atProductQuote', filter:true}
		,{width: 50,  header:i18n.t('manualProductMap_mi_product_quote'), sortable:true, dataIndex:'miProductQuote', filter:true}
		//,{width: 50,  header:i18n.t('manualProductMap_date_added'), sortable:true, dataIndex:'dateAdded', filter:true}
    ],
    initComponent:function () { 
    	
    	this.store = Ext.create('Ext.data.JsonStore', {
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
    	    ]
    	});
        this.dockedItems = [{xtype: 'toolbar',dock: 'top',
        	items: [
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
                        	this.store.loadData(resp.data);
                            tms.notify(file.name + i18n.t("uploaded"),i18n.t("File Upload"));
                        },

                        uploadcomplete: function(uploader, success, failed)
                        {
                        },
                        scope: this
                    }
                },"->",
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