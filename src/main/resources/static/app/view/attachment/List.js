Ext.define('tms.view.attachment.List', {
    extend:'tms.base.Grid',
    alias:'widget.attachmentList',
    store:'AttachmentStore',
    columns:[
		{width: 50,  header:i18n.t('attachment_created'), sortable:true, dataIndex:'created', filter:true}
		,{width: 50,  header:i18n.t('attachment_filename'), sortable:true, dataIndex:'filename', filter:true}
		,{width: 50,  header:i18n.t('attachment_extension'), sortable:true, dataIndex:'extension', filter:true}
		,{width: 50,  header:i18n.t('attachment_mime_type'), sortable:true, dataIndex:'mime_type', filter:true}
		,{width: 50,  header:i18n.t('attachment_byte_size'), sortable:true, dataIndex:'byte_size', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'AttachmentStore',
        displayInfo: true
    }]
});