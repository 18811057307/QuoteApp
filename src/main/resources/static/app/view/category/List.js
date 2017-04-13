Ext.define('tms.view.category.List', {
	extend: 'Ext.tree.Panel', 
    rootVisible: false,
    useArrows: true,
    alias:'widget.categoryList',
    store: 'CategoryStore'
});