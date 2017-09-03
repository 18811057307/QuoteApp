Ext.define('tms.view.formInstance.List', {
    extend:'tms.base.Grid',
    alias:'widget.formInstanceList',
    store:'FormInstanceStore',
    columns:[
		{width: 50,  header:i18n.t('formInstance_title'), sortable:true, dataIndex:'title', filter:true}
		,{width: 50,  header:i18n.t('formInstance_seq_number'), sortable:true, dataIndex:'seqNumber', filter:true}
		,{width: 50,  header:i18n.t('formInstance_drafter_id'), sortable:true, dataIndex:'drafterId', filter:true}
		,{width: 50,  header:i18n.t('formInstance_drafter'), sortable:true, dataIndex:'drafter', filter:true}
		,{width: 50,  header:i18n.t('formInstance_draft_org'), sortable:true, dataIndex:'draftOrg', filter:true}
		,{width: 50,  header:i18n.t('formInstance_comment'), sortable:true, dataIndex:'comment', filter:true}
		,{width: 50,  header:i18n.t('formInstance_description'), sortable:true, dataIndex:'description', filter:true}
		,{width: 50,  header:i18n.t('formInstance_create_date'), sortable:true, dataIndex:'createDate', filter:true}
		,{width: 50,  header:i18n.t('formInstance_last_modified'), sortable:true, dataIndex:'lastModified', filter:true}
		,{width: 50,  header:i18n.t('formInstance_process_instance_id'), sortable:true, dataIndex:'processInstanceId', filter:true}
		,{width: 50,  header:i18n.t('formInstance_process_definition_id'), sortable:true, dataIndex:'processDefinitionId', filter:true}
		,{width: 50,  header:i18n.t('formInstance_document'), sortable:true, dataIndex:'document', filter:true}
		,{width: 50,  header:i18n.t('formInstance_priority'), sortable:true, dataIndex:'priority', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'FormInstanceStore',
        displayInfo: true
    }]
});