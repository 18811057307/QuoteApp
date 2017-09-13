Ext.define('tms.view.resPartner.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.resPartner.Form'],
    alias:'widget.resPartnerUpdate',
    title: i18n.t('resPartner'),
    items: [{
        xtype: 'resPartnerForm'
    }]
});