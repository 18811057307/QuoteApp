Ext.define('tms.view.orders.Form', {
    extend:'tms.base.Form',
    alias:'widget.ordersForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('orders_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'no',fieldLabel: i18n.t('orders_no'), readOnly:true, anchor:'95%'}
                        ,{xtype:'textfield',name:'total_paid',fieldLabel: i18n.t('orders_total_paid'), readOnly:true, anchor:'95%'}
                        ,{xtype:'datefield',name:'paid',fieldLabel: i18n.t('orders_paid'), readOnly:true, anchor:'95%'}

                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        ,{xtype:'orderStatusCombo',name:'status',fieldLabel: i18n.t('orders_status'), anchor:'95%'}
                        ,{xtype:'textfield',name:'total_paid_real',fieldLabel: i18n.t('orders_total_paid_real'),readOnly:true,  anchor:'95%'}
                        ,{xtype:'textfield',name:'payment',fieldLabel: i18n.t('orders_payment'), readOnly:true, anchor:'95%'}

                    ]
                }
                ]
            },
            {xtype:'textarea',name:'comment',fieldLabel: i18n.t('ordersStatus_comments'), allowBlank: false,anchor:'100%'}
    ]
});