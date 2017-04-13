Ext.define('tms.model.SeriesSpec', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('seriesSpec'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'seriesCode', type:'string'}
    		,{name:'key', type:'string'}
    		,{name:'title', type:'string'}
    		,{name:'unit', type:'string'}
    		,{name:'propertyCode', type:'string'}
    		,{name:'aryChoiceName', type:'string'}
    		,{name:'aryChoiceCode', type:'string'}
    		,{name:'isUniform', type:'string'}
    		,{name:'uniformChoiceCode', type:'string'}
    		,{name:'aryIsNull', type:'string'}
    		,{name:'valueType', type:'string'}
    		,{name:'seriesSpecNo', type:'string'}
    		,{name:'singleChoiceName', type:'string'}
    		,{name:'hasParamSpec', type:'string'}
    		,{name:'displayPattern', type:'string'}
    		,{name:'isSpecInch', type:'string'}
    		,{name:'closeflag', type:'string'}
        ],
    getRecordName: function () {
        return this.get("key");
    }
});