Ext.define('tms.module.TripScheduleModule', {
    extend:'Ext.ux.desktop.Module',
    id:'tripSchedule-win',
    titleText : i18n.t("tripSchedule"),
    tripRecord : null,
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripSchedule'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripSchedule-win');
        if (!win) {
            var tripScheduleList = Ext.create('widget.tripScheduleList',{tripRecord: this.tripRecord});
            tripScheduleList.store.on('beforeload', this.onBeforeLoad, this);
            win = desktop.createWindow({
                id:'tripSchedule-win',
                modal: true,
                title: this.tripRecord.get('title') + this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripSchedule',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[tripScheduleList]
            });
        }
        return win;
    }
});

