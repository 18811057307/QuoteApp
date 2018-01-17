Ext.define('tms', {
    singleton:true,
    contextPath:'',
    downloadFile: function(config){
        config = config || {};
        var url = config.url,
            method = config.method || 'POST',// Either GET or POST. Default is POST.
            params = config.params || {};

        // Create form panel. It contains a basic form that we need for the file download.
        var form = Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: url,
            method: method
        });

        // Call the submit to begin the file download.
        form.submit({
            target: '_blank', // Avoids leaving the page. 
            params: params
        });

        // Clean-up the form after 100 milliseconds.
        // Once the submit is called, the browser does not care anymore with the form object.
        Ext.defer(function(){
            form.close();
        }, 100);

    },
    notify:function (msg, title, level) {
        //info,warning,error,success
        if (!level) {
            level = 'info';
        }

        if (!title) {
            title = i18n.t('Notification');
        }

        /*
        Ext.create('Ext.ux.window.Notification', {
            position:'br',
            width:250,
            slideInDuration:800,
            slideBackDuration:1500,
            slideInAnimation:'elasticIn',
            slideBackAnimation:'elasticIn',
            autoCloseDelay:5000,
            resizable:false,
            header:false,
            border:false,
            //stickOnClick: false,
            tpl:['<div class="{level} message">',
                '<h3>{title}</h3>',
                '<p>{message}</p></div>'],
            data:{"title":title, "message":msg, "level":level}
        }).show();
        */
        
        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });
         setTimeout(function(){
             Ext.MessageBox.hide();
         }, 2000);

    },
    getAjaxProxy:function (model) {
        var obj = {
            listeners:{
                exception:function (proxy, response, operation) {
                    var data = Ext.JSON.decode(response.responseText);
                    tms.notify(data.message, data.error);	
                }
            },
            type:'ajax',
            api:{
                read:tms.getContextPath() + 'api/' + model + '/page',
                create:tms.getContextPath() + 'api/' + model + '/create',
                update:tms.getContextPath() + 'api/' + model + '/update',
                destroy:tms.getContextPath() + 'api/' + model + '/delete'
            },
            reader:{
                totalProperty:'total',
                successProperty:'success',
                idProperty:'id',
                root:'data',
                messageProperty:'message',
                type:'json'
            },
            writer:{
                encode:false,
                writeAllFields:true,
                type:'json',
                root:'data'
            }

        };
        return new Ext.data.proxy.Ajax(obj);
    },
    getApplication:function () {
        return tms.app;
    },
    setContextPath:function(path) {
    	this.contextPath = path;
    },
    getContextPath:function () {
        return this.contextPath;
    },
    getRequiredTpl:function () {
        return '<span style="color:red;font-weight:bold" data-qtip="' + i18n.t('required_field') + '">*</span>';
    }
});
