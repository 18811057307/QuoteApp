Ext.define('tms.view.quotationLog.Form', {
    extend:'tms.base.Form',
    alias:'widget.quotationLogForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('quotationLog_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'atProductName',fieldLabel: i18n.t('quotationLog_at_product_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'miProductName',fieldLabel: i18n.t('quotationLog_mi_product_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'miProductDesc',fieldLabel: i18n.t('quotationLog_mi_product_desc'), anchor:'95%'}
                            ,{xtype:'textfield',name:'atProductQuote',fieldLabel: i18n.t('quotationLog_at_product_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'uniQuote',fieldLabel: i18n.t('quotationLog_uni_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'supbQuote',fieldLabel: i18n.t('quotationLog_supb_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'loginName',fieldLabel: i18n.t('quotationLog_login_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'name',fieldLabel: i18n.t('quotationLog_name'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'atProductCode',fieldLabel: i18n.t('quotationLog_at_product_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'atProductDesc',fieldLabel: i18n.t('quotationLog_at_product_desc'), anchor:'95%'}
                            ,{xtype:'textfield',name:'miProductCode',fieldLabel: i18n.t('quotationLog_mi_product_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'miProductQuote',fieldLabel: i18n.t('quotationLog_mi_product_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'factoryQuote',fieldLabel: i18n.t('quotationLog_factory_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'supaQuote',fieldLabel: i18n.t('quotationLog_supa_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'supcQuote',fieldLabel: i18n.t('quotationLog_supc_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'orderQuantity',fieldLabel: i18n.t('quotationLog_order_quantity'), anchor:'95%'}
                            ,{xtype:'datefield',name:'quotationTime',fieldLabel: i18n.t('quotationLog_quotation_time'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});