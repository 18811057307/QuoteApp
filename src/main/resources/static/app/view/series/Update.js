Ext.define('tms.view.series.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.series.Form'],
    alias:'widget.seriesUpdate',
    title: i18n.t('series'),
    items: [{
        xtype: 'seriesForm'
    }]
});