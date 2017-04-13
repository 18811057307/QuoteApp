Ext.define('tms.view.series.Form', {
    extend:'tms.base.Form',
    alias:'widget.seriesForm',
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
                        {xtype:'hidden',name:'seriesCode',fieldLabel: i18n.t('series_series_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'seriesUrl',fieldLabel: i18n.t('series_series_url'), anchor:'95%'}
                            ,{xtype:'textfield',name:'brdCode',fieldLabel: i18n.t('series_brd_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'procBy',fieldLabel: i18n.t('series_proc_by'), anchor:'95%'}
                            ,{xtype:'datefield',name:'createDate',fieldLabel: i18n.t('series_create_date'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'seriesName',fieldLabel: i18n.t('series_series_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'brdName',fieldLabel: i18n.t('series_brd_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'categoryCode',fieldLabel: i18n.t('series_category_code'), anchor:'95%'}
                            ,{xtype:'textfield',name:'procFlag',fieldLabel: i18n.t('series_proc_flag'), anchor:'95%'}
                            ,{xtype:'datefield',name:'updateDate',fieldLabel: i18n.t('series_update_date'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});