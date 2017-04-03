Ext.define('tms.view.ordersContact.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.ordersContact.Form'],
    alias:'widget.ordersContactUpdate',
    title: i18n.t('ordersContact'),
    items: [{
        xtype: 'ordersContactForm'
    }]
});