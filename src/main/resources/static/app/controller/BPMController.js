Ext.define('tms.controller.BPMController', {
    extend:'Ext.app.Controller',
    stores:['tms.store.CategoryStore'],
    models:['tms.model.Category'],
    views:['tms.view.salesOrder.AuditList','tms.view.bpm.NavPanel','tms.view.bpm.ProcessAdminNav','tms.view.bpm.ProcessDefPanel','tms.view.bpm.List','tms.view.bpm.ProcessAdminList','tms.view.bpm.HistoricActivityList','tms.view.mailMessage.List', 'tms.view.sysUser.UserCombo', 'tms.view.company.CompanyCombo', 'tms.view.resPartner.ResPartnerCombo'],
    init:function (application) {
        this.control({
            'processAdminNav':{
                itemclick:{
                    fn:this.onProcessAdminItemClick,
                    scope:this
                }
            },
            'bpmNavPanel':{
                itemclick:{
                    fn:this.onItemClick,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'processDefPanel button[action=startForm]':{
                click:{
                    fn:this.onStartForm,
                    scope:this
                }
            },            
            'bpmTaskWindow button[action=startProcess]':{
                click:{
                    fn:this.onStartProcess,
                    scope:this
                }
            },
            'bpmTaskWindow button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'bpmTaskWindow button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            },
            'bpmTaskProcessWindow button[action=complete]':{
                click:{
                    fn:this.completeTask,
                    scope:this
                }
            },
            'bpmTaskProcessWindow button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            },
            'taskList button[action=claim]':{
                click:{
                    fn:this.claimTask,
                    scope:this
                }
            },
            'taskList button[action=process]':{
                click:{
                    fn:this.processTask,
                    scope:this
                }
            },
            'taskList button[action=view]':{
                click:{
                    fn:this.viewTask,
                    scope:this
                }
            },
            'salesOrderList button[action=delete]':{
                click:{
                    fn:this.deleteSalesOrder,
                    scope:this
                }
            }
        });
    },
    
    claimTask:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('taskList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
    	
        if(record) {
	    	//创建或获取表单实例
	    	Ext.Ajax.request({
	        	url: tms.getContextPath() + '/api/bpm/claim',
	            method: 'GET',
	            params: {
	            	taskId:record.get("id")
	            },
	            success: function(result, request) {
	            	grid.store.clearFilter();
	            	grid.store.load({params:{
	        			assignment: 'GROUP'
	        	    }});
	            }
	    	});
        } else {
        	tms.notify("请在列表中选择一个要接收的任务");
        }
    },
    
    processTask:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('taskList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
    	
        if(record) {
        	
        	Ext.Ajax.request({
        	    url: tms.getContextPath() + '/api/bpm/taskForm',
        	    method: 'GET',
        	    params: {'taskId': record.get("id") },
        	    success: function(response){
        	        var result = Ext.decode(response.responseText);
        	        var metaData = Ext.decode(result.metadata);
        	        if(metaData.hasDetail) {
        	        	Ext.apply(metaData.detailConfig,{formInstanceId:record.get('formInstanceId'),taskDefinitionKey:record.get('taskDefinitionKey')})
        	        	var detailList = Ext.create(metaData.detailType,metaData.detailConfig);
            	        var detailsContainer = Ext.create('Ext.container.Container',  {
            	            "xtype": "container",
            	            "anchor": "98%",
            	            "items": [detailList]
            	        });
        	        	
        	        	metaData.items.push(detailsContainer);
        	        }
        	        var metaFrom = Ext.create("tms.base.Form",metaData); 
        	        
        	        var taskProcWin = Ext.create('tms.view.bpm.TaskProcessWindow',{'mainForm':metaFrom});
        	        taskProcWin.width = Ext.getBody().getViewSize().width;
        	        taskProcWin.height = Ext.getBody().getViewSize().height * 0.9;
        	        
                    var historicActivities = Ext.ComponentQuery.query('historicActivityList')[0];
                    historicActivities.store.load({params:{
                    	processInstanceId: record.get("processInstanceId")
            	    }});
                    
                    var mailMessages = Ext.ComponentQuery.query('mailMessageList')[0];
                    mailMessages.resId = record.get('formInstanceId');
                    mailMessages.msgView.store.load({params:{
                    	resId: record.get('formInstanceId')
            	    }});
                    
        	    	Ext.Ajax.request({
        	        	url: tms.getContextPath() + '/api/formInstance/' + record.get('formInstanceId'),
        	            method: 'GET',
        	            success: function(result, request) {
        	            	var json = Ext.decode(result.responseText);
        	                var formInstance = Ext.create("tms.model.FormInstance",json);	                
        	                metaFrom.loadRecord(formInstance);
        	            }
        	    	});
        	    	
        	        taskProcWin.setTitle("处理任务："+record.get("title"));
                    taskProcWin.show();
        		}
        	});
            
        } else {
        	tms.notify("请在列表中选择一个要处理的任务");
        }
    },
    
    viewTask:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('taskList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
    	
        if(record) {
        	var tasViewWin = Ext.create('tms.view.bpm.TaskViewWindow');
        	tasViewWin.width = Ext.getBody().getViewSize().width * 0.9;
        	tasViewWin.height = Ext.getBody().getViewSize().height * 0.9;
        	
            var form = Ext.ComponentQuery.query('salesOrderViewForm')[0];
            
	    	Ext.Ajax.request({
	        	url: tms.getContextPath() + '/api/formInstance/' + record.get("formInstanceId"),
	            method: 'GET',
	            success: function(result, request) {
	            	var json = Ext.decode(result.responseText);
	                var formInstance = Ext.create("tms.model.FormInstance",json);	                
	                form.loadRecord(formInstance);
	            }
	    	});
            
            var orders = Ext.ComponentQuery.query('salesOrderEditorList')[0];
            if(grid.byme) {
            	orders.metaChange();
            }
            orders.formInstanceId = record.get('formInstanceId');
            orders.store.load({params:{
            	formInstanceId: orders.formInstanceId
    	    }});
            
            var historicActivities = Ext.ComponentQuery.query('historicActivityList')[0];
            
        	historicActivities.store.load({params:{
        		processInstanceId: record.get("processInstanceId")
        		//销售不看流程详细处理流程
        		//ignoreStep:grid.byme
        	}});            	
            
            //发起人不能查看办理意见
            if(!grid.byme) {
	            var mailMessages = Ext.ComponentQuery.query('mailMessageList')[0];
	            mailMessages.msgView.store.load({params:{
	            	resId: record.get('formInstanceId')
	    	    }});
            }

            tasViewWin.setTitle("查看流程："+record.get("title"));
            tasViewWin.show();
            
        } else {
        	tms.notify("请在列表中选择一个要查看的任务");
        }
    },

    onItemClick:function (me, record, item, index, e, eOpts) {
    	//选中分类，则显示该分类下的待办事项
    	if(record.data.leaf) {
    		
    		var taskGrid = Ext.ComponentQuery.query('taskList')[0];
    		taskGrid.store.clearFilter();
    		taskGrid.store.load({params:{
    			assignment: record.data.id
    	    }});
    		
    		var claimButton = Ext.ComponentQuery.query('taskList button[action=claim]')[0];
    		var processButton = Ext.ComponentQuery.query('taskList button[action=process]')[0];
    		var viewButton = Ext.ComponentQuery.query('taskList button[action=view]')[0];
    		if(record.data.id == 'GROUP') {
    			claimButton.enable();
    		} else {
    			claimButton.setDisabled(true);
    		}
    		
    		if(record.data.id == 'MY') {
    			processButton.enable();
    		} else {
    			processButton.setDisabled(true);
    		}
    		
    		if(record.data.id == 'GROUP' || record.data.id == 'DONE' || record.data.id == 'BYME') {
    			viewButton.enable();
    			if(record.data.id == 'BYME') {
    				taskGrid.byme = true;
    			} else {
    				taskGrid.byme = false;
    			}
    		} else {
    			viewButton.setDisabled(true);
    		}
    		
    	}
    },
    onItemDblClick:function (me, record, item, index, e, eOpts) {
    	//双击分类，弹出分类的修改窗口以及分类的规格
    	if(record.data.leaf) {
    		
    	}
    },
    
    onProcessAdminItemClick:function (me, record, item, index, e, eOpts) {
    	//选中分类，则显示该分类下的待办事项
    	if(record.data.leaf) {
    		alert("test");
    		
    		var procAdminGrid = Ext.ComponentQuery.query('processAdminList')[0];
    		procAdminGrid.store.clearFilter();
    		procAdminGrid.store.load({params:{
    			processKey: record.data.id
    	    }});
    		
    	}
    },
    
    onSeriesClick:function (me, record, item, index, e, eOpts) {
    	if(record) {
    		var seriesSpecGrid = Ext.ComponentQuery.query('seriesSpecList')[0];
    		seriesSpecGrid.store.clearFilter();
    		seriesSpecGrid.store.load({params:{
    			seriesCode: record.data.id
    	    }});
    	}
    },

    onStartForm:function (me, e, eOpts) {
    	
        var grid = Ext.ComponentQuery.query('processDefPanel')[0];
        if(grid.getSelectionModel().getCount() == 0) grid.getSelectionModel().select(0);
        var record = grid.getSelectionModel().getSelection()[0];        
        if(record) {
	    	//创建或获取表单实例
	    	Ext.Ajax.request({
	        	url: tms.getContextPath() + '/api/bpm/startForm',
	            method: 'GET',
	            params: {
	            	processDefinitionId:record.get("id")
	            },
	            success: function(result, request) {
	            	var json = Ext.decode(result.responseText);
	            	var taskDetailWin = Ext.create('tms.view.bpm.TaskDetailWindow');
	            	taskDetailWin.width = Ext.getBody().getViewSize().width * 0.9;
	            	taskDetailWin.height = Ext.getBody().getViewSize().height * 0.9;
	            	
	                var form = Ext.ComponentQuery.query('salesOrderProcessForm')[0];	                
	                var formInstance = Ext.create("tms.model.FormInstance",json.data[0]);	                
	                form.loadRecord(formInstance);
	                
	                var orders = Ext.ComponentQuery.query('salesOrderList')[0];
	                orders.formInstanceId = formInstance.get('id');
	                orders.store.load({params:{
	                	formInstanceId: orders.formInstanceId
	        	    }});

	                taskDetailWin.setTitle("启动"+record.get("name")+"流程");
	                taskDetailWin.show();
	                
	            }
	    	});
        } else {
        	tms.notify("请选择一个要发起的流程");
        }

    	
    },
    
    onStartProcess:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('salesOrderProcessForm')[0];
        
        var formInstance = formPanel.getForm().getRecord();
        
        formPanel.getForm().updateRecord(formInstance);
        
        if(formInstance.get("title") == "") {
        	tms.notify("客户名称不能为空.");
        	return false;
        }        
        //判断明细表是否导入了数据
        var orders = Ext.ComponentQuery.query('salesOrderList')[0];
        if(orders.store.getCount() == 0) {
        	tms.notify("待处理的产品信息不能为空.");
        	return false;
        }
        


        
        Ext.MessageBox.confirm(
                i18n.t('small_hint'),
                '是否确认启动当前流程?',
                function (btn) {
                    if (btn == "yes") {
                    	Ext.Ajax.request({
                        	url: tms.getContextPath() + '/api/bpm/processes',
                            method: 'POST',
                            jsonData: {"data":formInstance.getData()},
                            success: function(result, request) {            	
                            	Ext.ComponentQuery.query('bpmTaskWindow')[0].close();
                            	tms.notify("已经成功启动了[" + formInstance.get("title") + "]的订单处理流程","成功发起流程");
                            },
                            scope:this
                    	});
                    }
                }, this);
        
        

    },
    
    deleteSalesOrder:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('salesOrderProcessForm')[0];
        
        var formInstance = formPanel.getForm().getRecord();
        
        Ext.MessageBox.confirm(
                i18n.t('small_hint'),
                '是否确认删除所有导入的产品信息?',
                function (btn) {
                    if (btn == "yes") {
                    	Ext.Ajax.request({
                        	url: tms.getContextPath() + '/api/salesOrder/delete',
                            method: 'POST',
            	            params: {
            	            	formInstanceId:formInstance.get("id")
            	            },
                            success: function(result, request) {            	
            	                var orders = Ext.ComponentQuery.query('salesOrderList')[0];
            	                orders.formInstanceId = formInstance.get('id');
            	                orders.store.load({params:{
            	                	formInstanceId: orders.formInstanceId
            	        	    }});
                            },
                            scope:this
                    	});
                    }
                }, this);
        
    },
    
    completeTask:function (me, e, eOpts) {
    	
    	var taskProcWin = Ext.ComponentQuery.query('bpmTaskProcessWindow')[0];    	
        var formPanel = taskProcWin.mainForm;        
        var formInstance = formPanel.getForm().getRecord();        
        formPanel.getForm().updateRecord(formInstance);
        
        var grid = Ext.ComponentQuery.query('taskList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
    	
        Ext.MessageBox.confirm(
                i18n.t('small_hint'),
                '是否确认完成当前的任务?',
                function (btn) {
                    if (btn == "yes") {
                    	Ext.Ajax.request({
                        	url: tms.getContextPath() + '/api/bpm/complete',
                            method: 'POST',
                            jsonData: {"data":formInstance.getData(),"taskId":record.get("id")},
                            success: function(result, request) {            	
                            	//完成任务的处理，关闭弹出窗口
                            	taskProcWin.close();
                            	tms.notify("已经成功处理了[" + formInstance.get("title") + "]的订单","任务处理");
                            	grid.store.clearFilter();
                            	grid.store.load({params:{
                        			assignment: 'MY'
                        	    }});
                            },
                            scope:this
                    	});
                    }
                }, this);
        

    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('salesOrderProcessForm')[0];
        
        var formInstance = formPanel.getForm().getRecord();
        
        formPanel.getForm().updateRecord(formInstance);
        
	   	 formInstance.save({
	         success:function () {
	         	//暂时保存流程表单，关闭弹出窗口
	         	Ext.ComponentQuery.query('bpmTaskWindow')[0].close();
	         },
	         failure:function (form, action) {
	             switch (action.failureType) {
	                 case Ext.form.action.Action.CLIENT_INVALID:
	                     Ext.Msg.alert(i18n.t('Failure!'), i18n.t('Check all your fields.'));
	                     break;
	                 case Ext.form.action.Action.CONNECT_FAILURE:
	                     Ext.Msg.alert(i18n.t('Failure!'), i18n.t('AJAX communication problem.'));
	                     break;
	                 case Ext.form.action.Action.SERVER_INVALID:
	                     Ext.Msg.alert(i18n.t('Failure!'), action.result.msg);
	             }
	         },
	         scope:this
	     });
        
       
    },
    _closeWin:function () {
        if(Ext.ComponentQuery.query('bpmTaskWindow')[0]) {
        	Ext.ComponentQuery.query('bpmTaskWindow')[0].close();
        }
        
        if(Ext.ComponentQuery.query('bpmTaskProcessWindow')[0]) {
        	Ext.ComponentQuery.query('bpmTaskProcessWindow')[0].close();
        }

    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});


