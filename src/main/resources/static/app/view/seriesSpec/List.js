Ext.define('tms.view.seriesSpec.List', {
    extend:'tms.base.Grid',
    alias:'widget.seriesSpecList',
    store:'SeriesSpecStore',
    showBottomToolbar:false,
    columns:[
    	{width: 50,  header:i18n.t('seriesSpec_key'), sortable:true, dataIndex:'key'}
		,{width: 50,  header:i18n.t('seriesSpec_title'), sortable:true, dataIndex:'title'}
		,{width: 50,  header:i18n.t('seriesSpec_ary_choice_name'), dataIndex:'aryChoiceName'}
		,{width: 50,  header:i18n.t('seriesSpec_ary_choice_code'), dataIndex:'aryChoiceCode'}		
    ]
});