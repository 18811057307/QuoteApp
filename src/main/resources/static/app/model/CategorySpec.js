Ext.define('tms.model.CategorySpec', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('categorySpec'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'categoryCode', type:'string'}
    		,{name:'key', type:'string'}
    		,{name:'title', type:'string'}
    		,{name:'unit', type:'string'}
    		,{name:'illustrationType', type:'string'}
    		,{name:'categorySpecNo', type:'string'}
    		,{name:'propertyCode', type:'string'}
    		,{name:'aryChoiceName', type:'string'}
    		,{name:'aryChoiceCode', type:'string'}
    		,{name:'valueType', type:'string'}
    		,{name:'extraSpec', type:'string'}
    		,{name:'noticeString', type:'string'}
    		,{name:'hasParamSpec', type:'string'}
    		,{name:'useFlag', type:'string'}
    		,{name:'groupingStep', type:'string'}
    		,{name:'displayPattern', type:'string'}
    		,{name:'isSpecInch', type:'string'}
    		,{name:'similarFlag', type:'string'}
    		,{name:'groupTitle', type:'string'}
    		,{name:'groupNoticeString', type:'string'}
    		,{name:'groupIndex', type:'string'}
    		,{name:'isParent', type:'string'}
        ],
    getRecordName: function () {
        return this.get("key");
    }
});