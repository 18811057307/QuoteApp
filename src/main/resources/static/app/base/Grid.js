Ext.define('tms.base.Grid', {
    extend:'Ext.grid.Panel',
    requires: ['tms'],
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    features : [{ftype: 'filters',encode: true}],
    initComponent: function() {
        this.dockedItems = new Array();
        if (this.showTopToolbar) {
            this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
                dock: 'top',
                enableOverflow: true,
                items: [
                    {
                        xtype: 'button',
                        text: i18n.t("button_create"),
                        action: 'create',
                        iconCls: 'add'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'update',
                        text: i18n.t("button_update"),
                        iconCls: 'option'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'delete',
                        text: i18n.t("button_delete"),
                        iconCls: 'remove'
                    },
                    {
                        xtype: 'button',
                        text: i18n.t("button_refresh"),
                        action: 'refresh',
                        iconCls: 'refresh'
                    }]
            });
            this.dockedItems.push(this.topToolbar);
        }

        if(this.showBottomToolbar) {
            this.bottomToolbar = Ext.create("Ext.toolbar.Paging", {
                store: this.store,
                enableOverflow: true,
                dock: 'bottom',
                displayInfo: true
            });
            this.dockedItems.push(this.bottomToolbar);
        }

        this.callParent(arguments);
    }
});