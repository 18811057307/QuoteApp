Ext.define('tms.view.company.CompanyCombo', {
    extend : 'Ext.ux.form.field.BoxSelect',
    alias:'widget.companyCombo',
    multiSelect: false,
    displayField: 'name',
    valueField: 'id',
    queryMode: 'local',
    store: 'CompanyStore',
    forceSelection:false,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});