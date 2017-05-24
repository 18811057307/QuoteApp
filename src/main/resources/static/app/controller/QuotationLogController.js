Ext.define('tms.controller.QuotationLogController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.QuotationLogStore'],
    models:['tms.model.QuotationLog'],
    views:['tms.view.quotationLog.List'],
    init:function (application) {
        this.control({
            'quotationLogList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'quotationLogList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'quotationLogList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'quotationLogList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'quotationLogList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'quotationLogUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'quotationLogUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('quotationLogList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('quotationLogList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.QuotationLog');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('quotationLogList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.quotationLog.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('quotationLogForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('QuotationLogStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('quotationLogList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('quotationLog') + ":" + record.getRecordName())
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
        var formPanel = Ext.ComponentQuery.query('quotationLogForm')[0];
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
        var win = Ext.ComponentQuery.query('quotationLogUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


