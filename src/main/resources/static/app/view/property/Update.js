Ext.define('tms.view.property.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.property.Form'],
    alias:'widget.propertyUpdate',
    title: i18n.t('property'),
    items: [{
        xtype: 'propertyForm'
    }]
});