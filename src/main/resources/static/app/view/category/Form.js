Ext.define('tms.view.category.Form', {
    extend:'tms.base.Form',
    alias:'widget.categoryForm',
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
                        {xtype:'hidden',name:'categoryCode',fieldLabel: i18n.t('category_category_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'categoryUrl',fieldLabel: i18n.t('category_category_url'), anchor:'95%'}
                            ,{xtype:'textfield',name:'parentCode',fieldLabel: i18n.t('category_parent_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'procBy',fieldLabel: i18n.t('category_proc_by'), anchor:'95%'}
                            ,{xtype:'datefield',name:'createDate',fieldLabel: i18n.t('category_create_date'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'categoryName',fieldLabel: i18n.t('category_category_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'categoryLevel',fieldLabel: i18n.t('category_category_level'), anchor:'95%'}
                            ,{xtype:'textfield',name:'hasChildCategory',fieldLabel: i18n.t('category_has_child_category'), anchor:'95%'}
                            ,{xtype:'textfield',name:'procFlag',fieldLabel: i18n.t('category_proc_flag'), anchor:'95%'}
                            ,{xtype:'datefield',name:'updateDate',fieldLabel: i18n.t('category_update_date'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});