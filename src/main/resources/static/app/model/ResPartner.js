Ext.define('tms.model.ResPartner', {
    extend:'Ext.data.Model',
    proxy: tms.getAjaxProxy('resPartner'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'name', type:'string'}
    		,{name:'displayName', type:'string'}
    		,{name:'companyId', type:'string'}
    		,{name:'companyName', type:'string'}
    		,{name:'comment', type:'string'}
    		,{name:'website', type:'string'}
    		,{name:'email', type:'string'}
    		,{name:'job', type:'string'}
    		,{name:'createDate', type:'date', dateFormat: 'time'}
    		,{name:'color', type:'string'}
    		,{name:'active', type:'string'}
    		,{name:'isSupplier', type:'string'}
    		,{name:'isCompany', type:'string'}
    		,{name:'isEmployee', type:'string'}
    		,{name:'isCustomer', type:'string'}
    		,{name:'city', type:'string'}
    		,{name:'street', type:'string'}
    		,{name:'zip', type:'string'}
    		,{name:'fax', type:'string'}
    		,{name:'phone', type:'string'}
    		,{name:'mobile', type:'string'}
    		,{name:'title', type:'string'}
    		,{name:'countryId', type:'string'}
    		,{name:'parentId', type:'string'}
    		,{name:'userId', type:'string'}
    		,{name:'creditLimit', type:'string'}
    		,{name:'invoiceWarn', type:'string'}
    		,{name:'invoiceWarnMsg', type:'string'}
    		,{name:'pickingWarn', type:'string'}
    		,{name:'pickingWarnMsg', type:'string'}
    		,{name:'purchaseWarn', type:'string'}
    		,{name:'purchaseWarnMsg', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});