Ext.define('tms.controller.TripQuoteController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.TripQuoteStore'],
    models:['tms.model.TripQuote'],
    views:['tms.view.tripQuote.List'],
    refs:[
        {
            ref:'grid',
            selector:'tripQuoteList'
        }
    ],
    init:function (application) {
        this.control({
            'tripQuoteList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'tripQuoteList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'tripQuoteList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'tripQuoteList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'tripQuoteList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'tripQuoteUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'tripQuoteUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('tripQuoteList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripQuoteList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        if(this.getGrid().tripRecord) {
            var record = Ext.create('tms.model.TripQuote');
            record.set('trip_id', this.getGrid().tripRecord.get('id'));
            this._openUpdateWin(record);
        } else {
            tms.notify(i18n.t("tripSelectForQuoteOrSchedule"),i18n.t("tripQuote"));
        }
    },
    onEdit:function (me, e, eOpts) {
        var record = this.getGrid().getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.tripQuote.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripQuoteForm')[0];
        form.loadRecord(record);

        if(record.get("rrule") != "") {
            alert(record.get("rrule"));
            var rrule = RRule.fromString(record.get("rrule"));

            if(rrule.options.freq) {
                form.getForm().findField("freqgroup").getBoxes()[rrule.options.freq].setValue(true);
            }
            if(rrule.options.count) {
                form.getForm().findField("COUNT").setValue(rrule.options.count);
            }

            if(rrule.options.byweekday) {
                Ext.each(rrule.options.byweekday,function(item) {
                    form.getForm().findField("bydaygroup").getBoxes()[item].setValue(true);
                });

            }
        }

        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('TripQuoteStore');
    },
    onDelete:function (me, e, eOpts) {
        var record = this.getGrid().getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('tripQuote') + ":" + record.getRecordName())
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
            tms.notify(i18n.t("tripSelectForQuoteOrSchedule"),i18n.t("tripQuote"));
        }
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('tripQuoteForm')[0];

        //If check the rrule panel
        var rrule = new Array();
        if(formPanel.getForm().findField("freqgroup").getChecked().length > 0) {
            rrule.push("FREQ=" + formPanel.getForm().findField("freqgroup").getChecked()[0].inputValue);
        }
        if(formPanel.getForm().findField("COUNT").getValue() != "") {
            rrule.push("COUNT=" + formPanel.getForm().findField("COUNT").getValue());
        }
        if(formPanel.getForm().findField("bydaygroup").getChecked().length > 0) {
            var byday = new Array();
            Ext.each(formPanel.getForm().findField("bydaygroup").getChecked(),
                function(item) {
                    byday.push(item.inputValue);
                }
            );
            rrule.push("BYDAY=" + byday.join());
        }
        formPanel.getForm().findField("rrule").setValue(rrule.join(';'));

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
        var win = Ext.ComponentQuery.query('tripQuoteUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


