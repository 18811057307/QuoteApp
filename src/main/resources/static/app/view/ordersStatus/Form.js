Ext.define('tms.view.ordersStatus.Form', {
    extend:'tms.base.Form',
    alias:'widget.ordersStatusForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('ordersStatus_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'orders_status',fieldLabel: i18n.t('ordersStatus_orders_status'), anchor:'95%'}
                            ,{xtype:'textfield',name:'customer_notified',fieldLabel: i18n.t('ordersStatus_customer_notified'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'orders_id',fieldLabel: i18n.t('ordersStatus_orders_id'), anchor:'95%'}
                            ,{xtype:'datefield',name:'date_added',fieldLabel: i18n.t('ordersStatus_date_added'), anchor:'95%'}
                            ,{xtype:'textarea',name:'comments',fieldLabel: i18n.t('ordersStatus_comments'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});