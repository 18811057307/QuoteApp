Ext.define('tms.model.Category', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('categories'),
    idgen: {
        type: 'sequential',
        seed: 2500000000,
        prefix: 'M'
    },
    fields:[
    		{name:'id', type:'string'}
    		,{name:'categoryName', type:'string'}
    		,{name:'categoryUrl', type:'string'}
    		,{name:'categoryLevel', type:'string'}
    		,{name:'parentCode', type:'string'}
    		,{name:'hasChildCategory', type:'string'}
    		,{name:'procBy', type:'string'}
    		,{name:'procFlag', type:'string'}
    		,{name:'createDate', type:'date', dateFormat: 'time'}
    		,{name:'updateDate', type:'date', dateFormat: 'time'}
    		,{name:'quoterId', type:'string'}
    		,{name:'quoterName', type:'string'}
    		,{name:'auditorId', type:'string'}
    		,{name:'auditorName', type:'string'}   
    		,{name:'factoryRatio', type:'double'}
    		,{name:'unitRatio', type:'double'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});