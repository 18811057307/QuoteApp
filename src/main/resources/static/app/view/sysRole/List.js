Ext.define('tms.view.sysRole.List', {
    extend:'tms.base.Grid',
    alias:'widget.sysRoleList',
    store:'SysRoleStore',
    columns:[
		{width: 50,  header:i18n.t('sysRole_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('sysRole_remarks'), sortable:true, dataIndex:'remarks', filter:true}
    ],
    initComponent:function () {
        this.callParent();
        this.store.load();
    }
});