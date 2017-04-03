Ext.define('tms.model.Attachment', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('attachment'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'trip_id', type:'int'}
            ,{name:'property_id', type:'int'}
            ,{name:'room_classes_id', type:'int'}
            ,{name:'type', type:'string'}//图片[FIMG,IMG]，附件[FILE]
            ,{name:'title', type:'string'}
            ,{name:'description', type:'string'}
            ,{name:'sequence', type:'int'}
            ,{name:'createby', type:'string'}
            ,{name:'created', type:'date'}
    		,{name:'filename', type:'string'}
    		,{name:'extension', type:'string'}
    		,{name:'mime_type', type:'string'}
    		,{name:'byte_size', type:'int'}
        ],
    getRecordName: function () {
        return this.get("filename");
    }
});