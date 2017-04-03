Ext.define('tms.store.DropdownOptionStore', {
    extend: 'Ext.data.Store',
    model: 'tms.model.DropdownOption',
    storeId: 'DropdownOptionStore',
    autoLoad: false,
    sorters: [{
        property: 'sequence',
        direction: 'ASC'
    }]
});