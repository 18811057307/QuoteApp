Ext.define('tms.view.categorySpec.List', {
    extend:'tms.base.Grid',
    alias:'widget.categorySpecList',
    store:'CategorySpecStore',
    columns:[
		{width: 50,  header:i18n.t('categorySpec_key'), sortable:true, dataIndex:'key', filter:true}
		,{width: 50,  header:i18n.t('categorySpec_title'), sortable:true, dataIndex:'title', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'CategorySpecStore',
        displayInfo: true
    }]
});