Ext.define('tms.model.ProductCategory', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('productCategory'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'categoryName', type:'string'}
    		,{name:'categoryCode', type:'string'}
    		,{name:'categoryUrl', type:'string'}
    		,{name:'childCategoryName', type:'string'}
    		,{name:'childCategoryCode', type:'string'}
    		,{name:'childCategoryUrl', type:'string'}
    		,{name:'grandCategoryName', type:'string'}
    		,{name:'grandCategoryUrl', type:'string'}
    		,{name:'dateAdded', type:'date'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});