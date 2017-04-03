Ext.define('tms.view.dropdown.Form', {
    extend:'tms.base.Form',
    alias:'widget.dropdownForm',
    requires : ['tms.view.dropdown.DropdownGrid'] ,
    items:[
        {xtype:'hidden', name:'id', fieldLabel:i18n.t('dropdown_id')}
        ,
        {xtype:'textfield', name:'name', fieldLabel:i18n.t('dropdown_name'), anchor:'90%'}
        ,
        {xtype:'textfield', name:'code', fieldLabel:i18n.t('dropdown_code'), anchor:'90%'}
        ,
        {xtype:'dropdownGrid', name:'options', title:i18n.t('dropdown_options'), anchor: '90%', margin:'0 0 0 20'}
    ]
});