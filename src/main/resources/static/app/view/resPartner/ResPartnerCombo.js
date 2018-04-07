Ext.define('tms.view.resPartner.ResPartnerCombo', {
    extend : 'Ext.ux.form.field.BoxSelect',
    alias:'widget.resPartnerCombo',
    multiSelect: false,
    displayField: 'name',
    valueField: 'name',
    queryMode: 'local',
    forceSelection:false,
    createNewOnEnter:true,
    editable:true,
    typeAhead: true,
    initComponent: function() {
        this.store = Ext.create('tms.store.ResPartnerStore');
        this.store.load({params:{
        	partnerType: this.partnerType
	    }});
        this.callParent(arguments);
    }
});