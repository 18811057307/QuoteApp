Ext.define('tms.view.attachment.Form', {
    extend:'tms.base.Form',
    alias:'widget.attachmentForm',
    bodyStyle:'padding:2px',
    fieldDefaults:{
        msgTarget:'side',
        labelWidth:40,
        labelAlign:'right',
        anchor: '95%'
    },
    items : [
        {xtype:'hidden',name:'id',fieldLabel: i18n.t('attachment_id'), anchor:'95%'}
        ,{xtype:'imagefield',name:'filename', fieldLabel:'',imageWidth: 128,imageHeight: 128, anchor:'100%',style:{marginLeft:'15px'}}
        ,{xtype:'textfield',name:'title',fieldLabel: i18n.t('attachment_title'), anchor:'95%'}
        ,{xtype:'textarea',name:'description',fieldLabel: i18n.t('attachment_description'), anchor:'95%'}
        ,{xtype:'textfield',name:'sequence',fieldLabel: i18n.t('attachment_sequence'), anchor:'95%'}
        ]
});