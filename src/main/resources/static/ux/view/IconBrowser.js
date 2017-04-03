/**
 * @class Ext.chooser.IconBrowser
 * @extends Ext.view.View
 * @author Ed Spencer
 * 
 * This is a really basic subclass of Ext.view.View. All we're really doing here is providing the template that dataview
 * should use (the tpl property below), and a Store to get the data from. In this case we're loading data from a JSON
 * file over AJAX.
 */
Ext.define('Ext.ux.view.IconBrowser', {
    extend: 'Ext.view.View',
    alias: 'widget.iconbrowser',
    uses: 'Ext.data.Store',
	singleSelect: true,
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    initComponent: function() {
        this.store =  Ext.create('tms.store.AttachmentStore', {
            autoLoad: false
        });

        this.tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap">',
            '<div class="thumb">',
            (!Ext.isIE6? '<img width="74" height="74" src="{filename:this.getFullUrl}" />' :
                '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{filename:this.getFullUrl}\')"></div>'),
            '</div>',
            '<span>{type:this.getType}{title}</span>',
            '</div>',
            '</tpl>',
            {
                getFullUrl: function(filename){
                    return tms.getContextPath() + '/' + filename;
                },
                getType: function(type){
                    if(type === 'FIMG') {
                        return i18n.t('[Front]');
                    }
                }
            }
        );

        
        this.callParent(arguments);
    }
});