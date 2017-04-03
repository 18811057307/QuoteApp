Ext.define('tms.view.sysRole.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.sysRole.Form'],
    alias:'widget.sysRoleUpdate',
    title: i18n.t('sysRole'),
    items: [{
        xtype: 'sysRoleForm'
    }]
});