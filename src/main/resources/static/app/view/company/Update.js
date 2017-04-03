Ext.define('tms.view.company.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.company.Form'],
    alias:'widget.companyUpdate',
    title: i18n.t('company'),
    items: [{
        xtype: 'companyForm'
    }]
});