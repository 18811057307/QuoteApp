Ext.define('tms.view.insurance.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.insurance.Form'],
    alias:'widget.insuranceUpdate',
    title: i18n.t('insurance'),
    items: [{
        xtype: 'insuranceForm'
    }]
});