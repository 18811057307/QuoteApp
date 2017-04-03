Ext.define('tms.view.tripTheme.Form', {
    extend:'tms.base.Form',
    alias:'widget.tripThemeForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {xtype:'hidden', name:'id', fieldLabel:i18n.t('tripTheme_id'), anchor:'95%'}
                ,
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'subdomain', fieldLabel:i18n.t('tripTheme_subdomain'), anchor:'95%'}
                        ,
                        {xtype:'numberfield', name:'seqence', fieldLabel:i18n.t('tripTheme_seqence'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'name', fieldLabel:i18n.t('tripTheme_name'), anchor:'95%'}
                        ,
                        {xtype:'textfield', name:'desc', fieldLabel:i18n.t('tripTheme_desc'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});