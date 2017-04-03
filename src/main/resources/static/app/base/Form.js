Ext.define('tms.base.Form', {
    extend:'Ext.form.Panel',
    requires: ['tms'],
    layout: 'anchor',
    autoScroll: true,
    border:false,
    bodyStyle:'padding:10px',
    unstyled:true,
    fieldDefaults:{
        msgTarget:'side',
        labelWidth:75,
        labelAlign:'right',
        anchor: '95%'
    }
});