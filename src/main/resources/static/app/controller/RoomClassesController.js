Ext.define('tms.controller.RoomClassesController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.RoomClassesStore'],
    models:['tms.model.RoomClasses'],
    views:['tms.view.roomClasses.List'],
    refs:[
        {
            ref:'grid',
            selector:'roomClassesList'
        }
    ],
    init:function (application) {
        this.control({
            'roomClassesList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'roomClassesList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'roomClassesList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'roomClassesList button[action=upload]':{
                click:{
                    fn:this.onUpload,
                    scope:this
                }
            },
            'roomClassesList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'roomClassesList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'roomClassesUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'roomClassesUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('roomClassesList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('roomClassesList button[action=delete]')[0];
        var uploadButton = Ext.ComponentQuery.query('roomClassesList button[action=upload]')[0];
        editButton.enable();
        deleteButton.enable();
        uploadButton.enable();

        var record = this.getGrid().getSelectionModel().getSelection()[0];
        var roomRatesGrid =  Ext.ComponentQuery.query('roomRatesList')[0];
        roomRatesGrid.setRoomClassesRecord(record);

    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        if(!this.getGrid().propertyRecord) {
            tms.notify(i18n.t("propertySelectForRoomClasses"),i18n.t("property_manage"));
            return;
        }
        var record = Ext.create('tms.model.RoomClasses');
        record.set('property_id', this.getGrid().propertyRecord.get('id'));
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('roomClassesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    onUpload: function(me, e, eOpts){
        var grid = Ext.ComponentQuery.query('roomClassesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        var uploadWin = Ext.create('Ext.ux.view.IconWindow',{
            title: Ext.String.format(i18n.t('upload {0} picture'),i18n.t('roomClasses')),
            url: tms.getContextPath() + '/index.php?r=roomClasses/upload&id=' + record.get("id") + '&property_id=' + record.get("property_id"),
            filters: [
                {type:'numeric', field: 'property_id',comparison:'eq', value :  record.get("property_id")},
                {type:'numeric', field: 'room_classes_id',comparison:'eq', value :  record.get("id")},
                {type:'string', field: 'type',  value :  'IMG'}
            ]
        });
        uploadWin.width = Ext.getBody().getViewSize().width * 0.5;
        uploadWin.height = Ext.getBody().getViewSize().height * 0.5;
        uploadWin.show();
    },

    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.roomClasses.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('roomClassesForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('RoomClassesStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('roomClassesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('roomClasses') + ":" + record.getRecordName())
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
        var formPanel = Ext.ComponentQuery.query('roomClassesForm')[0];
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
        var win = Ext.ComponentQuery.query('roomClassesUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


