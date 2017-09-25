Ext.define('tms.view.bpm.TaskProcessWindow', {
    extend: 'Ext.window.Window',
    requires: ['tms.view.bpm.SalesOrderTaskForm'],
    alias: 'widget.bpmTaskProcessWindow',
    title: '应该取自当前的环节名称',
    modal: true,
    buttons: [{
        text: i18n.t('Complete'),
        action: 'complete'
    }, {
        text: i18n.t('button_cancel'),
        action: 'cancelForm'
    }],
    layout: 'border',
    initComponent: function() {
        var me = this;
        if (me.mainForm == '') {
            Ext.Error.raise('必须设置主表单组件.');
        }
        else {
            Ext.applyIf(me, {items: [{
                xtype: 'panel',
                layout: 'fit',
                items: [me.mainForm],
                region: 'center'
            }, {
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'historicActivityList',
                    flex: 1
                }, {
                    xtype: 'panel',
                    title: '办理意见',
                    flex: 1,
                    items: [{
                        xtype: 'mailMessageList',
                        showInputField: true
                    }]
                }],
                width: 450,
                region: 'east',
                split: true
            }]});
        }

        me.callParent(arguments);
    }
});
