Ext.define('tms.view.users.LoginDialog', {
    extend: 'Ext.window.Window',
    alias:'widget.loginDialog',
    /* Various style settings */
    title: i18n.t("Welcom"),
    width: 500,
    height: 250,
    modal: true,
    resizable: false,
    closable: false,
    layout: 'anchor',
    bodyStyle: 'padding: 5px;',
    /**
     * Initializes the login dialog component
     */
    initComponent: function () {

        this.loginField = Ext.create('Ext.form.field.Text',{
            name: 'username',
            value: "",
            fieldLabel: i18n.t("users_username"),
            anchor: '90%'//,
            //allowBlank : false
        });

        this.passwordField = Ext.create('Ext.form.field.Text',{
            name: 'password',
            inputType: "password",
            value: "",
            fieldLabel: i18n.t("users_password"),
            anchor: '90%'//,
            //allowBlank : false
        });

        this.loginForm =  Ext.create('Ext.form.Panel',{
            layout: 'anchor',
            autoScroll: true,
            border:false,
            fieldDefaults:{
                msgTarget:'side',
                labelWidth:75,
                labelAlign:'right',
                anchor: '60%'
            },
            items: [
                this.loginField,
                this.passwordField
            ]
        });


        Ext.apply(this, {
            items: [this.loginForm],
            dockedItems: [{
                xtype: 'toolbar',
                enableOverflow: false,
                dock: 'bottom',
                ui: 'footer',
                buttonAlign:'right',
                defaults: {minWidth: 80},
                items: [
                    {
                        text: i18n.t("Login"),
                        iconCls: 'login',
                        action: 'login'
                    },{
                        text: i18n.t("Forget Password?"),
                        action: 'forget',
                        iconCls: 'forget'
                    }]
            }]
        });

        this.callParent(arguments);
    }
});