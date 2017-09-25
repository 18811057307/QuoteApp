Ext.define('tms.view.company.CompanyCombo', {
    extend : 'Ext.ux.form.field.BoxSelect',
    alias:'widget.companyCombo',
    multiSelect: false,
    displayField: 'name',
    valueField: 'id',
    queryMode: 'local',
    forceSelection:false,
    editable:false,
    initComponent: function() {
        this.store = Ext.create('tms.store.CompanyStore');
        this.store.load();
        this.callParent(arguments);
    }
});