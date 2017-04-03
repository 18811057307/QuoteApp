Ext.define('tms.view.manualProductMap.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.manualProductMap.Form'],
    alias:'widget.manualProductMapUpdate',
    title: i18n.t('manualProductMap'),
    items: [{
        xtype: 'manualProductMapForm'
    }]
});