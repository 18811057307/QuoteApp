Ext.define('tms.view.profiles.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.profiles.Form'],
    alias:'widget.profilesUpdate',
    title: i18n.t('profiles'),
    items: [{
        xtype: 'profilesForm'
    }]
});