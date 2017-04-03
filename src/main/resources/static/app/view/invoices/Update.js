Ext.define('tms.view.invoices.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.invoices.Form'],
    alias:'widget.invoicesUpdate',
    title: i18n.t('invoices'),
    items: [{
        xtype: 'invoicesForm'
    }]
});