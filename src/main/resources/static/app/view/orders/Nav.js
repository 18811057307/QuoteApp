Ext.define('tms.view.orders.Nav', {
    extend:'Ext.tree.Panel',
    alias:'widget.ordersNav',
    rootVisible:false,
    lines:false,
    useArrows:true,
    root:{
        expanded:true,
        children:[
            {
                text:'订单',
                expanded:true,
                orderType:'HotelOrder',
                children:[
                    { id:'hotel-draft', text:'本月', orderType:'Order', orderStatus:'thisMonth', leaf:true },
                    { id:'hotel-submit', text:'上月', orderType:'Order', orderStatus:'lastMonth',leaf:true },
                    { id:'hotel-paid', text:'本季度', orderType:'Order', orderStatus:'thisNevy',leaf:true },
                    { id:'hotel-process', text:'上季度', orderType:'Order', orderStatus:'lastNevy',leaf:true },
                    { id:'hotel-complete', text:'本年', orderType:'Order', orderStatus:'thisYear',leaf:true }
                ]
            }
        ]
    }
});