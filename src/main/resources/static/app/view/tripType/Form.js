Ext.define('tms.view.tripType.Form', {
    extend:'tms.base.Form',
    alias:'widget.tripTypeForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {xtype:'hidden', name:'id', fieldLabel:i18n.t('tripType_id'), anchor:'95%'}
                ,
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'subdomain', fieldLabel:i18n.t('tripType_subdomain'), anchor:'95%'}
                        ,
                        {xtype:'numberfield', name:'seqence', fieldLabel:i18n.t('tripType_seqence'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'name', fieldLabel:i18n.t('tripType_name'), anchor:'95%'}
                        ,
                        {xtype:'textfield', name:'desc', fieldLabel:i18n.t('tripType_desc'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});