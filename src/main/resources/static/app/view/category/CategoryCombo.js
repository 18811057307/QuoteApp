Ext.define('tms.view.category.CategoryCombo', {
    extend : 'Ext.ux.TreePicker',
    alias:'widget.categoryCombo',
    displayField: 'text',
    valueField: 'id',
    minPickerHeight:'200',    
    setValue: function(value) {
	        var me = this,
	        record;
	
	    me.value = value;
	
	    if (me.store.loading) {
	        // Called while the Store is loading. Ensure it is processed by the onLoad method.
	        return me;
	    }
	        
	    // try to find a record in the store that matches the value
	    record = value ? me.store.getNodeById(value) : me.store.getRootNode();
	    if (value === undefined) {
	        record = me.store.getRootNode();
	        me.value = record.getId();
	    } else {
	        record = me.store.getNodeById(value);
	    }
	
	    // set the raw value to the record's display field if a record was found
	    if(record) {
	    	me.setRawValue(record.get(me.displayField));
	    } else {
	    	Ext.Ajax.request({
		        url: tms.getContextPath() + 'api/categories/categoryRawValue',
		        params: {'id': value },
		        method: 'GET',
		        success: function(response){
		            var result = Ext.decode(response.responseText);
		            me.setRawValue(result.data);
		    	},
		    	scope:me
		    });
	    }
	    
	
	    return me;
	},
    initComponent: function() {
    	this.store = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: tms.getContextPath() + 'api/categories/categoryTree',
        		reader : {
        			root : 'data',
        			type : 'json'
        		}
            },
            root: {
                expanded: true,
                text: "所有分类",
                id:'root'
            },
            nodeParam:'parentCode'
        });

        this.callParent(arguments);
    }
});