Ext.define('tms.view.bpm.SalesOrderProcessForm', {
	extend : 'tms.base.Form',
	alias : 'widget.salesOrderProcessForm',
	requires : [ 'tms.view.salesOrder.List' ],
	unstyled: false,
	items : [ {
		xtype : 'container',
		anchor : '100%',
		layout : 'hbox',
		items : [ {
			xtype : 'container',
			flex : 1,
			layout : 'anchor',
			items : [ {
				xtype : 'hidden',
				name : 'id',
				fieldLabel : i18n.t('formInstance_id'),
				anchor : '95%'
			}, {
				xtype : 'hidden',
				name : 'processInstanceId',
				fieldLabel : i18n.t('formInstance_process_instance_id'),
				anchor : '95%'
			}, {
				xtype : 'textfield',
				name : 'title',
				fieldLabel : '客户名称',
				anchor : '95%'
			}, {
				xtype : 'textfield',
				name : 'drafter',
				fieldLabel : '提交人',
				anchor : '95%'
			} ]
		}, {
			xtype : 'container',
			flex : 1,
			layout : 'anchor',
			items : [ {
				xtype : 'datefield',
				name : 'createDate',
				fieldLabel : '单据日期',
				anchor : '95%'
			}, {
				xtype : 'textfield',
				name : 'comment',
				fieldLabel : '备注信息',
				anchor : '95%'
			}, {
				xtype : 'hidden',
				name : 'drafterId',
				fieldLabel : i18n.t('formInstance_drafter_id'),
				anchor : '95%'
			}, {
				xtype : 'hidden',
				name : 'processDefinitionId',
				fieldLabel : i18n.t('formInstance_process_definition_id'),
				anchor : '95%'
			} ]
		} ]
	}, {
		xtype : 'container',
		anchor : '98%',
		items : [{
			title : '产品信息',
			xtype : 'salesOrderList',
			autoHeight : true,
			border : true
		}]
	} ]
});