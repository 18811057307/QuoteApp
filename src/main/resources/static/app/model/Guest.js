Ext.define('tms.model.Guest', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('guest'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'user_id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'en_name', type:'string'}
    		,{name:'gender', type:'string'}
    		,{name:'id_no', type:'string'}
    		,{name:'birthday', type:'date'}
    		,{name:'age', type:'int'}
    		,{name:'phone_no', type:'string'}
    		,{name:'mobile_no', type:'string'}
    		,{name:'aboard_place', type:'string'}
    		,{name:'visa_type', type:'string'}
    		,{name:'travel_type', type:'string'}
    		,{name:'category', type:'string'}
    		,{name:'insurance', type:'string'}
    		,{name:'passport', type:'string'}
    		,{name:'passport_expiry', type:'string'}
    		,{name:'sign_place', type:'string'}
    		,{name:'sign_date', type:'date'}
    		,{name:'remark', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});