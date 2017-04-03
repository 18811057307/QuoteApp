Ext.define('tms.view.ordersDetail.Form', {
    extend:'tms.base.Form',
    alias:'widget.ordersDetailForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('ordersDetail_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'trip_id',fieldLabel: i18n.t('ordersDetail_trip_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_classes_id',fieldLabel: i18n.t('ordersDetail_room_classes_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'name',fieldLabel: i18n.t('ordersDetail_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'final_price',fieldLabel: i18n.t('ordersDetail_final_price'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'orders_id',fieldLabel: i18n.t('ordersDetail_orders_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'property_id',fieldLabel: i18n.t('ordersDetail_property_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'insurance_id',fieldLabel: i18n.t('ordersDetail_insurance_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'price',fieldLabel: i18n.t('ordersDetail_price'), anchor:'95%'}
                            ,{xtype:'textfield',name:'quantity',fieldLabel: i18n.t('ordersDetail_quantity'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});