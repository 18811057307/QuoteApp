Ext.define('tms.store.SysUserStore', {
    extend: 'tms.base.Store',
    model: 'tms.model.SysUser',
    storeId: 'SysUserStore',
    sorters: [{
        property: 'sequence',
        direction: 'ASC'
    }]
});