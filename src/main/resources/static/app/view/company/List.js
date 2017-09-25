Ext.define('tms.view.company.List', {
    extend:'Ext.grid.Panel',
    requires: ['tms'],
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    features : [{ftype: 'filters',encode: true}],
    alias:'widget.companyList',
    columns:[
		{width: 50,  header:i18n.t('company_name'), sortable:true, dataIndex:'name', filter:true}
    ],
    initComponent: function() {
        this.store = Ext.create('tms.store.CompanyStore');
        this.store.load();
        this.dockedItems = new Array();
        if (this.showTopToolbar) {
            this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
                dock: 'top',
                enableOverflow: true,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        tooltip: i18n.t("button_create"),
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
                        action: 'refresh',
                        tooltip: i18n.t("button_refresh"),
                        iconCls: 'refresh'
                    }]
            });
            this.dockedItems.push(this.topToolbar);
        }

        this.callParent(arguments);
    }
});