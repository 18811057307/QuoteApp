Ext.define('tms.view.salesOrder.Form', {
    extend:'tms.base.Form',
    alias:'widget.salesOrderForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('salesOrder_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'categoryCode',fieldLabel: i18n.t('salesOrder_category_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'seriesCode',fieldLabel: i18n.t('salesOrder_series_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'productCode',fieldLabel: i18n.t('salesOrder_product_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'processType',fieldLabel: i18n.t('salesOrder_process_type'), anchor:'95%'}
                            ,{xtype:'textfield',name:'amount',fieldLabel: i18n.t('salesOrder_amount'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'formInstanceId',fieldLabel: i18n.t('salesOrder_form_instance_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'categoryName',fieldLabel: i18n.t('salesOrder_category_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'seriesName',fieldLabel: i18n.t('salesOrder_series_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'productName',fieldLabel: i18n.t('salesOrder_product_name'), anchor:'95%'}
                            ,{xtype:'datefield',name:'deliveryDate',fieldLabel: i18n.t('salesOrder_delivery_date'), anchor:'95%'}
                            ,{xtype:'textfield',name:'comment',fieldLabel: i18n.t('salesOrder_comment'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});