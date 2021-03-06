Ext.define('tms.controller.ResPartnerController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.ResPartnerStore'],
    models:['tms.model.ResPartner'],
    views:['tms.view.resPartner.List','tms.view.resPartner.Nav'],
    init:function (application) {
        this.control({
            'resPartnerNav':{
                itemclick:{
                    fn:this.onResPartnerItemClick,
                    scope:this
                }
            },
            'resPartnerList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'resPartnerList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'resPartnerList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'resPartnerList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'resPartnerList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'resPartnerUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'resPartnerUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
        this._getStore().load();
    },
    onResPartnerItemClick:function (me, record, item, index, e, eOpts) {
    	//选中分类，则显示该分类下的客户或合作伙伴
    	if(record.raw.partnerType) {
    		var partnerGrid = Ext.ComponentQuery.query('resPartnerList')[0];
    		partnerGrid.partnerType=record.raw.partnerType;
    		partnerGrid.store.clearFilter();
    		partnerGrid.store.remoteFilter = true;
            if (!partnerGrid.store.proxy.hasOwnProperty('filterParam')) {
            	partnerGrid.store.proxy.filterParam = 'partnerType';
            }
            partnerGrid.store.proxy.encodeFilters = function(filters) {
                return filters[0].value;
            }
    		partnerGrid.store.filter({
                property: 'partnerType',
                value: record.raw.partnerType
            });
    		
    	}
    },
    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('resPartnerList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('resPartnerList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.ResPartner');
        
        var partnerGrid = Ext.ComponentQuery.query('resPartnerList')[0];
		if(!partnerGrid.partnerType){
			Ext.Msg.alert(i18n.t('Failure!'), '请先在左侧选择要添加的是客户还是供应商.');
			return;
		}
		
		if("Customer" == partnerGrid.partnerType) {
			record.set("isCustomer","true");
		}
		if("Supplier" == partnerGrid.partnerType) {
			record.set("isSupplier","true");
		}
		
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('resPartnerList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.resPartner.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('resPartnerForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('ResPartnerStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('resPartnerList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
        	i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('resPartner') + ":" + record.getRecordName())
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
        var formPanel = Ext.ComponentQuery.query('resPartnerForm')[0];
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
        var win = Ext.ComponentQuery.query('resPartnerUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


