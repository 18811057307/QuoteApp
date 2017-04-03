Ext.define('tms.view.roomRates.Form', {
    extend:'tms.base.Form',
    alias:'widget.roomRatesForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('roomRates_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_classes_id',fieldLabel: i18n.t('roomRates_room_classes_id'), anchor:'95%'}
                            ,{xtype:'textarea',name:'rate_description',fieldLabel: i18n.t('roomRates_rate_description'), anchor:'95%'}
                            ,{xtype:'datefield',name:'validto',fieldLabel: i18n.t('roomRates_validto'), anchor:'95%'}
                            ,{xtype:'textfield',name:'mindays',fieldLabel: i18n.t('roomRates_mindays'), anchor:'95%'}
                            ,{xtype:'textfield',name:'minpeople',fieldLabel: i18n.t('roomRates_minpeople'), anchor:'95%'}
                            //,{xtype:'textfield',name:'ignore_pppn',fieldLabel: i18n.t('roomRates_ignore_pppn'), anchor:'95%'}
                            //,{xtype:'textfield',name:'allow_we',fieldLabel: i18n.t('roomRates_allow_we'), anchor:'95%'}
                            ,{xtype:'textfield',name:'dayofweek',fieldLabel: i18n.t('roomRates_dayofweek'), anchor:'95%'}
                            ,{xtype:'textfield',name:'maxrooms_alreadyselected',fieldLabel: i18n.t('roomRates_maxrooms_alreadyselected'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'property_id',fieldLabel: i18n.t('roomRates_property_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'rate_title',fieldLabel: i18n.t('roomRates_rate_title'), anchor:'95%'}
                            ,{xtype:'datefield',name:'validfrom',fieldLabel: i18n.t('roomRates_validfrom'), anchor:'95%'}
                            ,{xtype:'textfield',name:'roomrateperday',fieldLabel: i18n.t('roomRates_roomrateperday'), anchor:'95%'}
                            ,{xtype:'textfield',name:'maxdays',fieldLabel: i18n.t('roomRates_maxdays'), anchor:'95%'}
                            ,{xtype:'textfield',name:'maxpeople',fieldLabel: i18n.t('roomRates_maxpeople'), anchor:'95%'}
                            //,{xtype:'textfield',name:'allow_ph',fieldLabel: i18n.t('roomRates_allow_ph'), anchor:'95%'}
                            ,{xtype:'textfield',name:'weekendonly',fieldLabel: i18n.t('roomRates_weekendonly'), anchor:'95%'}
                            ,{xtype:'textfield',name:'minrooms_alreadyselected',fieldLabel: i18n.t('roomRates_minrooms_alreadyselected'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});