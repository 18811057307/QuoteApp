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
                        ,{xtype:'textfield',name:'unit',fieldLabel: i18n.t('stockQuant_unit'), anchor:'95%'}
                        ,{xtype:'textfield',name:'lotCata1',fieldLabel: i18n.t('stockQuant_lot_cata1'), anchor:'95%'}
                        ,{xtype:'textfield',name:'lotCata2',fieldLabel: i18n.t('stockQuant_lot_cata2'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                    	{xtype:'textfield',name:'lot',fieldLabel: i18n.t('stockQuant_lot_id'), anchor:'95%'}
                    	,{xtype:'textfield',name:'productName',fieldLabel: i18n.t('stockQuant_product_name'), anchor:'95%'}
                    	,{xtype:'textfield',name:'qty',fieldLabel: i18n.t('stockQuant_qty'), anchor:'95%'}
                        ,{xtype:'textfield',name:'useQty',fieldLabel: i18n.t('stockQuant_use_qty'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});