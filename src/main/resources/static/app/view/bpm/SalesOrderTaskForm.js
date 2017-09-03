Ext.define('tms.view.bpm.SalesOrderTaskForm', {
    extend:'tms.base.Form',
    alias:'widget.salesOrderTaskForm',
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
                {xtype:'hidden',name:'id',fieldLabel: i18n.t('formInstance_id'), anchor:'95%'}
                ,{xtype:'hidden',name:'processInstanceId',fieldLabel: i18n.t('formInstance_process_instance_id'), anchor:'95%'}
                ,{xtype:'textfield',name:'title',fieldLabel: '客户名称', anchor:'95%'}
                ,{xtype:'textfield',name:'drafter',fieldLabel: '提交人', anchor:'95%'}
                ]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                	{xtype:'datefield',name:'createDate',fieldLabel: '单据日期', anchor:'95%'}
                	,{xtype:'textfield',name:'comment',fieldLabel: '备注信息', anchor:'95%'}
                    ,{xtype:'hidden',name:'drafterId',fieldLabel: i18n.t('formInstance_drafter_id'), anchor:'95%'}
                    ,{xtype:'hidden',name:'processDefinitionId',fieldLabel: i18n.t('formInstance_process_definition_id'), anchor:'95%'} 
                ]
            }]
        }
        ,{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            items:[{
                title:'产品信息',
                items: [{
                    xtype: 'salesOrderEditorList',
                    autoHeight: true
                }]
            }]
        }
    ]
});