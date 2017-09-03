Ext.define('tms.view.salesOrder.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.salesOrder.Form'],
    alias:'widget.salesOrderUpdate',
    title: i18n.t('salesOrder'),
    items: [{
        xtype: 'salesOrderForm'
    }]
});