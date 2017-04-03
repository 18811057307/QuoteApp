Ext.define('tms.view.rooms.Form', {
    extend:'tms.base.Form',
    alias:'widget.roomsForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('rooms_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_classes_id',fieldLabel: i18n.t('rooms_room_classes_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_name',fieldLabel: i18n.t('rooms_room_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_floor',fieldLabel: i18n.t('rooms_room_floor'), anchor:'95%'}
                            ,{xtype:'textfield',name:'max_people',fieldLabel: i18n.t('rooms_max_people'), anchor:'95%'}
                            ,{xtype:'numberfield',name:'singleperson_suppliment',fieldLabel: i18n.t('rooms_singleperson_suppliment'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'property_id',fieldLabel: i18n.t('rooms_property_id'), anchor:'95%'}
                            ,{xtype:'textarea',name:'room_features',fieldLabel: i18n.t('rooms_room_features'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_number',fieldLabel: i18n.t('rooms_room_number'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_disabled_access',fieldLabel: i18n.t('rooms_room_disabled_access'), anchor:'95%'}
                            ,{xtype:'textfield',name:'smoking',fieldLabel: i18n.t('rooms_smoking'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});