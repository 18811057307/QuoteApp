Ext.define('tms.view.dropdown.DropdownCombo', {
    extend : 'Ext.ux.form.field.BoxSelect',
    alias:'widget.dropdownCombo',
    multiSelect: false,
    displayField: 'display',
    valueField: 'value',
    queryMode: 'local',
    forceSelection:false,
    queryCaching:true,
    initComponent: function() {
        this.store = new tms.store.DropdownOptionStore();
        this.store.load({params:{code:this.code},scope:this});
        this.callParent(arguments);

    }
});