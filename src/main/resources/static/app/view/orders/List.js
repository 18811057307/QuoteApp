Ext.define('tms.view.orders.List', {
    extend:'Ext.grid.Panel',
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    features:[
        {ftype:'filters', encode:true}
    ],
    alias:'widget.ordersList',
    store:'OrdersStore',
    columns:[
        {width:50, header:i18n.t('orders_no'), sortable:true, dataIndex:'no', filter:true}
        ,
        {width:50, header:i18n.t('orders_total_paid'), sortable:true, dataIndex:'total_paid', filter:true}
        ,
        {width:50, header:i18n.t('orders_total_paid_real'), sortable:true, dataIndex:'total_paid_real', filter:true}
        ,
        {width:50, header:i18n.t('orders_date_add'), sortable:true, dataIndex:'date_add', filter:true, renderer:Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
    ],

    dockedItems:[
        {
            xtype:'toolbar',
            items:[
                {
                    text: i18n.t("button_update"),
                    iconCls: 'option',
                    action:'update',
                    disabled: true
                }
            ]
        },
        {
            xtype:'pagingtoolbar',
            dock:'bottom',
            store:'OrdersStore',
            displayInfo:true
        }
    ],
    onBeforeLoad:function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'string', field:'type', comparison:'eq', value:this.orderRecord.get("type")});
        if (this.orderRecord.get("status") && "" != this.orderRecord.get("status")) {
            filters.push({type:'string', field:'status', comparison:'eq', value:this.orderRecord.get("status")});
        }
        var params = {"start":0, "limit":25, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setOrderRecord:function (orderRec) {
        this.orderRecord = orderRec;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    }
});