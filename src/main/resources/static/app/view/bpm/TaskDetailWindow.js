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
				title : '导入产品询价单信息',
				content : '点击产品信息表格上【选择文件】按钮，可批量导入询价单的产品信息.',
				url : tms.getContextPath() + 'xls/样例产品询价单.xlsx',
				linkText : '下载Excel模板'
			} ]
		} ,{
			xtype : 'manualProductMapHelper',
			data : [ {
				title : '上传产品图纸',
				content : '选中要添加图纸的产品信息，点击产品信息表格下的【选择要上传的图纸】按钮，可上传产品图纸.',
			} ]
		}],
		split : true,
		border : false,
		width : 400,
		region : 'east'
	} ]
});