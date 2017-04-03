Ext.define('tms.view.property.Form', {
    extend:'tms.base.Form',
    alias:'widget.propertyForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('property_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'name',fieldLabel: i18n.t('property_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'sub_title',fieldLabel: i18n.t('property_sub_title'), anchor:'95%'}
                            ,{xtype:'textfield',name:'town',fieldLabel: i18n.t('property_town'), anchor:'95%'}
                            ,{xtype:'textfield',name:'country',fieldLabel: i18n.t('property_country'), anchor:'95%'}
                            ,{xtype:'textfield',name:'tel',fieldLabel: i18n.t('property_tel'), anchor:'95%'}
                            ,{xtype:'textfield',name:'email',fieldLabel: i18n.t('property_email'), anchor:'95%'}
                            ,{xtype:'textarea',name:'mappinglink',fieldLabel: i18n.t('property_mappinglink'), anchor:'95%'}
                            ,{xtype:'textarea',name:'checkin_times',fieldLabel: i18n.t('property_checkin_times'), anchor:'95%'}
                            ,{xtype:'textarea',name:'driving_directions',fieldLabel: i18n.t('property_driving_directions'), anchor:'95%'}
                            ,{xtype:'textarea',name:'othertransport',fieldLabel: i18n.t('property_othertransport'), anchor:'95%'}
                            //,{xtype:'textfield',name:'property_key',fieldLabel: i18n.t('property_property_key'), anchor:'95%'}
                            ,{xtype:'dropdownCombo',name:'stars',fieldLabel: i18n.t('property_stars'), anchor:'95%',code:'Stars'}
                            //,{xtype:'textfield',name:'apikey',fieldLabel: i18n.t('property_apikey'), anchor:'95%'}
                            //,{xtype:'textfield',name:'long',fieldLabel: i18n.t('property_long'), anchor:'95%'}
                            //,{xtype:'textfield',name:'metadescription',fieldLabel: i18n.t('property_metadescription'), anchor:'95%'}
                            ,{xtype:'textfield',name:'approved',fieldLabel: i18n.t('property_approved'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[

                            {xtype:'textfield',name:'street',fieldLabel: i18n.t('property_street'), anchor:'95%'}
                            ,{xtype:'textfield',name:'region',fieldLabel: i18n.t('property_region'), anchor:'95%'}
                            ,{xtype:'textfield',name:'postcode',fieldLabel: i18n.t('property_postcode'), anchor:'95%'}
                            ,{xtype:'textfield',name:'fax',fieldLabel: i18n.t('property_fax'), anchor:'95%'}
                            ,{xtype:'textfield',name:'features',fieldLabel: i18n.t('property_features'), anchor:'95%'}
                            ,{xtype:'textarea',name:'description',fieldLabel: i18n.t('property_description'), anchor:'95%'}
                            //,{xtype:'textarea',name:'area_activities',fieldLabel: i18n.t('property_area_activities'), anchor:'95%'}
                            ,{xtype:'textarea',name:'airports',fieldLabel: i18n.t('property_airports'), anchor:'95%'}
                            ,{xtype:'textarea',name:'policies_disclaimers',fieldLabel: i18n.t('property_policies_disclaimers'), anchor:'95%'}
                            ,{xtype:'textfield',name:'published',fieldLabel: i18n.t('property_published'), anchor:'95%'}
                            //,{xtype:'textfield',name:'ptype_id',fieldLabel: i18n.t('property_ptype_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'lat',fieldLabel: i18n.t('property_lat'), anchor:'95%'}
                            ,{xtype:'dropdownCombo', fieldLabel:'优惠促销', name:'promotion', anchor:'95%',code:'Promotion'}
                            //,{xtype:'textfield',name:'metatitle',fieldLabel: i18n.t('property_metatitle'), anchor:'95%'}
                            //,{xtype:'datefield',name:'timestamp',fieldLabel: i18n.t('property_timestamp'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});