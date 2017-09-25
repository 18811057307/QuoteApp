Ext.define('tms.view.sysUser.List', {
    extend:'tms.base.Grid',
    requires: [ 'tms.view.company.CompanyCombo' ],
    alias:'widget.sysUserList',
    store:'SysUserStore',
    initComponent:function () {
    	var companyStore = Ext.data.StoreManager.lookup('CompanyStore');
    	if(0==companyStore.getCount()) companyStore.load();
    	this.columns = [
        	{width: 50,  header:'所属公司', sortable:true, dataIndex:'companyId', renderer: function(value) {
	   			 var record = companyStore.findRecord("id", value);
			     return record ? record.get("name") : '未分配';
	        }}
        	,{width: 50,  header:i18n.t('sysUser_login_name'), sortable:true, dataIndex:'loginName', filter:true}
    		,{width: 50,  header:i18n.t('sysUser_name'), sortable:true, dataIndex:'name', filter:true}
    		,{width: 50,  header:i18n.t('sysUser_email'), sortable:true, dataIndex:'email', filter:true}
    		,{width: 50,  header:i18n.t('sysUser_phone'), sortable:true, dataIndex:'phone', filter:true}
    		,{width: 50,  header:i18n.t('sysUser_mobile'), sortable:true, dataIndex:'mobile', filter:true}
    		,{width: 50,  header:i18n.t('sysUser_remarks'), sortable:true, dataIndex:'remarks', filter:true}
        ];

    	this.callParent();
        this.store.load();
        this.topToolbar.remove(3);
        this.topToolbar.add({
            xtype: 'button',
            text: '重置密码',
            action: 'refresh',
            iconCls: 'refresh'
        });
    }
});