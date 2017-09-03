Ext.define('tms.view.bpm.NavPanel', {
	extend: 'Ext.tree.Panel', 
    rootVisible: false,
    useArrows: true,
    alias:'widget.bpmNavPanel',
    initComponent: function() {
        this.store = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: [
                    { text: "待处理", id:"MY", leaf: true },
                    { text: "待认领", id:"GROUP", leaf: true },
                    { text: "已处理", id:"DONE", leaf: true },
                    { text: "由我发起", id:"BYME", leaf: true }
                ]
            }
        });

        this.callParent();
    } 
});