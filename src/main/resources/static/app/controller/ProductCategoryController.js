Ext.define('tms.controller.ProductCategoryController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.ProductCategoryStore'],
    models:['tms.model.ProductCategory'],
    views:['tms.view.productCategory.List'],
    init:function (application) {
        
    }
});


