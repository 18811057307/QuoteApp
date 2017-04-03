Ext.define('tms.view.dropdown.DropdownGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.dropdownGrid',
    isFormField:true,
    selModel:{mode:'SINGLE'},
    columnLines:true,
    border:true,
    showTopToolbar:true,
    columns: [{
        header: i18n.t('Sequence No'),
        dataIndex: 'sequence',
        flex:1,
        editor: {
            xtype: 'numberfield'
        }
    }, {
        header: i18n.t('dropdown_display'),
        dataIndex: 'display',
        flex:2,
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: i18n.t('dropdown_value'),
        dataIndex: 'value',
        flex:2,
        editor: {
            xtype: 'textfield'
        }
    }],
    initComponent: function() {
        var rowEdit = Ext.create("Ext.grid.plugin.RowEditing",{
            clicksToMoveEditor: 1,
            autoCancel: false
        });
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
                        action: 'delete',
                        text: i18n.t("button_delete"),
                        iconCls: 'remove'
                    }]
            });
            this.dockedItems.push(this.topToolbar);
        }
        this.plugins = new Array();
        this.plugins.push(rowEdit);
        this.store = Ext.create('tms.store.DropdownOptionStore');
        this.callParent(arguments);
    },
    setValue: function(val) {
        if(val && val != '') {
            this.store.loadRawData(Ext.JSON.decode(val));
        }
    },
    getValue: function() {
        var options = new Array();
        this.store.each(function(rec){
            options.push(rec.data);
        });
        return Ext.JSON.encode(options);
    },
    getName : function() {
        return this.name;
    },
    isValid : function() {
        return true;
    },
    validate: function() {
        return true;
    }
});