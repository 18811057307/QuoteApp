Ext.define('tms.view.categorySpec.List', {
    extend:'tms.base.Grid',
    alias:'widget.categorySpecList',
    store:'CategorySpecStore',
    showBottomToolbar:false,
    columns:[
		{width: 50,  header:i18n.t('categorySpec_key'), sortable:true, dataIndex:'key'}
		,{width: 50,  header:i18n.t('categorySpec_title'), dataIndex:'title'}
		,{width: 50,  header:i18n.t('categorySpec_ary_choice_name'), dataIndex:'aryChoiceName'}
		,{width: 50,  header:i18n.t('categorySpec_ary_choice_code'), dataIndex:'aryChoiceCode'}
    ]
});