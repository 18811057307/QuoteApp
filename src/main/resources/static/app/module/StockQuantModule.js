Ext.define('tms.module.StockQuantModule', {
    extend:'Ext.ux.desktop.Module',
    id:'stockQuant-win',
    titleText : i18n.t("stockQuant"),
	requires : ['tms.view.manualProductMap.Helper'],
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-stockQuant'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('stockQuant-win');
        if (!win) {
            win = desktop.createWindow({
                id:'stockQuant-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-stockQuant',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[{xtype:'stockQuantList', region:'center'}
                ,{xtype:'panel',
            		items:[{
            				xtype:'manualProductMapHelper',
            				data:[{
		            	    	title:'批量导入新建',
		            	    	content:'点击表格上【选择文件】按钮，可批量导入型号对应表.',
		            	    	url:tms.getContextPath() + 'xls/产品库存.xlsx',
		            	    	linkText:'下载Excel模板'
		            	    }]
            			}            			
            		],split:true,border:false, width: 400,  region: 'east'
            	}]
            });
        }
        return win;
    }
});

