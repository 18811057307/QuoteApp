Ext.define('tms.model.DropdownOption',{
    extend:'Ext.data.Model',
    proxy: {
        type: 'ajax',
        url: tms.getContextPath() + '/index.php?r=Dropdown/getOptions',
        reader: {
            totalProperty:'total',
            successProperty:'success',
            idProperty:'id',
            root:'data',
            messageProperty:'message',
            type:'json'
        }
    },
    fields:[
        {name:'sequence', type:'int'}
        ,{name:'display', type:'string'}
        ,{name:'value', type:'string'}
    ],
    getRecordName: function () {
        return this.get("display");
    }
});