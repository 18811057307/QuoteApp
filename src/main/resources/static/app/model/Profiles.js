Ext.define('tms.model.Profiles', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('profiles'),
    idProperty:'user_id',
    fields:[
        {name:'user_id', type:'string'}
        ,{name:'lastname', type:'string'}
        ,{name:'firstname', type:'string'}
        ,{name:'address', type:'string'}
        ,{name:'town', type:'string'}
        ,{name:'city', type:'string'}
        ,{name:'postcode', type:'string'}
        ,{name:'tel', type:'string'}
        ,{name:'fax', type:'string'}
        ,{name:'preferences', type:'string'}
        ,{name:'car_regno', type:'string'}
        ,{name:'ccard_no', type:'string'}
        ,{name:'ccard_issued', type:'string'}
        ,{name:'ccard_expiry', type:'string'}
        ,{name:'ccard_iss_no', type:'string'}
        ,{name:'ccard_name', type:'string'}
        ,{name:'ccv', type:'string'}
        ,{name:'type', type:'string'}
    ],
    getRecordName: function () {
        return this.get("user_id");
    }
});