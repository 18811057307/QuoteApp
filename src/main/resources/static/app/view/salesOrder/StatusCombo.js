Ext.define('tms.view.salesOrder.StatusCombo', {
    extend : 'Ext.ux.form.field.BoxSelect',
    alias:'widget.dealStatusCombo',
    multiSelect: false,
    displayField: 'cn',
    valueField: 'code',
    queryMode: 'local',
    store: Ext.create('Ext.data.Store', {
        fields: ['code', 'cn'],
        data : [
            {"code":"complete", "cn":"已下单"},
            {"code":"cancel", "cn":"未下单"}
        ]
    })
});