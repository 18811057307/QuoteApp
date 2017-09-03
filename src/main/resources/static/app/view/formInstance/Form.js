Ext.define('tms.view.formInstance.Form', {
    extend:'tms.base.Form',
    alias:'widget.formInstanceForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('formInstance_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'seqNumber',fieldLabel: i18n.t('formInstance_seq_number'), anchor:'95%'}
                            ,{xtype:'textfield',name:'drafter',fieldLabel: i18n.t('formInstance_drafter'), anchor:'95%'}
                            ,{xtype:'textfield',name:'comment',fieldLabel: i18n.t('formInstance_comment'), anchor:'95%'}
                            ,{xtype:'datefield',name:'createDate',fieldLabel: i18n.t('formInstance_create_date'), anchor:'95%'}
                            ,{xtype:'textfield',name:'processInstanceId',fieldLabel: i18n.t('formInstance_process_instance_id'), anchor:'95%'}
                            ,{xtype:'textarea',name:'document',fieldLabel: i18n.t('formInstance_document'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'title',fieldLabel: i18n.t('formInstance_title'), anchor:'95%'}
                            ,{xtype:'textfield',name:'drafterId',fieldLabel: i18n.t('formInstance_drafter_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'draftOrg',fieldLabel: i18n.t('formInstance_draft_org'), anchor:'95%'}
                            ,{xtype:'textfield',name:'description',fieldLabel: i18n.t('formInstance_description'), anchor:'95%'}
                            ,{xtype:'datefield',name:'lastModified',fieldLabel: i18n.t('formInstance_last_modified'), anchor:'95%'}
                            ,{xtype:'textfield',name:'processDefinitionId',fieldLabel: i18n.t('formInstance_process_definition_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'priority',fieldLabel: i18n.t('formInstance_priority'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});