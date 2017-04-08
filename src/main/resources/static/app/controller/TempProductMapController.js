Ext.define('tms.controller.TempProductMapController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.ManualProductMapStore'],
    models:['tms.model.ManualProductMap'],
    views:['tms.view.manualProductMap.TempList','Ext.ux.form.field.SearchField','tms.view.manualProductMap.Helper'],  
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
            'tempProductMapList':{
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            }
        });
    },

    onItemDblClick:function (me, e, eOpts) {
    }
});


