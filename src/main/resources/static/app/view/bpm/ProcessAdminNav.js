Ext.define('tms.view.bpm.ProcessAdminNav', {
	extend: 'Ext.tree.Panel', 
    rootVisible: false,
    useArrows: true,
    alias:'widget.processAdminNav',
    initComponent: function() {

    	this.store = Ext.create('Ext.data.TreeStore', {
        	storeId: 'ProcessAdminNavTreeStore',
            proxy: {
                type: 'ajax',
                url: tms.getContextPath() + 'api/bpm/getProcessAdminNavTree',
        		reader : {
        			root : 'data',
        			type : 'json'
        		},
        		pageSize : -1
            },
            autoLoad:false
        });
        
        this.callParent();

    } 
});