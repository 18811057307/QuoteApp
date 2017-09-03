Ext.define('tms.view.mailMessage.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.mailMessage.Form'],
    alias:'widget.mailMessageUpdate',
    title: i18n.t('mailMessage'),
    items: [{
        xtype: 'mailMessageForm'
    }]
});