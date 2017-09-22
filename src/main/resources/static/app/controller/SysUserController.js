Ext.define('tms.controller.SysUserController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.SysUserStore'],
    models:['tms.model.SysUser'],
    views:['tms.view.sysUser.List','tms.view.sysRole.CheckTree'],
    init:function (application) {
        this.control({
            'sysUserList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'sysRoleCheckTree' : {
            	checkchange:{
                    fn:this.onRoleCheckChange,
                    scope:this
            	}
            },
            'sysUserList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'sysUserList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'sysUserList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'sysUserList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'companyList':{
                selectionchange:{
                    fn:this.onCompanySelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onCompanyItemDblClick,
                    scope:this
                }
            },
            'companyList button[action=create]':{
                click:{
                    fn:this.onCompanyAdd,
                    scope:this
                }
            },
            'companyList button[action=update]':{
                click:{
                    fn:this.onCompanyEdit,
                    scope:this
                }
            },
            'companyList button[action=delete]':{
                click:{
                    fn:this.onCompanyDelete,
                    scope:this
                }
            },
            'companyList button[action=refresh]':{
                click:{
                    fn:this.onCompanyRefresh,
                    scope:this
                }
            },
            'companyUpdate button[action=submitForm]':{
                click:{
                    fn:this.onCompanySubmit,
                    scope:this
                }
            },
            'companyUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCompanyCancel,
                    scope:this
                }
            },
            'sysUserUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'sysUserUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('sysUserList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('sysUserList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
        
        var userList = Ext.ComponentQuery.query('sysUserList')[0];
        var userRec = userList.getSelectionModel().getSelection()[0];
        if(null != userRec) {
            var userRoleCheckTree = Ext.ComponentQuery.query('sysRoleCheckTree')[0];
            
            userRoleCheckTree.setTitle("为  [" + userRec.get("name") + "] 分配角色");
            
            var roleStore = userRoleCheckTree.store;

            roleStore.load({
                params: {"userId": userRec.get("id")},
                callback: function(records, operation, success) {
                    if(success) {
                    }
                },
                scope: this
            });
        }
        
    },
    onCompanySelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('companyList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('companyList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onRoleCheckChange:function( node, checked, eOpts) {
        var userList = Ext.ComponentQuery.query('sysUserList')[0];
        var userRec = userList.getSelectionModel().getSelection()[0];
        if(null != userRec) {
            Ext.Ajax.request({
                url: tms.getContextPath() + 'api/sysUser/assign',
                params: {
                    userId: userRec.get("id"),
                    roleId: node.data.id,
                    checked: checked
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    tms.notify(data.message + ":" + node.data.text, userRec.get("name"));	
                },
                scope:this
            });
        }
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },
    onCompanyItemDblClick:function (me, e, eOpts) {
        this.onCompanyEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.SysUser');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('sysUserList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.sysUser.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('sysUserForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('SysUserStore');
    },
    _getCompanyStore:function () {
        return  Ext.data.StoreManager.lookup('CompanyStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('sysUserList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
        	i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('sysUser') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
    	var grid = Ext.ComponentQuery.query('sysUserList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
        	i18n.t('small_hint')
            , Ext.String.format('确认重置选中的{0}的密码吗？', i18n.t('sysUser') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    Ext.Ajax.request({
                        url: tms.getContextPath() + 'api/sysUser/resetPassword',
                        params: {
                            loginName: record.get("loginName")
                        },
                        success: function(response) {
                            var data = Ext.JSON.decode(response.responseText);
                            tms.notify(data.message, record.getRecordName());	
                        },
                        scope:this
                    });
                }
            }, this);
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('sysUserForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
                },
                failure:function (form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert(i18n.t('Failure!'), i18n.t('Check all your fields.'));
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert(i18n.t('Failure!'), i18n.t('AJAX communication problem.'));
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert(i18n.t('Failure!'), action.result.msg);
                    }
                },
                scope:this
            });
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('sysUserUpdate')[0];
        
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    },
    _openCompanyUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.company.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('companyForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    onCompanyAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Company');
        this._openCompanyUpdateWin(record);
    },
    onCompanyEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('companyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openCompanyUpdateWin(record);
    },
    onCompanyDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('companyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint'),
            Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('company') + ":" + record.getRecordName()),
            function (btn) {
                if (btn == "yes") {
                	this._getCompanyStore().remove(record);
                	this._getCompanyStore().sync();
                }
            }, this);

    },
    onCompanyRefresh:function (me, e, eOpts) {
    	Ext.data.StoreManager.lookup('CompanyStore').load();
    },
    onCompanySubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('companyForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
            	this._getCompanyStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this.onCompanyCancel();
                return;
            }
            this._getCompanyStore().sync({
                success:function () {
                	this.onCompanyCancel();
                },
                failure:function (form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert(i18n.t('Failure!'), i18n.t('Check all your fields.'));
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert(i18n.t('Failure!'), i18n.t('AJAX communication problem.'));
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert(i18n.t('Failure!'), action.result.msg);
                    }
                },
                scope:this
            });
        }
    },
    onCompanyCancel:function (me, e, eOpts) {
    	 var win = Ext.ComponentQuery.query('companyUpdate')[0];
    	 win.close();
    }
});


