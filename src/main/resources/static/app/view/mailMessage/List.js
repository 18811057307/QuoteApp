Ext.define('tms.view.mailMessage.List', {
	extend: 'Ext.container.Container',
	alias:'widget.mailMessageList',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
	
    showInputField: false,
    
    initComponent:function () {
    	
    	this.msgView = Ext.create('Ext.view.View', { 
        	flex:1,
        	store:'MailMessageStore',
        	tpl:['<tpl for=".">',
                '<p class="notice">',
                '{authorId} : {body} - [{createDate:date("m-d H:i:s")}]</p>',
            '</tpl>'],
            autoScroll:true,
            height:260
        });
    	
    	this.commentField = Ext.create('Ext.form.field.Trigger',{
                xtype: 'triggerfield',
                trigger1Cls: 'mail-message-trigger',
                width: 380,
                value: '',
                resId: '',
                border: 2,
                style: {
                    borderColor: '#157fcc',
                    borderStyle: 'solid'
                },
                emptyText: '填写意见后按回车或右侧小按钮',
                listeners: {
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                        	var upView = this.up('mailMessageList');
                        	var resId = upView.resId;
                	    	Ext.Ajax.request({
                	        	url: tms.getContextPath() + '/api/mailMessage/create',
                	            method: 'POST',
                	            params: {
                	            	resId:resId,
                	            	comment:this.getValue()
                	            },
                	            success: function(result, request) {
                	            	upView.msgView.store.load({params:{
                	                	resId: resId
                	        	    }});
                	            	this.setValue("");
                	            },
                	            scope:this
                	    	});
                        }
                    }
                },
                onTriggerClick: function() {
                	var upView = this.up('mailMessageList');
                	var resId = upView.resId;
        	    	Ext.Ajax.request({
        	        	url: tms.getContextPath() + '/api/mailMessage/create',
        	            method: 'POST',
        	            params: {
        	            	resId:resId,
        	            	comment:this.getValue()
        	            },
        	            success: function(result, request) {
        	            	upView.msgView.store.load({params:{
        	                	resId: resId
        	        	    }});
        	            	this.setValue("");
        	            },
        	            scope:this
        	    	});
                }
    	});
    	
    	if(this.showInputField) {
    		Ext.apply(this, {
    			items: [this.commentField, this.msgView]
    		});    		
    	} else {
    		Ext.apply(this, {
    			items: [this.msgView]
    		}); 
    	}
    	
    	this.callParent();
    }
});