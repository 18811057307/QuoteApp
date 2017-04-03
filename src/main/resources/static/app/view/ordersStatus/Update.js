Ext.define('tms.view.ordersStatus.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.ordersStatus.Form'],
    alias:'widget.ordersStatusUpdate',
    title: i18n.t('ordersStatus'),
    items: [{
        xtype: 'ordersStatusForm'
    }]
});