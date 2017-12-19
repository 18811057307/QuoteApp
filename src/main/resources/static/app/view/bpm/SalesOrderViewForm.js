Ext.define('tms.view.bpm.SalesOrderViewForm', {
    extend:'tms.base.Form',
    alias:'widget.salesOrderViewForm',
    requires : ['tms.view.salesOrder.EditorList','tms.view.sysUser.UserCombo','tms.view.company.CompanyCombo'],
    items : [    	
    	{
            xtype: 'container',
            anchor: '100%',
            layout: 'hbox',
            items:[{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [                        
                {xtype:'hidden', readOnly:true, name:'id',fieldLabel: i18n.t('formInstance_id'), anchor:'95%'}
                ,{xtype:'hidden',name:'processInstanceId',fieldLabel: i18n.t('formInstance_process_instance_id'), anchor:'95%'}
                ,{xtype:'datefield', readOnly:true, name:'createDate',fieldLabel: i18n.t('formInstance_create_date'), anchor:'95%'}
                , {xtype:'textfield',name:'sales',fieldLabel: i18n.t('formInstance_sales'), readOnly:'true',anchor:'95%'}
                ,{xtype:'textfield', readOnly:true, name:'title',fieldLabel: i18n.t('formInstance_title'), anchor:'95%'}

                ]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                	,{xtype:'hidden',name:'draftOrg',fieldLabel: '所属公司', readOnly:'true',anchor:'95%'}
                    , {xtype:'textfield',name:'drafter',fieldLabel: i18n.t('formInstance_drafter'), readOnly:'true', anchor:'95%'}
                    , {xtype:'textfield',name:'mobile',fieldLabel: i18n.t('formInstance_mobile'), readOnly:'true', anchor:'95%'}
                	,{xtype:'textfield', readOnly:true, name:'comment',fieldLabel: i18n.t('formInstance_comment'), anchor:'95%'}
                    ,{xtype:'hidden',name:'drafterId',fieldLabel: i18n.t('formInstance_drafter_id'), anchor:'95%'}
                    ,{xtype:'hidden',name:'processDefinitionId',fieldLabel: i18n.t('formInstance_process_definition_id'), anchor:'95%'} 
                ]
            }]
        }
        ,{

                    xtype: 'salesOrderEditorList',
                    autoHeight: true,
                    title:'产品信息',
                    plugins: []

        }
    ]
});