Ext.define('tms.view.property.List', {
    extend:'Ext.grid.Panel',
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    features : [{ftype: 'filters',encode: true}],
    alias:'widget.propertyList',
    store:'PropertyStore',
    columns:[
		{width: 50,  header:i18n.t('property_name'), sortable:true, dataIndex:'name', filter:true}
    ],
    initComponent: function() {
        this.dockedItems = new Array();
        if (this.showTopToolbar) {
            this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
                dock: 'top',
                enableOverflow: true,
                items: [
                    {
                        xtype: 'button',
                        tooltip: i18n.t("button_create"),
                        action: 'create',
                        iconCls: 'add'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'update',
                        tooltip: i18n.t("button_update"),
                        iconCls: 'option'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'delete',
                        tooltip: i18n.t("button_delete"),
                        iconCls: 'remove'
                    },
                    {
                        xtype: 'button',
                        tooltip: i18n.t("button_refresh"),
                        action: 'refresh',
                        iconCls: 'refresh'
                    },
                    {
                        xtype: 'button',
                        action: 'upload',
                        iconCls: 'upload',
                        disabled: true
                    }]
            });
            this.dockedItems.push(this.topToolbar);
        }
        this.callParent(arguments);
    }
});