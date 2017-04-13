Ext.define('tms.view.categorySpec.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.categorySpec.Form'],
    alias:'widget.categorySpecUpdate',
    title: i18n.t('categorySpec'),
    items: [{
        xtype: 'categorySpecForm'
    }]
});