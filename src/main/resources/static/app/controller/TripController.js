Ext.define('tms.controller.TripController', {
  extend:'Ext.app.Controller',
  stores:['tms.store.TripStore'],
  models:['tms.model.Trip'],
  views:['tms.view.trip.List'],
  requires:['Ext.ux.view.IconWindow',
      'Ext.ux.view.IconBrowser',
      'Ext.ux.view.InfoPanel',
      'Ext.ux.upload.Button',
      'Ext.ux.upload.plugin.Window',
      'Ext.ux.upload.Basic',
      'tms.view.attachment.Form',
      'Ext.ux.form.field.ImageField',
      'Ext.ux.form.field.MultiDate',
      'tms.view.dropdown.DropdownCombo'],
    refs:[
        {
            ref:'grid',
            selector:'tripList'
        }
    ],
  init:function (application) {
    this.control({
        'tripList':{
            itemclick: {
                fn: this.onItemclick,
                scope: this
            },
            itemdblclick: {
                fn: this.onItemDblClick,
                scope: this
            }
        },
        'tripList button[action=create]':{
            click:{
                fn:this.onAdd,
                scope:this
            }
        },
        'tripList button[action=update]':{
            click:{
                fn:this.onEdit,
                scope:this
            }
        },
        'tripList button[action=delete]':{
            click:{
                fn:this.onDelete,
                scope:this
            }
        },
        'tripList button[action=refresh]':{
            click:{
                fn:this.onRefresh,
                scope:this
            }
        },
        'tripList button[action=upload]':{
            click:{
                fn:this.onUpload,
                scope:this
            }
        },
        'tripUpdate button[action=submitForm]':{
            click:{
                fn:this.onSubmit,
                scope:this
            }
        },
        'tripUpdate button[action=cancelForm]':{
            click:{
                fn:this.onCancel,
                scope:this
            }
        }
    });
  },

    onItemclick: function(me, e, eOpts){
        var editButton = Ext.ComponentQuery.query('tripList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripList button[action=delete]')[0];
        var uploadButton = Ext.ComponentQuery.query('tripList button[action=upload]')[0];
        editButton.enable();
        deleteButton.enable();
        uploadButton.enable();

        var grid = Ext.ComponentQuery.query('tripList')[0];
        var record = grid.getSelectionModel().getSelection()[0];

        var scheduleGrid =  Ext.ComponentQuery.query('tripScheduleList')[0];
        var quoteGrid = Ext.ComponentQuery.query('tripQuoteList')[0];

        scheduleGrid.setTripRecord(record);
        quoteGrid.setTripRecord(record);
    },
    onItemDblClick: function(me, e, eOpts){
        this.onEdit();
    },

    onUpload: function(me, e, eOpts){
        var grid = Ext.ComponentQuery.query('tripList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        var uploadWin = Ext.create('Ext.ux.view.IconWindow',{
            title: Ext.String.format(i18n.t('upload {0} picture'),i18n.t('trip')),
            url: tms.getContextPath() + '/index.php?r=trip/upload&id=' + record.get("id"),
            filters: [
                {type:'numeric', field: 'trip_id',comparison:'eq', value :  record.get("id")},
                {type:'string', field: 'type',  value :  'IMG'}
            ]
        });
        uploadWin.width = Ext.getBody().getViewSize().width * 0.5;
        uploadWin.height = Ext.getBody().getViewSize().height * 0.5;
        uploadWin.show();
    },

    onAdd: function(me, e, eOpts){
        var record = Ext.create('tms.model.Trip');
        this._openUpdateWin(record);
    },
    onEdit: function(me, e, eOpts){
        var grid = Ext.ComponentQuery.query('tripList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin: function (record) {
        var updateWin = Ext.create('tms.view.trip.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore: function() {
        return  this.getGrid().store;
    },

    onDelete: function(me, e, eOpts){
        //var grid = Ext.ComponentQuery.query('tripList')[0];
        var record =  this.getGrid().getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('trip') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this.getGrid().store.remove(record);
                    this.getGrid().store.sync();
                }
            }, this);

    },

    onRefresh: function(me, e, eOpts){
        this._getStore().load();
    },

    // This is called when you submit a form for creating or editing a .
    onSubmit: function(me, e, eOpts){
        var formPanel = Ext.ComponentQuery.query('tripForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if(this._curRecord.phantom) {
                this._getStore().insert(0,this._curRecord);
            }
            if(!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function(){
                   this._closeWin();
                },
                failure: function(form, action) {
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
                scope: this
            });
        }
    },
    _closeWin : function ()  {
        var win = Ext.ComponentQuery.query('tripUpdate')[0];
        win.close();
    },
    onCancel: function(me, e, eOpts){
        this._closeWin();
    }
});
