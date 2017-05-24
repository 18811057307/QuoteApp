Ext.define('tms.view.Desktop', {
    extend:'Ext.ux.desktop.App',

    requires:[
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'tms.module.Settings',
        'tms.module.TempProductMapModule',
        'tms.module.ManualProductMapModule',
        'tms.module.ProductCategoryModule',
        'tms.module.ProductModule',
        'tms.module.SysUserModule',
        'tms.module.SysRoleModule',
        'tms.module.QuotationLogModule'
    ],

    init:function () {
        if(tms.app.session) {
            this.callParent();
        } else {
            return;
        }
    },

    getModules:function () {
    	var tempModules = new Array();
    	Ext.each(desktopModules,function(item){
    		tempModules.push(Ext.create(item));
    	});    	
        return tempModules; 
        
        //[
            //new tms.module.UsersModule(),
            //new tms.module.DropdownModule(),
            //new tms.module.OrdersModule(),
        	//Ext.create("tms.module.TempProductMapModule"),
        	//Ext.create("tms.module.ManualProductMapModule"),
        	//Ext.create("tms.module.SysUserModule"),
        	//Ext.create("tms.module.SysRoleModule")
            //new tms.module.ProductCategoryModule(),
            //new tms.module.ProductModule()
        //];
    },

    getDesktopConfig:function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            contextMenuItems:[
                { text:i18n.t('Change Settings'), handler:me.onSettings, scope:me }
            ],
            shortcuts:Ext.create('Ext.data.Store', {
                model:'Ext.ux.desktop.ShortcutModel',
                data:deskTopShortcuts
                    //{ name:i18n.t('productCategory'), iconCls:'users-shortcut',module:'productCategory-win' }
                    //{ name:i18n.t('user_manage'), iconCls:'users-shortcut', module:'users-win'}
                	//{ name:i18n.t('temp_quote_process'), iconCls:'users-shortcut',module:'tempProductMap-win' }
                	//,{ name:i18n.t('manualProductMap'), iconCls:'orders-shortcut',module:'manualProductMap-win' }
                    //,{ name:i18n.t('product'), iconCls:'orders-shortcut',module:'product-win' }
                    //,{ name:i18n.t('order_manage'), iconCls:'orders-shortcut', module:'orders-win',badge: 5}                    
                
            }),
            wallpaper: contextPath + 'wallpapers/desk.jpg',
            wallpaperStretch:false
        });
    },

    // config for the start menu
    getStartConfig:function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //title:'Don Griffin',
            iconCls:'user',
            height:300,
            toolConfig:{
                width:100,
                items:[
                    {
                        text:i18n.t('Settings'),
                        iconCls:'settings',
                        handler:me.onSettings,
                        scope:me
                    },
                    '-',
                    {
                        text:i18n.t('Logout'),
                        iconCls:'logout',
                        handler:me.onLogout,
                        scope:me
                    }
                ]
            }
        });
    },

    getTaskbarConfig:function () {
        var ret = this.callParent();
        return Ext.apply(ret, {
            width:300,
            quickStart:[
                //{ name:i18n.t('user_manage'), iconCls:'icon-users',module:'users-win' }
                //{ name:i18n.t('manualProductMap'), iconCls:'icon-orders',module:'manualProductMap-win' }
            ],
            trayItems:[
                { xtype:'trayclock', flex:1 }
            ]
        });
    },

    onLogout:function () {
        Ext.Msg.confirm(i18n.t('Logout'), i18n.t('Are you sure you want to logout?'),function(btn, text){
                if (btn == 'yes'){
                	Ext.getDom('logoutForm').submit();
                }
        },this);

    },

    onSettings:function () {
        var dlg = new tms.module.Settings({
            desktop:this.desktop
        });
        dlg.show();
    }
});