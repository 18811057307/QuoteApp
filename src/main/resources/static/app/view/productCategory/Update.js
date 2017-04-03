Ext.define('tms.view.productCategory.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.productCategory.Form'],
    alias:'widget.productCategoryUpdate',
    title: i18n.t('productCategory'),
    items: [{
        xtype: 'productCategoryForm'
    }]
});