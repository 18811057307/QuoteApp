Ext.define('tms.view.tripQuote.Form', {
    extend:'tms.base.Form',
    alias:'widget.tripQuoteForm',
    fieldDefaults:{
        msgTarget:'side',
        labelWidth:120,
        labelAlign:'right',
        anchor: '95%'
    },
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
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('tripQuote_id'), anchor:'95%'},
                        {xtype:'textfield', name:'title', fieldLabel:i18n.t('tripQuote_title'), anchor:'95%'},
                        {xtype:'datefield', name:'validTo', fieldLabel:i18n.t('tripQuote_validTo'), anchor:'95%'},
                        {xtype:'numberfield', name:'minPeople', fieldLabel:i18n.t('tripQuote_minPeople'), anchor:'95%'},
                        {xtype:'textfield', name:'adult_price', fieldLabel:i18n.t('tripQuote_adult_price'), anchor:'95%'},
                        {xtype:'textfield', name:'adult_net_price', fieldLabel:i18n.t('tripQuote_adult_net_price'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'trip_id', fieldLabel:i18n.t('tripQuote_trip_id'), anchor:'95%'},
                        {xtype:'datefield', name:'validFrom', fieldLabel:i18n.t('tripQuote_validFrom'), anchor:'95%'},
                        {xtype:'numberfield', name:'maxPeople', fieldLabel:i18n.t('tripQuote_maxPeople'), anchor:'95%'},
                        {xtype:'textfield', name:'child_price', fieldLabel:i18n.t('tripQuote_child_price'), anchor:'95%'},
                        {xtype:'textfield', name:'child_net_price', fieldLabel:i18n.t('tripQuote_child_net_price'), anchor:'95%'}
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
                    title:i18n.t('tripQuote_rrule'),
                    items:[
                        {
                            xtype: 'radiogroup',
                            fieldLabel: i18n.t('tripQuote_freq'),
                            width:'60%',
                            name: 'freqgroup',
                            items: [
                                {boxLabel: i18n.t('tripQuote_yearly'), name: 'FREQ',inputValue: 'YEARLY'},
                                {boxLabel: i18n.t('tripQuote_monthly'), name: 'FREQ',inputValue: 'MONTHLY'},
                                {boxLabel: i18n.t('tripQuote_weekly'), name: 'FREQ',inputValue: 'WEEKLY'},
                                {boxLabel: i18n.t('tripQuote_daily'), name: 'FREQ',inputValue: 'DAILY'}
                            ]
                        },
                        {xtype:'numberfield', name:'COUNT', fieldLabel:i18n.t('tripQuote_count')},
                        {
                            xtype: 'checkboxgroup',
                            name: 'bydaygroup',
                            fieldLabel: i18n.t('tripQuote_byweekday'),
                            width:'60%',
                            items: [
                                {boxLabel: Ext.Date.dayNames[1], name: 'BYDAY',inputValue: 'MO'},
                                {boxLabel: Ext.Date.dayNames[2], name: 'BYDAY',inputValue: 'TU'},
                                {boxLabel: Ext.Date.dayNames[3], name: 'BYDAY',inputValue: 'WE'},
                                {boxLabel: Ext.Date.dayNames[4], name: 'BYDAY',inputValue: 'TH'},
                                {boxLabel: Ext.Date.dayNames[5], name: 'BYDAY',inputValue: 'FR'},
                                {boxLabel: Ext.Date.dayNames[6], name: 'BYDAY',inputValue: 'SA'},
                                {boxLabel: Ext.Date.dayNames[0], name: 'BYDAY',inputValue: 'SU'}
                            ]
                        },
                        {xtype:'numberfield', name:'bymonthday', fieldLabel:i18n.t('tripQuote_bymonthday')},
                        {xtype:'numberfield', name:'byyearday', fieldLabel:i18n.t('tripQuote_byyearday')},
                        {xtype:'textfield', readOnly:true, width:'100%', height:'100%', name:'rrule'}
                    ]
                },
                {
                    title:i18n.t('tripQuote_rdate'),
                    items:[
                        {xtype:'multidatefield', multiValue: true, width:800, name:'rdate'}
                    ]
                },
                {
                    title:i18n.t('tripQuote_description'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'description'}
                    ]
                }
            ]
        }
    ]
});