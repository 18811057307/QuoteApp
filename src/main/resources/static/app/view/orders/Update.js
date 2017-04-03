Ext.define('tms.view.orders.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.orders.Form'],
    alias:'widget.ordersUpdate',
    title: i18n.t('orders'),
    items: [{
        xtype: 'ordersForm'
    }]
});