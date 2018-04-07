Ext.define('tms.view.resPartner.Nav', {
	extend: 'Ext.tree.Panel', 
    rootVisible: false,
    useArrows: true,
    alias:'widget.resPartnerNav',
    root:{
        expanded:true,
        children:[
            {
                text:'客户',
                iconCls:'icon-resCustomer',
                leaf:true,
                partnerType:'Customer'
            },
            {
                text:'供应商',
                iconCls:'icon-resPartner',
                leaf:true,
                partnerType:'Supplier'
            }
        ]
    }
});