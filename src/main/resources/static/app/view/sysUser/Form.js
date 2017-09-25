Ext.define('tms.view.sysUser.Form', {
    extend:'tms.base.Form',
    requires: [ 'tms.view.company.CompanyCombo' ],
    alias:'widget.sysUserForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('sysUser_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'name',fieldLabel: i18n.t('sysUser_name'), anchor:'95%'}
                        ,{xtype:'textfield',name:'loginName',fieldLabel: i18n.t('sysUser_login_name'), anchor:'95%'}
                        ,{xtype:'textfield',name:'email',fieldLabel: i18n.t('sysUser_email'), anchor:'95%'}                            
                        ,{xtype:'textfield',name:'remarks',fieldLabel: i18n.t('sysUser_remarks'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[              
	                    	{xtype:'companyCombo',name:'companyId',fieldLabel: '所属公司', anchor:'95%'}
	                    	,{xtype:'hidden',name:'password',fieldLabel: i18n.t('sysUser_password'), value:'1', anchor:'95%'}
                        	,{xtype:'textfield',name:'mobile',fieldLabel: i18n.t('sysUser_mobile'), anchor:'95%'}
                            ,{xtype:'textfield',name:'phone',fieldLabel: i18n.t('sysUser_phone'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});