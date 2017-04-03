Ext.define('tms.view.roomRates.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.roomRates.Form'],
    alias:'widget.roomRatesUpdate',
    title: i18n.t('roomRates'),
    items: [{
        xtype: 'roomRatesForm'
    }]
});