Ext.define('tms.view.dropdown.List', {
    extend:'tms.base.Grid',
    alias:'widget.dropdownList',
    store:'DropdownStore',
    columns:[
		{width: 50,  header:i18n.t('dropdown_name'), sortable:true, dataIndex:'name', filter:true}
        ,{width: 50,  header:i18n.t('dropdown_code'), sortable:true, dataIndex:'code', filter:true}
		,{width: 50,  header:i18n.t('dropdown_options'), sortable:true, dataIndex:'options',renderer: function(value){
            var objs = Ext.JSON.decode(value), retStr = "";
            Ext.each(objs, function(item){
                retStr += item["display"] + ", ";
            });
            return retStr;
        }}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'DropdownStore',
        displayInfo: true
    }]
});