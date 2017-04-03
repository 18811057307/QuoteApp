Ext.define('tms.view.insurance.List', {
    extend:'tms.base.Grid',
    alias:'widget.insuranceList',
    store:'InsuranceStore',
    columns:[
		{width: 50,  header:i18n.t('insurance_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('insurance_price'), sortable:true, dataIndex:'price', filter:true}
		,{width: 50,  header:i18n.t('insurance_term'), sortable:true, dataIndex:'term', filter:true}
		,{width: 50,  header:i18n.t('insurance_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('insurance_summary'), sortable:true, dataIndex:'summary', filter:true}
		,{width: 50,  header:i18n.t('insurance_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'InsuranceStore',
        displayInfo: true
    }]
});