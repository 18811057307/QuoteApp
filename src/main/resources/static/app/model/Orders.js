Ext.define('tms.model.Orders', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('orders'),
    fields:[
        {name:'id', type:'int'}
        ,{name:'date_add', type:'date'}
        ,{name:'date_upd', type:'date'}
        ,{name:'species', type:'string'}
        ,{name:'weight', type:'string'}
        ,{name:'size', type:'string'}
        ,{name:'style', type:'string'}
        ,{name:'color', type:'string'}
        ,{name:'price', type:'string'}
        ,{name:'total', type:'string'}
        ,{name:'customer', type:'string'}
        ,{name:'package', type:'string'}
        ,{name:'desc', type:'string'}
    ],
    getRecordName: function () {
        return this.get("id");
    }
});