Ext.define('tms.view.productSupplierinfo.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.productSupplierinfo.Form'],
    alias:'widget.productSupplierinfoUpdate',
    title: i18n.t('productSupplierinfo'),
    items: [{
        xtype: 'productSupplierinfoForm'
    }]
});