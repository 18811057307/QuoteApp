Ext.define('tms.view.users.Form', {
    extend:'tms.base.Form',
    alias:'widget.usersForm',
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
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('users_id'), anchor:'95%'},
                        {xtype:'textfield', name:'username', fieldLabel:i18n.t('users_username'), anchor:'95%'},
                        {xtype:'textfield', name:'email', fieldLabel:i18n.t('users_email'), anchor:'95%'},

                        {xtype:'dropdownCombo', code:'Superuser', name:'superuser', fieldLabel:i18n.t('users_superuser'), anchor:'95%'},
                        {xtype:'datefield', name:'lastvisit', fieldLabel:i18n.t('users_lastvisit'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'companyCombo', name:'company_id', fieldLabel:i18n.t('users_company_id'), anchor:'95%'},
                        {xtype:'textfield', name:'mobile', allowBlank:false, fieldLabel:i18n.t('users_mobile'), anchor:'95%'},
                        //{xtype:'textfield', name:'password', fieldLabel:i18n.t('users_password'), anchor:'95%'},
                        {xtype:'dropdownCombo', code:'UserStatus', name:'status', fieldLabel:i18n.t('users_status'), anchor:'95%'},
                        {xtype:'datefield', name:'create_at', fieldLabel:i18n.t('users_create_at'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});