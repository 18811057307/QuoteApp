Ext.define('tms.module.ManualProductMapModule', {
    extend:'Ext.ux.desktop.Module',
    id:'manualProductMap-win',
    titleText : i18n.t("manualProductMap"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-manualProductMap'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('manualProductMap-win');
        
        if (!win) {
            win = desktop.createWindow({
                id:'manualProductMap-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-manualProductMap',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',                
                items:[
                	{xtype:'manualProductMapList', region:'center'}                	
                ]
            });
            if(!tms.isAdmin) {
            	Ext.ComponentQuery.query('manualProductMapList button[action=create]')[0].hide();
            	Ext.ComponentQuery.query('manualProductMapList button[action=update]')[0].hide();
            	Ext.ComponentQuery.query('manualProductMapList button[action=delete]')[0].hide();
            	Ext.ComponentQuery.query('manualProductMapList button[action=refresh]')[0].hide();
            	Ext.ComponentQuery.query('manualProductMapList')[0].uploadBtn.hide();
            } else {
            	win.add({xtype:'panel',
            		items:[
            			{xtype:'manualProductMapPriceUpdater'}
            			,{
            				xtype:'manualProductMapHelper',
            				data:[{
		            	    	title:'批量导入新建',
		            	    	content:'点击表格上【选择文件】按钮，可批量导入型号对应表.',
		            	    	url:tms.getContextPath() + 'xls/型号对应测试.xlsx',
		            	    	linkText:'下载Excel模板'
		            	    }]
            			}
            			,{
            				xtype:'manualProductMapHelper',
            				data:[{
		            	    	title:'批量删除',
		            	    	content:'通过表格第一列的多选框，选中要删除的数据，点击表格上方的【删除】按钮，即可批量删除所有选中的数据.',
		            	    	url:'',
		            	    	linkText:''
		            	    }]
            			}
            			
            		],
            	 split:true,border:false, width: 400,  region: 'east'
            	});
            }
        }
        return win;
    }
});

