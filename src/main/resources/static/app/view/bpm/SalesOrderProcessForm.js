Ext.define('tms.view.bpm.SalesOrderProcessForm', {
    extend: 'tms.base.Form',
    alias: 'widget.salesOrderProcessForm',
    requires: ['tms.view.salesOrder.List','tms.view.sysUser.UserCombo','tms.view.company.CompanyCombo'],
    unstyled: false,
    items: [{
        xtype: 'container',
        anchor: '100%',
        layout: 'hbox',
        items: [{
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            items: [{
                xtype: 'hidden',
                name: 'id',
                fieldLabel: i18n.t('formInstance_id'),
                anchor: '95%'
            }, {
                xtype: 'hidden',
                name: 'processInstanceId',
                fieldLabel: i18n.t('formInstance_process_instance_id'),
                anchor: '95%'
            }, {
                xtype: 'datefield',
                name: 'createDate',
                fieldLabel: '询价日期',
                anchor: '95%',
                maxValue: new Date()
            }, {
            	xtype:'userCombo',name:'salesId',fieldLabel: '营业人员', anchor:'95%',
                onItemClick: function(view, record, node, rowIndex, e) {
                	//只选择人员，不能选择目录一级的公司
                	if(record.data.leaf == true) {
                		this.selectItem(record);
                		var mobileField = Ext.ComponentQuery.query('textfield[name=mobile]');
                		mobileField[0].setValue(record.raw.mobile);
                	}
                }}
            ,{
                xtype: 'textfield',
                name: 'title',
                allowBlank: false,
                fieldLabel: '客户名称',
                anchor: '95%'
            }]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            items: [
	            {xtype:'userCombo',name:'drafterId',fieldLabel: '内勤', readOnly:'true', anchor:'95%'},
	            {
	                xtype: 'textfield',
	                name: 'mobile',
	                fieldLabel: '联系方式',
	                anchor: '95%'
	            },
	            {xtype:'hidden',name:'draftOrg',fieldLabel: '所属公司', anchor:'95%'}, {
                xtype: 'textfield',
                name: 'comment',
                fieldLabel: '备注信息',
                anchor: '95%'
            }, {
                xtype: 'hidden',
                name: 'processDefinitionId',
                fieldLabel: i18n.t('formInstance_process_definition_id'),
                anchor: '95%'
            }]
        }]
    }, {
        xtype: 'container',
        anchor: '98%',
        items: [{
            title: '产品信息',
            xtype: 'salesOrderList',
            autoHeight: true,
            border: true
        }]
    }]
});
