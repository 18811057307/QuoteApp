Ext.define('tms.store.CompanyStore', {
    extend: 'tms.base.Store',
    model: 'tms.model.Company',
    storeId: 'CompanyStore',
    sorters: [{
        property: 'sequence',
        direction: 'ASC'
    }]
});