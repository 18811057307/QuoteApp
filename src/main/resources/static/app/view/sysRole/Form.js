Ext.define('tms.view.sysRole.Form', {
    extend:'tms.base.Form',
    alias:'widget.sysRoleForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('sysRole_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'name',fieldLabel: i18n.t('sysRole_name'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                            {xtype:'textfield',name:'remarks',fieldLabel: i18n.t('sysRole_remarks'), anchor:'95%'}                            
                        ]
        }
        ]
    }
    ]
});