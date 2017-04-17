Ext.define('tms.module.TempProductMapModule', {
    extend:'Ext.ux.desktop.Module',
    id:'tempProductMap-win',
    titleText : i18n.t("temp_quote_process"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tempProductMap'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tempProductMap-win');
        var helpHtml = '<div class="card  light-blue"><div class="card-content white-text">' + 
        					'<span class="card-title">报价单处理</span><p>1. 首先点击【选择文件】按钮，导入待处理原始报价单。</p><p>2. 获得对照结果后，再点击【导出对照报价单】按钮，导出处理结果。</p><p>3. 按型号查找时，可使用逗号(,)或分号(;)分隔，一次查询多个型号，例如(BOFIMLS,BOFCKWS)。</p></div>' +
        					'<div class="card-action"><a href="' + tms.getContextPath() + 'xls/报价对应测试.xlsx" class="lime-text text-accent-1">下载报价Excel模板</a></div></div>';
        if (!win) {
        	
        	var miUserForm = Ext.create('Ext.form.Panel', {
        			id:'miUserForm',
        			xtype:'form',
    			    title: 'Mi询价用账户(如发现无法获取价格，请更换账户。)',
    			    layout: 'anchor',
    			    bodyPadding: 5,
    			    defaultType: 'textfield',
    			    items: [{
    			        fieldLabel: '是否询价',
    			        name: 'needPrice',
    			        xtype: 'checkboxfield',
    			        value: 'false',
    			        allowBlank: false,
    			        listeners:{
    			        	change:function( me, newValue, oldValue, eOpts ) {
	    		                    var miUserForm = Ext.getCmp('miUserForm');
	    		                    var userid = miUserForm.getForm().findField('userid').getValue();
	    		                    var password = miUserForm.getForm().findField('password').getValue();
	    		        	    	Ext.Ajax.request({
	    		                    	url: tms.getContextPath() + 'api/manualProductMap/needPrice',
	    		                        method: 'GET',
	    		                        params: {
	    		                        	needPrice: me.checked,
	    		                        	userid:userid,
	    		                        	password:password
	    		                        },
	    		                        success: function(result, request) {
	    		                            var json = Ext.decode(result.responseText);
	    		                            tms.notify(json.message, "设置完成");
	    		                            
	
	    		                        }
	    		                    });
    			        		
    			        	}
    			        }
    			    },{
    			        fieldLabel: '账户',
    			        name: 'userid',
    			        value: 'fragrantland',
    			        allowBlank: false
    			    },{
    			        fieldLabel: '密码',
    			        name: 'password',
    			        value: 'passw0rd',
    			        allowBlank: false
    			    }]
        	});
            win = desktop.createWindow({
                id:'tempProductMap-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tempProductMap',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                	{xtype:'tempProductMapList',region:'center'},
                	{xtype:'panel'
                		,items:[{
            				xtype:'manualProductMapHelper',
            				data:[{
		            	    	title:'报价单处理',
		            	    	content:'1. 首先点击【选择文件】按钮，导入待处理原始报价单。</p><p>2. 获得对照结果后，再点击【导出对照报价单】按钮，导出处理结果。</p><p>3. 按型号查找时，可使用逗号(,)或分号(;)分隔，一次查询多个型号，例如(BWFSP6-0.6-315,BWFSP9-1.2-92)。</p><p>4. 如果需要的价格没有显示，请联系管理员分配相应价格的查看权限。',
		            	    	url: tms.getContextPath() + 'xls/报价对应测试.xlsx',
		            	    	linkText:'下载报价Excel模板'
		            	    }]
                		},miUserForm
                		]
                	, split:true,border:false, width: 400,  region: 'east'}                	
                ]
            });
        }
        return win;
    }
});

