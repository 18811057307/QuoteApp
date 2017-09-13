Ext.define('tms.view.stockQuant.Form', {
    extend:'tms.base.Form',
    alias:'widget.stockQuantForm',
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
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('stockQuant_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'location',fieldLabel: i18n.t('stockQuant_location_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'productId',fieldLabel: i18n.t('stockQuant_product_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'unit',fieldLabel: i18n.t('stockQuant_package_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'createUid',fieldLabel: i18n.t('stockQuant_create_uid'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                    	{xtype:'textfield',name:'lot',fieldLabel: i18n.t('stockQuant_lot_id'), anchor:'95%'}
                    	,{xtype:'textfield',name:'qty',fieldLabel: i18n.t('stockQuant_qty'), anchor:'95%'}
                        ,{xtype:'textfield',name:'useQty',fieldLabel: i18n.t('stockQuant_use_qty'), anchor:'95%'}
                        ,{xtype:'datefield',name:'createDate',fieldLabel: i18n.t('stockQuant_create_date'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});