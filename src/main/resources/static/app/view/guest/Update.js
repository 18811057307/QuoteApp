Ext.define('tms.view.guest.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.guest.Form'],
    alias:'widget.guestUpdate',
    title: i18n.t('guest'),
    items: [{
        xtype: 'guestForm'
    }]
});