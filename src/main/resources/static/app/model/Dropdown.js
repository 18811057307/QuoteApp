Ext.define('tms.model.Dropdown', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('dropdown'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
            ,{name:'code', type:'string'}
            ,{name:'options', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});