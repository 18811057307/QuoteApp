Ext.define('tms.view.roomClasses.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.roomClasses.Form'],
    alias:'widget.roomClassesUpdate',
    title: i18n.t('roomClasses'),
    items: [{
        xtype: 'roomClassesForm'
    }]
});