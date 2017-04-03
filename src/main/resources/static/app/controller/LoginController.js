Ext.define('tms.controller.LoginController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.UsersStore'],
    models:['tms.model.Users'],
    views:['tms.view.users.LoginDialog'],
    refs:[
        {
            ref:'dialog',
            selector:'loginDialog'
        }
    ],
    init:function (application) {
        this.control({
            'loginDialog':{
                render:{
                    fn:this.assignEnterKey,
                    scope:this
                },
                show:{
                    fn:this.onShow,
                    scope:this
                }
            },
            'loginDialog button[action=login]':{
                click:{
                    fn:this.login,
                    scope:this
                }
            },
            'loginDialog button[action=forget]':{
                click:{
                    fn:this.forget,
                    scope:this
                }
            }
        });
    },
    onShow:function () {
        this.getDialog().loginField.focus();
    },
    /**
     * Assigns the enter key to the login window.
     */
    assignEnterKey:function () {
        var keyMap = this.getDialog().getKeyMap();
        keyMap.on(Ext.EventObject.ENTER, this.login, this);
    },

    login:function () {
        this.getDialog().loginForm.submit({
            clientValidation: true,
            url:tms.getContextPath() + '/index.php?r=user/adminLogin',
            success:function (form, action) {
                var respData = Ext.decode(action.response.responseText);
                if(respData.success) {
                    tms.app.session = action.result.session;
                    tms.app.loginSuccess();
                } else {
                    Ext.Msg.alert(i18n.t('Login Failure'), respData.msg);
                }
            },
            failure:function (form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert(i18n.t('Login Failure'), i18n.t('Form fields may not be submitted with invalid values'));
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert(i18n.t('Login Failure'), i18n.t('Ajax communication failed'));
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert(i18n.t('Login Failure'), Ext.decode(action.response.responseText).msg);
                }
            },
            scope:this
        });


        //this.fireEvent("login", this.loginField.getValue(), this.passwordField.getValue());
    },

    forget:function () {
        //this.fireEvent("login", this.loginField.getValue(), this.passwordField.getValue());

    }
});


