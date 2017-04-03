Ext.define('tms.view.tripCrowd.Form', {
    extend:'tms.base.Form',
    alias:'widget.tripCrowdForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{xtype:'hidden',name:'id',fieldLabel: i18n.t('tripCrowd_id'), anchor:'95%'}
                    ,{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'subdomain',fieldLabel: i18n.t('tripCrowd_subdomain'), anchor:'95%'}
                            ,{xtype:'numberfield',name:'seqence',fieldLabel: i18n.t('tripCrowd_seqence'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'name',fieldLabel: i18n.t('tripCrowd_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'desc',fieldLabel: i18n.t('tripCrowd_desc'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});