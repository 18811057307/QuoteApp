Ext.define('tms.view.quotationLog.Menu', {
    extend: 'Ext.tree.Panel',
    alias:'widget.quotationLogMenu',
    
    rootVisible: false,
    useArrows: true,
    
    root: {
        text: "Root",
        expanded: true,
        children: [
            { text: "按产品编号统计", leaf: true, linkType: "byProductCode" },
            { text: "按用户名统计", leaf: true, linkType: "byName" }
        ]
    },
});