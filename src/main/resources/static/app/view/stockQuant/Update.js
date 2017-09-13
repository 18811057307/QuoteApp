Ext.define('tms.view.stockQuant.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.stockQuant.Form'],
    alias:'widget.stockQuantUpdate',
    title: i18n.t('stockQuant'),
    items: [{
        xtype: 'stockQuantForm'
    }]
});