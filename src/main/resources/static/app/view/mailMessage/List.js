Ext.define('tms.view.mailMessage.List', {
    extend:'Ext.view.View',
    alias:'widget.mailMessageList',
    store:'MailMessageStore',
    tpl:['<tpl for=".">',
            '<p class="notice">',
            '{authorId} : {body} - [{writeDate:date("m-d H:i:s")}]</p>',
        '</tpl>']
});