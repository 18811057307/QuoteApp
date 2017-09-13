Ext.define('tms.view.productSupplierinfo.Form', {
    extend:'tms.base.Form',
    alias:'widget.productSupplierinfoForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('productSupplierinfo_id'), anchor:'95%'}
                            ,{xtype:'datefield',name:'createDate',fieldLabel: i18n.t('productSupplierinfo_create_date'), anchor:'95%'}
                            ,{xtype:'textfield',name:'sequence',fieldLabel: i18n.t('productSupplierinfo_sequence'), anchor:'95%'}
                            ,{xtype:'datefield',name:'dateEnd',fieldLabel: i18n.t('productSupplierinfo_date_end'), anchor:'95%'}
                            ,{xtype:'textfield',name:'companyName',fieldLabel: i18n.t('productSupplierinfo_company_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'productCode',fieldLabel: i18n.t('productSupplierinfo_product_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'price',fieldLabel: i18n.t('productSupplierinfo_price'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'createUid',fieldLabel: i18n.t('productSupplierinfo_create_uid'), anchor:'95%'}
                            ,{xtype:'textfield',name:'delay',fieldLabel: i18n.t('productSupplierinfo_delay'), anchor:'95%'}
                            ,{xtype:'datefield',name:'dateStart',fieldLabel: i18n.t('productSupplierinfo_date_start'), anchor:'95%'}
                            ,{xtype:'textfield',name:'companyId',fieldLabel: i18n.t('productSupplierinfo_company_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'productName',fieldLabel: i18n.t('productSupplierinfo_product_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'minQty',fieldLabel: i18n.t('productSupplierinfo_min_qty'), anchor:'95%'}
                            ,{xtype:'textfield',name:'productId',fieldLabel: i18n.t('productSupplierinfo_product_id'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});