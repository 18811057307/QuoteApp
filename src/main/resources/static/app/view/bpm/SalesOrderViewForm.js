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
                ,{xtype:'textfield', readOnly:true, name:'title',fieldLabel: '客户名称', anchor:'95%'}
                , {xtype:'userCombo',name:'drafter',fieldLabel: '销售', readOnly:'true',anchor:'95%'}
                , {xtype:'userCombo',name:'drafterId',fieldLabel: '内勤', readOnly:'true', anchor:'95%'}
                ]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                	{xtype:'datefield', readOnly:true, name:'createDate',fieldLabel: '单据日期', anchor:'95%'}
                	,{xtype:'companyCombo',name:'draftOrg',fieldLabel: '所属公司', readOnly:'true',anchor:'95%'}
                	,{xtype:'textfield', readOnly:true, name:'comment',fieldLabel: '备注信息', anchor:'95%'}
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