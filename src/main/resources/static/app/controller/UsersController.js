Ext.define('tms.controller.UsersController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.UsersStore'],
    models:['tms.model.Users'],
    views:['tms.view.users.List','tms.view.company.List','tms.view.profiles.Form'],
    requires:['tms.view.company.CompanyCombo','tms.view.dropdown.DropdownCombo'],
    refs:[
        {
            ref:'grid',
            selector:'usersList'
        }
    ],
    init:function (application) {
        this.control({
            'usersList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'usersList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'usersList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'usersList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'usersList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'usersList button[action=nocompany]':{
                click:{
                    fn:this.onNoCompany,
                    scope:this
                }
            },
            'usersUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'usersUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            },
            'profilesForm button[action=submitForm]':{
                click:{
                    fn:this.submitProfile,
                    scope:this
                }
            },
            'profilesForm button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('usersList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('usersList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();

        var userList = Ext.ComponentQuery.query('usersList')[0];
        var userRec = userList.getSelectionModel().getSelection()[0];
        if(null != userRec) {
            var profilesForm = Ext.ComponentQuery.query('profilesForm')[0];
            var profileStore = Ext.create('tms.store.ProfilesStore');
            var filters = new Array();
            filters.push({type:'numeric', field: 'user_id',comparison:'eq',value:userRec.get("id")});
            var sort = new Array();
            sort.push({"property":"user_id","direction":"DESC"});
            profileStore.load({
                params: {"start":0, "limit":50, "filter":Ext.JSON.encode(filters),"sort":Ext.JSON.encode(sort)},
                callback: function(records, operation, success) {
                    if(success) {
                        //profilesForm._curRecord = records[0];
                        profilesForm.loadRecord(records[0]);
                    }
                },
                scope: this
            });
        }
    },
    submitProfile: function (me, e, eOpts) {
        var profilesForm = Ext.ComponentQuery.query('profilesForm')[0];
        profilesForm.updateRecord();
        var profileStore = Ext.data.StoreManager.lookup('ProfilesStore');
        profileStore.sync({
            success:function () {
                tms.notify(i18n.t("Update UserProfile Success"),i18n.t("profiles"));
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

    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Users');
        if(this.getGrid().companyRecord) {
            record.set('company_id', this.getGrid().companyRecord.get('id'));
        }
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('usersList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    onNoCompany:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('usersList')[0];
        var noCompanyRec = Ext.create('tms.model.Company');
        noCompanyRec.set('id',0);
        grid.setCompanyRecord(noCompanyRec);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.users.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('usersForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('UsersStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('usersList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('users') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('usersForm')[0];
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
        var win = Ext.ComponentQuery.query('usersUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


