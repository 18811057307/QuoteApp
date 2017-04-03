Ext.define('tms.controller.TripScheduleController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.TripScheduleStore'],
    models:['tms.model.TripSchedule'],
    views:['tms.view.tripSchedule.List'],
    refs:[
        {
            ref:'grid',
            selector:'tripScheduleList'
        }
    ],
    init:function (application) {
        this.control({
            'tripScheduleList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'tripScheduleList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'tripScheduleList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'tripScheduleList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'tripScheduleList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'tripScheduleUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'tripScheduleUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('tripScheduleList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripScheduleList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        if(this.getGrid().tripRecord) {
            var record = Ext.create('tms.model.TripSchedule');
            record.set('trip_id', this.getGrid().tripRecord.get('id'));
            this._openUpdateWin(record);
        } else {
            tms.notify(i18n.t("tripSelectForQuoteOrSchedule"),i18n.t("tripSchedule_arrangement"));
        }
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripScheduleList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.tripSchedule.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripScheduleForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('TripScheduleStore');
        //return this.getGrid().store;
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripScheduleList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('tripSchedule') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        if(this.getGrid().tripRecord) {
            this._getStore().load();
        } else {
            tms.notify(i18n.t("tripSelectForQuoteOrSchedule"),i18n.t("tripSchedule_arrangement"));
        }
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('tripScheduleForm')[0];
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
        var win = Ext.ComponentQuery.query('tripScheduleUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


