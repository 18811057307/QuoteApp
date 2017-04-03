/**
 * @class Ext.chooser.Window
 * @extends Ext.window.Window
 * @author Ed Spencer
 * 
 * This is a simple subclass of the built-in Ext.window.Window class. Although it weighs in at 100+ lines, most of this
 * is just configuration. This Window class uses a border layout and creates a DataView in the central region and an
 * information panel in the east. It also sets up a toolbar to enable sorting and filtering of the items in the 
 * DataView. We add a few simple methods to the class at the bottom, see the comments inline for details.
 */
Ext.define('Ext.ux.view.IconWindow', {
    extend: 'Ext.window.Window',
    title : i18n.t('Select a file to upload'),
    //closeAction: 'hide',
    layout: 'border',
    modal: true,
    border: false,
    bodyBorder: false,
    
    /**
     * initComponent is a great place to put any code that needs to be run when a new instance of a component is
     * created. Here we just specify the items that will go into our Window, plus the Buttons that we want to appear
     * at the bottom. Finally we call the superclass initComponent.
     */
    initComponent: function() {
       this.uploadBtn = Ext.create('Ext.ux.upload.Button', {
            text: i18n.t('Select a file to upload'),
            //singleFile: true,
            plugins: [{
                ptype: 'ux.upload.window',
                title: i18n.t('Upload'),
                width: 520,
                height: 350
            }
            ],
            uploader:
            {
                url: this.url,
                uploadpath: '/Root/files',
                autoStart: false,
                max_file_size: '2020mb',
                drop_element: 'dragload',
                filters : [
                    {title : "Image files", extensions : "jpg,gif,png"}
                ],

                //statusQueuedText: i18n.t('Ready to upload'),
                //statusUploadingText: i18n.t('Uploading ({0}%)'),
                //statusFailedText: '<span style="color: red">Error</span>',
                //statusDoneText: '<span style="color: green">Complete</span>'
                //statusInvalidSizeText: i18n.t('File too large'),
                statusInvalidExtensionText: i18n.t('Invalid file type')
            },
            listeners:
            {
                filesadded: function(uploader, files)
                {
                    return true;
                },

                beforeupload: function(uploader, file)
                {
                },

                fileuploaded: function(uploader, file)
                {
                    tms.notify(file.name + i18n.t("uploaded"),i18n.t("File Upload"));
                },

                uploadcomplete: function(uploader, success, failed)
                {
                    this.down('iconbrowser').store.load({params:{limit:100,"filter":Ext.JSON.encode(this.filters)}});
                },
                scope: this
            }
        });

        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                layout: 'fit',
                items: {
                    xtype: 'iconbrowser',
                    autoScroll: true,
                    id: 'img-chooser-view',
                    filters : this.filters,
                    listeners: {
                        scope: this,
                        selectionchange: this.onIconSelect
                    }
                },
                
                tbar: [this.uploadBtn]
            },
            {
                xtype: 'infopanel',
                region: 'east',
                width: 250,
                split: true
            }
        ];

        this.callParent(arguments);
        
        /**
         * Specifies a new event that this component will fire when the user selects an item. The event is fired by the
         * fireImageSelected function below. Other components can listen to this event and take action when it is fired
         */
        this.addEvents(
            /**
             * @event selected
             * Fired whenever the user selects an image by double clicked it or clicking the window's OK button
             * @param {Ext.data.Model} image The image that was selected
             */
            'selected'
        );

        this.down('iconbrowser').store.load({params:{limit:100,"filter":Ext.JSON.encode(this.filters)}});
    },
    
    /**
     * @private
     * Called whenever the user types in the Filter textfield. Filters the DataView's store
     */
    filter: function(field, newValue) {
        var store = this.down('iconbrowser').store,
            view = this.down('dataview'),
            selModel = view.getSelectionModel(),
            selection = selModel.getSelection()[0];
        
        store.suspendEvents();
        store.clearFilter();
        store.filter({
            property: 'name',
            anyMatch: true,
            value   : newValue
        });
        store.resumeEvents();
        if (selection && store.indexOf(selection) === -1) {
            selModel.clearSelections();
            this.down('infopanel').clear();
        }
        view.refresh();
        
    },
    
    /**
     * @private
     * Called whenever the user changes the sort field using the top toolbar's combobox
     */
    sort: function() {
        var field = this.down('combobox').getValue();
        
        this.down('dataview').store.sort(field);
    },
    
    /**
     * Called whenever the user clicks on an item in the DataView. This tells the info panel in the east region to
     * display the details of the image that was clicked on
     */
    onIconSelect: function(dataview, selections) {
        var selected = selections[0];
        
        if (selected) {
            this.down('infopanel').loadRecord(selected);
        }
    }
});