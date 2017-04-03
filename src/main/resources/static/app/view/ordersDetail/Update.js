Ext.define('tms.view.ordersDetail.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.ordersDetail.Form'],
    alias:'widget.ordersDetailUpdate',
    title: i18n.t('ordersDetail'),
    items: [{
        xtype: 'ordersDetailForm'
    }]
});