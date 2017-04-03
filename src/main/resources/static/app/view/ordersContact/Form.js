Ext.define('tms.view.ordersContact.Form', {
    extend:'tms.base.Form',
    alias:'widget.ordersContactForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('ordersContact_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'user_id',fieldLabel: i18n.t('ordersContact_user_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'firstname',fieldLabel: i18n.t('ordersContact_firstname'), anchor:'95%'}
                            ,{xtype:'textfield',name:'email_address',fieldLabel: i18n.t('ordersContact_email_address'), anchor:'95%'}
                            ,{xtype:'textfield',name:'telephone',fieldLabel: i18n.t('ordersContact_telephone'), anchor:'95%'}
                            ,{xtype:'textfield',name:'password',fieldLabel: i18n.t('ordersContact_password'), anchor:'95%'}
                            ,{xtype:'textfield',name:'credits',fieldLabel: i18n.t('ordersContact_credits'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'order_id',fieldLabel: i18n.t('ordersContact_order_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'gender',fieldLabel: i18n.t('ordersContact_gender'), anchor:'95%'}
                            ,{xtype:'textfield',name:'lastname',fieldLabel: i18n.t('ordersContact_lastname'), anchor:'95%'}
                            ,{xtype:'textfield',name:'default_address_id',fieldLabel: i18n.t('ordersContact_default_address_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'mobile',fieldLabel: i18n.t('ordersContact_mobile'), anchor:'95%'}
                            ,{xtype:'textfield',name:'ip_address',fieldLabel: i18n.t('ordersContact_ip_address'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});