Ext.define('tms.view.categorySpec.Form', {
    extend:'tms.base.Form',
    alias:'widget.categorySpecForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('categorySpec_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'key',fieldLabel: i18n.t('categorySpec_key'), anchor:'95%'}
                            ,{xtype:'textfield',name:'unit',fieldLabel: i18n.t('categorySpec_unit'), anchor:'95%'}
                            ,{xtype:'textfield',name:'categorySpecNo',fieldLabel: i18n.t('categorySpec_category_spec_no'), anchor:'95%'}
                            ,{xtype:'textarea',name:'aryChoiceName',fieldLabel: i18n.t('categorySpec_ary_choice_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'valueType',fieldLabel: i18n.t('categorySpec_value_type'), anchor:'95%'}
                            ,{xtype:'textfield',name:'noticeString',fieldLabel: i18n.t('categorySpec_notice_string'), anchor:'95%'}
                            ,{xtype:'textfield',name:'useFlag',fieldLabel: i18n.t('categorySpec_use_flag'), anchor:'95%'}
                            ,{xtype:'textfield',name:'displayPattern',fieldLabel: i18n.t('categorySpec_display_pattern'), anchor:'95%'}
                            ,{xtype:'textfield',name:'similarFlag',fieldLabel: i18n.t('categorySpec_similar_flag'), anchor:'95%'}
                            ,{xtype:'textfield',name:'groupNoticeString',fieldLabel: i18n.t('categorySpec_group_notice_string'), anchor:'95%'}
                            ,{xtype:'textfield',name:'isParent',fieldLabel: i18n.t('categorySpec_is_parent'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'categoryCode',fieldLabel: i18n.t('categorySpec_category_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'title',fieldLabel: i18n.t('categorySpec_title'), anchor:'95%'}
                            ,{xtype:'textfield',name:'illustrationType',fieldLabel: i18n.t('categorySpec_illustration_type'), anchor:'95%'}
                            ,{xtype:'textfield',name:'propertyCode',fieldLabel: i18n.t('categorySpec_property_code'), anchor:'95%'}
                            ,{xtype:'textarea',name:'aryChoiceCode',fieldLabel: i18n.t('categorySpec_ary_choice_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'extraSpec',fieldLabel: i18n.t('categorySpec_extra_spec'), anchor:'95%'}
                            ,{xtype:'textfield',name:'hasParamSpec',fieldLabel: i18n.t('categorySpec_has_param_spec'), anchor:'95%'}
                            ,{xtype:'textfield',name:'groupingStep',fieldLabel: i18n.t('categorySpec_grouping_step'), anchor:'95%'}
                            ,{xtype:'textfield',name:'isSpecInch',fieldLabel: i18n.t('categorySpec_is_spec_inch'), anchor:'95%'}
                            ,{xtype:'textfield',name:'groupTitle',fieldLabel: i18n.t('categorySpec_group_title'), anchor:'95%'}
                            ,{xtype:'textfield',name:'groupIndex',fieldLabel: i18n.t('categorySpec_group_index'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});