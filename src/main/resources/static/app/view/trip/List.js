Ext.define('tms.view.trip.List', {
    extend:'tms.base.Grid',
    alias:'widget.tripList',
    store:'TripStore',
    columns:[
        {width: 50,  header:i18n.t('trip_teamno'), sortable:true, dataIndex:'team_no', filter:true, editor:{ xtype:'textfield', allowBlank:false}}
        ,
        {width: 200, header:i18n.t('trip_title'), sortable:true, dataIndex:'title', filter:true, editor:{ xtype:'numberfield', allowBlank:false}}
        //,{width: 100, header:i18n.t('trip_promotion'), sortable:true, dataIndex:'promotion', filter:true, editor:{ xtype:'textfield', allowBlank:false}}
        /*,{
            xtype:'actioncolumn',
            width:50,
            items: [{
                iconCls: 'icon-quote',  // Use a URL in the icon config
                xtype: 'button',
                tooltip: i18n.t('quote'),
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var tripQuoteModule = tms.app.desktop.getModule('tripQuote-win');
                    tripQuoteModule.tripRecord = rec;
                    var tripQuoteWindow = tripQuoteModule.createWindow();
                    tripQuoteWindow.show();
                }
            },{
                iconCls: 'icon-schedule',
                xtype: 'button',
                tooltip: i18n.t('trip_dailyschedule'),
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var tripScheduleModule = tms.app.desktop.getModule('tripSchedule-win');
                    tripScheduleModule.tripRecord = rec;
                    var tripScheduleWindow = tripScheduleModule.createWindow();
                    tripScheduleWindow.show();
                }
            }]
        }*/
    ],
    initComponent:function () {
        this.callParent();
        this.topToolbar.add({
            xtype: 'button',
            text: i18n.t("button_upload"),
            action: 'upload',
            iconCls: 'upload',
            disabled: true
        });
    }
});