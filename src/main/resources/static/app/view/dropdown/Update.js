Ext.define('tms.view.dropdown.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.dropdown.Form'],
    alias:'widget.dropdownUpdate',
    title: i18n.t('dropdown'),
    items: [{
        xtype: 'dropdownForm'
    }]
});