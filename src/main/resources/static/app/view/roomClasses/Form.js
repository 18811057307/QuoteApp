Ext.define('tms.view.roomClasses.Form', {
    extend:'tms.base.Form',
    alias:'widget.roomClassesForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('roomClasses_id'), anchor:'95%'}
                        ,{xtype:'textfield', name:'room_classes_name', fieldLabel:i18n.t('roomClasses_room_classes_name'), anchor:'95%'}
                        ,{xtype:'textfield',name:'bed',fieldLabel: i18n.t('roomClasses_bed'), anchor:'95%'}
                        ,{xtype:'textfield',name:'floor',fieldLabel: i18n.t('roomClasses_floor'), anchor:'95%'}
                        ,{xtype:'textarea',name:'room_classes_features',fieldLabel: i18n.t('roomClasses_room_classes_features'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'property_id', fieldLabel:i18n.t('roomClasses_property_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'total_rooms',fieldLabel: i18n.t('roomClasses_total_rooms'), anchor:'95%'}
                        ,{xtype:'textfield',name:'add_bed',fieldLabel: i18n.t('roomClasses_add_bed'), anchor:'95%'}
                        ,{xtype:'textfield',name:'area',fieldLabel: i18n.t('roomClasses_area'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});