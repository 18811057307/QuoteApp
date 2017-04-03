Ext.define('tms.view.users.List', {
    extend:'tms.base.Grid',
    alias:'widget.usersList',
    store:'UsersStore',
    columns:[
		{width: 50,  header:i18n.t('users_username'), sortable:true, dataIndex:'username', filter:true}
		,{width: 50,  header:i18n.t('users_email'), sortable:true, dataIndex:'email', filter:true}
		,{width: 50,  header:i18n.t('users_superuser'), sortable:true, dataIndex:'superuser', renderer: function(value){
            if(1 == value) {
                return '<font color="green">是</font>'
            }
            if(0 == value) {
                return '<font color="red">否</font>'
            }

        }}
		,{width: 50,  header:i18n.t('users_status'), sortable:true, dataIndex:'status', renderer: function(value){
            if(1 == value) {
                return '<font color="green">正常</font>'
            }
            if(0 == value) {
                return '<font color="red">未激活</font>'
            }

        }}
		,{width: 50,  header:i18n.t('users_mobile'), sortable:true, dataIndex:'mobile', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'UsersStore',
        displayInfo: true
    }],
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'company_id',comparison:'eq',value:this.companyRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setCompanyRecord : function(record) {
        this.companyRecord = record;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    },
    initComponent:function () {
        this.callParent();
        this.topToolbar.add({
            xtype: 'button',
            text: i18n.t("NoCompany"),
            action: 'nocompany',
            iconCls: 'upload'
        });
    }
});