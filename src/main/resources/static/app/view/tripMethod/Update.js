Ext.define('tms.view.tripMethod.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.tripMethod.Form'],
    alias:'widget.tripMethodUpdate',
    title: i18n.t('tripMethod'),
    items: [{
        xtype: 'tripMethodForm'
    }]
});