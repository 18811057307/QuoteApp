Ext.define('tms.module.ProfilesModule', {
    extend: 'Ext.window.Window',
    id:'profiles-win',
    requires : ['tms.view.profiles.Form'],
    layout: 'anchor',
    title: '修改密码',
    modal: true,
    width: 640,
    height: 240,
    border: false,
    items:[{
        xtype: 'profilesForm'
    }],
    initComponent: function () {
    	var me = this;
    	me.buttons = [{ text:i18n.t('button_save'), handler: me.onSave, scope: me }];
    	me.callParent();
    },
    onSave: function () {
        var formPanel = Ext.ComponentQuery.query('profilesForm')[0];
        if (formPanel.getForm().isValid()) {
        	formPanel.getForm().submit({
        	    clientValidation: true,
        	    url: tms.getContextPath() + 'api/sysUser/modifyPassword',
        	    success: function(form, action) {
        	    	var win = Ext.getCmp('profiles-win');
        	    	tms.notify("修改密码成功");
        	    	win.close();
        	    },
        	    failure: function(form, action) {
        	        switch (action.failureType) {
        	            case Ext.form.action.Action.CLIENT_INVALID:
        	                Ext.Msg.alert('修改失败', action.response.responseText);
        	                break;
        	            case Ext.form.action.Action.CONNECT_FAILURE:
        	                Ext.Msg.alert('修改失败', action.response.responseText);
        	                break;
        	            case Ext.form.action.Action.SERVER_INVALID:
        	               Ext.Msg.alert('修改失败', action.response.responseText);
        	       }
        	    },
        	    scope:this
        	});
        }
    }
});

