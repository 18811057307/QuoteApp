Ext.define('tms.view.profiles.Form', {
    extend:'tms.base.Form',
    alias:'widget.profilesForm',
    layout:'form',
    border:false,
    unstyled:true,
    buttonAlign:'center',
    buttons:[
        { text:i18n.t('button_save'), action:'submitForm' },
        { text:i18n.t('button_cancel'), action:'cancelForm' }
    ],
    items:[
        {xtype:'hidden', name:'user_id', fieldLabel:i18n.t('profiles_user_id'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'lastname', fieldLabel:i18n.t('profiles_lastname'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'firstname', fieldLabel:i18n.t('profiles_firstname'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'address', fieldLabel:i18n.t('profiles_address'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'postcode', fieldLabel:i18n.t('profiles_postcode'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'city', fieldLabel:i18n.t('profiles_city'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'town', fieldLabel:i18n.t('profiles_town'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'tel', fieldLabel:i18n.t('profiles_tel'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'fax', fieldLabel:i18n.t('profiles_fax'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccv', fieldLabel:i18n.t('profiles_ccv'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccard_no', fieldLabel:i18n.t('profiles_ccard_no'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccard_expiry', fieldLabel:i18n.t('profiles_ccard_expiry'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccard_name', fieldLabel:i18n.t('profiles_ccard_name'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'car_regno', fieldLabel:i18n.t('profiles_car_regno'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccard_issued', fieldLabel:i18n.t('profiles_ccard_issued'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'type', fieldLabel:i18n.t('profiles_type'), anchor:'95%'}

    ]
});