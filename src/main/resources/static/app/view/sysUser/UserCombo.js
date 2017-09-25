Ext.define('tms.view.sysUser.UserCombo', {
    extend : 'Ext.ux.TreePicker',
    alias:'widget.userCombo',
    displayField: 'text',
    valueField: 'id',
    minPickerHeight:'300',  
    matchFieldWidth:false,
    onItemClick: function(view, record, node, rowIndex, e) {
    	//只选择人员，不能选择目录一级的公司
    	if(record.data.leaf == true) {
    		this.selectItem(record);
    	}
    },
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
		        url: tms.getContextPath() + 'api/sysUser/userRawValue',
		        params: {'loginName': value },
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
    	var me = this;
    	this.store = Ext.create('Ext.data.TreeStore', {
        	storeId: 'UserTreeStore',
            proxy: {
                type: 'ajax',
                url: tms.getContextPath() + 'api/sysUser/userTree',
        		reader : {
        			root : 'data',
        			type : 'json'
        		},
        		extraParams: {roleCode: me.roleCode},
        		pageSize : -1
            },
            root: {
                expanded: true,
                text: "所有公司",
                id:'0'
            },
            nodeParam:'companyId'
        });
    	
    	me.getPicker().setWidth(400);

        this.callParent(arguments);
    }
});