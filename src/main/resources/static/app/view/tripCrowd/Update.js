Ext.define('tms.view.tripCrowd.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.tripCrowd.Form'],
    alias:'widget.tripCrowdUpdate',
    title: i18n.t('tripCrowd'),
    items: [{
        xtype: 'tripCrowdForm'
    }]
});