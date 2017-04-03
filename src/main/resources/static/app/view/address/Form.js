Ext.define('tms.view.address.Form', {
    extend:'tms.base.Form',
    alias:'widget.addressForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('address_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'alias',fieldLabel: i18n.t('address_alias'), anchor:'95%'}
                            ,{xtype:'textfield',name:'lastname',fieldLabel: i18n.t('address_lastname'), anchor:'95%'}
                            ,{xtype:'textfield',name:'address1',fieldLabel: i18n.t('address_address1'), anchor:'95%'}
                            ,{xtype:'textfield',name:'postcode',fieldLabel: i18n.t('address_postcode'), anchor:'95%'}
                            ,{xtype:'textfield',name:'other',fieldLabel: i18n.t('address_other'), anchor:'95%'}
                            ,{xtype:'textfield',name:'mobile',fieldLabel: i18n.t('address_mobile'), anchor:'95%'}
                            ,{xtype:'datefield',name:'date_upd',fieldLabel: i18n.t('address_date_upd'), anchor:'95%'}
                            ,{xtype:'textfield',name:'deleted',fieldLabel: i18n.t('address_deleted'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'numberfield',name:'user_id',fieldLabel: i18n.t('address_user_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'company',fieldLabel: i18n.t('address_company'), anchor:'95%'}
                            ,{xtype:'textfield',name:'firstname',fieldLabel: i18n.t('address_firstname'), anchor:'95%'}
                            ,{xtype:'textfield',name:'address2',fieldLabel: i18n.t('address_address2'), anchor:'95%'}
                            ,{xtype:'textfield',name:'city',fieldLabel: i18n.t('address_city'), anchor:'95%'}
                            ,{xtype:'textfield',name:'phone',fieldLabel: i18n.t('address_phone'), anchor:'95%'}
                            ,{xtype:'datefield',name:'date_add',fieldLabel: i18n.t('address_date_add'), anchor:'95%'}
                            ,{xtype:'textfield',name:'active',fieldLabel: i18n.t('address_active'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});