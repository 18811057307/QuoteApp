Ext.define('tms.model.Trip', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('trip'),
    fields:[
        {name:'id', type:'int'}
        ,
        {name:'title', type:'string'}
        ,
        {name:'team_no', type:'string'}
        ,
        {name:'trip_days', type:'int'}
        ,
        {name:'product_type', type:'string'}
        ,
        {name:'product_theme', type:'string'}
        ,
        {name:'crowd', type:'string'}
        ,
        {name:'dest_city', type:'string'}
        ,
        {name:'departure_city', type:'string'}
        ,
        {name:'high_lights', type:'string'}
        ,
        {name:'main_attractions', type:'string'}
        ,
        {name:'line_details', type:'string'}
        ,
        {name:'daily_schedule', type:'string'}
        ,
        {name:'charges_exp', type:'string'}
        ,
        {name:'notes', type:'string'}
        ,
        {name:'advice_price', type:'float'}
        ,
        {name:'promotion', type:'string'}
    ],
    getRecordName: function () {
        return this.get("title");
    }
});