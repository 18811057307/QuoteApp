Ext.define('tms.module.TripQuoteModule', {
    extend:'Ext.ux.desktop.Module',
    id:'tripQuote-win',
    titleText : i18n.t("tripQuote"),
    tripRecord : null,
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripQuote'
        };
    },
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'trip_id',comparison:'eq',value:this.tripRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripQuote-win');
        if (!win) {
            var tripQuoteList = Ext.create('widget.tripQuoteList',{tripRecord: this.tripRecord});
            tripQuoteList.store.on('beforeload', this.onBeforeLoad, this);
            win = desktop.createWindow({
                id:'tripQuote-win',
                modal: true,
                title: this.tripRecord.get('title') + this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripQuote',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[tripQuoteList]
            });
        }
        return win;
    }
});

