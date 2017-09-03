Ext.define('tms.view.formInstance.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.formInstance.Form'],
    alias:'widget.formInstanceUpdate',
    title: i18n.t('formInstance'),
    items: [{
        xtype: 'formInstanceForm'
    }]
});