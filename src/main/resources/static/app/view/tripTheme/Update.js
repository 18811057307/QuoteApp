Ext.define('tms.view.tripTheme.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.tripTheme.Form'],
    alias:'widget.tripThemeUpdate',
    title: i18n.t('tripTheme'),
    items: [{
        xtype: 'tripThemeForm'
    }]
});