Ext.define('tms.model.Property', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('property'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'sub_title', type:'string'}
    		,{name:'street', type:'string'}
    		,{name:'town', type:'string'}
    		,{name:'region', type:'string'}
    		,{name:'country', type:'string'}
    		,{name:'postcode', type:'string'}
    		,{name:'tel', type:'string'}
    		,{name:'fax', type:'string'}
    		,{name:'email', type:'string'}
    		,{name:'features', type:'string'}
    		,{name:'mappinglink', type:'string'}
    		,{name:'description', type:'string'}
    		,{name:'checkin_times', type:'string'}
    		,{name:'area_activities', type:'string'}
    		,{name:'driving_directions', type:'string'}
    		,{name:'airports', type:'string'}
    		,{name:'othertransport', type:'string'}
    		,{name:'policies_disclaimers', type:'string'}
    		,{name:'property_key', type:'string'}
    		,{name:'published', type:'string'}
    		,{name:'stars', type:'string'}
    		,{name:'ptype_id', type:'string'}
    		,{name:'apikey', type:'string'}
    		,{name:'lat', type:'string'}
    		,{name:'long', type:'string'}
    		,{name:'metatitle', type:'string'}
    		,{name:'metadescription', type:'string'}
    		,{name:'timestamp', type:'date'}
    		,{name:'approved', type:'string'}
            ,{name:'promotion', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});