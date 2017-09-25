Ext.define('tms.view.category.Form', {
    extend:'tms.base.Form',
    requires: [ 'tms.view.category.CategoryCombo', 'tms.view.sysUser.UserCombo' ],
    alias:'widget.categoryForm',
    jsonSubmit:true,
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
                        {xtype:'textfield',name:'id',fieldLabel: i18n.t('category_category_code'), anchor:'95%'}
                        ,{xtype:'textfield',name:'categoryName',fieldLabel: i18n.t('category_category_name'), anchor:'95%'}
                        ,{xtype:'userCombo',name:'quoterId', roleCode:'PURCHASING_AGENT', fieldLabel: i18n.t('category_quoter_name'), anchor:'95%'}
                        ,{xtype:'userCombo',name:'auditorId', roleCode:'AUDITOR_AGENT', fieldLabel: i18n.t('category_auditor_name'), anchor:'95%'}
                        ,{xtype:'hidden',name:'categoryUrl',fieldLabel: i18n.t('category_category_url'), anchor:'95%'}                        
                        ,{xtype:'hidden',name:'procBy',fieldLabel: i18n.t('category_proc_by'), anchor:'95%'}
                        ,{xtype:'hidden',name:'createDate',fieldLabel: i18n.t('category_create_date'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                    	{xtype:'categoryCombo',name:'parentCode',fieldLabel: i18n.t('category_parent_code'), anchor:'95%'}
                    	,{xtype:'numberfield',name:'factoryRatio',fieldLabel: i18n.t('category_factory_ratio'), anchor:'95%'}
                    	,{xtype:'numberfield',name:'unitRatio',fieldLabel: i18n.t('category_unit_ratio'), anchor:'95%'}
                        ,{xtype:'hidden',name:'categoryLevel',fieldLabel: i18n.t('category_category_level'), anchor:'95%'}
                        ,{xtype:'hidden',name:'hasChildCategory',value:'false',fieldLabel: i18n.t('category_has_child_category'), anchor:'95%'}
                        ,{xtype:'hidden',name:'procFlag',fieldLabel: i18n.t('category_proc_flag'), anchor:'95%'}
                        ,{xtype:'hidden',name:'updateDate',fieldLabel: i18n.t('category_update_date'), anchor:'95%'}
                        
                        
                        ]
        }
        ]
    }
    ]
});