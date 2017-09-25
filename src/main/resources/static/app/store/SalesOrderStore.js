Ext.define('tms.store.SalesOrderStore', {
    extend: 'tms.base.Store',
    model: 'tms.model.SalesOrder',
    storeId: 'SalesOrderStore',
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }]
});