Ext.define('tms.view.quotationLog.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.quotationLog.Form'],
    alias:'widget.quotationLogUpdate',
    title: i18n.t('quotationLog'),
    items: [{
        xtype: 'quotationLogForm'
    }]
});