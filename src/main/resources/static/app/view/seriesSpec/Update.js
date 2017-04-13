Ext.define('tms.view.seriesSpec.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.seriesSpec.Form'],
    alias:'widget.seriesSpecUpdate',
    title: i18n.t('seriesSpec'),
    items: [{
        xtype: 'seriesSpecForm'
    }]
});