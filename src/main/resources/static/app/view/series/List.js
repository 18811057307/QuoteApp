Ext.define('tms.view.series.List', {
    extend:'tms.base.Grid',
    alias:'widget.seriesList',
    store: 'SeriesStore',
    columns:[
		{width: 50,  header:'系列号', dataIndex:'id'}
		,{width: 50,  header:'有无价格', dataIndex:'quoteType',renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            if('有价格' == value) {
            	return '●';
            }
            
            if('无价格' == value) {
            	return '○';
            }
            
            if('部分有' == value) {
            	return '◎';
            }
        }}
		,{width: 50,  header:'备注', dataIndex:'remark'}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true
    }],
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
                url: tms.getContextPath() + 'api/series/upload',
                uploadpath: '/Root/files',
                autoStart: false,
                max_file_size: '2020mb',
                drop_element: 'dragload',
                filters : [
                    {title : "Excel files", extensions : "xls,xlsx"}
                ],

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
            paramName : 'seriesCode'
        });
        this.topToolbar.add('->');        
        this.topToolbar.add(this.uploadBtn);
    },

    onTextFieldChange: function(txtField,newValue,oldValue) {
    	this.store.load({params:{limit:100, seriesCode:newValue}});
    }
});