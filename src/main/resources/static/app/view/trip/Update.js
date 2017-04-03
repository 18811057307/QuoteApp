Ext.define('tms.view.trip.Update', {
    extend: 'tms.base.Window',
    alias:'widget.tripUpdate',
    requires : ['tms.view.trip.Form'],
    title: i18n.t('trip'),
    items: [{
        xtype: 'tripForm'
    }]
});