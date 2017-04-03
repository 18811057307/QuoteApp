Ext.define('tms.view.insurance.Form', {
    extend:'tms.base.Form',
    alias:'widget.insuranceForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{xtype:'hidden',name:'id',fieldLabel: i18n.t('insurance_id'), anchor:'95%'}
                    ,{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                            {xtype:'textfield',name:'price',fieldLabel: i18n.t('insurance_price'), anchor:'95%'}
                            ,{xtype:'textfield',name:'desc',fieldLabel: i18n.t('insurance_desc'), anchor:'95%'}
                            ,{xtype:'numberfield',name:'seqence',fieldLabel: i18n.t('insurance_seqence'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'name',fieldLabel: i18n.t('insurance_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'term',fieldLabel: i18n.t('insurance_term'), anchor:'95%'}
                            ,{xtype:'textarea',name:'summary',fieldLabel: i18n.t('insurance_summary'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});