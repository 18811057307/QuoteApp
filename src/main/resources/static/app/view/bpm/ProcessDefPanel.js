Ext.define('tms.view.bpm.ProcessDefPanel', {
	extend: 'Ext.grid.Panel', 
    rootVisible: false,
    useArrows: true,
    alias:'widget.processDefPanel',
    columns: [
        { text: '流程名称',  dataIndex: 'name', width: '100%' }
    ],
    initComponent: function() {   	
    	this.store = Ext.create('Ext.data.Store', {
    	    fields:['id', 'key', 'name'],
    	    proxy: {
    	        type: 'ajax',
    	        url: tms.getContextPath() + '/api/bpm/process-definitions',
    	        reader: {
    	            type: 'json',
    	            root: 'data'
    	        }
    	    }
    	});
    	
    	this.store.load();
        
        this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
            dock: 'top',
            enableOverflow: true,
            items: [
                {
                    xtype: 'button',
                    text: '发起流程',
                    action: 'startForm',
                    iconCls: 'add'
                }
            ]});
        
        if(tms.isAdmin) {
            this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
                dock: 'top',
                enableOverflow: true,
                items: [
                    {
                        xtype: 'button',
                        text: '发起流程',
                        action: 'startForm',
                        iconCls: 'add'
                    }
                    ,{
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
                            url: tms.getContextPath() + 'api/bpm/upload',
                            uploadpath: '/Root/files',
                            autoStart: false,
                            max_file_size: '2020mb',
                            drop_element: 'dragload',
                            filters : [
                                {title : "BPMN Files", extensions : "bpmn,xml"}
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
            	}
                ]});
        } else {
            this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
                dock: 'top',
                enableOverflow: true,
                items: [
                    {
                        xtype: 'button',
                        text: '发起流程',
                        action: 'startForm',
                        iconCls: 'add'
                    }
                ]});
        }
        
        this.dockedItems = new Array();
        this.dockedItems.push(this.topToolbar);
        this.callParent();
    } 
});