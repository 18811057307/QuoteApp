Ext.define('tms.controller.DropdownController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.DropdownStore'],
    models:['tms.model.Dropdown'],
    views:['tms.view.dropdown.List','tms.view.dropdown.DropdownGrid'],
    init:function (application) {
        this.control({
            'dropdownList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },

            'dropdownList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'dropdownList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'dropdownList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'dropdownList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'dropdownUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'dropdownUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            },
            'dropdownGrid':{
                selectionchange:{
                    fn:this.ondropdownGridSelectionChange,
                    scope:this
                }
            },
            'dropdownGrid button[action=create]':{
                click:{
                    fn:this.onAddOption,
                    scope:this
                }
            },
            'dropdownGrid button[action=delete]':{
                click:{
                    fn:this.onDeleteOption,
                    scope:this
                }
            }

        });
        this._getStore().on("load",function(store, records, successful, eOpts) {
             records.forEach(function(ele,index,array){
                var options = Ext.JSON.decode(ele.get("options"));
                var keys =  Object.keys(options);
                keys.forEach(function(key){

                });
             });
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('dropdownList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('dropdownList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    ondropdownGridSelectionChange:function (me, e, eOpts) {
        var deleteButton = Ext.ComponentQuery.query('dropdownGrid button[action=delete]')[0];
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Dropdown');
        this._openUpdateWin(record);
    },

    onAddOption:function(me, e, eOpts) {
        var record = Ext.create('tms.model.DropdownOption');
        var dropdownGrid = Ext.ComponentQuery.query('dropdownGrid')[0];
        dropdownGrid.plugins[0].cancelEdit();
        dropdownGrid.store.insert(0, record);
        dropdownGrid.plugins[0].startEdit(0, 0);
    },

    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('dropdownList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.dropdown.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('dropdownForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('DropdownStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('dropdownList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('dropdown') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onDeleteOption:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('dropdownGrid')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('dropdown') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    grid.store.remove(record);
                    grid.store.sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('dropdownForm')[0];
        //formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isDirty()) {
            this._curRecord.beginEdit();
            this._curRecord.set("id",formPanel.getForm().findField('id').getValue());
            this._curRecord.set("name",formPanel.getForm().findField('name').getValue());
            this._curRecord.set("code",formPanel.getForm().findField('code').getValue());
            this._curRecord.set("options",formPanel.getForm().findField('options').getValue());
            this._curRecord.endEdit();
        }
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
        var win = Ext.ComponentQuery.query('dropdownUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


