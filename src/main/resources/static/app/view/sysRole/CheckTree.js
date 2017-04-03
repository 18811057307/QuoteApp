Ext.define('tms.view.sysRole.CheckTree', {
	extend: 'Ext.tree.Panel',	   
    requires: ['Ext.data.TreeStore'],
    alias:'widget.sysRoleCheckTree',    
    rootVisible: false,
    useArrows: true,
    title: '分配角色',    
    initComponent: function(){
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
                proxy: {
                    type: 'ajax',
                    url: tms.getContextPath() + 'api/sysRole/userRoles'
                }
            })
        });
        this.callParent();
    }
});