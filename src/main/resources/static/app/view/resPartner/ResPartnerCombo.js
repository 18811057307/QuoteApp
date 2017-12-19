Ext.define('tms.view.resPartner.ResPartnerCombo', {
    extend : 'Ext.ux.form.field.BoxSelect',
    alias:'widget.resPartnerCombo',
    multiSelect: false,
    displayField: 'name',
    valueField: 'name',
    queryMode: 'local',
    forceSelection:false,
    editable:false,
    initComponent: function() {
        this.store = Ext.create('tms.store.ResPartnerStore');
        this.store.load();
        this.callParent(arguments);
    }
});