/**
 * @class RemoteImageField
 * <p>The RemoteImageField is a form field which can be used to upload one image. It automatically
 * displays the remote image by id, assigns a temporary ID if it's a new image so the model can be
 * syncronized at once.
 * 
 */
Ext.define('Ext.ux.form.field.ImageField', {
    extend:'Ext.form.field.Base',
    alias: 'widget.imagefield',
    type: 'imagefield',
    // Default width and height
    imageWidth: 64,
    imageHeight: 64,
    
    // The field template for rendering this field
    fieldSubTpl: [
                  '<img id="{cmpId}-imgEl" style="{size}" class="imagefield"/>',
                  {
                      compiled: true,
                      disableFormats: true
                  }],
              
    /**
     * Initializes the field
   	 */          
    initComponent : function(){
    	this.minHeight = this.imageHeight;
    	this.minWidth = this.imageWidth;
    	this.imageId = Ext.id("imagefield");
        this.callParent();
    },
    /**
     * Return the template data for this field
     */
    getSubTplData: function() {
    	return {
    		cmpId: this.id,
            size: 'height:'+this.imageHeight+"px;width:"+this.imageWidth+"px;",
            imageid: this.imageId
    	};
    },
    /**
     * Renders this field.
     */
    onRender: function() {
        var me = this;
        me.addChildEls('imgEl');
        me.callParent(arguments);
    },
    /**
     * Applies the image URL to the element after rendering
     */
    afterRender: function () {
    	this.imgEl.dom.src = this.getImageURL();
    	
    	//this.imgEl.on("click", this.onClick, this);
    },
    onClick: function () {
    	//var j = Ext.create("Ext.ux.FileUploadDialog", { imageUpload: true });
    	//j.on("fileUploaded", this.onFileUploaded, this);
    	//j.show();
    },
    onFileUploaded: function (data) {
    	//this.setValue(data.data.uuid);
    },
    /**
     * Returns the URL for the image field. Applies the temporary image if TMP: is
     * found within the value.
     */
    getImageURL: function () {
        if(this.value) {
            return tms.getContextPath() + "/" + this.value;
        }
        return tms.getContextPath() + "/images/default.jpeg";

    },
    /**
     * Sets a value for the field. If the value is numeric, we call the image service
     * with the specified id and the specified type. If the value is a string and prefixed
     * with TMP:, we use the type "TempImage" and pass the id which has to be specified after TMP:.
     * 
     * Example
     * TMP:12     would retrieve the temporary image with the ID 12
     * @param {Mixed} value The value to set
     * @return {Ext.form.field.Field} this
     */
    setValue: function(value) {
    	var me = this;
    	this.setRawValue(value);
    	this.value = value;
    	if (this.rendered) {
    		this.imgEl.dom.src = this.getImageURL();
    	}
        return this;
    }
});

