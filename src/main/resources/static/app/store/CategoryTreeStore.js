Ext.define('tms.store.CategoryTreeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'tms.model.Category',
    storeId: 'CategoryTreeStore',
    nodeParam : 'parentCode',
    proxy: {
        type: 'ajax',
        url: tms.getContextPath() + 'api/categories/categoryTree',
		reader : {
			root : 'data',
			type : 'json'
		}
    }
});