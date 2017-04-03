Ext.define('tms.view.sysUser.List', {
    extend:'tms.base.Grid',
    alias:'widget.sysUserList',
    store:'SysUserStore',
    columns:[
		{width: 50,  header:i18n.t('sysUser_login_name'), sortable:true, dataIndex:'loginName', filter:true}
		,{width: 50,  header:i18n.t('sysUser_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('sysUser_email'), sortable:true, dataIndex:'email', filter:true}
		,{width: 50,  header:i18n.t('sysUser_phone'), sortable:true, dataIndex:'phone', filter:true}
		,{width: 50,  header:i18n.t('sysUser_mobile'), sortable:true, dataIndex:'mobile', filter:true}
		,{width: 50,  header:i18n.t('sysUser_remarks'), sortable:true, dataIndex:'remarks', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'SysUserStore',
        displayInfo: true
    }],
    initComponent:function () {
        this.callParent();
        this.store.load();
    }
});