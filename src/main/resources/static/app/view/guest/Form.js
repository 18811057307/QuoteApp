Ext.define('tms.view.guest.Form', {
    extend:'tms.base.Form',
    alias:'widget.guestForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('guest_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'name',fieldLabel: i18n.t('guest_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'gender',fieldLabel: i18n.t('guest_gender'), anchor:'95%'}
                            ,{xtype:'datefield',name:'birthday',fieldLabel: i18n.t('guest_birthday'), anchor:'95%'}
                            ,{xtype:'textfield',name:'phone_no',fieldLabel: i18n.t('guest_phone_no'), anchor:'95%'}
                            ,{xtype:'textfield',name:'aboard_place',fieldLabel: i18n.t('guest_aboard_place'), anchor:'95%'}
                            ,{xtype:'textfield',name:'travel_type',fieldLabel: i18n.t('guest_travel_type'), anchor:'95%'}
                            ,{xtype:'textfield',name:'insurance',fieldLabel: i18n.t('guest_insurance'), anchor:'95%'}
                            ,{xtype:'textfield',name:'passport_expiry',fieldLabel: i18n.t('guest_passport_expiry'), anchor:'95%'}
                            ,{xtype:'datefield',name:'sign_date',fieldLabel: i18n.t('guest_sign_date'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'numberfield',name:'user_id',fieldLabel: i18n.t('guest_user_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'en_name',fieldLabel: i18n.t('guest_en_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'id_no',fieldLabel: i18n.t('guest_id_no'), anchor:'95%'}
                            ,{xtype:'numberfield',name:'age',fieldLabel: i18n.t('guest_age'), anchor:'95%'}
                            ,{xtype:'textfield',name:'mobile_no',fieldLabel: i18n.t('guest_mobile_no'), anchor:'95%'}
                            ,{xtype:'textfield',name:'visa_type',fieldLabel: i18n.t('guest_visa_type'), anchor:'95%'}
                            ,{xtype:'textfield',name:'category',fieldLabel: i18n.t('guest_category'), anchor:'95%'}
                            ,{xtype:'textfield',name:'passport',fieldLabel: i18n.t('guest_passport'), anchor:'95%'}
                            ,{xtype:'textfield',name:'sign_place',fieldLabel: i18n.t('guest_sign_place'), anchor:'95%'}
                            ,{xtype:'textarea',name:'remark',fieldLabel: i18n.t('guest_remark'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});