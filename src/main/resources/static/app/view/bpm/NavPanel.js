Ext.define('tms.view.bpm.NavPanel', {
	extend: 'Ext.tree.Panel', 
    rootVisible: false,
    useArrows: true,
    alias:'widget.bpmNavPanel',
    initComponent: function() {

    	this.store = Ext.create('Ext.data.TreeStore', {
        	storeId: 'BpmNavTreeStore',
            proxy: {
                type: 'ajax',
                url: tms.getContextPath() + 'api/bpm/getNavTree',
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