Ext.define('tms.view.trip.Form', {
    extend:'tms.base.Form',
    alias:'widget.tripForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[{xtype:'hidden', name:'id', anchor:'95%'},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', fieldLabel:'线路名称', name:'title', afterLabelTextTpl:tms.getRequiredTpl(), anchor:'95%'}
                        ,
                        {xtype:'numberfield', fieldLabel:'行程天数', name:'trip_days', anchor:'95%'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'旅游主题', name:'product_theme', anchor:'95%',code:'TripTheme'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'出发城市', name:'departure_city', anchor:'95%',code:'DepartureCity'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'优惠促销', name:'promotion', anchor:'95%',code:'Promotion'}
                    ]
                },
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', fieldLabel:'团队编号', name:'team_no', afterLabelTextTpl:tms.getRequiredTpl(), minLength:1, anchor:'95%'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'产品类型', name:'product_type', anchor:'95%',code:'TripType'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'适宜人群', name:'crowd', anchor:'95%',code:'TripCrowd'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'目的地', name:'dest_city', anchor:'95%',code:'Destination'}
                        ,
                        {xtype:'numberfield', fieldLabel:'建议售价', name:'advice_price', anchor:'95%'}
                    ]
                }
            ]
        },{
            xtype:'tabpanel',
            layout: 'fit',
            plain: true,
            items: [{
                title: '主要景点',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'main_attractions'}]
            },{
                title: '行程简介',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'daily_schedule'}]
            },{
                title: '行程特色',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'high_lights'}]
            },{
                title: '特别提醒',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'notes'}]
            },{
                title: '费用说明',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'charges_exp'}]
            }]
        }
    ]
});