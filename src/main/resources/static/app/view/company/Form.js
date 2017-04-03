Ext.define('tms.view.company.Form', {
    extend:'tms.base.Form',
    alias:'widget.companyForm',
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
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('company_id'), anchor:'95%'},
                        {xtype:'textfield', name:'name', fieldLabel:i18n.t('company_name'), anchor:'95%'},
                        {xtype:'textfield', name:'mobile', fieldLabel:i18n.t('company_mobile'), anchor:'95%'},
                        {xtype:'textfield', name:'fax', fieldLabel:i18n.t('company_fax'), anchor:'95%'},
                        {xtype:'hidden', name:'activkey', fieldLabel:i18n.t('company_activkey'), anchor:'95%'},
                        {xtype:'hidden', name:'status', fieldLabel:i18n.t('company_status'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'credit_limit', fieldLabel:i18n.t('company_credit_limit'), anchor:'95%'},
                        {xtype:'textfield', name:'tel', fieldLabel:i18n.t('company_tel'), anchor:'95%'},
                        {xtype:'textfield', name:'email', fieldLabel:i18n.t('company_email'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});