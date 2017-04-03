Ext.define('tms.view.invoices.Form', {
    extend:'tms.base.Form',
    alias:'widget.invoicesForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('invoices_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'order_id',fieldLabel: i18n.t('invoices_order_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'invoice_number',fieldLabel: i18n.t('invoices_invoice_number'), anchor:'95%'}
                            ,{xtype:'datefield',name:'delivery_date',fieldLabel: i18n.t('invoices_delivery_date'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'user_id',fieldLabel: i18n.t('invoices_user_id'), anchor:'95%'}
                            ,{xtype:'numberfield',name:'address_id',fieldLabel: i18n.t('invoices_address_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'delivery_number',fieldLabel: i18n.t('invoices_delivery_number'), anchor:'95%'}
                            ,{xtype:'textfield',name:'contact_id',fieldLabel: i18n.t('invoices_contact_id'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});