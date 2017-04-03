Ext.define('tms.view.sysUser.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.sysUser.Form'],
    alias:'widget.sysUserUpdate',
    title: i18n.t('sysUser'),
    items: [{
        xtype: 'sysUserForm'
    }]
});