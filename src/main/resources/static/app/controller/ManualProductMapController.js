Ext.define('tms.controller.ManualProductMapController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.ManualProductMapStore'],
    models:['tms.model.ManualProductMap'],
    views:['tms.view.manualProductMap.List','Ext.ux.form.field.SearchField','tms.view.manualProductMap.Helper','tms.view.manualProductMap.PriceUpdater'],  
    requires:['Ext.ux.view.IconWindow',
        'Ext.ux.view.IconBrowser',
        'Ext.ux.view.InfoPanel',
        'Ext.ux.upload.Button',
        'Ext.ux.upload.plugin.Window',
        'Ext.ux.upload.Basic',
        'Ext.ux.form.field.ImageField',
        'Ext.ux.form.field.MultiDate'],
    init:function (application) {
        this.control({
            'manualProductMapList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'manualProductMapList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'manualProductMapList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'manualProductMapList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'manualProductMapList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'manualProductMapUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'manualProductMapUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            },
            'manualProductMapPriceUpdater button[action=batchUpdatePrice]':{
                click:{
                    fn:this.onPriceUpdate,
                    scope:this
                }
            }
        });
        this._getStore().load();
        

    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('manualProductMapList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('manualProductMapList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.ManualProductMap');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('manualProductMapList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.manualProductMap.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('manualProductMapForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('ManualProductMapStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('manualProductMapList')[0];
        var records = grid.getSelectionModel().getSelection();
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), records[0].getRecordName() + "等共 " + records.length + " 条数据")
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(records);
                    this._getStore().sync();                    
                }
            }, this);

    },
    onPriceUpdate : function (me, e, eOpts) {
    	var priceUpdatermPanel = Ext.ComponentQuery.query('manualProductMapPriceUpdater')[0];
    	var priceForm = priceUpdatermPanel.getForm();
    	if (priceForm.isValid()) {
            var grid = Ext.ComponentQuery.query('manualProductMapList')[0];
            var records = grid.getSelectionModel().getSelection();
            Ext.MessageBox.confirm(
                i18n.t('small_hint')
                , Ext.String.format('确认对选中的{0}进行价格调整吗？', records[0].getRecordName() + "等共 " + records.length + " 条数据")
                , function (btn) {
                    if (btn == "yes") {
                    	var column = priceForm.findField('column').getValue();
                    	var oper = priceForm.findField('oper').getValue();
                    	var amount = priceForm.findField('amount').getValue();
                    	
                    	Ext.each(records,function(record){
                    		var curVal = record.get(column);
                    		var newVal = Ext.util.Format.number(eval(curVal+oper+amount), '0.00');
                    		record.set(column,newVal);
                    	});
                    	
                    	this._getStore().sync();
                    }
                }, this);
    	}


    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('manualProductMapForm')[0];
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
        var win = Ext.ComponentQuery.query('manualProductMapUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


