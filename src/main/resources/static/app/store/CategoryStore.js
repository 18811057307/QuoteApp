Ext.define('tms.store.CategoryStore', {
    extend: 'Ext.data.TreeStore',
    storeId: 'CategoryStore',
    nodeParam : 'parentCode',
    proxy: {
        type: 'ajax',
        url: tms.getContextPath() + 'api/categories/page',
		reader : {
			root : 'data',
			type : 'json'
		},
		folderSort : true,
		pageSize : -1
    }
});