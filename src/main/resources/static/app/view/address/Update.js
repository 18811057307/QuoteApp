Ext.define('tms.view.address.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.address.Form'],
    alias:'widget.addressUpdate',
    title: i18n.t('address'),
    items: [{
        xtype: 'addressForm'
    }]
});