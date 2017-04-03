Ext.define('tms.view.tripType.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.tripType.Form'],
    alias:'widget.tripTypeUpdate',
    title: i18n.t('tripType'),
    items: [{
        xtype: 'tripTypeForm'
    }]
});