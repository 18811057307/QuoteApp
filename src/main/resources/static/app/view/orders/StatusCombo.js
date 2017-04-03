var orderstatus = Ext.create('Ext.data.Store', {
    fields: ['code', 'cn'],
    data : [
        {"code":"submit", "cn":"已提交"},
        {"code":"paid", "cn":"已付款"},
        {"code":"process", "cn":"处理中"},
        {"code":"complete", "cn":"已成交"},
        {"code":"cancel", "cn":"已取消"}
    ]
});
Ext.define('tms.view.orders.StatusCombo', {
    extend : 'Ext.ux.form.field.BoxSelect',
    alias:'widget.orderStatusCombo',
    multiSelect: false,
    displayField: 'cn',
    valueField: 'code',
    queryMode: 'local',
    store: orderstatus
});