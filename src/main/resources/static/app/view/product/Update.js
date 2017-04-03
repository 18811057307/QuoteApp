Ext.define('tms.view.product.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.product.Form'],
    alias:'widget.productUpdate',
    title: i18n.t('product'),
    items: [{
        xtype: 'productForm'
    }]
});