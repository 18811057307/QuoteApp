Ext.define('tms.model.Category', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('categories'),
    fields:[
    		{name:'categoryCode', type:'string'}
    		,{name:'categoryName', type:'string'}
    		,{name:'categoryUrl', type:'string'}
    		,{name:'categoryLevel', type:'string'}
    		,{name:'parentCode', type:'string'}
    		,{name:'hasChildCategory', type:'string'}
    		,{name:'procBy', type:'string'}
    		,{name:'procFlag', type:'string'}
    		,{name:'createDate', type:'date'}
    		,{name:'updateDate', type:'date'}
        ],
    getRecordName: function () {
        return this.get("categoryCode");
    }
});