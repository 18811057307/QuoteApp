Ext.define('tms.view.profiles.Form', {
    extend:'tms.base.Form',
    alias:'widget.profilesForm',
    layout:'form',
    border:false,
    buttonAlign:'center',
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelWidth: 110,
        labelAlign: 'left',
        msgTarget: 'under',
    },
    items:[
        {xtype:'textfield', inputType: 'password', name:'oriPassword', fieldLabel:"原密码", allowBlank: false, anchor:'95%'}
        ,{xtype:'textfield', inputType: 'password', name:'newPassword', fieldLabel:"新密码", allowBlank: false, anchor:'95%'}
        ,{xtype:'textfield', inputType: 'password', name:'check', fieldLabel:"重新输入", allowBlank: false, anchor:'95%', validator: function(value) {
            var newPassword = this.previousSibling('[name=newPassword]');
            return (value === newPassword.getValue()) ? true : '两次输入的密码不同，请重新输入.'
        }}        
    ]
});