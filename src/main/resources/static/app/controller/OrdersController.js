Ext.define('tms.controller.OrdersController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.OrdersStore'],
    models:['tms.model.Orders'],
    views:['tms.view.orders.List','tms.view.orders.Nav','tms.view.orders.Detail','tms.view.orders.StatusCombo'],
    refs:[
        {
            ref:'grid',
            selector:'ordersList'
        },
        {
            ref:'detailPanel',
            selector:'ordersDetail'
        }
    ],
    init:function (application) {
        this.control({
            'ordersList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'ordersList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'ordersList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'ordersList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'ordersUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'ordersUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            },
            'ordersNav':{
                itemclick:{
                    fn:this.onItemClick,
                    scope:this
                }
            }
        });
    },
    onItemClick: function( me, record, item, index, e, eOpts ) {
        var orderRec = Ext.create('tms.model.Orders',{type:record.raw.orderType,status:record.raw.orderStatus});
        this.getGrid().setOrderRecord(orderRec);
    },
    onGridSelectionChange:function ( grid, selected, eOpts) {
        var editButton = Ext.ComponentQuery.query('ordersList button[action=update]')[0];
        editButton.enable();
        //加载订单详细
        var record = selected[0];
        if(record) {
            this.getDetailPanel().loadDetail(record.get('id'));
        }

    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Orders');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('ordersList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.orders.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('ordersForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('OrdersStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('ordersList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('orders') + ":" + record.getRecordName())
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
        var formPanel = Ext.ComponentQuery.query('ordersForm')[0];
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
        var win = Ext.ComponentQuery.query('ordersUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


