Ext.define('tms.view.attachment.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.attachment.Form'],
    alias:'widget.attachmentUpdate',
    title: i18n.t('attachment'),
    items: [{
        xtype: 'attachmentForm'
    }]
});