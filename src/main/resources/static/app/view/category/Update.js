Ext.define('tms.view.category.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.category.Form'],
    alias:'widget.categoryUpdate',
    title: i18n.t('category'),
    items: [{
        xtype: 'categoryForm'
    }]
});