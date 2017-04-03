Ext.define('tms.view.tripSchedule.Form', {
    extend:'tms.base.Form',
    alias:'widget.tripScheduleForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('tripSchedule_id'), anchor:'95%'},
                        {xtype:'textfield', name:'days', fieldLabel:i18n.t('tripSchedule_days'), anchor:'95%'},
                        {xtype:'textfield', name:'location', fieldLabel:i18n.t('tripSchedule_location'), anchor:'95%'},
                        {xtype:'textfield', name:'meal', fieldLabel:i18n.t('tripSchedule_meal'), anchor:'95%'},
                        {xtype:'textfield', name:'not_free', fieldLabel:i18n.t('tripSchedule_not_free'), anchor:'95%'},
                        {xtype:'hidden', name:'product', fieldLabel:i18n.t('tripSchedule_product'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'trip_id', fieldLabel:i18n.t('tripSchedule_trip_id'), anchor:'95%'},
                        {xtype:'textfield', name:'schedule', fieldLabel:i18n.t('tripSchedule_schedule'), anchor:'95%'},
                        {xtype:'hidden', name:'dest_type', fieldLabel:i18n.t('tripSchedule_dest_type'), anchor:'95%'},
                        {xtype:'hidden', name:'not_free_price', fieldLabel:i18n.t('tripSchedule_not_free_price'), anchor:'95%'},
                        {xtype:'textfield', name:'shopping', fieldLabel:i18n.t('tripSchedule_shopping'), anchor:'95%'},
                        {xtype:'textfield', name:'stay_time', fieldLabel:i18n.t('tripSchedule_stay_time'), anchor:'95%'}
                    ]
                }
            ]
        },
        {
            xtype:'tabpanel',
            layout:'fit',
            plain:true,
            items:[
                {
                    title:i18n.t('tripSchedule_arrangement'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'arrangement'}
                    ]
                },
                {
                    title:i18n.t('tripSchedule_attraction'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'attraction'}
                    ]
                },
                {
                    title:i18n.t('tripSchedule_accommodation'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'accommodation'}
                    ]
                },
                {
                    title:i18n.t('tripSchedule_not_free_desc'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'shop_desc'}
                    ]
                }
            ]
        }
    ]
});