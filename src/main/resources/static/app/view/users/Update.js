Ext.define('tms.view.users.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.users.Form'],
    alias:'widget.usersUpdate',
    title: i18n.t('users'),
    items: [{
        xtype: 'usersForm'
    }]
});