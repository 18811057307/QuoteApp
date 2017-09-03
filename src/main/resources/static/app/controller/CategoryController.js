Ext.define('tms.controller.CategoryController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.CategoryStore'],
    models:['tms.model.Category'],
    views:['tms.view.category.List','tms.view.series.List','tms.view.seriesSpec.List','tms.view.categorySpec.List'],
    init:function (application) {
        this.control({
            'categoryList':{
                itemclick:{
                    fn:this.onItemClick,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            
            'seriesList':{
                itemclick:{
                    fn:this.onSeriesClick,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onSeriesDblClick,
                    scope:this
                }
            },          
            'seriesList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'seriesList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'seriesList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'seriesList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'seriesUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'seriesUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
        
        this._getStore().load();
    },

    onItemClick:function (me, record, item, index, e, eOpts) {
    	//选中分类，则显示该分类下的产品犀利
    	if(record.data.leaf) {
    		
    		/*
    		var categorySpecGrid = Ext.ComponentQuery.query('categorySpecList')[0];
    		categorySpecGrid.store.clearFilter();
    		categorySpecGrid.store.load({params:{
    			categoryCode: record.data.id
    	    }});
    	    */
    		
    		var seriesGrid = Ext.ComponentQuery.query('seriesList')[0];
    		//seriesGrid.store.clearFilter();
    		seriesGrid.store.load({params:{
    			categoryCode: record.data.id
    	    }});
    		
    	}
    },
    onItemDblClick:function (me, record, item, index, e, eOpts) {
    	//双击分类，弹出分类的修改窗口以及分类的规格
    	if(record.data.leaf) {
    		
    	}
    },
    
    onSeriesClick:function (me, record, item, index, e, eOpts) {
    	if(record) {
            var editButton = Ext.ComponentQuery.query('seriesList button[action=update]')[0];
            var deleteButton = Ext.ComponentQuery.query('seriesList button[action=delete]')[0];
            editButton.enable();
            deleteButton.enable();
    		/*
    		var seriesSpecGrid = Ext.ComponentQuery.query('seriesSpecList')[0];
    		seriesSpecGrid.store.clearFilter();
    		seriesSpecGrid.store.load({params:{
    			seriesCode: record.data.id
    	    }});
    	    */
    	}
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Series');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('seriesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.series.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('seriesForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('SeriesStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('seriesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
        	i18n.t("small_hint")
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('series') + ":" + record.getRecordName())
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
        var formPanel = Ext.ComponentQuery.query('seriesForm')[0];
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
        var win = Ext.ComponentQuery.query('seriesUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
    
});


