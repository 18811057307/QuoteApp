Ext.define('tms.view.productCategory.Form', {
    extend:'tms.base.Form',
    alias:'widget.productCategoryForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('productCategory_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'categoryCode',fieldLabel: i18n.t('productCategory_category_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'childCategoryName',fieldLabel: i18n.t('productCategory_childCategoryName'), anchor:'95%'}
                            ,{xtype:'textfield',name:'childCategoryUrl',fieldLabel: i18n.t('productCategory_childCategoryUrl'), anchor:'95%'}
                            ,{xtype:'textfield',name:'grandCategoryUrl',fieldLabel: i18n.t('productCategory_grandCategoryUrl'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'categoryName',fieldLabel: i18n.t('productCategory_category_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'categoryUrl',fieldLabel: i18n.t('productCategory_category_url'), anchor:'95%'}
                            ,{xtype:'textfield',name:'childCategoryCode',fieldLabel: i18n.t('productCategory_childCategoryCode'), anchor:'95%'}
                            ,{xtype:'textfield',name:'grandCategoryName',fieldLabel: i18n.t('productCategory_grandCategoryName'), anchor:'95%'}
                            ,{xtype:'datefield',name:'dateAdded',fieldLabel: i18n.t('productCategory_date_added'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});