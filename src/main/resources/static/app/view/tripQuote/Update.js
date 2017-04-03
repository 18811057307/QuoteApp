Ext.define('tms.view.tripQuote.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.tripQuote.Form'],
    alias:'widget.tripQuoteUpdate',
    title: i18n.t('tripQuote'),
    items: [{
        xtype: 'tripQuoteForm'
    }]
});