Ext.define('tms.view.manualProductMap.PriceUpdater', {
    extend: 'Ext.form.Panel',
    alias:'widget.manualProductMapPriceUpdater',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 10,
    title:'批量调价',
    fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 100,
        labelStyle: 'font-weight:bold'
    },
    
    items: [{
        xtype: 'fieldcontainer',
        fieldLabel: '选中所有要调价的产品,然后在下面输入调价方式,确认后保存',
        layout: 'hbox',
        defaultType: 'textfield',

        fieldDefaults: {
            labelAlign: 'top'
        },

        items: [{
            flex: 1,
            name: 'column',
            xtype: 'combo',
            margins: '0 0 0 5',
            allowBlank: false,
            queryMode: 'local',
            displayField:'name',
            valueField:'columnName',
            store:{xtype:'store',fields: ['name', 'columnName'],data:[{name:'出厂价',columnName:'factoryQuote'},{name:'统一价',columnName:'uniQuote'},{name:'AT价',columnName:'atProductQuote'},{name:'MI价',columnName:'miProductQuote'}]},
            fieldLabel: '价格'            
        }, {
        	width: 60,
        	fieldLabel: '运算符',
            name: 'oper',
            xtype: 'combo',
            margins: '0 0 0 5',
            allowBlank: false,
            queryMode: 'local',
            displayField:'name',
            valueField:'oper',
            store:{xtype:'store',fields: ['name', 'oper'],data:[{name:'加',oper:'+'},{name:'减',oper:'-'},{name:'乘',oper:'*'},{name:'除',oper:'/'}]}
        }, {
            flex: 1,
            fieldLabel: '多少',
            name: 'amount',
            xtype:'numberfield',
            minValue: 0,
            allowDecimals: true,
            decimalPrecision: 2,
            step: 0.1,
            allowBlank: false,
            margins: '0 0 0 5'
        }]
    }],
    buttons: [{
        text: '保存',
        action: 'batchUpdatePrice',
        iconCls: 'save'
    }]
});