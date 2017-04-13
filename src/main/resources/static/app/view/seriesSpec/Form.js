Ext.define('tms.view.seriesSpec.Form', {
    extend:'tms.base.Form',
    alias:'widget.seriesSpecForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('seriesSpec_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'key',fieldLabel: i18n.t('seriesSpec_key'), anchor:'95%'}
                            ,{xtype:'textfield',name:'unit',fieldLabel: i18n.t('seriesSpec_unit'), anchor:'95%'}
                            ,{xtype:'textarea',name:'aryChoiceName',fieldLabel: i18n.t('seriesSpec_ary_choice_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'isUniform',fieldLabel: i18n.t('seriesSpec_is_uniform'), anchor:'95%'}
                            ,{xtype:'textarea',name:'aryIsNull',fieldLabel: i18n.t('seriesSpec_ary_is_null'), anchor:'95%'}
                            ,{xtype:'textfield',name:'seriesSpecNo',fieldLabel: i18n.t('seriesSpec_series_spec_no'), anchor:'95%'}
                            ,{xtype:'textfield',name:'hasParamSpec',fieldLabel: i18n.t('seriesSpec_has_param_spec'), anchor:'95%'}
                            ,{xtype:'textfield',name:'isSpecInch',fieldLabel: i18n.t('seriesSpec_is_spec_inch'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'seriesCode',fieldLabel: i18n.t('seriesSpec_series_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'title',fieldLabel: i18n.t('seriesSpec_title'), anchor:'95%'}
                            ,{xtype:'textfield',name:'propertyCode',fieldLabel: i18n.t('seriesSpec_property_code'), anchor:'95%'}
                            ,{xtype:'textarea',name:'aryChoiceCode',fieldLabel: i18n.t('seriesSpec_ary_choice_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'uniformChoiceCode',fieldLabel: i18n.t('seriesSpec_uniform_choice_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'valueType',fieldLabel: i18n.t('seriesSpec_value_type'), anchor:'95%'}
                            ,{xtype:'textfield',name:'singleChoiceName',fieldLabel: i18n.t('seriesSpec_single_choice_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'displayPattern',fieldLabel: i18n.t('seriesSpec_display_pattern'), anchor:'95%'}
                            ,{xtype:'textfield',name:'closeflag',fieldLabel: i18n.t('seriesSpec_closeflag'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});