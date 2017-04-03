Ext.define('tms.controller.PropertyController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.PropertyStore'],
    models:['tms.model.Property'],
    views:['tms.view.property.List',
        'tms.view.roomClasses.List',
        'tms.view.roomRates.List',
        'Ext.ux.view.IconWindow',
        'Ext.ux.view.IconBrowser',
        'Ext.ux.view.InfoPanel',
        'Ext.ux.upload.Button',
        'Ext.ux.upload.plugin.Window',
        'Ext.ux.upload.Basic',
        'tms.view.attachment.Form',
        'Ext.ux.form.field.ImageField',
        'tms.view.dropdown.DropdownCombo'],
    init:function (application) {
        this.control({
            'propertyList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'propertyList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'propertyList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'propertyList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'propertyList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'propertyList button[action=upload]':{
                click:{
                    fn:this.onUpload,
                    scope:this
                }
            },
            'propertyUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'propertyUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('propertyList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('propertyList button[action=delete]')[0];
        var uploadButton = Ext.ComponentQuery.query('propertyList button[action=upload]')[0];
        editButton.enable();
        deleteButton.enable();
        uploadButton.enable();
        var grid = Ext.ComponentQuery.query('propertyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];

        var roomClassesGrid =  Ext.ComponentQuery.query('roomClassesList')[0];

        roomClassesGrid.setPropertyRecord(record);

    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Property');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('propertyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    onUpload: function(me, e, eOpts){
        var grid = Ext.ComponentQuery.query('propertyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        var uploadWin = Ext.create('Ext.ux.view.IconWindow',{
            title: Ext.String.format(i18n.t('upload {0} picture'),i18n.t('property')),
            url: tms.getContextPath() + '/index.php?r=property/upload&id=' + record.get("id"),
            filters: [
                {type:'numeric', field: 'property_id',comparison:'eq', value :  record.get("id")},
                {type:'string', field: 'type',  value :  'IMG'}
            ]
        });
        uploadWin.width = Ext.getBody().getViewSize().width * 0.5;
        uploadWin.height = Ext.getBody().getViewSize().height * 0.5;
        uploadWin.show();
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.property.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('propertyForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('PropertyStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('propertyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('property') + ":" + record.getRecordName())
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
        var formPanel = Ext.ComponentQuery.query('propertyForm')[0];
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
        var win = Ext.ComponentQuery.query('propertyUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


