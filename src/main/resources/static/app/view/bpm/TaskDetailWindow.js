Ext.define('tms.view.bpm.TaskDetailWindow', {
	extend : 'tms.base.Window',
	requires : [ 'tms.view.bpm.SalesOrderProcessForm',
			'tms.view.manualProductMap.Helper' ],
	alias : 'widget.bpmTaskWindow',
	title : '应该取自当前的环节名称',
	buttons : [ {
		text : '启动流程',
		action : 'startProcess'
	}, {
		text : i18n.t('button_save'),
		action : 'submitForm'
	}, {
		text : i18n.t('button_cancel'),
		action : 'cancelForm'
	} ],
	layout : 'border',
	items : [ {
		xtype : 'salesOrderProcessForm',
		region : 'center'
	}, {
		xtype : 'panel',
		items : [ {
			xtype : 'manualProductMapHelper',
			data : [ {
				title : '导入订单产品信息',
				content : '点击产品信息表格上【选择文件】按钮，可批量导入订单的产品信息.',
				url : tms.getContextPath() + 'xls/样例订单.xlsx',
				linkText : '下载Excel模板'
			} ]
		} ],
		split : true,
		border : false,
		width : 400,
		region : 'east'
	} ]
});