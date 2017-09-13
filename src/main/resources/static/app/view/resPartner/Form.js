Ext.define('tms.view.resPartner.Form', {
    extend:'tms.base.Form',
    alias:'widget.resPartnerForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('resPartner_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'name',fieldLabel: i18n.t('resPartner_name'), anchor:'95%'}
                        ,{xtype:'textfield',name:'city',fieldLabel: i18n.t('resPartner_city'), anchor:'95%'}
                        ,{xtype:'textfield',name:'zip',fieldLabel: i18n.t('resPartner_zip'), anchor:'95%'}
                        ,{xtype:'textfield',name:'street',fieldLabel: i18n.t('resPartner_street'), anchor:'95%'}
                        ,{xtype:'textfield',name:'userId',fieldLabel: i18n.t('resPartner_user_id'), anchor:'95%'}
                        ,{xtype:'textarea',name:'comment',fieldLabel: i18n.t('resPartner_comment'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                    		,{xtype:'textfield',name:'website',fieldLabel: i18n.t('resPartner_website'), anchor:'95%'}
                            ,{xtype:'textfield',name:'email',fieldLabel: i18n.t('resPartner_email'), anchor:'95%'}
                            ,{xtype:'textfield',name:'mobile',fieldLabel: i18n.t('resPartner_mobile'), anchor:'95%'}
                            ,{xtype:'textfield',name:'phone',fieldLabel: i18n.t('resPartner_phone'), anchor:'95%'}
                            ,{xtype:'textfield',name:'fax',fieldLabel: i18n.t('resPartner_fax'), anchor:'95%'}
                            ,{xtype:'datefield',name:'createDate',fieldLabel: i18n.t('resPartner_create_date'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});