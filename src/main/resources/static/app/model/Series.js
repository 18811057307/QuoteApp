Ext.define('tms.model.Series', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('series'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'seriesName', type:'string'}
    		,{name:'seriesUrl', type:'string'}
    		,{name:'brdName', type:'string'}
    		,{name:'brdCode', type:'string'}
    		,{name:'categoryCode', type:'string'}
    		,{name:'quoteType', type:'string'}
    		,{name:'remark', type:'string'}
    		,{name:'procBy', type:'string'}
    		,{name:'procFlag', type:'string'}
    		,{name:'createDate', type:'date'}
    		,{name:'updateDate', type:'date'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});