Ext.define('tms.view.product.Form', {
    extend:'tms.base.Form',
    alias:'widget.productForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('product_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'productName',fieldLabel: i18n.t('product_product_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'productUrl',fieldLabel: i18n.t('product_product_url'), anchor:'95%'}
                            ,{xtype:'datefield',name:'dateAdded',fieldLabel: i18n.t('product_date_added'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'categoryId',fieldLabel: i18n.t('product_category_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'productCode',fieldLabel: i18n.t('product_product_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'productQuote',fieldLabel: i18n.t('product_product_quote'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});