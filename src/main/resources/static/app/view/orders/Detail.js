Ext.define('tms.view.orders.Detail', {
    extend: 'Ext.panel.Panel',
    alias:'widget.ordersDetail',
    id: 'content-panel',
    title: '&nbsp;',
    autoScroll: true,
    detailTpl:new Ext.XTemplate(
        '<ul class="list-group">',
        '<tpl if="orders.type == \'TripOrder\'">',
        '<li class="list-group-item list-group-item-default">出发日期：{ordersDetail.departure_date}</li>',
        '<li class="list-group-item list-group-item-default">成人团费：{ordersDetail.adult_price} × {ordersDetail.adults}</li>',
        '<tpl if="ordersDetail.children &gt; 0">',
        '<li class="list-group-item list-group-item-default">儿童团费：{ordersDetail.child_price} × {ordersDetail.children}</li>',
        '</tpl>',
        '</tpl>',
        '<tpl if="orders.type == \'HotelOrder\'">',
        '<li class="list-group-item list-group-item-default">入住日期：{ordersDetail.check_in} - {ordersDetail.check_out} </li>',
        '<li class="list-group-item list-group-item-default">房间数量：{ordersDetail.quantity}</li>',
        '<li class="list-group-item list-group-item-default">每晚房价：{ordersDetail.price}</li>',
        '</tpl>',
        '</ul>'
    ),
    guestTpl:new Ext.XTemplate(
        '<tpl for=".">',
        '<p>{name}</p>',
        '<p>{mobile_no}</p>',
        '</tpl></p>'
    ),
    contactTpl:new Ext.XTemplate(
        '<tpl for=".">',
        '<p>{lastname}</p>',
        '<p>{email_address}</p>',
        '<p>{mobile}</p>',
        '</tpl></p>'
    ),
    invoiceTpl:new Ext.XTemplate(
        '<tpl for="invoice">',
        '<p>{title}</p>',
        '<p>{desc}</p>',
        '</tpl></p>',
        '<tpl for="address">',
        '<p>{lastname}</p>',
        '<p>{address1}</p>',
        '</tpl></p>'
    ),
    loadDetail: function(orderId) {
        this.removeAll();
        Ext.Ajax.request({
            url: tms.getContextPath() + '/index.php?r=orders/view&JSONView=true&id='+orderId,
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                this.setTitle(data.ordersDetail.name);
                this.add({xtype:'panel',title:'总价:' + data.orders.total_paid,tpl: this.detailTpl, data:data });
                this.add({xtype:'panel',title:'联系人信息',tpl: this.contactTpl, data:data.ordersContact });
                this.add({xtype:'panel',title:'旅客信息',tpl: this.guestTpl, data:data.guests});
                if(data.invoice) {
                    this.add({xtype:'panel',title:'发票信息',tpl: this.invoiceTpl, data:{'invoice':data.invoice,'address':data.address}});
                }

            },
            scope:this
        });
    }
});