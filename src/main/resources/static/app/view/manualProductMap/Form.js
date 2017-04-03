Ext.define('tms.view.manualProductMap.Form', {
    extend:'tms.base.Form',
    alias:'widget.manualProductMapForm',
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
                    		{xtype:'textfield',name:'atProductName',fieldLabel: i18n.t('manualProductMap_at_product_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'id',fieldLabel: i18n.t('manualProductMap_at_product_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'atProductQuote',fieldLabel: i18n.t('manualProductMap_at_product_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'uniQuote',fieldLabel: i18n.t('manualProductMap_uni_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'atProductDesc',fieldLabel: i18n.t('manualProductMap_at_product_desc'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'miProductName',fieldLabel: i18n.t('manualProductMap_mi_product_name'), anchor:'95%'}
                        ,{xtype:'textfield',name:'miProductCode',fieldLabel: i18n.t('manualProductMap_mi_product_code'), anchor:'95%'}                            
                            ,{xtype:'textfield',name:'miProductQuote',fieldLabel: i18n.t('manualProductMap_mi_product_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'factoryQuote',fieldLabel: i18n.t('manualProductMap_factory_quote'), anchor:'95%'}
                            ,{xtype:'textfield',name:'miProductDesc',fieldLabel: i18n.t('manualProductMap_mi_product_desc'), anchor:'95%'}
                            ,{xtype:'hidden',name:'dateAdded',fieldLabel: i18n.t('manualProductMap_date_added'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});