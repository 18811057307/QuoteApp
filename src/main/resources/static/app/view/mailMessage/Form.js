Ext.define('tms.view.mailMessage.Form', {
    extend:'tms.base.Form',
    alias:'widget.mailMessageForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('mailMessage_id'), anchor:'95%'}
                            ,{xtype:'datefield',name:'writeDate',fieldLabel: i18n.t('mailMessage_write_date'), anchor:'95%'}
                            ,{xtype:'textfield',name:'subject',fieldLabel: i18n.t('mailMessage_subject'), anchor:'95%'}
                            ,{xtype:'textfield',name:'parentId',fieldLabel: i18n.t('mailMessage_parent_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'messageId',fieldLabel: i18n.t('mailMessage_message_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'recordName',fieldLabel: i18n.t('mailMessage_record_name'), anchor:'95%'}
                            ,{xtype:'datefield',name:'date',fieldLabel: i18n.t('mailMessage_date'), anchor:'95%'}
                            ,{xtype:'textfield',name:'authorId',fieldLabel: i18n.t('mailMessage_author_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'messageType',fieldLabel: i18n.t('mailMessage_message_type'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'datefield',name:'createDate',fieldLabel: i18n.t('mailMessage_create_date'), anchor:'95%'}
                            ,{xtype:'textfield',name:'writeUid',fieldLabel: i18n.t('mailMessage_write_uid'), anchor:'95%'}
                            ,{xtype:'textfield',name:'createUid',fieldLabel: i18n.t('mailMessage_create_uid'), anchor:'95%'}
                            ,{xtype:'textfield',name:'subtypeId',fieldLabel: i18n.t('mailMessage_subtype_id'), anchor:'95%'}
                            ,{xtype:'textarea',name:'body',fieldLabel: i18n.t('mailMessage_body'), anchor:'95%'}
                            ,{xtype:'textfield',name:'noAutoThread',fieldLabel: i18n.t('mailMessage_no_auto_thread'), anchor:'95%'}
                            ,{xtype:'textfield',name:'replyTo',fieldLabel: i18n.t('mailMessage_reply_to'), anchor:'95%'}
                            ,{xtype:'textfield',name:'model',fieldLabel: i18n.t('mailMessage_model'), anchor:'95%'}
                            ,{xtype:'textfield',name:'emailFrom',fieldLabel: i18n.t('mailMessage_email_from'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});