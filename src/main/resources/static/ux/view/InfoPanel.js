/**
 * @class Ext.chooser.InfoPanel
 * @extends Ext.panel.Panel
 * @author Ed Spencer
 * 
 * This panel subclass just displays information about an image. We have a simple template set via the tpl property,
 * and a single function (loadRecord) which updates the contents with information about another image.
 */
Ext.define('Ext.ux.view.InfoPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.infopanel',
    id: 'img-detail-panel',
    width: 200,
    minWidth: 200,
    initComponent: function() {
        this.formPanel =  Ext.create('tms.view.attachment.Form');
        this.items = [this.formPanel];
        this.buttons = [
            {
                text: i18n.t('button_front'),
                scope: this,
                handler: this.saveAsFront
            },
            {
                text: i18n.t('button_save'),
                scope: this,
                handler: this.saveInfo
            },
            {
                text: i18n.t('button_delete'),
                scope: this,
                handler: this.deleteInfo
            }
        ];
        this.callParent(arguments);
    },

    /**
     * Loads a given image record into the panel. Animates the newly-updated panel in from the left over 250ms.
     */
    loadRecord: function(image) {
        this.record = image;
        this.body.hide();
        this.formPanel.loadRecord(image);
        this.body.slideIn('l', {
            duration: 250
        });
    },
    
    clear: function(){
        this.body.update('');
    },
    /**
     * Fires the 'selected' event, informing other components that an image has been selected
     */
    saveInfo: function() {
        this.formPanel.getForm().updateRecord(this.record);
        if(this.record.dirty) {
            this.record.set('created',new Date());
            this.record.save();
        }

    },
    deleteInfo: function() {
        var attachmentStore = Ext.ComponentQuery.query('iconbrowser')[0].store;
        attachmentStore.remove(this.record);
        attachmentStore.sync();
    },
    saveAsFront:function() {
        this.formPanel.getForm().updateRecord(this.record);
        this.record.set('type','FIMG');
        this.record.set('created',new Date());
        this.record.save();
    }
});