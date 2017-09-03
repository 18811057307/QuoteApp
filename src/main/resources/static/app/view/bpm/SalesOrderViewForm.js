Ext.define('tms.view.bpm.SalesOrderViewForm', {
    extend:'tms.base.Form',
    alias:'widget.salesOrderViewForm',
    requires : ['tms.view.salesOrder.EditorList'],
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
                ,{xtype:'textfield', readOnly:true, name:'drafter',fieldLabel: '提交人', anchor:'95%'}
                ]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                	{xtype:'datefield', readOnly:true, name:'createDate',fieldLabel: '单据日期', anchor:'95%'}
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