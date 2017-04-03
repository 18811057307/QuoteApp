Ext.setVersion("ext-theme-base", "4.2.1");
Ext.setVersion("ext-theme-neptune", "4.2.1");
Ext.setVersion("ext-theme-neutral", "4.2.1");

Ext.define('tms', {
    singleton:true,
    notify:function (msg, title, level) {
        //info,warning,error,success
        if (!level) {
            level = 'info';
        }

        if (!title) {
            title = i18n.t('Notification');
        }

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
    },
    getAjaxProxy:function (model) {
        var obj = {
            listeners:{
                exception:function (proxy, response, operation) {
                }
            },
            type:'ajax',
            api:{
                read:tms.getContextPath() + '/index.php?r=' + model + '/_crudopr&opr=r',
                create:tms.getContextPath() + '/index.php?r=' + model + '/_crudopr&opr=c',
                update:tms.getContextPath() + '/index.php?r=' + model + '/_crudopr&opr=u',
                destroy:tms.getContextPath() + '/index.php?r=' + model + '/_crudopr&opr=d'
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
    getContextPath:function () {
        return contextPath;
    },
    getRequiredTpl:function () {
        return '<span style="color:red;font-weight:bold" data-qtip="' + i18n.t('required_field') + '">*</span>';
    }
});

Ext.define('tms.base.Form', {
    extend: Ext.form.Panel ,
                      
    layout: 'anchor',
    autoScroll: true,
    border:false,
    bodyStyle:'padding:10px',
    unstyled:true,
    fieldDefaults:{
        msgTarget:'side',
        labelWidth:75,
        labelAlign:'right',
        anchor: '95%'
    }
});

/**
 * FiltersFeature is a grid {@link Ext.grid.feature.Feature feature} that allows for a slightly more
 * robust representation of filtering than what is provided by the default store.
 *
 * Filtering is adjusted by the user using the grid's column header menu (this menu can be
 * disabled through configuration). Through this menu users can configure, enable, and
 * disable filters for each column.
 *
 * #Features#
 *
 * ##Filtering implementations:##
 *
 * Default filtering for Strings, Numeric Ranges, Date Ranges, Lists (which can be backed by a
 * {@link Ext.data.Store}), and Boolean. Additional custom filter types and menus are easily
 * created by extending {@link Ext.ux.grid.filter.Filter}.
 *
 * ##Graphical Indicators:##
 *
 * Columns that are filtered have {@link #filterCls a configurable css class} applied to the column headers.
 *
 * ##Automatic Reconfiguration:##
 *
 * Filters automatically reconfigure when the grid 'reconfigure' event fires.
 *
 * ##Stateful:##
 *
 * Filter information will be persisted across page loads by specifying a `stateId`
 * in the Grid configuration.
 *
 * The filter collection binds to the {@link Ext.grid.Panel#beforestaterestore beforestaterestore}
 * and {@link Ext.grid.Panel#beforestatesave beforestatesave} events in order to be stateful.
 *
 * ##GridPanel Changes:##
 *
 * - A `filters` property is added to the GridPanel using this feature.
 * - A `filterupdate` event is added to the GridPanel and is fired upon onStateChange completion.
 *
 * ##Server side code examples:##
 *
 * - [PHP](http://www.vinylfox.com/extjs/grid-filter-php-backend-code.php) - (Thanks VinylFox)
 * - [Ruby on Rails](http://extjs.com/forum/showthread.php?p=77326#post77326) - (Thanks Zyclops)
 * - [Ruby on Rails](http://extjs.com/forum/showthread.php?p=176596#post176596) - (Thanks Rotomaul)
 *
 * #Example usage:#
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         pageSize: 15
 *         ...
 *     });
 *
 *     var filtersCfg = {
 *         ftype: 'filters',
 *         autoReload: false, //don't reload automatically
 *         local: true, //only filter locally
 *         // filters may be configured through the plugin,
 *         // or in the column definition within the headers configuration
 *         filters: [{
 *             type: 'numeric',
 *             dataIndex: 'id'
 *         }, {
 *             type: 'string',
 *             dataIndex: 'name'
 *         }, {
 *             type: 'numeric',
 *             dataIndex: 'price'
 *         }, {
 *             type: 'date',
 *             dataIndex: 'dateAdded'
 *         }, {
 *             type: 'list',
 *             dataIndex: 'size',
 *             options: ['extra small', 'small', 'medium', 'large', 'extra large'],
 *             phpMode: true
 *         }, {
 *             type: 'boolean',
 *             dataIndex: 'visible'
 *         }]
 *     };
 *
 *     var grid = Ext.create('Ext.grid.Panel', {
 *          store: store,
 *          columns: ...,
 *          features: [filtersCfg],
 *          height: 400,
 *          width: 700,
 *          bbar: Ext.create('Ext.PagingToolbar', {
 *              store: store
 *          })
 *     });
 *
 *     // a filters property is added to the GridPanel
 *     grid.filters
 */
Ext.define('Ext.ux.grid.FiltersFeature', {
    extend:  Ext.grid.feature.Feature ,
    alias: 'feature.filters',
           
                                    
                                     
                                           
                                        
                                            
                                        
                                           
                                         
      

    /**
     * @cfg {Boolean} autoReload
     * Defaults to true, reloading the datasource when a filter change happens.
     * Set this to false to prevent the datastore from being reloaded if there
     * are changes to the filters.  See <code>{@link #updateBuffer}</code>.
     */
    autoReload : true,
    /**
     * @cfg {Boolean} encode
     * Specify true for {@link #buildQuery} to use Ext.util.JSON.encode to
     * encode the filter query parameter sent with a remote request.
     * Defaults to false.
     */
    /**
     * @cfg {Array} filters
     * An Array of filters config objects. Refer to each filter type class for
     * configuration details specific to each filter type. Filters for Strings,
     * Numeric Ranges, Date Ranges, Lists, and Boolean are the standard filters
     * available.
     */
    /**
     * @cfg {String} filterCls
     * The css class to be applied to column headers with active filters.
     * Defaults to <tt>'ux-filterd-column'</tt>.
     */
    filterCls : 'ux-filtered-column',
    /**
     * @cfg {Boolean} local
     * <tt>true</tt> to use Ext.data.Store filter functions (local filtering)
     * instead of the default (<tt>false</tt>) server side filtering.
     */
    local : false,
    /**
     * @cfg {String} menuFilterText
     * defaults to <tt>'Filters'</tt>.
     */
    menuFilterText : 'Filters',
    /**
     * @cfg {String} paramPrefix
     * The url parameter prefix for the filters.
     * Defaults to <tt>'filter'</tt>.
     */
    paramPrefix : 'filter',
    /**
     * @cfg {Boolean} showMenu
     * Defaults to true, including a filter submenu in the default header menu.
     */
    showMenu : true,
    /**
     * @cfg {String} stateId
     * Name of the value to be used to store state information.
     */
    stateId : undefined,
    /**
     * @cfg {Number} updateBuffer
     * Number of milliseconds to defer store updates since the last filter change.
     */
    updateBuffer : 500,

    // doesn't handle grid body events
    hasFeatureEvent: false,


    /** @private */
    constructor : function (config) {
        var me = this;

        config = config || {};
        Ext.apply(me, config);

        me.deferredUpdate = Ext.create('Ext.util.DelayedTask', me.reload, me);

        // Init filters
        me.filters = me.createFiltersCollection();
        me.filterConfigs = config.filters;
    },

    init: function(grid) {
        var me = this,
            view = me.view,
            headerCt = view.headerCt;

        me.bindStore(view.getStore(), true);

        // Listen for header menu being created
        headerCt.on('menucreate', me.onMenuCreate, me);

        view.on('refresh', me.onRefresh, me);
        grid.on({
            scope: me,
            beforestaterestore: me.applyState,
            beforestatesave: me.saveState,
            beforedestroy: me.destroy
        });

        // Add event and filters shortcut on grid panel
        grid.filters = me;
        grid.addEvents('filterupdate');
    },

    createFiltersCollection: function () {
        return Ext.create('Ext.util.MixedCollection', false, function (o) {
            return o ? o.dataIndex : null;
        });
    },

    /**
     * @private Create the Filter objects for the current configuration, destroying any existing ones first.
     */
    createFilters: function() {
        var me = this,
            hadFilters = me.filters.getCount(),
            grid = me.getGridPanel(),
            filters = me.createFiltersCollection(),
            model = grid.store.model,
            fields = model.prototype.fields,
            field,
            filter,
            state;

        if (hadFilters) {
            state = {};
            me.saveState(null, state);
        }

        function add (dataIndex, config, filterable) {
            if (dataIndex && (filterable || config)) {
                field = fields.get(dataIndex);
                filter = {
                    dataIndex: dataIndex,
                    type: (field && field.type && field.type.type) || 'auto'
                };

                if (Ext.isObject(config)) {
                    Ext.apply(filter, config);
                }

                filters.replace(filter);
            }
        }

        // We start with filters from our config
        Ext.Array.each(me.filterConfigs, function (filterConfig) {
            add(filterConfig.dataIndex, filterConfig);
        });

        // Then we merge on filters from the columns in the grid. The columns' filters take precedence.
        Ext.Array.each(grid.columns, function (column) {
            if (column.filterable === false) {
                filters.removeAtKey(column.dataIndex);
            } else {
                add(column.dataIndex, column.filter, column.filterable);
            }
        });
        

        me.removeAll();
        if (filters.items) {
            me.initializeFilters(filters.items);
        }

        if (hadFilters) {
            me.applyState(null, state);
        }
    },

    /**
     * @private
     */
    initializeFilters: function(filters) {
        var me = this,
            filtersLength = filters.length,
            i, filter, FilterClass;

        for (i = 0; i < filtersLength; i++) {
            filter = filters[i];
            if (filter) {
                FilterClass = me.getFilterClass(filter.type);
                filter = filter.menu ? filter : new FilterClass(filter);
                me.filters.add(filter);
                Ext.util.Observable.capture(filter, this.onStateChange, this);
            }
        }
    },

    /**
     * @private Handle creation of the grid's header menu. Initializes the filters and listens
     * for the menu being shown.
     */
    onMenuCreate: function(headerCt, menu) {
        var me = this;
        me.createFilters();
        menu.on('beforeshow', me.onMenuBeforeShow, me);
    },

    /**
     * @private Handle showing of the grid's header menu. Sets up the filter item and menu
     * appropriate for the target column.
     */
    onMenuBeforeShow: function(menu) {
        var me = this,
            menuItem, filter;

        if (me.showMenu) {
            menuItem = me.menuItem;
            if (!menuItem || menuItem.isDestroyed) {
                me.createMenuItem(menu);
                menuItem = me.menuItem;
            }

            filter = me.getMenuFilter();

            if (filter) {
                menuItem.setMenu(filter.menu, false);
                menuItem.setChecked(filter.active);
                // disable the menu if filter.disabled explicitly set to true
                menuItem.setDisabled(filter.disabled === true);
            }
            menuItem.setVisible(!!filter);
            this.sep.setVisible(!!filter);
        }
    },


    createMenuItem: function(menu) {
        var me = this;
        me.sep  = menu.add('-');
        me.menuItem = menu.add({
            checked: false,
            itemId: 'filters',
            text: me.menuFilterText,
            listeners: {
                scope: me,
                checkchange: me.onCheckChange,
                beforecheckchange: me.onBeforeCheck
            }
        });
    },

    getGridPanel: function() {
        return this.view.up('gridpanel');
    },

    /**
     * @private
     * Handler for the grid's beforestaterestore event (fires before the state of the
     * grid is restored).
     * @param {Object} grid The grid object
     * @param {Object} state The hash of state values returned from the StateProvider.
     */
    applyState : function (grid, state) {
        var me = this,
            key, filter;
        me.applyingState = true;
        me.clearFilters();
        if (state.filters) {
            for (key in state.filters) {
                if (state.filters.hasOwnProperty(key)) {
                    filter = me.filters.get(key);
                    if (filter) {
                        filter.setValue(state.filters[key]);
                        filter.setActive(true);
                    }
                }
            }
        }
        me.deferredUpdate.cancel();
        if (me.local) {
            me.reload();
        }
        delete me.applyingState;
        delete state.filters;
    },

    /**
     * Saves the state of all active filters
     * @param {Object} grid
     * @param {Object} state
     * @return {Boolean}
     */
    saveState : function (grid, state) {
        var filters = {};
        this.filters.each(function (filter) {
            if (filter.active) {
                filters[filter.dataIndex] = filter.getValue();
            }
        });
        return (state.filters = filters);
    },

    /**
     * @private
     * Handler called by the grid 'beforedestroy' event
     */
    destroy : function () {
        var me = this;
        Ext.destroyMembers(me, 'menuItem', 'sep');
        me.removeAll();
        me.clearListeners();
    },

    /**
     * Remove all filters, permanently destroying them.
     */
    removeAll : function () {
        if(this.filters){
            Ext.destroy.apply(Ext, this.filters.items);
            // remove all items from the collection
            this.filters.clear();
        }
    },


    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this view
     */
    bindStore : function(store) {
        var me = this;

        // Unbind from the old Store
        if (me.store && me.storeListeners) {
            me.store.un(me.storeListeners);
        }

        // Set up correct listeners
        if (store) {
            me.storeListeners = {
                scope: me
            };
            if (me.local) {
                me.storeListeners.load = me.onLoad;
            } else {
                me.storeListeners['before' + (store.buffered ? 'prefetch' : 'load')] = me.onBeforeLoad;
            }
            store.on(me.storeListeners);
        } else {
            delete me.storeListeners;
        }
        me.store = store;
    },

    /**
     * @private
     * Get the filter menu from the filters MixedCollection based on the clicked header
     */
    getMenuFilter : function () {
        var header = this.view.headerCt.getMenu().activeHeader;
        return header ? this.filters.get(header.dataIndex) : null;
    },

    /** @private */
    onCheckChange : function (item, value) {
        this.getMenuFilter().setActive(value);
    },

    /** @private */
    onBeforeCheck : function (check, value) {
        return !value || this.getMenuFilter().isActivatable();
    },

    /**
     * @private
     * Handler for all events on filters.
     * @param {String} event Event name
     * @param {Object} filter Standard signature of the event before the event is fired
     */
    onStateChange : function (event, filter) {
        if (event !== 'serialize') {
            var me = this,
                grid = me.getGridPanel();

            if (filter == me.getMenuFilter()) {
                me.menuItem.setChecked(filter.active, false);
            }

            if ((me.autoReload || me.local) && !me.applyingState) {
                me.deferredUpdate.delay(me.updateBuffer);
            }
            me.updateColumnHeadings();

            if (!me.applyingState) {
                grid.saveState();
            }
            grid.fireEvent('filterupdate', me, filter);
        }
    },

    /**
     * @private
     * Handler for store's beforeload event when configured for remote filtering
     * @param {Object} store
     * @param {Object} options
     */
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        this.cleanParams(options.params);
        var params = this.buildQuery(this.getFilterData());
        Ext.apply(options.params, params);
    },

    /**
     * @private
     * Handler for store's load event when configured for local filtering
     * @param {Object} store
     */
    onLoad : function (store) {
        store.filterBy(this.getRecordFilter());
    },

    /**
     * @private
     * Handler called when the grid's view is refreshed
     */
    onRefresh : function () {
        this.updateColumnHeadings();
    },

    /**
     * Update the styles for the header row based on the active filters
     */
    updateColumnHeadings : function () {
        var me = this,
            headerCt = me.view.headerCt;
        if (headerCt) {
            headerCt.items.each(function(header) {
                var filter = me.getFilter(header.dataIndex);
                header[filter && filter.active ? 'addCls' : 'removeCls'](me.filterCls);
            });
        }
    },

    /** @private */
    reload : function () {
        var me = this,
            store = me.view.getStore();

        if (me.local) {
            store.clearFilter(true);
            store.filterBy(me.getRecordFilter());
            store.sort();
        } else {
            me.deferredUpdate.cancel();
            if (store.buffered) {
                store.pageMap.clear();
            }
            store.loadPage(1);
        }
    },

    /**
     * Method factory that generates a record validator for the filters active at the time
     * of invokation.
     * @private
     */
    getRecordFilter : function () {
        var f = [], len, i;
        this.filters.each(function (filter) {
            if (filter.active) {
                f.push(filter);
            }
        });

        len = f.length;
        return function (record) {
            for (i = 0; i < len; i++) {
                if (!f[i].validateRecord(record)) {
                    return false;
                }
            }
            return true;
        };
    },

    /**
     * Adds a filter to the collection and observes it for state change.
     * @param {Object/Ext.ux.grid.filter.Filter} config A filter configuration or a filter object.
     * @return {Ext.ux.grid.filter.Filter} The existing or newly created filter object.
     */
    addFilter : function (config) {
        var me = this,
            columns = me.getGridPanel().columns,
            i, columnsLength, column, filtersLength, filter;

        
        for (i = 0, columnsLength = columns.length; i < columnsLength; i++) {
            column = columns[i];
            if (column.dataIndex === config.dataIndex) {
                column.filter = config;
            }
        }
        
        if (me.view.headerCt.menu) {
            me.createFilters();
        } else {
            // Call getMenu() to ensure the menu is created, and so, also are the filters. We cannot call
            // createFilters() withouth having a menu because it will cause in a recursion to applyState()
            // that ends up to clear all the filter values. This is likely to happen when we reorder a column
            // and then add a new filter before the menu is recreated.
            me.view.headerCt.getMenu();
        }
        
        for (i = 0, filtersLength = me.filters.items.length; i < filtersLength; i++) {
            filter = me.filters.items[i];
            if (filter.dataIndex === config.dataIndex) {
                return filter;
            }
        }
    },

    /**
     * Adds filters to the collection.
     * @param {Array} filters An Array of filter configuration objects.
     */
    addFilters : function (filters) {
        if (filters) {
            var me = this,
                i, filtersLength;
            for (i = 0, filtersLength = filters.length; i < filtersLength; i++) {
                me.addFilter(filters[i]);
            }
        }
    },

    /**
     * Returns a filter for the given dataIndex, if one exists.
     * @param {String} dataIndex The dataIndex of the desired filter object.
     * @return {Ext.ux.grid.filter.Filter}
     */
    getFilter : function (dataIndex) {
        return this.filters.get(dataIndex);
    },

    /**
     * Turns all filters off. This does not clear the configuration information
     * (see {@link #removeAll}).
     */
    clearFilters : function () {
        this.filters.each(function (filter) {
            filter.setActive(false);
        });
    },

    getFilterItems: function () {
        var me = this;

        // If there's a locked grid then we must get the filter items for each grid.
        if (me.lockingPartner) {
            return me.filters.items.concat(me.lockingPartner.filters.items);
        }

        return me.filters.items;
    },

    /**
     * Returns an Array of the currently active filters.
     * @return {Array} filters Array of the currently active filters.
     */
    getFilterData : function () {
        var items = this.getFilterItems(),
            filters = [],
            n, nlen, item, d, i, len;

        for (n = 0, nlen = items.length; n < nlen; n++) {
            item = items[n];
            if (item.active) {
                d = [].concat(item.serialize());
                for (i = 0, len = d.length; i < len; i++) {
                    filters.push({
                        field: item.dataIndex,
                        data: d[i]
                    });
                }
            }
        }
        return filters;
    },

    /**
     * Function to take the active filters data and build it into a query.
     * The format of the query depends on the {@link #encode} configuration:
     *
     *   - `false` (Default) :
     *     Flatten into query string of the form (assuming <code>{@link #paramPrefix}='filters'</code>:
     *
     *         filters[0][field]="someDataIndex"&
     *         filters[0][data][comparison]="someValue1"&
     *         filters[0][data][type]="someValue2"&
     *         filters[0][data][value]="someValue3"&
     *
     *
     *   - `true` :
     *     JSON encode the filter data
     *
     *         {filters:[{"field":"someDataIndex","comparison":"someValue1","type":"someValue2","value":"someValue3"}]}
     *
     * Override this method to customize the format of the filter query for remote requests.
     *
     * @param {Array} filters A collection of objects representing active filters and their configuration.
     * Each element will take the form of {field: dataIndex, data: filterConf}. dataIndex is not assured
     * to be unique as any one filter may be a composite of more basic filters for the same dataIndex.
     *
     * @return {Object} Query keys and values
     */
    buildQuery : function (filters) {
        var p = {}, i, f, root, dataPrefix, key, tmp,
            len = filters.length;

        if (!this.encode){
            for (i = 0; i < len; i++) {
                f = filters[i];
                root = [this.paramPrefix, '[', i, ']'].join('');
                p[root + '[field]'] = f.field;

                dataPrefix = root + '[data]';
                for (key in f.data) {
                    p[[dataPrefix, '[', key, ']'].join('')] = f.data[key];
                }
            }
        } else {
            tmp = [];
            for (i = 0; i < len; i++) {
                f = filters[i];
                tmp.push(Ext.apply(
                    {},
                    {field: f.field},
                    f.data
                ));
            }
            // only build if there is active filter
            if (tmp.length > 0){
                p[this.paramPrefix] = Ext.JSON.encode(tmp);
            }
        }
        return p;
    },

    /**
     * Removes filter related query parameters from the provided object.
     * @param {Object} p Query parameters that may contain filter related fields.
     */
    cleanParams : function (p) {
        // if encoding just delete the property
        if (this.encode) {
            delete p[this.paramPrefix];
        // otherwise scrub the object of filter data
        } else {
            var regex, key;
            regex = new RegExp('^' + this.paramPrefix + '\[[0-9]+\]');
            for (key in p) {
                if (regex.test(key)) {
                    delete p[key];
                }
            }
        }
    },

    /**
     * Function for locating filter classes, overwrite this with your favorite
     * loader to provide dynamic filter loading.
     * @param {String} type The type of filter to load ('Filter' is automatically
     * appended to the passed type; eg, 'string' becomes 'StringFilter').
     * @return {Function} The Ext.ux.grid.filter.Class
     */
    getFilterClass : function (type) {
        // map the supported Ext.data.Field type values into a supported filter
        switch(type) {
            case 'auto':
              type = 'string';
              break;
            case 'int':
            case 'float':
              type = 'numeric';
              break;
            case 'bool':
              type = 'boolean';
              break;
        }
        return Ext.ClassManager.getByAlias('gridfilter.' + type);
    }
});

Ext.define('tms.base.Grid', {
    extend: Ext.grid.Panel ,
                      
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    features : [{ftype: 'filters',encode: true}],
    initComponent: function() {
        this.dockedItems = new Array();
        if (this.showTopToolbar) {
            this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
                dock: 'top',
                enableOverflow: true,
                items: [
                    {
                        xtype: 'button',
                        text: i18n.t("button_create"),
                        action: 'create',
                        iconCls: 'add'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'update',
                        text: i18n.t("button_update"),
                        iconCls: 'option'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'delete',
                        text: i18n.t("button_delete"),
                        iconCls: 'remove'
                    },
                    {
                        xtype: 'button',
                        text: i18n.t("button_refresh"),
                        action: 'refresh',
                        iconCls: 'refresh'
                    }]
            });
            this.dockedItems.push(this.topToolbar);
        }

        if(this.showBottomToolbar) {
            this.bottomToolbar = Ext.create("Ext.toolbar.Paging", {
                store: this.store,
                enableOverflow: true,
                dock: 'bottom',
                displayInfo: true
            });
            this.dockedItems.push(this.bottomToolbar);
        }

        this.callParent(arguments);
    }
});

/**
 * Created by JetBrains PhpStorm.
 * User: qingt
 * Date: 13-3-18
 * Time: 下午2:01
 * To change this template use File | Settings | File Templates.
 */
Ext.define('tms.base.Store', {
    extend:  Ext.data.Store ,
                      
    autoLoad: false,
    pagesize: 20,
    sorters: [{
        property: 'id',
        direction: 'DESC'
    }]
});

/**
 * Created by JetBrains PhpStorm.
 * User: qingt
 * Date: 13-3-18
 * Time: 下午9:55
 * To change this template use File | Settings | File Templates.
 */
Ext.define('tms.base.Window', {
    extend:  Ext.window.Window ,
                      
    autoScroll: true,
    animCollapse :false,
    modal: true,
    buttons: [
        { text: i18n.t('button_save'), action: 'submitForm' },
        { text: i18n.t('button_cancel'), action: 'cancelForm' }
    ],
    _setTitle:function (record) {
        var tmpTitle;
        if (record.phantom) {
            tmpTitle = Ext.String.format(i18n.t("entity_create"), this.title);
        } else {
            tmpTitle = Ext.String.format(i18n.t("entity_update"), this.title);
            var title = record.getRecordName();
            if (title !== "") {
                tmpTitle = tmpTitle + ": " + title;
            }
        }

        this.setTitle(tmpTitle);
    }
});

Ext.define('tms.model.Attachment', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('attachment'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'trip_id', type:'int'}
            ,{name:'property_id', type:'int'}
            ,{name:'room_classes_id', type:'int'}
            ,{name:'type', type:'string'}//图片[FIMG,IMG]，附件[FILE]
            ,{name:'title', type:'string'}
            ,{name:'description', type:'string'}
            ,{name:'sequence', type:'int'}
            ,{name:'createby', type:'string'}
            ,{name:'created', type:'date'}
    		,{name:'filename', type:'string'}
    		,{name:'extension', type:'string'}
    		,{name:'mime_type', type:'string'}
    		,{name:'byte_size', type:'int'}
        ],
    getRecordName: function () {
        return this.get("filename");
    }
});

Ext.define('tms.view.attachment.List', {
    extend: tms.base.Grid ,
    alias:'widget.attachmentList',
    store:'AttachmentStore',
    columns:[
		{width: 50,  header:i18n.t('attachment_created'), sortable:true, dataIndex:'created', filter:true}
		,{width: 50,  header:i18n.t('attachment_filename'), sortable:true, dataIndex:'filename', filter:true}
		,{width: 50,  header:i18n.t('attachment_extension'), sortable:true, dataIndex:'extension', filter:true}
		,{width: 50,  header:i18n.t('attachment_mime_type'), sortable:true, dataIndex:'mime_type', filter:true}
		,{width: 50,  header:i18n.t('attachment_byte_size'), sortable:true, dataIndex:'byte_size', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'AttachmentStore',
        displayInfo: true
    }]
});

Ext.define('tms.store.AttachmentStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Attachment',
    storeId: 'AttachmentStore',
    autoload:false
});

Ext.define('tms.controller.AttachmentController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.AttachmentStore'],
    models:['tms.model.Attachment'],
    views:['tms.view.attachment.List'],
    init:function (application) {
        this.control({
            'attachmentList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'attachmentList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'attachmentList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'attachmentList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'attachmentList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'attachmentUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'attachmentUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('attachmentUpdate button[action=submitForm]')[0];
        var deleteButton = Ext.ComponentQuery.query('attachmentUpdate button[action=cancelForm]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Attachment');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('attachmentList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.attachment.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('attachmentForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('AttachmentStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('attachmentList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('attachment') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('attachmentForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('attachmentUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.Company', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('company'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'email', type:'string'}
    		,{name:'mobile', type:'string'}
    		,{name:'tel', type:'string'}
    		,{name:'fax', type:'string'}
    		,{name:'activkey', type:'string'}
    		,{name:'credit_limit', type:'string'}
    		,{name:'status', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});

Ext.define('tms.view.company.List', {
    extend: Ext.grid.Panel ,
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    features : [{ftype: 'filters',encode: true}],
    alias:'widget.companyList',
    columns:[
		{width: 50,  header:i18n.t('company_name'), sortable:true, dataIndex:'name', filter:true}
    ],
    initComponent: function() {
        var companyStore = Ext.create('tms.store.CompanyStore');
        Ext.apply(this, {
            store: companyStore
        });

        this.dockedItems = new Array();
        if (this.showTopToolbar) {
            this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
                dock: 'top',
                enableOverflow: true,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        tooltip: i18n.t("button_create"),
                        iconCls: 'add'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'update',
                        tooltip: i18n.t("button_update"),
                        iconCls: 'option'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'delete',
                        tooltip: i18n.t("button_delete"),
                        iconCls: 'remove'
                    },
                    {
                        xtype: 'button',
                        action: 'refresh',
                        tooltip: i18n.t("button_refresh"),
                        iconCls: 'refresh'
                    }]
            });
            this.dockedItems.push(this.topToolbar);
        }

        if(this.showBottomToolbar) {
            this.bottomToolbar = Ext.create("Ext.toolbar.Paging", {
                store: this.store,
                enableOverflow: true,
                dock: 'bottom',
                displayInfo: true
            });
            this.dockedItems.push(this.bottomToolbar);
        }

        this.callParent(arguments);
    }
});

Ext.define('tms.store.CompanyStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Company',
    storeId: 'CompanyStore'
});

Ext.define('tms.controller.CompanyController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.CompanyStore'],
    models:['tms.model.Company'],
    views:['tms.view.company.List'],
    init:function (application) {
        this.control({
            'companyList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'companyList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'companyList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'companyList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'companyList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'companyUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'companyUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('companyList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('companyList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();

        var grid = Ext.ComponentQuery.query('companyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];

        var userGrid =  Ext.ComponentQuery.query('usersList')[0];

        userGrid.setCompanyRecord(record);
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Company');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('companyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.company.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('companyForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('CompanyStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('companyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint'),
            Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('company') + ":" + record.getRecordName()),
            function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('companyForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('companyUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.Dropdown', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('dropdown'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
            ,{name:'code', type:'string'}
            ,{name:'options', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});

Ext.define('tms.view.dropdown.List', {
    extend: tms.base.Grid ,
    alias:'widget.dropdownList',
    store:'DropdownStore',
    columns:[
		{width: 50,  header:i18n.t('dropdown_name'), sortable:true, dataIndex:'name', filter:true}
        ,{width: 50,  header:i18n.t('dropdown_code'), sortable:true, dataIndex:'code', filter:true}
		,{width: 50,  header:i18n.t('dropdown_options'), sortable:true, dataIndex:'options',renderer: function(value){
            var objs = Ext.JSON.decode(value), retStr = "";
            Ext.each(objs, function(item){
                retStr += item["display"] + ", ";
            });
            return retStr;
        }}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'DropdownStore',
        displayInfo: true
    }]
});

Ext.define('tms.view.dropdown.DropdownGrid', {
    extend: Ext.grid.Panel ,
    alias:'widget.dropdownGrid',
    isFormField:true,
    selModel:{mode:'SINGLE'},
    columnLines:true,
    border:true,
    showTopToolbar:true,
    columns: [{
        header: i18n.t('Sequence No'),
        dataIndex: 'sequence',
        flex:1,
        editor: {
            xtype: 'numberfield'
        }
    }, {
        header: i18n.t('dropdown_display'),
        dataIndex: 'display',
        flex:2,
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: i18n.t('dropdown_value'),
        dataIndex: 'value',
        flex:2,
        editor: {
            xtype: 'textfield'
        }
    }],
    initComponent: function() {
        var rowEdit = Ext.create("Ext.grid.plugin.RowEditing",{
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        this.dockedItems = new Array();
        if (this.showTopToolbar) {
            this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
                dock: 'top',
                enableOverflow: true,
                items: [
                    {
                        xtype: 'button',
                        text: i18n.t("button_create"),
                        action: 'create',
                        iconCls: 'add'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'delete',
                        text: i18n.t("button_delete"),
                        iconCls: 'remove'
                    }]
            });
            this.dockedItems.push(this.topToolbar);
        }
        this.plugins = new Array();
        this.plugins.push(rowEdit);
        this.store = Ext.create('tms.store.DropdownOptionStore');
        this.callParent(arguments);
    },
    setValue: function(val) {
        if(val && val != '') {
            this.store.loadRawData(Ext.JSON.decode(val));
        }
    },
    getValue: function() {
        var options = new Array();
        this.store.each(function(rec){
            options.push(rec.data);
        });
        return Ext.JSON.encode(options);
    },
    getName : function() {
        return this.name;
    },
    isValid : function() {
        return true;
    },
    validate: function() {
        return true;
    }
});

Ext.define('tms.store.DropdownStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Dropdown',
    storeId: 'DropdownStore'
});

Ext.define('tms.controller.DropdownController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.DropdownStore'],
    models:['tms.model.Dropdown'],
    views:['tms.view.dropdown.List','tms.view.dropdown.DropdownGrid'],
    init:function (application) {
        this.control({
            'dropdownList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },

            'dropdownList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'dropdownList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'dropdownList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'dropdownList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'dropdownUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'dropdownUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            },
            'dropdownGrid':{
                selectionchange:{
                    fn:this.ondropdownGridSelectionChange,
                    scope:this
                }
            },
            'dropdownGrid button[action=create]':{
                click:{
                    fn:this.onAddOption,
                    scope:this
                }
            },
            'dropdownGrid button[action=delete]':{
                click:{
                    fn:this.onDeleteOption,
                    scope:this
                }
            }

        });
        this._getStore().on("load",function(store, records, successful, eOpts) {
             records.forEach(function(ele,index,array){
                var options = Ext.JSON.decode(ele.get("options"));
                var keys =  Object.keys(options);
                keys.forEach(function(key){

                });
             });
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('dropdownList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('dropdownList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    ondropdownGridSelectionChange:function (me, e, eOpts) {
        var deleteButton = Ext.ComponentQuery.query('dropdownGrid button[action=delete]')[0];
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Dropdown');
        this._openUpdateWin(record);
    },

    onAddOption:function(me, e, eOpts) {
        var record = Ext.create('tms.model.DropdownOption');
        var dropdownGrid = Ext.ComponentQuery.query('dropdownGrid')[0];
        dropdownGrid.plugins[0].cancelEdit();
        dropdownGrid.store.insert(0, record);
        dropdownGrid.plugins[0].startEdit(0, 0);
    },

    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('dropdownList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.dropdown.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('dropdownForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('DropdownStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('dropdownList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('dropdown') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onDeleteOption:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('dropdownGrid')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('dropdown') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    grid.store.remove(record);
                    grid.store.sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('dropdownForm')[0];
        //formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isDirty()) {
            this._curRecord.beginEdit();
            this._curRecord.set("id",formPanel.getForm().findField('id').getValue());
            this._curRecord.set("name",formPanel.getForm().findField('name').getValue());
            this._curRecord.set("code",formPanel.getForm().findField('code').getValue());
            this._curRecord.set("options",formPanel.getForm().findField('options').getValue());
            this._curRecord.endEdit();
        }
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('dropdownUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.Insurance', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('insurance'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'price', type:'string'}
    		,{name:'term', type:'string'}
    		,{name:'desc', type:'string'}
    		,{name:'summary', type:'string'}
    		,{name:'seqence', type:'int'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});

Ext.define('tms.view.insurance.List', {
    extend: tms.base.Grid ,
    alias:'widget.insuranceList',
    store:'InsuranceStore',
    columns:[
		{width: 50,  header:i18n.t('insurance_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('insurance_price'), sortable:true, dataIndex:'price', filter:true}
		,{width: 50,  header:i18n.t('insurance_term'), sortable:true, dataIndex:'term', filter:true}
		,{width: 50,  header:i18n.t('insurance_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('insurance_summary'), sortable:true, dataIndex:'summary', filter:true}
		,{width: 50,  header:i18n.t('insurance_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'InsuranceStore',
        displayInfo: true
    }]
});

Ext.define('tms.store.InsuranceStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Insurance',
    storeId: 'InsuranceStore'
});

Ext.define('tms.controller.InsuranceController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.InsuranceStore'],
    models:['tms.model.Insurance'],
    views:['tms.view.insurance.List'],
    init:function (application) {
        this.control({
            'insuranceList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'insuranceList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'insuranceList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'insuranceList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'insuranceList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'insuranceUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'insuranceUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('insuranceList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('insuranceList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Insurance');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('insuranceList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.insurance.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('insuranceForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('InsuranceStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('insuranceList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('insurance') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('insuranceForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('insuranceUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.Users', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('users'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'username', type:'string'}
    		,{name:'password', type:'string'}
    		,{name:'email', type:'string'}
    		,{name:'activkey', type:'string'}
    		,{name:'create_at', type:'date'}
    		,{name:'lastvisit', type:'date'}
    		,{name:'superuser', type:'string'}
    		,{name:'status', type:'string'}
    		,{name:'company_id', type:'string'}
    		,{name:'mobile', type:'string'}
        ],
    getRecordName: function () {
        return this.get("username");
    }
});

Ext.define('tms.view.users.LoginDialog', {
    extend:  Ext.window.Window ,
    alias:'widget.loginDialog',
    /* Various style settings */
    title: i18n.t("Welcom"),
    width: 500,
    height: 250,
    modal: true,
    resizable: false,
    closable: false,
    layout: 'anchor',
    bodyStyle: 'padding: 5px;',
    /**
     * Initializes the login dialog component
     */
    initComponent: function () {

        this.loginField = Ext.create('Ext.form.field.Text',{
            name: 'username',
            value: "",
            fieldLabel: i18n.t("users_username"),
            anchor: '90%'//,
            //allowBlank : false
        });

        this.passwordField = Ext.create('Ext.form.field.Text',{
            name: 'password',
            inputType: "password",
            value: "",
            fieldLabel: i18n.t("users_password"),
            anchor: '90%'//,
            //allowBlank : false
        });

        this.loginForm =  Ext.create('Ext.form.Panel',{
            layout: 'anchor',
            autoScroll: true,
            border:false,
            fieldDefaults:{
                msgTarget:'side',
                labelWidth:75,
                labelAlign:'right',
                anchor: '60%'
            },
            items: [
                this.loginField,
                this.passwordField
            ]
        });


        Ext.apply(this, {
            items: [this.loginForm],
            dockedItems: [{
                xtype: 'toolbar',
                enableOverflow: false,
                dock: 'bottom',
                ui: 'footer',
                buttonAlign:'right',
                defaults: {minWidth: 80},
                items: [
                    {
                        text: i18n.t("Login"),
                        iconCls: 'login',
                        action: 'login'
                    },{
                        text: i18n.t("Forget Password?"),
                        action: 'forget',
                        iconCls: 'forget'
                    }]
            }]
        });

        this.callParent(arguments);
    }
});

Ext.define('tms.store.UsersStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Users',
    storeId: 'UsersStore'
});

Ext.define('tms.controller.LoginController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.UsersStore'],
    models:['tms.model.Users'],
    views:['tms.view.users.LoginDialog'],
    refs:[
        {
            ref:'dialog',
            selector:'loginDialog'
        }
    ],
    init:function (application) {
        this.control({
            'loginDialog':{
                render:{
                    fn:this.assignEnterKey,
                    scope:this
                },
                show:{
                    fn:this.onShow,
                    scope:this
                }
            },
            'loginDialog button[action=login]':{
                click:{
                    fn:this.login,
                    scope:this
                }
            },
            'loginDialog button[action=forget]':{
                click:{
                    fn:this.forget,
                    scope:this
                }
            }
        });
    },
    onShow:function () {
        this.getDialog().loginField.focus();
    },
    /**
     * Assigns the enter key to the login window.
     */
    assignEnterKey:function () {
        var keyMap = this.getDialog().getKeyMap();
        keyMap.on(Ext.EventObject.ENTER, this.login, this);
    },

    login:function () {
        this.getDialog().loginForm.submit({
            clientValidation: true,
            url:tms.getContextPath() + '/index.php?r=user/adminLogin',
            success:function (form, action) {
                var respData = Ext.decode(action.response.responseText);
                if(respData.success) {
                    tms.app.session = action.result.session;
                    tms.app.loginSuccess();
                } else {
                    Ext.Msg.alert(i18n.t('Login Failure'), respData.msg);
                }
            },
            failure:function (form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert(i18n.t('Login Failure'), i18n.t('Form fields may not be submitted with invalid values'));
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert(i18n.t('Login Failure'), i18n.t('Ajax communication failed'));
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert(i18n.t('Login Failure'), Ext.decode(action.response.responseText).msg);
                }
            },
            scope:this
        });


        //this.fireEvent("login", this.loginField.getValue(), this.passwordField.getValue());
    },

    forget:function () {
        //this.fireEvent("login", this.loginField.getValue(), this.passwordField.getValue());

    }
});



Ext.define('tms.model.Orders', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('orders'),
    fields:[
        {name:'id', type:'int'}
        ,{name:'user_id', type:'int'}
        ,{name:'secure_key', type:'string'}
        ,{name:'payment', type:'string'}
        ,{name:'raised_date', type:'date'}
        ,{name:'due_date', type:'date'}
        ,{name:'paid', type:'date'}
        ,{name:'total_discounts', type:'string'}
        ,{name:'total_paid', type:'string'}
        ,{name:'total_paid_real', type:'string'}
        ,{name:'date_add', type:'date'}
        ,{name:'date_upd', type:'date'}
        ,{name:'single_person_suppliment', type:'string'}
        ,{name:'discount_details', type:'string'}
        ,{name:'coupon_id', type:'string'}
        ,{name:'invoice_id', type:'string'}
        ,{name:'type', type:'string'}
        ,{name:'no', type:'string'}
        ,{name:'status', type:'string'}
    ],
    getRecordName: function () {
        return this.get("no");
    }
});

Ext.define('tms.view.orders.List', {
    extend: Ext.grid.Panel ,
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    features:[
        {ftype:'filters', encode:true}
    ],
    alias:'widget.ordersList',
    store:'OrdersStore',
    columns:[
        {width:50, header:i18n.t('orders_no'), sortable:true, dataIndex:'no', filter:true}
        ,
        {width:50, header:i18n.t('orders_total_paid'), sortable:true, dataIndex:'total_paid', filter:true}
        ,
        {width:50, header:i18n.t('orders_total_paid_real'), sortable:true, dataIndex:'total_paid_real', filter:true}
        ,
        {width:50, header:i18n.t('orders_date_add'), sortable:true, dataIndex:'date_add', filter:true, renderer:Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
    ],

    dockedItems:[
        {
            xtype:'toolbar',
            items:[
                {
                    text: i18n.t("button_update"),
                    iconCls: 'option',
                    action:'update',
                    disabled: true
                }
            ]
        },
        {
            xtype:'pagingtoolbar',
            dock:'bottom',
            store:'OrdersStore',
            displayInfo:true
        }
    ],
    onBeforeLoad:function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'string', field:'type', comparison:'eq', value:this.orderRecord.get("type")});
        if (this.orderRecord.get("status") && "" != this.orderRecord.get("status")) {
            filters.push({type:'string', field:'status', comparison:'eq', value:this.orderRecord.get("status")});
        }
        var params = {"start":0, "limit":25, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setOrderRecord:function (orderRec) {
        this.orderRecord = orderRec;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    }
});

Ext.define('tms.view.orders.Nav', {
    extend: Ext.tree.Panel ,
    alias:'widget.ordersNav',
    rootVisible:false,
    lines:false,
    useArrows:true,
    root:{
        expanded:true,
        children:[
            {
                text:'酒店订单',
                expanded:true,
                orderType:'HotelOrder',
                children:[
                    { id:'hotel-draft', text:'未提交', orderType:'HotelOrder', orderStatus:'draft', leaf:true },
                    { id:'hotel-submit', text:'已提交', orderType:'HotelOrder', orderStatus:'submit',leaf:true },
                    { id:'hotel-paid', text:'已付款', orderType:'HotelOrder', orderStatus:'paid',leaf:true },
                    { id:'hotel-process', text:'处理中', orderType:'HotelOrder', orderStatus:'process',leaf:true },
                    { id:'hotel-complete', text:'已成交', orderType:'HotelOrder', orderStatus:'complete',leaf:true },
                    { id:'hotel-cancel', text:'已取消', orderType:'HotelOrder', orderStatus:'cancel',leaf:true }
                ]
            },
            {
                text:'旅游订单',
                expanded:true,
                orderType:'TripOrder',
                children:[
                    { id:'trip-draft', text:'未提交', orderType:'TripOrder', orderStatus:'draft',leaf:true },
                    { id:'trip-submit', text:'已提交', orderType:'TripOrder', orderStatus:'submit',leaf:true },
                    { id:'trip-paid', text:'已付款', orderType:'TripOrder', orderStatus:'paid',leaf:true },
                    { id:'trip-process', text:'处理中', orderType:'TripOrder', orderStatus:'process',leaf:true },
                    { id:'trip-complete', text:'已成交', orderType:'TripOrder', orderStatus:'complete',leaf:true },
                    { id:'trip-cancel', text:'已取消', orderType:'TripOrder', orderStatus:'cancel',leaf:true }
                ]
            }
        ]
    }
});

Ext.define('tms.view.orders.Detail', {
    extend:  Ext.panel.Panel ,
    alias:'widget.ordersDetail',
    id: 'content-panel',
    title: '&nbsp;',
    autoScroll: true,
    detailTpl:new Ext.XTemplate(
        '<ul class="list-group">',
        '<tpl if="orders.type == \'TripOrder\'">',
        '<li class="list-group-item list-group-item-default">出发日期：{ordersDetail.departure_date}</li>',
        '<li class="list-group-item list-group-item-default">成人团费：{ordersDetail.adult_price} × {ordersDetail.adults}</li>',
        '<tpl if="ordersDetail.children &gt; 0">',
        '<li class="list-group-item list-group-item-default">儿童团费：{ordersDetail.child_price} × {ordersDetail.children}</li>',
        '</tpl>',
        '</tpl>',
        '<tpl if="orders.type == \'HotelOrder\'">',
        '<li class="list-group-item list-group-item-default">入住日期：{ordersDetail.check_in} - {ordersDetail.check_out} </li>',
        '<li class="list-group-item list-group-item-default">房间数量：{ordersDetail.quantity}</li>',
        '<li class="list-group-item list-group-item-default">每晚房价：{ordersDetail.price}</li>',
        '</tpl>',
        '</ul>'
    ),
    guestTpl:new Ext.XTemplate(
        '<tpl for=".">',
        '<p>{name}</p>',
        '<p>{mobile_no}</p>',
        '</tpl></p>'
    ),
    contactTpl:new Ext.XTemplate(
        '<tpl for=".">',
        '<p>{lastname}</p>',
        '<p>{email_address}</p>',
        '<p>{mobile}</p>',
        '</tpl></p>'
    ),
    invoiceTpl:new Ext.XTemplate(
        '<tpl for="invoice">',
        '<p>{title}</p>',
        '<p>{desc}</p>',
        '</tpl></p>',
        '<tpl for="address">',
        '<p>{lastname}</p>',
        '<p>{address1}</p>',
        '</tpl></p>'
    ),
    loadDetail: function(orderId) {
        this.removeAll();
        Ext.Ajax.request({
            url: tms.getContextPath() + '/index.php?r=orders/view&JSONView=true&id='+orderId,
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                this.setTitle(data.ordersDetail.name);
                this.add({xtype:'panel',title:'总价:' + data.orders.total_paid,tpl: this.detailTpl, data:data });
                this.add({xtype:'panel',title:'联系人信息',tpl: this.contactTpl, data:data.ordersContact });
                this.add({xtype:'panel',title:'旅客信息',tpl: this.guestTpl, data:data.guests});
                if(data.invoice) {
                    this.add({xtype:'panel',title:'发票信息',tpl: this.invoiceTpl, data:{'invoice':data.invoice,'address':data.address}});
                }

            },
            scope:this
        });
    }
});

/**
 * BoxSelect for ExtJS 4.1, a combo box improved for multiple value querying, selection and management.
 *
 * A friendlier combo box for multiple selections that creates easily individually
 * removable labels for each selection, as seen on facebook and other sites. Querying
 * and type-ahead support are also improved for multiple selections.
 *
 * Options and usage mostly remain consistent with the standard
 * [ComboBox](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.form.field.ComboBox) control.
 * Some default configuration options have changed, but most should still work properly
 * if overridden unless otherwise noted.
 *
 * Please note, this component does not support versions of ExtJS earlier than 4.1.
 *
 * Inspired by the [SuperBoxSelect component for ExtJS 3](http://technomedia.co.uk/SuperBoxSelect/examples3.html),
 * which in turn was inspired by the [BoxSelect component for ExtJS 2](http://efattal.fr/en/extjs/extuxboxselect/).
 *
 * Various contributions and suggestions made by many members of the ExtJS community which can be seen
 * in the [official user extension forum post](http://www.sencha.com/forum/showthread.php?134751-Ext.ux.form.field.BoxSelect).
 *
 * Many thanks go out to all of those who have contributed, this extension would not be
 * possible without your help.
 *
 * See [AUTHORS.txt](../AUTHORS.TXT) for a list of major contributors
 *
 * @author kvee_iv http://www.sencha.com/forum/member.php?29437-kveeiv
 * @version 2.0.3
 * @requires BoxSelect.css
 * @xtype boxselect
 *
 */
Ext.define('Ext.ux.form.field.BoxSelect', {
    extend: Ext.form.field.ComboBox ,
    alias: ['widget.comboboxselect', 'widget.boxselect'],
                                                        

    //
    // Begin configuration options related to the underlying store
    //
    
    /**
     * @cfg {String} valueParam
     * The name of the parameter used to load unknown records into the store. If left unspecified, {@link #valueField}
     * will be used.
     */

    //
    // End of configuration options related to the underlying store
    //



    //
    // Begin configuration options related to selected values
    //

    /**
     * @cfg {Boolean}
     * If set to `true`, allows the combo field to hold more than one value at a time, and allows selecting multiple
     * items from the dropdown list. The combo's text field will show all selected values using the template
     * defined by {@link #labelTpl}.
     *

     */
    multiSelect: true,

    /**
     * @cfg {String/Ext.XTemplate} labelTpl
     * The [XTemplate](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.XTemplate) to use for the inner
     * markup of the labelled items. Defaults to the configured {@link #displayField}
     */

    /**
     * @inheritdoc
     *
     * When {@link #forceSelection} is `false`, new records can be created by the user as they
     * are typed. These records are **not** added to the combo's store. This creation
     * is triggered by typing the configured 'delimiter', and can be further configured using the
     * {@link #createNewOnEnter} and {@link #createNewOnBlur} configuration options.
     *
     * This functionality is primarily useful with BoxSelect components for things
     * such as an email address.
     */
    forceSelection: true,

    /**
	 * @cfg {Boolean}
     * Has no effect if {@link #forceSelection} is `true`.
     *
	 * With {@link #createNewOnEnter} set to `true`, the creation described in
     * {@link #forceSelection} will also be triggered by the 'enter' key.
	 */
    createNewOnEnter: false,

    /**
	 * @cfg {Boolean}
     * Has no effect if {@link #forceSelection} is `true`.
     *
     * With {@link #createNewOnBlur} set to `true`, the creation described in
     * {@link #forceSelection} will also be triggered when the field loses focus.
     *
     * Please note that this behavior is also affected by the configuration options
     * {@link #autoSelect} and {@link #selectOnTab}. If those are true and an existing
     * item would have been selected as a result, the partial text the user has entered will
	 * be discarded and the existing item will be added to the selection.
	 */
    createNewOnBlur: false,

    /**
     * @cfg {Boolean}
     * Has no effect if {@link #multiSelect} is `false`.
     *
     * Controls the formatting of the form submit value of the field as returned by {@link #getSubmitValue}
     *
     * - `true` for the field value to submit as a json encoded array in a single GET/POST variable
     * - `false` for the field to submit as an array of GET/POST variables
     */
    encodeSubmitValue: false,

    //
    // End of configuration options related to selected values
    //



    //
    // Configuration options related to pick list behavior
    //

    /**
     * @cfg {Boolean}
     * `true` to activate the trigger when clicking in empty space in the field. Note that the
     * subsequent behavior of this is controlled by the field's {@link #triggerAction}.
     * This behavior is similar to that of a basic ComboBox with {@link #editable} `false`.
     */
    triggerOnClick: true,

    /**
	 * @cfg {Boolean}
     * - `true` to have each selected value fill to the width of the form field
     * - `false to have each selected value size to its displayed contents
	 */
    stacked: false,

    /**
	 * @cfg {Boolean}
     * Has no effect if {@link #multiSelect} is `false`
     *
     * `true` to keep the pick list expanded after each selection from the pick list
     * `false` to automatically collapse the pick list after a selection is made
	 */
    pinList: true,

    /**
     * @cfg {Boolean}
     * True to hide the currently selected values from the drop down list. These items are hidden via
     * css to maintain simplicity in store and filter management.
     *
     * - `true` to hide currently selected values from the drop down pick list
     * - `false` to keep the item in the pick list as a selected item
     */
    filterPickList: false,

    //
    // End of configuration options related to pick list behavior
    //



    //
    // Configuration options related to text field behavior
    //

    /**
     * @inheritdoc
     */
    selectOnFocus: true,

    /**
     * @cfg {Boolean}
     *
     * `true` if this field should automatically grow and shrink vertically to its content.
     * Note that this overrides the natural trigger grow functionality, which is used to size
     * the field horizontally.
     */
    grow: true,

    /**
     * @cfg {Number/Boolean}
     * Has no effect if {@link #grow} is `false`
     *
     * The minimum height to allow when {@link #grow} is `true`, or `false` to allow for
     * natural vertical growth based on the current selected values. See also {@link #growMax}.
     */
    growMin: false,

    /**
     * @cfg {Number/Boolean}
     * Has no effect if {@link #grow} is `false`
     *
     * The maximum height to allow when {@link #grow} is `true`, or `false` to allow for
     * natural vertical growth based on the current selected values. See also {@link #growMin}.
     */
    growMax: false,

    /**
     * @cfg growAppend
     * @hide
     * Currently unsupported by BoxSelect since this is used for horizontal growth and
     * BoxSelect only supports vertical growth.
     */
    /**
     * @cfg growToLongestValue
     * @hide
     * Currently unsupported by BoxSelect since this is used for horizontal growth and
     * BoxSelect only supports vertical growth.
     */

    //
    // End of configuration options related to text field behavior
    //


    //
    // Event signatures
    //

    /**
     * @event autosize
     * Fires when the **{@link #autoSize}** function is triggered and the field is resized according to the
     * {@link #grow}/{@link #growMin}/{@link #growMax} configs as a result. This event provides a hook for the
     * developer to apply additional logic at runtime to resize the field if needed.
     * @param {Ext.ux.form.field.BoxSelect} this This BoxSelect field
     * @param {Number} height The new field height
     */

    //
    // End of event signatures
    //



    //
    // Configuration options that will break things if messed with
    //

    /**
     * @private
     */
    fieldSubTpl: [
        '<div id="{cmpId}-listWrapper" class="x-boxselect {fieldCls} {typeCls}">',
        '<ul id="{cmpId}-itemList" class="x-boxselect-list">',
        '<li id="{cmpId}-inputElCt" class="x-boxselect-input">',
        '<div id="{cmpId}-emptyEl" class="{emptyCls}">{emptyText}</div>',
        '<input id="{cmpId}-inputEl" type="{type}" ',
        '<tpl if="name">name="{name}" </tpl>',
        '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
        '<tpl if="size">size="{size}" </tpl>',
        '<tpl if="tabIdx">tabIndex="{tabIdx}" </tpl>',
        '<tpl if="disabled"> disabled="disabled"</tpl>',
        'class="x-boxselect-input-field {inputElCls}" autocomplete="off">',
        '</li>',
        '</ul>',
        '</div>',
        {
            compiled: true,
            disableFormats: true
        }
    ],

    /**
     * @private
     */
    childEls: [ 'listWrapper', 'itemList', 'inputEl', 'inputElCt', 'emptyEl' ],

    /**
     * @private
     */
    componentLayout: 'boxselectfield',

    /**
     * @private
     */
    emptyInputCls: 'x-boxselect-emptyinput',

    /**
     * @inheritdoc
     *
     * Initialize additional settings and enable simultaneous typeAhead and multiSelect support
     * @protected
	 */
    initComponent: function() {
        var me = this,
        typeAhead = me.typeAhead;

        if (typeAhead && !me.editable) {
            Ext.Error.raise('If typeAhead is enabled the combo must be editable: true -- please change one of those settings.');
        }

        Ext.apply(me, {
            typeAhead: false
        });

        me.callParent();

        me.typeAhead = typeAhead;

        me.selectionModel = new Ext.selection.Model({
            store: me.valueStore,
            mode: 'MULTI',
            lastFocused: null,
            onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
                commitFn();
            }
        });

        if (!Ext.isEmpty(me.delimiter) && me.multiSelect) {
            me.delimiterRegexp = new RegExp(String(me.delimiter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&"));
        }
    },

    /**
	 * Register events for management controls of labelled items
     * @protected
	 */
    initEvents: function() {
        var me = this;

        me.callParent(arguments);

        if (!me.enableKeyEvents) {
            me.mon(me.inputEl, 'keydown', me.onKeyDown, me);
        }
        me.mon(me.inputEl, 'paste', me.onPaste, me);
        me.mon(me.listWrapper, 'click', me.onItemListClick, me);

        // I would prefer to use relayEvents here to forward these events on, but I want
        // to pass the field instead of exposing the underlying selection model
        me.mon(me.selectionModel, {
            'selectionchange': function(selModel, selectedRecs) {
                me.applyMultiselectItemMarkup();
                me.fireEvent('valueselectionchange', me, selectedRecs);
            },
            'focuschange': function(selectionModel, oldFocused, newFocused) {
                me.fireEvent('valuefocuschange', me, oldFocused, newFocused);
            },
            scope: me
        });
    },

    /**
     * @inheritdoc
     *
	 * Create a store for the records of our current value based on the main store's model
     * @protected
	 */
    onBindStore: function(store, initial) {
        var me = this;

        if (store) {
            me.valueStore = new Ext.data.Store({
                model: store.model,
                proxy: {
                    type: 'memory'
                }
            });
            me.mon(me.valueStore, 'datachanged', me.applyMultiselectItemMarkup, me);
            if (me.selectionModel) {
                me.selectionModel.bindStore(me.valueStore);
            }
        }
    },

    /**
     * @inheritdoc
     *
     * Remove the selected value store and associated listeners
     * @protected
     */
    onUnbindStore: function(store) {
        var me = this,
        valueStore = me.valueStore;

        if (valueStore) {
            if (me.selectionModel) {
                me.selectionModel.setLastFocused(null);
                me.selectionModel.deselectAll();
                me.selectionModel.bindStore(null);
            }
            me.mun(valueStore, 'datachanged', me.applyMultiselectItemMarkup, me);
            valueStore.destroy();
            me.valueStore = null;
        }

        me.callParent(arguments);
    },

    /**
     * @inheritdoc
     *
	 * Add refresh tracking to the picker for selection management
     * @protected
	 */
    createPicker: function() {
        var me = this,
        picker = me.callParent(arguments);

        me.mon(picker, {
            'beforerefresh': me.onBeforeListRefresh,
            scope: me
        });

        if (me.filterPickList) {
            picker.addCls('x-boxselect-hideselections');
        }

        return picker;
    },

    /**
     * @inheritdoc
     *
	 * Clean up selected values management controls
     * @protected
	 */
    onDestroy: function() {
        var me = this;

        Ext.destroyMembers(me, 'valueStore', 'selectionModel');

        me.callParent(arguments);
    },

    /**
     * Add empty text support to initial render.
     * @protected
     */
    getSubTplData: function() {
        var me = this,
            data = me.callParent(),
            isEmpty = me.emptyText && data.value.length < 1;

        data.value = '';
        if (isEmpty) {
            data.emptyText = me.emptyText;
            data.emptyCls = me.emptyCls;
            data.inputElCls = me.emptyInputCls;
        } else {
            data.emptyText = '';
            data.emptyCls = me.emptyInputCls;
            data.inputElCls = '';
        }

        return data;
    },

    /**
     * @inheritdoc
     *
	 * Overridden to avoid use of placeholder, as our main input field is often empty
     * @protected
	 */
    afterRender: function() {
        var me = this;

        if (Ext.supports.Placeholder && me.inputEl && me.emptyText) {
            delete me.inputEl.dom.placeholder;
        }

        me.bodyEl.applyStyles('vertical-align:top');

        if (me.grow) {
            if (Ext.isNumber(me.growMin) && (me.growMin > 0)) {
                me.listWrapper.applyStyles('min-height:'+me.growMin+'px');
            }
            if (Ext.isNumber(me.growMax) && (me.growMax > 0)) {
                me.listWrapper.applyStyles('max-height:'+me.growMax+'px');
            }
        }

        if (me.stacked === true) {
            me.itemList.addCls('x-boxselect-stacked');
        }

        if (!me.multiSelect) {
            me.itemList.addCls('x-boxselect-singleselect');
        }

        me.applyMultiselectItemMarkup();

        me.callParent(arguments);
    },

    /**
	 * Overridden to search entire unfiltered store since already selected values
     * can span across multiple store page loads and other filtering. Overlaps
     * some with {@link #isFilteredRecord}, but findRecord is used by the base component
     * for various logic so this logic is applied here as well.
     * @protected
	 */
    findRecord: function(field, value) {
        var ds = this.store,
        matches;

        if (!ds) {
            return false;
        }

        matches = ds.queryBy(function(rec, id) {
            return rec.isEqual(rec.get(field), value);
        });

        return (matches.getCount() > 0) ? matches.first() : false;
    },

    /**
	 * Overridden to map previously selected records to the "new" versions of the records
	 * based on value field, if they are part of the new store load
     * @protected
	 */
    onLoad: function() {
        var me = this,
        valueField = me.valueField,
        valueStore = me.valueStore,
        changed = false;

        if (valueStore) {
            if (!Ext.isEmpty(me.value) && (valueStore.getCount() == 0)) {
                me.setValue(me.value, false, true);
            }

            valueStore.suspendEvents();
            valueStore.each(function(rec) {
                var r = me.findRecord(valueField, rec.get(valueField)),
                i = r ? valueStore.indexOf(rec) : -1;
                if (i >= 0) {
                    valueStore.removeAt(i);
                    valueStore.insert(i, r);
                    changed = true;
                }
            });
            valueStore.resumeEvents();
            if (changed) {
                valueStore.fireEvent('datachanged', valueStore);
            }
        }

        me.callParent(arguments);
    },

    /**
	 * Used to determine if a record is filtered out of the current store's data set,
     * for determining if a currently selected value should be retained.
     *
     * A record is considered filtered and should be retained if:
     *
     * - It is not in the combo store and it is in the value store
     *   (Happens when our selected value is just part of a different load, page or query)
     *   (Happens when our selected value was created manually)
     *
	 * @private
	 */
    isFilteredRecord: function(record) {
        var me = this,
        valueField = me.valueField,
        value = record.get(valueField);

        return (me.store.findExact(valueField, value) === -1) &&
            (me.valueStore.findExact(valueField, value) !== -1);
    },

    /**
     * @inheritdoc
     *
	 * Overridden to allow for continued querying with multiSelect selections already made
     * @protected
	 */
    doRawQuery: function() {
        var me = this,
        rawValue = me.inputEl.dom.value;

        if (me.multiSelect) {
            rawValue = rawValue.split(me.delimiter).pop();
        }

        this.doQuery(rawValue, false, true);
    },

    /**
	 * When the picker is refreshing, we should ignore selection changes. Otherwise
	 * the value of our field will be changing just because our view of the choices is.
     * @protected
	 */
    onBeforeListRefresh: function() {
        this.ignoreSelection++;
    },

    /**
	 * When the picker is refreshing, we should ignore selection changes. Otherwise
	 * the value of our field will be changing just because our view of the choices is.
     * @protected
	 */
    onListRefresh: function() {
        this.callParent(arguments);
        if (this.ignoreSelection > 0) {
            --this.ignoreSelection;
        }
    },

    /**
	 * Overridden to preserve current labelled items when list is filtered/paged/loaded
	 * and does not include our current value. See {@link #isFilteredRecord}
     * @private
	 */
    onListSelectionChange: function(list, selectedRecords) {
        var me = this,
        valueStore = me.valueStore,
        mergedRecords = [],
        i;

        // Only react to selection if it is not called from setValue, and if our list is
        // expanded (ignores changes to the selection model triggered elsewhere)
        if ((me.ignoreSelection <= 0) && me.isExpanded) {
            // Pull forward records that were already selected or are now filtered out of the store
            valueStore.each(function(rec) {
                if (Ext.Array.contains(selectedRecords, rec) || me.isFilteredRecord(rec)) {
                    mergedRecords.push(rec);
                }
            });
            mergedRecords = Ext.Array.merge(mergedRecords, selectedRecords);

            i = Ext.Array.intersect(mergedRecords, valueStore.getRange()).length;
            if ((i != mergedRecords.length) || (i != me.valueStore.getCount())) {
                me.setValue(mergedRecords, false);
                if (!me.multiSelect || !me.pinList) {
                    Ext.defer(me.collapse, 1, me);
                }
                if (valueStore.getCount() > 0) {
                    me.fireEvent('select', me, valueStore.getRange());
                }
            }
            me.inputEl.focus();
            if (!me.pinList) {
                me.inputEl.dom.value = '';
            }
            if (me.selectOnFocus) {
                me.inputEl.dom.select();
            }
        }
    },

    /**
     * Overridden to use valueStore instead of valueModels, for inclusion of
     * filtered records. See {@link #isFilteredRecord}
     * @private
     */
    syncSelection: function() {
        var me = this,
        picker = me.picker,
        valueField = me.valueField,
        pickStore, selection, selModel;

        if (picker) {
            pickStore = picker.store;

            // From the value, find the Models that are in the store's current data
            selection = [];
            if (me.valueStore) {
                me.valueStore.each(function(rec) {
                    var i = pickStore.findExact(valueField, rec.get(valueField));
                    if (i >= 0) {
                        selection.push(pickStore.getAt(i));
                    }
                });
            }

            // Update the selection to match
            me.ignoreSelection++;
            selModel = picker.getSelectionModel();
            selModel.deselectAll();
            if (selection.length > 0) {
                selModel.select(selection);
            }
            if (me.ignoreSelection > 0) {
                --me.ignoreSelection;
            }
        }
    },

    /**
	 * Overridden to align to itemList size instead of inputEl
     */
    doAlign: function(){
        var me = this,
            picker = me.picker,
            aboveSfx = '-above',
            isAbove;

        me.picker.alignTo(me.listWrapper, me.pickerAlign, me.pickerOffset);
        // add the {openCls}-above class if the picker was aligned above
        // the field due to hitting the bottom of the viewport
        isAbove = picker.el.getY() < me.inputEl.getY();
        me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls + aboveSfx);
        picker[isAbove ? 'addCls' : 'removeCls'](picker.baseCls + aboveSfx);
    },

    /**
     * Overridden to preserve scroll position of pick list when list is realigned
     */
    alignPicker: function() {
        var me = this,
            picker = me.picker,
            pickerScrollPos = picker.getTargetEl().dom.scrollTop;

        me.callParent(arguments);

        if (me.isExpanded) {
            if (me.matchFieldWidth) {
                // Auto the height (it will be constrained by min and max width) unless there are no records to display.
                picker.setWidth(me.listWrapper.getWidth());
            }

            picker.getTargetEl().dom.scrollTop = pickerScrollPos;
        }
    },

    /**
	 * Get the current cursor position in the input field, for key-based navigation
	 * @private
	 */
    getCursorPosition: function() {
        var cursorPos;
        if (Ext.isIE) {
            cursorPos = document.selection.createRange();
            cursorPos.collapse(true);
            cursorPos.moveStart("character", -this.inputEl.dom.value.length);
            cursorPos = cursorPos.text.length;
        } else {
            cursorPos = this.inputEl.dom.selectionStart;
        }
        return cursorPos;
    },

    /**
	 * Check to see if the input field has selected text, for key-based navigation
	 * @private
	 */
    hasSelectedText: function() {
        var sel, range;
        if (Ext.isIE) {
            sel = document.selection;
            range = sel.createRange();
            return (range.parentElement() == this.inputEl.dom);
        } else {
            return this.inputEl.dom.selectionStart != this.inputEl.dom.selectionEnd;
        }
    },

    /**
	 * Handles keyDown processing of key-based selection of labelled items.
     * Supported keyboard controls:
     *
     * - If pick list is expanded
     *
     *     - `CTRL-A` will select all the items in the pick list
     *
     * - If the cursor is at the beginning of the input field and there are values present
     *
     *     - `CTRL-A` will highlight all the currently selected values
     *     - `BACKSPACE` and `DELETE` will remove any currently highlighted selected values
     *     - `RIGHT` and `LEFT` will move the current highlight in the appropriate direction
     *     - `SHIFT-RIGHT` and `SHIFT-LEFT` will add to the current highlight in the appropriate direction
     *
     * @protected
	 */
    onKeyDown: function(e, t) {
        var me = this,
        key = e.getKey(),
        rawValue = me.inputEl.dom.value,
        valueStore = me.valueStore,
        selModel = me.selectionModel,
        stopEvent = false;

        if (me.readOnly || me.disabled || !me.editable) {
            return;
        }

        if (me.isExpanded && (key == e.A && e.ctrlKey)) {
            // CTRL-A when picker is expanded - add all items in current picker store page to current value
            me.select(me.getStore().getRange());
            selModel.setLastFocused(null);
            selModel.deselectAll();
            me.collapse();
            me.inputEl.focus();
            stopEvent = true;
        } else if ((valueStore.getCount() > 0) &&
                ((rawValue == '') || ((me.getCursorPosition() === 0) && !me.hasSelectedText()))) {
            // Keyboard navigation of current values
            var lastSelectionIndex = (selModel.getCount() > 0) ? valueStore.indexOf(selModel.getLastSelected() || selModel.getLastFocused()) : -1;

            if ((key == e.BACKSPACE) || (key == e.DELETE)) {
                if (lastSelectionIndex > -1) {
                    if (selModel.getCount() > 1) {
                        lastSelectionIndex = -1;
                    }
                    me.valueStore.remove(selModel.getSelection());
                } else {
                    me.valueStore.remove(me.valueStore.last());
                }
                selModel.clearSelections();
                me.setValue(me.valueStore.getRange());
                if (lastSelectionIndex > 0) {
                    selModel.select(lastSelectionIndex - 1);
                }
                stopEvent = true;
            } else if ((key == e.RIGHT) || (key == e.LEFT)) {
                if ((lastSelectionIndex == -1) && (key == e.LEFT)) {
                    selModel.select(valueStore.last());
                    stopEvent = true;
                } else if (lastSelectionIndex > -1) {
                    if (key == e.RIGHT) {
                        if (lastSelectionIndex < (valueStore.getCount() - 1)) {
                            selModel.select(lastSelectionIndex + 1, e.shiftKey);
                            stopEvent = true;
                        } else if (!e.shiftKey) {
                            selModel.setLastFocused(null);
                            selModel.deselectAll();
                            stopEvent = true;
                        }
                    } else if ((key == e.LEFT) && (lastSelectionIndex > 0)) {
                        selModel.select(lastSelectionIndex - 1, e.shiftKey);
                        stopEvent = true;
                    }
                }
            } else if (key == e.A && e.ctrlKey) {
                selModel.selectAll();
                stopEvent = e.A;
            }
            me.inputEl.focus();
        }

        if (stopEvent) {
            me.preventKeyUpEvent = stopEvent;
            e.stopEvent();
            return;
        }

        // Prevent key up processing for enter if it is being handled by the picker
        if (me.isExpanded && (key == e.ENTER) && me.picker.highlightedItem) {
            me.preventKeyUpEvent = true;
        }

        if (me.enableKeyEvents) {
            me.callParent(arguments);
        }

        if (!e.isSpecialKey() && !e.hasModifier()) {
            me.selectionModel.setLastFocused(null);
            me.selectionModel.deselectAll();
            me.inputEl.focus();
        }
    },

    /**
	 * Handles auto-selection and creation of labelled items based on this field's
     * delimiter, as well as the keyUp processing of key-based selection of labelled items.
     * @protected
	 */
    onKeyUp: function(e, t) {
        var me = this,
        rawValue = me.inputEl.dom.value;

        if (me.preventKeyUpEvent) {
            e.stopEvent();
            if ((me.preventKeyUpEvent === true) || (e.getKey() === me.preventKeyUpEvent)) {
                delete me.preventKeyUpEvent;
            }
            return;
        }

        if (me.multiSelect && (me.delimiterRegexp && me.delimiterRegexp.test(rawValue)) ||
                ((me.createNewOnEnter === true) && e.getKey() == e.ENTER)) {
            rawValue = Ext.Array.clean(rawValue.split(me.delimiterRegexp));
            me.inputEl.dom.value = '';
            me.setValue(me.valueStore.getRange().concat(rawValue));
            me.inputEl.focus();
        }

        me.callParent([e,t]);
    },

    /**
     * Handles auto-selection of labelled items based on this field's delimiter when pasting
     * a list of values in to the field (e.g., for email addresses)
     * @protected
     */
    onPaste: function(e, t) {
        var me = this,
            rawValue = me.inputEl.dom.value,
            clipboard = (e && e.browserEvent && e.browserEvent.clipboardData) ? e.browserEvent.clipboardData : false;

        if (me.multiSelect && (me.delimiterRegexp && me.delimiterRegexp.test(rawValue))) {
            if (clipboard && clipboard.getData) {
                if (/text\/plain/.test(clipboard.types)) {
                    rawValue = clipboard.getData('text/plain');
                } else if (/text\/html/.test(clipboard.types)) {
                    rawValue = clipboard.getData('text/html');
                }
            }

            rawValue = Ext.Array.clean(rawValue.split(me.delimiterRegexp));
            me.inputEl.dom.value = '';
            me.setValue(me.valueStore.getRange().concat(rawValue));
            me.inputEl.focus();
        }
    },

    /**
     * Overridden to handle key navigation of pick list when list is filtered. Because we
     * want to avoid complexity that could be introduced by modifying the store's contents,
     * (e.g., always having to search back through and remove values when they might
     * be re-sent by the server, adding the values back in their previous position when
     * they are removed from the current selection, etc.), we handle this filtering
     * via a simple css rule. However, for the moment since those DOM nodes still exist
     * in the list we have to hijack the highlighting methods for the picker's BoundListKeyNav
     * to appropriately skip over these hidden nodes. This is a less than ideal solution,
     * but it centralizes all of the complexity of this problem in to this one method.
     * @protected
     */
    onExpand: function() {
        var me = this,
            keyNav = me.listKeyNav;

        me.callParent(arguments);

        if (keyNav || !me.filterPickList) {
            return;
        }
        keyNav = me.listKeyNav;
        keyNav.highlightAt = function(index) {
            var boundList = this.boundList,
                item = boundList.all.item(index),
                len = boundList.all.getCount(),
                direction;

            if (item && item.hasCls('x-boundlist-selected')) {
                if ((index == 0) || !boundList.highlightedItem || (boundList.indexOf(boundList.highlightedItem) < index)) {
                    direction = 1;
                } else {
                    direction = -1;
                }
                do {
                    index = index + direction;
                    item = boundList.all.item(index);
                } while ((index > 0) && (index < len) && item.hasCls('x-boundlist-selected'));

                if (item.hasCls('x-boundlist-selected')) {
                    return;
                }
            }

            if (item) {
                item = item.dom;
                boundList.highlightItem(item);
                boundList.getTargetEl().scrollChildIntoView(item, false);
            }
        };
    },

    /**
	 * Overridden to get and set the DOM value directly for type-ahead suggestion (bypassing get/setRawValue)
     * @protected
	 */
    onTypeAhead: function() {
        var me = this,
        displayField = me.displayField,
        inputElDom = me.inputEl.dom,
        valueStore = me.valueStore,
        boundList = me.getPicker(),
        record, newValue, len, selStart;

        if (me.filterPickList) {
            var fn = this.createFilterFn(displayField, inputElDom.value);
            record = me.store.findBy(function(rec) {
                return ((valueStore.indexOfId(rec.getId()) === -1) && fn(rec));
            });
            record = (record === -1) ? false : me.store.getAt(record);
        } else {
            record = me.store.findRecord(displayField, inputElDom.value);
        }

        if (record) {
            newValue = record.get(displayField);
            len = newValue.length;
            selStart = inputElDom.value.length;
            boundList.highlightItem(boundList.getNode(record));
            if (selStart !== 0 && selStart !== len) {
                inputElDom.value = newValue;
                me.selectText(selStart, newValue.length);
            }
        }
    },

    /**
	 * Delegation control for selecting and removing labelled items or triggering list collapse/expansion
     * @protected
	 */
    onItemListClick: function(evt, el, o) {
        var me = this,
        itemEl = evt.getTarget('.x-boxselect-item'),
        closeEl = itemEl ? evt.getTarget('.x-boxselect-item-close') : false;

        if (me.readOnly || me.disabled) {
            return;
        }

        evt.stopPropagation();

        if (itemEl) {
            if (closeEl) {
                me.removeByListItemNode(itemEl);
                if (me.valueStore.getCount() > 0) {
                    me.fireEvent('select', me, me.valueStore.getRange());
                }
            } else {
                me.toggleSelectionByListItemNode(itemEl, evt.shiftKey);
            }
            me.inputEl.focus();
        } else {
            if (me.selectionModel.getCount() > 0) {
                me.selectionModel.setLastFocused(null);
                me.selectionModel.deselectAll();
            }
            if (me.triggerOnClick) {
                me.onTriggerClick();
            }
        }
    },

    /**
	 * Build the markup for the labelled items. Template must be built on demand due to ComboBox initComponent
	 * lifecycle for the creation of on-demand stores (to account for automatic valueField/displayField setting)
     * @private
	 */
    getMultiSelectItemMarkup: function() {
        var me = this;

        if (!me.multiSelectItemTpl) {
            if (!me.labelTpl) {
                me.labelTpl = Ext.create('Ext.XTemplate',
                    '{[values.' + me.displayField + ']}'
                );
            } else if (Ext.isString(me.labelTpl) || Ext.isArray(me.labelTpl)) {
                me.labelTpl = Ext.create('Ext.XTemplate', me.labelTpl);
            }

            me.multiSelectItemTpl = [
            '<tpl for=".">',
            '<li class="x-tab-default x-boxselect-item ',
            '<tpl if="this.isSelected(values.'+ me.valueField + ')">',
            ' selected',
            '</tpl>',
            '" qtip="{[typeof values === "string" ? values : values.' + me.displayField + ']}">' ,
            '<div class="x-boxselect-item-text">{[typeof values === "string" ? values : this.getItemLabel(values)]}</div>',
            '<div class="x-tab-close-btn x-boxselect-item-close"></div>' ,
            '</li>' ,
            '</tpl>',
            {
                compile: true,
                disableFormats: true,
                isSelected: function(value) {
                    var i = me.valueStore.findExact(me.valueField, value);
                    if (i >= 0) {
                        return me.selectionModel.isSelected(me.valueStore.getAt(i));
                    }
                    return false;
                },
                getItemLabel: function(values) {
                    return me.getTpl('labelTpl').apply(values);
                }
            }
            ];
        }

        return this.getTpl('multiSelectItemTpl').apply(Ext.Array.pluck(this.valueStore.getRange(), 'data'));
    },

    /**
	 * Update the labelled items rendering
     * @private
	 */
    applyMultiselectItemMarkup: function() {
        var me = this,
        itemList = me.itemList,
        item;

        if (itemList) {
            while ((item = me.inputElCt.prev()) != null) {
                item.remove();
            }
            me.inputElCt.insertHtml('beforeBegin', me.getMultiSelectItemMarkup());
        }

        Ext.Function.defer(function() {
            if (me.picker && me.isExpanded) {
                me.alignPicker();
            }
            if (me.hasFocus && me.inputElCt && me.listWrapper) {
                me.inputElCt.scrollIntoView(me.listWrapper);
            }
        }, 15);
    },

    /**
	 * Returns the record from valueStore for the labelled item node
	 */
    getRecordByListItemNode: function(itemEl) {
        var me = this,
        itemIdx = 0,
        searchEl = me.itemList.dom.firstChild;

        while (searchEl && searchEl.nextSibling) {
            if (searchEl == itemEl) {
                break;
            }
            itemIdx++;
            searchEl = searchEl.nextSibling;
        }
        itemIdx = (searchEl == itemEl) ? itemIdx : false;

        if (itemIdx === false) {
            return false;
        }

        return me.valueStore.getAt(itemIdx);
    },

    /**
	 * Toggle of labelled item selection by node reference
	 */
    toggleSelectionByListItemNode: function(itemEl, keepExisting) {
        var me = this,
        rec = me.getRecordByListItemNode(itemEl),
        selModel = me.selectionModel;

        if (rec) {
            if (selModel.isSelected(rec)) {
                if (selModel.isFocused(rec)) {
                    selModel.setLastFocused(null);
                }
                selModel.deselect(rec);
            } else {
                selModel.select(rec, keepExisting);
            }
        }
    },

    /**
	 * Removal of labelled item by node reference
	 */
    removeByListItemNode: function(itemEl) {
        var me = this,
        rec = me.getRecordByListItemNode(itemEl);

        if (rec) {
            me.valueStore.remove(rec);
            me.setValue(me.valueStore.getRange());
        }
    },

    /**
     * @inheritdoc
	 * Intercept calls to getRawValue to pretend there is no inputEl for rawValue handling,
	 * so that we can use inputEl for user input of just the current value.
	 */
    getRawValue: function() {
        var me = this,
        inputEl = me.inputEl,
        result;
        me.inputEl = false;
        result = me.callParent(arguments);
        me.inputEl = inputEl;
        return result;
    },

    /**
     * @inheritdoc
	 * Intercept calls to setRawValue to pretend there is no inputEl for rawValue handling,
	 * so that we can use inputEl for user input of just the current value.
	 */
    setRawValue: function(value) {
        var me = this,
        inputEl = me.inputEl,
        result;

        me.inputEl = false;
        result = me.callParent([value]);
        me.inputEl = inputEl;

        return result;
    },

    /**
	 * Adds a value or values to the current value of the field
	 * @param {Mixed} value The value or values to add to the current value, see {@link #setValue}
	 */
    addValue: function(value) {
        var me = this;
        if (value) {
            me.setValue(Ext.Array.merge(me.value, Ext.Array.from(value)));
        }
    },

    /**
	 * Removes a value or values from the current value of the field
	 * @param {Mixed} value The value or values to remove from the current value, see {@link #setValue}
	 */
    removeValue: function(value) {
        var me = this;

        if (value) {
            me.setValue(Ext.Array.difference(me.value, Ext.Array.from(value)));
        }
    },

    /**
     * Sets the specified value(s) into the field. The following value formats are recognised:
     *
     * - Single Values
     *
     *     - A string associated to this field's configured {@link #valueField}
     *     - A record containing at least this field's configured {@link #valueField} and {@link #displayField}
     *
     * - Multiple Values
     *
     *     - If {@link #multiSelect} is `true`, a string containing multiple strings as
     *       specified in the Single Values section above, concatenated in to one string
     *       with each entry separated by this field's configured {@link #delimiter}
     *     - An array of strings as specified in the Single Values section above
     *     - An array of records as specified in the Single Values section above
     *
     * In any of the string formats above, the following occurs if an associated record cannot be found:
     *
     * 1. If {@link #forceSelection} is `false`, a new record of the {@link #store}'s configured model type
     *    will be created using the given value as the {@link #displayField} and {@link #valueField}.
     *    This record will be added to the current value, but it will **not** be added to the store.
     * 2. If {@link #forceSelection} is `true` and {@link #queryMode} is `remote`, the list of unknown
     *    values will be submitted as a call to the {@link #store}'s load as a parameter named by
     *    the {@link #valueParam} with values separated by the configured {@link #delimiter}.
     *    ** This process will cause setValue to asynchronously process. ** This will only be attempted
     *    once. Any unknown values that the server does not return records for will be removed.
     * 3. Otherwise, unknown values will be removed.
     *
     * @param {Mixed} value The value(s) to be set, see method documentation for details
     * @return {Ext.form.field.Field/Boolean} this, or `false` if asynchronously querying for unknown values
	 */
    setValue: function(value, doSelect, skipLoad) {
        var me = this,
        valueStore = me.valueStore,
        valueField = me.valueField,
        record, len, i, valueRecord, h,
        unknownValues = [];

        if (Ext.isEmpty(value)) {
            value = null;
        }
        if (Ext.isString(value) && me.multiSelect) {
            value = value.split(me.delimiter);
        }
        value = Ext.Array.from(value, true);

        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            if (!record || !record.isModel) {
                valueRecord = valueStore.findExact(valueField, record);
                if (valueRecord >= 0) {
                    value[i] = valueStore.getAt(valueRecord);
                } else {
                    valueRecord = me.findRecord(valueField, record);
                    if (!valueRecord) {
                        if (me.forceSelection) {
                            unknownValues.push(record);
                        } else {
                            valueRecord = {};
                            valueRecord[me.valueField] = record;
                            valueRecord[me.displayField] = record;
                            valueRecord = new me.valueStore.model(valueRecord);
                        }
                    }
                    if (valueRecord) {
                        value[i] = valueRecord;
                    }
                }
            }
        }

        if ((skipLoad !== true) && (unknownValues.length > 0) && (me.queryMode === 'remote')) {
            var params = {};
            params[me.valueParam || me.valueField] = unknownValues.join(me.delimiter);
            me.store.load({
                params: params,
                callback: function() {
                    if (me.itemList) {
                        me.itemList.unmask();
                    }
                    me.setValue(value, doSelect, true);
                    me.autoSize();
                    me.lastQuery = false;
                }
            });
            return false;
        }

        // For single-select boxes, use the last good (formal record) value if possible
        if (!me.multiSelect && (value.length > 0)) {
            for (i = value.length - 1; i >= 0; i--) {
                if (value[i].isModel) {
                    value = value[i];
                    break;
                }
            }
            if (Ext.isArray(value)) {
                value = value[value.length - 1];
            }
        }

        return me.callParent([value, doSelect]);
    },

    /**
     * Returns the records for the field's current value
     * @return {Array} The records for the field's current value
     */
    getValueRecords: function() {
        return this.valueStore.getRange();
    },

    /**
     * @inheritdoc
     * Overridden to optionally allow for submitting the field as a json encoded array.
     */
    getSubmitData: function() {
        var me = this,
        val = me.callParent(arguments);

        if (me.multiSelect && me.encodeSubmitValue && val && val[me.name]) {
            val[me.name] = Ext.encode(val[me.name]);
        }

        return val;
    },

    /**
	 * Overridden to clear the input field if we are auto-setting a value as we blur.
     * @protected
	 */
    mimicBlur: function() {
        var me = this;

        if (me.selectOnTab && me.picker && me.picker.highlightedItem) {
            me.inputEl.dom.value = '';
        }

        me.callParent(arguments);
    },

    /**
	 * Overridden to handle partial-input selections more directly
	 */
    assertValue: function() {
        var me = this,
        rawValue = me.inputEl.dom.value,
        rec = !Ext.isEmpty(rawValue) ? me.findRecordByDisplay(rawValue) : false,
        value = false;

        if (!rec && !me.forceSelection && me.createNewOnBlur && !Ext.isEmpty(rawValue)) {
            value = rawValue;
        } else if (rec) {
            value = rec;
        }

        if (value) {
            me.addValue(value);
        }

        me.inputEl.dom.value = '';

        me.collapse();
    },

    /**
	 * Expand record values for evaluating change and fire change events for UI to respond to
	 */
    checkChange: function() {
        if (!this.suspendCheckChange && !this.isDestroyed) {
            var me = this,
            valueStore = me.valueStore,
            lastValue = me.lastValue || '',
            valueField = me.valueField,
            newValue = Ext.Array.map(Ext.Array.from(me.value), function(val) {
                if (val.isModel) {
                    return val.get(valueField);
                }
                return val;
            }, this).join(this.delimiter),
            isEqual = me.isEqual(newValue, lastValue);

            if (!isEqual || ((newValue.length > 0 && valueStore.getCount() < newValue.length))) {
                valueStore.suspendEvents();
                valueStore.removeAll();
                if (Ext.isArray(me.valueModels)) {
                    valueStore.add(me.valueModels);
                }
                valueStore.resumeEvents();
                valueStore.fireEvent('datachanged', valueStore);

                if (!isEqual) {
                    me.lastValue = newValue;
                    me.fireEvent('change', me, newValue, lastValue);
                    me.onChange(newValue, lastValue);
                }
            }
        }
    },

    /**
     * Overridden to be more accepting of varied value types
     */
    isEqual: function(v1, v2) {
        var fromArray = Ext.Array.from,
            valueField = this.valueField,
            i, len, t1, t2;

        v1 = fromArray(v1);
        v2 = fromArray(v2);
        len = v1.length;

        if (len !== v2.length) {
            return false;
        }

        for(i = 0; i < len; i++) {
            t1 = v1[i].isModel ? v1[i].get(valueField) : v1[i];
            t2 = v2[i].isModel ? v2[i].get(valueField) : v2[i];
            if (t1 !== t2) {
                return false;
            }
        }

        return true;
    },

    /**
	 * Overridden to use value (selection) instead of raw value and to avoid the use of placeholder
	 */
    applyEmptyText : function() {
        var me = this,
        emptyText = me.emptyText,
        inputEl, isEmpty;

        if (me.rendered && emptyText) {
            isEmpty = Ext.isEmpty(me.value) && !me.hasFocus;
            inputEl = me.inputEl;
            if (isEmpty) {
                inputEl.dom.value = '';
                me.emptyEl.update(emptyText);
                me.emptyEl.addCls(me.emptyCls);
                me.emptyEl.removeCls(me.emptyInputCls);
                me.listWrapper.addCls(me.emptyCls);
                me.inputEl.addCls(me.emptyInputCls);
            } else {
                me.emptyEl.addCls(me.emptyInputCls);
                me.emptyEl.removeCls(me.emptyCls);
                me.listWrapper.removeCls(me.emptyCls);
                me.inputEl.removeCls(me.emptyInputCls);
            }
            me.autoSize();
        }
    },

    /**
	 * Overridden to use inputEl instead of raw value and to avoid the use of placeholder
	 */
    preFocus : function(){
        var me = this,
        inputEl = me.inputEl,
        emptyText = me.emptyText,
        isEmpty = (inputEl.dom.value == '');

        me.emptyEl.addCls(me.emptyInputCls);
        me.emptyEl.removeCls(me.emptyCls);
        me.listWrapper.removeCls(me.emptyCls);
        me.inputEl.removeCls(me.emptyInputCls);

        if (me.selectOnFocus || isEmpty) {
            inputEl.dom.select();
        }
    },

    /**
	 * Intercept calls to onFocus to add focusCls, because the base field
     * classes assume this should be applied to inputEl
	 */
    onFocus: function() {
        var me = this,
        focusCls = me.focusCls,
        itemList = me.itemList;

        if (focusCls && itemList) {
            itemList.addCls(focusCls);
        }

        me.callParent(arguments);
    },

    /**
	 * Intercept calls to onBlur to remove focusCls, because the base field
     * classes assume this should be applied to inputEl
	 */
    onBlur: function() {
        var me = this,
        focusCls = me.focusCls,
        itemList = me.itemList;

        if (focusCls && itemList) {
            itemList.removeCls(focusCls);
        }

        me.callParent(arguments);
    },

    /**
	 * Intercept calls to renderActiveError to add invalidCls, because the base
     * field classes assume this should be applied to inputEl
	 */
    renderActiveError: function() {
        var me = this,
        invalidCls = me.invalidCls,
        itemList = me.itemList,
        hasError = me.hasActiveError();

        if (invalidCls && itemList) {
            itemList[hasError ? 'addCls' : 'removeCls'](me.invalidCls + '-field');
        }

        me.callParent(arguments);
    },

    /**
     * Initiate auto-sizing for height based on {@link #grow}, if applicable.
     */
    autoSize: function() {
        var me = this,
        height;

        if (me.grow && me.rendered) {
            me.autoSizing = true;
            me.updateLayout();
        }

        return me;
    },

    /**
     * Track height change to fire {@link #event-autosize} event, when applicable.
     */
    afterComponentLayout: function() {
        var me = this,
            width;

        if (me.autoSizing) {
            height = me.getHeight();
            if (height !== me.lastInputHeight) {
                if (me.isExpanded) {
                    me.alignPicker();
                }
                me.fireEvent('autosize', me, height);
                me.lastInputHeight = height;
                delete me.autoSizing;
            }
        }
    }
});

/**
 * Ensures the input element takes up the maximum amount of remaining list width,
 * or the entirety of the list width if too little space remains. In this case,
 * the list height will be automatically increased to accomodate the new line. This
 * growth will not occur if {@link Ext.ux.form.field.BoxSelect#multiSelect} or
 * {@link Ext.ux.form.field.BoxSelect#grow} is false.
 */
Ext.define('Ext.ux.layout.component.field.BoxSelectField', {
    /* Begin Definitions */
    alias: ['layout.boxselectfield'],
    extend:  Ext.layout.component.field.Trigger ,

    /* End Definitions */

    type: 'boxselectfield',

    /*For proper calculations we need our field to be sized.*/
    waitForOuterWidthInDom:true,

    beginLayout: function(ownerContext) {
        var me = this,
            owner = me.owner;

        me.callParent(arguments);

        ownerContext.inputElCtContext = ownerContext.getEl('inputElCt');
        owner.inputElCt.setStyle('width','');

        me.skipInputGrowth = !owner.grow || !owner.multiSelect;
    },

    beginLayoutFixed: function(ownerContext, width, suffix) {
        var me = this,
            owner = ownerContext.target;

        owner.triggerEl.setStyle('height', '24px');

        me.callParent(arguments);

        if (ownerContext.heightModel.fixed && ownerContext.lastBox) {
            owner.listWrapper.setStyle('height', ownerContext.lastBox.height+'px');
            owner.itemList.setStyle('height', '100%');
        }
        /*No inputElCt calculations here!*/
    },

    /*Calculate and cache value of input container.*/
    publishInnerWidth:function(ownerContext) {
        var me = this,
            owner = me.owner,
            width = owner.itemList.getWidth(true) - 10,
            lastEntry = owner.inputElCt.prev(null, true);

        if (lastEntry && !owner.stacked) {
            lastEntry = Ext.fly(lastEntry);
            width = width - lastEntry.getOffsetsTo(lastEntry.up(''))[0] - lastEntry.getWidth();
        }

        if (!me.skipInputGrowth && (width < 35)) {
            width = width - 10;
        } else if (width < 1) {
            width = 1;
        }
        ownerContext.inputElCtContext.setWidth(width);
    }
});

var orderstatus = Ext.create('Ext.data.Store', {
    fields: ['code', 'cn'],
    data : [
        {"code":"submit", "cn":"已提交"},
        {"code":"paid", "cn":"已付款"},
        {"code":"process", "cn":"处理中"},
        {"code":"complete", "cn":"已成交"},
        {"code":"cancel", "cn":"已取消"}
    ]
});
Ext.define('tms.view.orders.StatusCombo', {
    extend :  Ext.ux.form.field.BoxSelect ,
    alias:'widget.orderStatusCombo',
    multiSelect: false,
    displayField: 'cn',
    valueField: 'code',
    queryMode: 'local',
    store: orderstatus
});

Ext.define('tms.store.OrdersStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Orders',
    storeId: 'OrdersStore'
});

Ext.define('tms.controller.OrdersController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.OrdersStore'],
    models:['tms.model.Orders'],
    views:['tms.view.orders.List','tms.view.orders.Nav','tms.view.orders.Detail','tms.view.orders.StatusCombo'],
    refs:[
        {
            ref:'grid',
            selector:'ordersList'
        },
        {
            ref:'detailPanel',
            selector:'ordersDetail'
        }
    ],
    init:function (application) {
        this.control({
            'ordersList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'ordersList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'ordersList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'ordersList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'ordersUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'ordersUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            },
            'ordersNav':{
                itemclick:{
                    fn:this.onItemClick,
                    scope:this
                }
            }
        });
    },
    onItemClick: function( me, record, item, index, e, eOpts ) {
        var orderRec = Ext.create('tms.model.Orders',{type:record.raw.orderType,status:record.raw.orderStatus});
        this.getGrid().setOrderRecord(orderRec);
    },
    onGridSelectionChange:function ( grid, selected, eOpts) {
        var editButton = Ext.ComponentQuery.query('ordersList button[action=update]')[0];
        editButton.enable();
        //加载订单详细
        var record = selected[0];
        if(record) {
            this.getDetailPanel().loadDetail(record.get('id'));
        }

    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Orders');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('ordersList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.orders.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('ordersForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('OrdersStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('ordersList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('orders') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('ordersForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('ordersUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.Profiles', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('profiles'),
    idProperty:'user_id',
    fields:[
        {name:'user_id', type:'string'}
        ,{name:'lastname', type:'string'}
        ,{name:'firstname', type:'string'}
        ,{name:'address', type:'string'}
        ,{name:'town', type:'string'}
        ,{name:'city', type:'string'}
        ,{name:'postcode', type:'string'}
        ,{name:'tel', type:'string'}
        ,{name:'fax', type:'string'}
        ,{name:'preferences', type:'string'}
        ,{name:'car_regno', type:'string'}
        ,{name:'ccard_no', type:'string'}
        ,{name:'ccard_issued', type:'string'}
        ,{name:'ccard_expiry', type:'string'}
        ,{name:'ccard_iss_no', type:'string'}
        ,{name:'ccard_name', type:'string'}
        ,{name:'ccv', type:'string'}
        ,{name:'type', type:'string'}
    ],
    getRecordName: function () {
        return this.get("user_id");
    }
});

Ext.define('tms.view.profiles.List', {
    extend: tms.base.Grid ,
    alias:'widget.profilesList',
    store:'ProfilesStore',
    columns:[
		{width: 50,  header:i18n.t('profiles_user_id'), sortable:true, dataIndex:'user_id', filter:true}
		,{width: 50,  header:i18n.t('profiles_lastname'), sortable:true, dataIndex:'lastname', filter:true}
		,{width: 50,  header:i18n.t('profiles_firstname'), sortable:true, dataIndex:'firstname', filter:true}
		,{width: 50,  header:i18n.t('profiles_address'), sortable:true, dataIndex:'address', filter:true}
		,{width: 50,  header:i18n.t('profiles_town'), sortable:true, dataIndex:'town', filter:true}
		,{width: 50,  header:i18n.t('profiles_city'), sortable:true, dataIndex:'city', filter:true}
		,{width: 50,  header:i18n.t('profiles_postcode'), sortable:true, dataIndex:'postcode', filter:true}
		,{width: 50,  header:i18n.t('profiles_tel'), sortable:true, dataIndex:'tel', filter:true}
		,{width: 50,  header:i18n.t('profiles_fax'), sortable:true, dataIndex:'fax', filter:true}
		,{width: 50,  header:i18n.t('profiles_preferences'), sortable:true, dataIndex:'preferences', filter:true}
		,{width: 50,  header:i18n.t('profiles_car_regno'), sortable:true, dataIndex:'car_regno', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_no'), sortable:true, dataIndex:'ccard_no', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_issued'), sortable:true, dataIndex:'ccard_issued', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_expiry'), sortable:true, dataIndex:'ccard_expiry', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_iss_no'), sortable:true, dataIndex:'ccard_iss_no', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccard_name'), sortable:true, dataIndex:'ccard_name', filter:true}
		,{width: 50,  header:i18n.t('profiles_ccv'), sortable:true, dataIndex:'ccv', filter:true}
		,{width: 50,  header:i18n.t('profiles_type'), sortable:true, dataIndex:'type', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'ProfilesStore',
        displayInfo: true
    }]
});

Ext.define('tms.store.ProfilesStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Profiles',
    storeId: 'ProfilesStore'
});

Ext.define('tms.controller.ProfilesController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.ProfilesStore'],
    models:['tms.model.Profiles'],
    views:['tms.view.profiles.List'],
    init:function (application) {
        this.control({
            'profilesList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'profilesList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'profilesList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'profilesList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'profilesList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'profilesUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'profilesUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('profilesList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('profilesList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Profiles');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('profilesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.profiles.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('profilesForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('ProfilesStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('profilesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('profiles') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('profilesForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('profilesUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.Property', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('property'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'sub_title', type:'string'}
    		,{name:'street', type:'string'}
    		,{name:'town', type:'string'}
    		,{name:'region', type:'string'}
    		,{name:'country', type:'string'}
    		,{name:'postcode', type:'string'}
    		,{name:'tel', type:'string'}
    		,{name:'fax', type:'string'}
    		,{name:'email', type:'string'}
    		,{name:'features', type:'string'}
    		,{name:'mappinglink', type:'string'}
    		,{name:'description', type:'string'}
    		,{name:'checkin_times', type:'string'}
    		,{name:'area_activities', type:'string'}
    		,{name:'driving_directions', type:'string'}
    		,{name:'airports', type:'string'}
    		,{name:'othertransport', type:'string'}
    		,{name:'policies_disclaimers', type:'string'}
    		,{name:'property_key', type:'string'}
    		,{name:'published', type:'string'}
    		,{name:'stars', type:'string'}
    		,{name:'ptype_id', type:'string'}
    		,{name:'apikey', type:'string'}
    		,{name:'lat', type:'string'}
    		,{name:'long', type:'string'}
    		,{name:'metatitle', type:'string'}
    		,{name:'metadescription', type:'string'}
    		,{name:'timestamp', type:'date'}
    		,{name:'approved', type:'string'}
            ,{name:'promotion', type:'string'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});

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
    extend:  Ext.window.Window ,
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

Ext.define('tms.view.property.List', {
    extend: Ext.grid.Panel ,
    selModel:{mode:'SINGLE'},
    forceFit:true,
    columnLines:true,
    border:false,
    showTopToolbar:true,
    showBottomToolbar:true,
    features : [{ftype: 'filters',encode: true}],
    alias:'widget.propertyList',
    store:'PropertyStore',
    columns:[
		{width: 50,  header:i18n.t('property_name'), sortable:true, dataIndex:'name', filter:true}
    ],
    initComponent: function() {
        this.dockedItems = new Array();
        if (this.showTopToolbar) {
            this.topToolbar = Ext.create('Ext.toolbar.Toolbar',{
                dock: 'top',
                enableOverflow: true,
                items: [
                    {
                        xtype: 'button',
                        tooltip: i18n.t("button_create"),
                        action: 'create',
                        iconCls: 'add'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'update',
                        tooltip: i18n.t("button_update"),
                        iconCls: 'option'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        action: 'delete',
                        tooltip: i18n.t("button_delete"),
                        iconCls: 'remove'
                    },
                    {
                        xtype: 'button',
                        tooltip: i18n.t("button_refresh"),
                        action: 'refresh',
                        iconCls: 'refresh'
                    },
                    {
                        xtype: 'button',
                        action: 'upload',
                        iconCls: 'upload',
                        disabled: true
                    }]
            });
            this.dockedItems.push(this.topToolbar);
        }
        this.callParent(arguments);
    }
});

Ext.define('tms.view.roomClasses.List', {
    extend: tms.base.Grid ,
    alias:'widget.roomClassesList',
    store:'RoomClassesStore',
    columns:[
		{width: 50,  header:i18n.t('roomClasses_room_classes_name'), sortable:true, dataIndex:'room_classes_name', filter:true}
		,{width: 50,  header:i18n.t('roomClasses_room_classes_features'), sortable:true, dataIndex:'room_classes_features', filter:true}
		,{width: 50,  header:i18n.t('roomClasses_total_rooms'), sortable:true, dataIndex:'total_rooms', filter:true}
    ],
    initComponent:function () {
        this.callParent();
        this.topToolbar.add({
            xtype: 'button',
            text: i18n.t("button_upload"),
            action: 'upload',
            iconCls: 'upload',
            disabled: true
        });
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'RoomClassesStore',
        displayInfo: true
    }],
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'property_id',comparison:'eq',value:this.propertyRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setPropertyRecord : function(record) {
        this.propertyRecord = record;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    }
});

Ext.define('tms.view.roomRates.List', {
    extend: tms.base.Grid ,
    alias:'widget.roomRatesList',
    store:'RoomRatesStore',
    columns:[
		{width: 50,  header:i18n.t('roomRates_rate_title'), sortable:true, dataIndex:'rate_title', filter:true}
		,{width: 50,  header:i18n.t('roomRates_validfrom'), sortable:true, dataIndex:'validfrom', renderer: Ext.util.Format.dateRenderer('Y-m-d')}
		,{width: 50,  header:i18n.t('roomRates_validto'), sortable:true, dataIndex:'validto', renderer: Ext.util.Format.dateRenderer('Y-m-d')}
		,{width: 50,  header:i18n.t('roomRates_roomrateperday'), sortable:true, dataIndex:'roomrateperday', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'RoomRatesStore',
        displayInfo: true
    }],
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'property_id',comparison:'eq',value:this.roomClassesRecord.get("property_id")});
        filters.push({type:'numeric', field: 'room_classes_id',comparison:'eq',value:this.roomClassesRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setRoomClassesRecord : function(record) {
        this.roomClassesRecord = record;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    }
});

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
    extend:  Ext.view.View ,
    alias: 'widget.iconbrowser',
                           
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

/**
 * @class Ext.chooser.InfoPanel
 * @extends Ext.panel.Panel
 * @author Ed Spencer
 * 
 * This panel subclass just displays information about an image. We have a simple template set via the tpl property,
 * and a single function (loadRecord) which updates the contents with information about another image.
 */
Ext.define('Ext.ux.view.InfoPanel', {
    extend:  Ext.panel.Panel ,
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

/**
 * @class Ext.ux.upload.Basic
 * @extends Ext.util.Observable
 * 
 * @author Harald Hanek (c) 2011-2012
 * @license http://harrydeluxe.mit-license.org
 */
Ext.define('Ext.ux.upload.Basic', {
    extend:  Ext.util.Observable ,
    autoStart: true,
    autoRemoveUploaded: true,
    
    statusQueuedText: i18n.t('Ready to upload'),
    statusUploadingText: i18n.t('Uploading ({0}%)'),
    statusFailedText: i18n.t('Error'),
    statusDoneText: i18n.t('Complete'),
    statusInvalidSizeText: i18n.t('File too large'),
    statusInvalidExtensionText: i18n.t('Invalid file type'),
    

    configs: {
        uploader: {
            runtimes: '',
            url: '',
            browse_button: null,
            container: null,
            max_file_size: '128mb',
            resize: '',
            flash_swf_url: '',
            silverlight_xap_url: '',
            filters: [],
            //chunk_size: '1mb', // @see http://www.plupload.com/punbb/viewtopic.php?id=1259
            chunk_size: null,
            unique_names: true,
            multipart: true,
            multipart_params: {},
            multi_selection: true,
            drop_element: null,
            required_features: null
        }
    },
    
    constructor: function(owner, config)
    {
        var me = this;
        me.owner = owner;
        me.success = [];
        me.failed = [];
        Ext.apply(me, config.listeners);
        me.uploaderConfig = Ext.apply(me, config.uploader, me.configs.uploader);
        
        me.addEvents('beforestart',
                'uploadready',
                'uploadstarted',
                'uploadcomplete',
                'uploaderror',
                'filesadded',
                'beforeupload',
                'fileuploaded',
                'updateprogress',
                'uploadprogress',
                'storeempty');      
        
        Ext.define('Ext.ux.upload.Model', {
            extend:  Ext.data.Model ,
            fields: ['id',
                    'loaded',
                    'name',
                    'size',
                    'percent',
                    'status',
                    'msg']
        });
        
        me.store = Ext.create('Ext.data.JsonStore', {
            model: 'Ext.ux.upload.Model',
            listeners: {
                load: me.onStoreLoad,
                remove: me.onStoreRemove,
                update: me.onStoreUpdate,
                scope: me
            }
        });
        
        me.actions = {
            
            textStatus: Ext.create('Ext.Action', {
                text: '<i>uploader not initialized</i>'
            }),
            add: Ext.create('Ext.Action', {
                text: config.addButtonText || i18n.t('Add files'),
                iconCls: config.addButtonCls,
                disabled: false
            }),
            start: Ext.create('Ext.Action', {
                text: config.uploadButtonText ||i18n.t('Start'),
                disabled: true,
                iconCls: config.uploadButtonCls,
                handler: me.start,
                scope: me
            }),
            cancel: Ext.create('Ext.Action', {
                text: config.cancelButtonText || i18n.t('Cancel'),
                disabled: true,
                iconCls: config.cancelButtonCls,
                handler: me.cancel,
                scope: me
            }),
            removeUploaded: Ext.create('Ext.Action', {
                text: config.deleteUploadedText || i18n.t('Remove uploaded'),
                disabled: true,
                handler: me.removeUploaded,
                scope: me
            }),
            removeAll: Ext.create('Ext.Action', {
                text: config.deleteAllText ||i18n.t( 'Remove all'),
                disabled: true,
                handler: me.removeAll,
                scope: me
            })
        };

        me.callParent();
    },
    
    /**
     * @private
     */
    initialize: function()
    {
        var me = this;
        if(!me.initialized)
        {
            me.initialized = true;
            me.initializeUploader();
        }
    },
    
    /**
     * Destroys this object.
     */
    destroy: function()
    {
        this.clearListeners();
    },
    
    setUploadPath: function(path)
    {
        this.uploadpath = path;
    },
    
    removeAll: function()
    {
        this.store.data.each(function(record)
        {
            this.removeFile(record.get('id'));
        }, this);
    },
    
    removeUploaded: function()
    {
        //console.log(this.store);
        this.store.each(function(record)
        {
            //console.log(record);
            if(record && record.get('status') == 5)
            {
                this.removeFile(record.get('id'));
            }
        }, this);
    },
    
    removeFile: function(id)
    {
        var me = this,
            file = me.uploader.getFile(id);
        
        if(file)
            me.uploader.removeFile(file);
        else
            me.store.remove(me.store.getById(id));
    },
    
    cancel: function()
    {
        var me = this;
        me.uploader.stop();
        me.actions.start.setDisabled(me.store.data.length == 0);
    },
    
    start: function()
    {
        var me = this;
        me.fireEvent('beforestart', me);
        if(me.multipart_params)
        {
            me.uploader.settings.multipart_params = me.multipart_params;
        }
        me.uploader.start();
        //console.log(me.uploader);
    },
    
    initializeUploader: function()
    {
        var me = this;

        if (!me.uploaderConfig.runtimes) {
            var runtimes = ['html5'];
            
            me.uploaderConfig.flash_swf_url && runtimes.push('flash');
            me.uploaderConfig.silverlight_xap_url && runtimes.push('silverlight');

            runtimes.push('html4');

            me.uploaderConfig.runtimes = runtimes.join(',');
        }

        me.uploader = Ext.create('plupload.Uploader', me.uploaderConfig);
        
        Ext.each(['Init',
                'ChunkUploaded',
                'FilesAdded',
                'FilesRemoved',
                'FileUploaded',
                'PostInit',
                'QueueChanged',
                'Refresh',
                'StateChanged',
                'BeforeUpload',
                'UploadFile',
                'UploadProgress',
                'Error'], function(v){
                    me.uploader.bind(v, eval("me._" + v), me);
                }, me);
        
        me.uploader.init();
    },
    
    updateProgress: function()
    {
        var me = this,
            t = me.uploader.total,
            speed = Ext.util.Format.fileSize(t.bytesPerSec),
            total = me.store.data.length,
            failed = me.failed.length,
            success = me.success.length,
            sent = failed + success,
            queued = total - success - failed,
            percent = t.percent;
        
        me.fireEvent('updateprogress', me, total, percent, sent, success, failed, queued, speed);
    },
    
    updateStore: function(v)
    {
        var me = this,
            data = me.store.getById(v.id);
        
        if(!v.msg)
        {
            v.msg = '';
        }
        if(data)
        {
            data.data = v;
            data.commit();
        }
        else
        {
            me.store.loadData([v], true);
        }
    },
    
    onStoreLoad: function(store, record, operation)
    {
        this.updateProgress();
    },
    
    onStoreRemove: function(store, record, operation)
    {
        var me = this;
        if(!store.data.length)
        {
            me.actions.start.setDisabled(true);
            me.actions.removeUploaded.setDisabled(true);
            me.actions.removeAll.setDisabled(true);
            me.uploader.total.reset();
            me.fireEvent('storeempty', me);
        }
        
        var id = record.get('id');
        Ext.each(me.success, function(v)
        {
            if(v && v.id == id)
                Ext.Array.remove(me.success, v);
        }, me);
        
        Ext.each(me.failed, function(v)
        {
            if(v && v.id == id)
                Ext.Array.remove(me.failed, v);
        }, me);
        
        me.updateProgress();
    },
    
    onStoreUpdate: function(store, record, operation)
    {
        record.data = this.fileMsg(record.data);
        this.updateProgress();
    },
    
    fileMsg: function(file)
    {
        var me = this;
        if(file.status && file.server_error != 1)
        {
            switch(file.status)
            {
                case 1:
                    file.msg = me.statusQueuedText;
                    break;
                case 2:
                    file.msg = Ext.String.format(me.statusUploadingText, file.percent);
                    break;
                case 4:
                    file.msg = file.msg || me.statusFailedText;
                    break;
                case 5:
                    file.msg = me.statusDoneText;
                    break;
            }
        }
        return file;
    },
    
    /**
     * Plupload EVENTS
     */
    _Init: function(uploader, data)
    {
        this.runtime = data.runtime;
        this.owner.enable(true); // button aktiv schalten
        this.fireEvent('uploadready', this);
    },
    
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    _BeforeUpload: function(uploader, file)
    {
        this.fireEvent('beforeupload', this, uploader, file);
    },
    
    _ChunkUploaded: function()
    {
    },
    
    _FilesAdded: function(uploader, files)
    {
        var me = this;
        
        if(me.uploaderConfig.multi_selection != true) 
        {
            if(me.store.data.length == 1)
            //if(uploader.files.length == 1)
                return false;
            
            files = [files[0]];
            uploader.files = [files[0]];  
        }   
         
        me.actions.removeUploaded.setDisabled(false);
        me.actions.removeAll.setDisabled(false);
        me.actions.start.setDisabled(uploader.state == 2);
        Ext.each(files, function(v)
        {
            me.updateStore(v);
            
        }, me);

        if(me.fireEvent('filesadded', me, files) !== false)
        {
            if(me.autoStart && uploader.state != 2)
                Ext.defer(function()
                {
                    me.start();
                }, 300);
        }
    },
    
    _FilesRemoved: function(uploader, files)
    {
        Ext.each(files, function(file)
        {
            this.store.remove(this.store.getById(file.id));
        }, this);
    },
    
    _FileUploaded: function(uploader, file, status)
    {
        var me = this,
            response = Ext.JSON.decode(status.response);
        
        if(response.success == true)
        {
            file.server_error = 0;
            me.success.push(file);
            me.fireEvent('fileuploaded', me, file, response);
        }
        else
        {
            if(response.message)
            {
                file.msg = '<span style="color: red">' + response.message + '</span>';
            }
            file.server_error = 1;
            me.failed.push(file);
            me.fireEvent('uploaderror', me, Ext.apply(status, {
                file: file
            }));
        }
        this.updateStore(file);
    },
    
    _PostInit: function(uploader)
    {
    },
    
    _QueueChanged: function(uploader)
    {
    },
    
    _Refresh: function(uploader)
    {
        Ext.each(uploader.files, function(v)
        {
            this.updateStore(v);
        }, this);
    },
    
    _StateChanged: function(uploader)
    {
        if(uploader.state == 2)
        {
            this.fireEvent('uploadstarted', this);
            this.actions.cancel.setDisabled(false);
            this.actions.start.setDisabled(true);
        }
        else
        {
            this.fireEvent('uploadcomplete', this, this.success, this.failed);
            if(this.autoRemoveUploaded)
                this.removeUploaded();
            this.actions.cancel.setDisabled(true);
            this.actions.start.setDisabled(this.store.data.length == 0);
        }
    },
    
    _UploadFile: function(uploader, file)
    {
    },
    
    _UploadProgress: function(uploader, file)
    {
        var me = this,
            name = file.name,
            size = file.size,
            percent = file.percent; 
    
        me.fireEvent('uploadprogress', me, file, name, size, percent);

        if(file.server_error)
            file.status = 4;
        
        me.updateStore(file);
    },
    
    _Error: function(uploader, data)
    {
        if(data.file)
        {
            data.file.status = 4;
            if(data.code == -600)
            {
                data.file.msg = Ext.String.format('<span style="color: red">{0}</span>', this.statusInvalidSizeText);
            }
            else if(data.code == -601)
            {
                data.file.msg = Ext.String.format('<span style="color: red">{0}</span>', this.statusInvalidExtensionText);
            }
            else if(data.code == -700)
            {
                data.file.msg = Ext.String.format('<span style="color: red">{0}</span>', this.statusInvalidExtensionText);
            }
            else
            {
                data.file.msg = Ext.String.format('<span style="color: red">{2} ({0}: {1})</span>', data.code, data.details,
                        data.message);
            }
            this.failed.push(data.file);
            this.updateStore(data.file);
        }
        this.fireEvent('uploaderror', this, data);
    }
});

/**
 * @class Ext.ux.upload.Button
 * @extends Ext.button.Button
 * 
 * @author Harald Hanek (c) 2011-2012
 * @license http://harrydeluxe.mit-license.org
 */
Ext.define('Ext.ux.upload.Button', {
    extend:  Ext.button.Button ,
    alias: 'widget.uploadbutton',
                                      
    disabled: true,
    
    constructor: function(config)
    {
        var me = this;
        config = config || {};
        Ext.applyIf(config.uploader, {
            browse_button: config.id || Ext.id(me)
        });
        me.callParent([config]);
    },
    
    initComponent: function()
    {
        var me = this,
            e;
        me.callParent();
        me.uploader = me.createUploader();
        
        if(me.uploader.drop_element && (e = Ext.getCmp(me.uploader.drop_element)))
        {
            e.addListener('afterRender', function()
                {
                       me.uploader.initialize();
                },
                {
                    single: true,
                    scope: me
                });
        }
        else
        {
            me.listeners = {
                afterRender: {
                    fn: function()
                    {
                        me.uploader.initialize();
                    },
                    single: true,
                    scope: me
                }
            };
        }
        
        me.relayEvents(me.uploader, ['beforestart',
                'uploadready',
                'uploadstarted',
                'uploadcomplete',
                'uploaderror',
                'filesadded',
                'beforeupload',
                'fileuploaded',
                'updateprogress',
                'uploadprogress',
                'storeempty']);
    },
    
    /**
     * @private
     */
    createUploader: function()
    {
        return Ext.create('Ext.ux.upload.Basic', this, Ext.applyIf({
            listeners: {}
        }, this.initialConfig));
    }
});

/**
 * Basic status bar component that can be used as the bottom toolbar of any {@link Ext.Panel}.  In addition to
 * supporting the standard {@link Ext.toolbar.Toolbar} interface for adding buttons, menus and other items, the StatusBar
 * provides a greedy status element that can be aligned to either side and has convenient methods for setting the
 * status text and icon.  You can also indicate that something is processing using the {@link #showBusy} method.
 *
 *     Ext.create('Ext.Panel', {
 *         title: 'StatusBar',
 *         // etc.
 *         bbar: Ext.create('Ext.ux.StatusBar', {
 *             id: 'my-status',
 *      
 *             // defaults to use when the status is cleared:
 *             defaultText: 'Default status text',
 *             defaultIconCls: 'default-icon',
 *      
 *             // values to set initially:
 *             text: 'Ready',
 *             iconCls: 'ready-icon',
 *      
 *             // any standard Toolbar items:
 *             items: [{
 *                 text: 'A Button'
 *             }, '-', 'Plain Text']
 *         })
 *     });
 *
 *     // Update the status bar later in code:
 *     var sb = Ext.getCmp('my-status');
 *     sb.setStatus({
 *         text: 'OK',
 *         iconCls: 'ok-icon',
 *         clear: true // auto-clear after a set interval
 *     });
 *
 *     // Set the status bar to show that something is processing:
 *     sb.showBusy();
 *
 *     // processing....
 *
 *     sb.clearStatus(); // once completeed
 *
 */
Ext.define('Ext.ux.statusbar.StatusBar', {
    extend:  Ext.toolbar.Toolbar ,
    alternateClassName: 'Ext.ux.StatusBar',
    alias: 'widget.statusbar',
                                       
    /**
     * @cfg {String} statusAlign
     * The alignment of the status element within the overall StatusBar layout.  When the StatusBar is rendered,
     * it creates an internal div containing the status text and icon.  Any additional Toolbar items added in the
     * StatusBar's {@link #cfg-items} config, or added via {@link #method-add} or any of the supported add* methods, will be
     * rendered, in added order, to the opposite side.  The status element is greedy, so it will automatically
     * expand to take up all sapce left over by any other items.  Example usage:
     *
     *     // Create a left-aligned status bar containing a button,
     *     // separator and text item that will be right-aligned (default):
     *     Ext.create('Ext.Panel', {
     *         title: 'StatusBar',
     *         // etc.
     *         bbar: Ext.create('Ext.ux.statusbar.StatusBar', {
     *             defaultText: 'Default status text',
     *             id: 'status-id',
     *             items: [{
     *                 text: 'A Button'
     *             }, '-', 'Plain Text']
     *         })
     *     });
     *
     *     // By adding the statusAlign config, this will create the
     *     // exact same toolbar, except the status and toolbar item
     *     // layout will be reversed from the previous example:
     *     Ext.create('Ext.Panel', {
     *         title: 'StatusBar',
     *         // etc.
     *         bbar: Ext.create('Ext.ux.statusbar.StatusBar', {
     *             defaultText: 'Default status text',
     *             id: 'status-id',
     *             statusAlign: 'right',
     *             items: [{
     *                 text: 'A Button'
     *             }, '-', 'Plain Text']
     *         })
     *     });
     */
    /**
     * @cfg {String} [defaultText='']
     * The default {@link #text} value.  This will be used anytime the status bar is cleared with the
     * `useDefaults:true` option.
     */
    /**
     * @cfg {String} [defaultIconCls='']
     * The default {@link #iconCls} value (see the iconCls docs for additional details about customizing the icon).
     * This will be used anytime the status bar is cleared with the `useDefaults:true` option.
     */
    /**
     * @cfg {String} text
     * A string that will be <b>initially</b> set as the status message.  This string
     * will be set as innerHTML (html tags are accepted) for the toolbar item.
     * If not specified, the value set for {@link #defaultText} will be used.
     */
    /**
     * @cfg {String} [iconCls='']
     * A CSS class that will be **initially** set as the status bar icon and is
     * expected to provide a background image.
     *
     * Example usage:
     *
     *     // Example CSS rule:
     *     .x-statusbar .x-status-custom {
     *         padding-left: 25px;
     *         background: transparent url(images/custom-icon.gif) no-repeat 3px 2px;
     *     }
     *
     *     // Setting a default icon:
     *     var sb = Ext.create('Ext.ux.statusbar.StatusBar', {
     *         defaultIconCls: 'x-status-custom'
     *     });
     *
     *     // Changing the icon:
     *     sb.setStatus({
     *         text: 'New status',
     *         iconCls: 'x-status-custom'
     *     });
     */

    /**
     * @cfg {String} cls
     * The base class applied to the containing element for this component on render.
     */
    cls : 'x-statusbar',
    /**
     * @cfg {String} busyIconCls
     * The default {@link #iconCls} applied when calling {@link #showBusy}.
     * It can be overridden at any time by passing the `iconCls` argument into {@link #showBusy}.
     */
    busyIconCls : 'x-status-busy',
    /**
     * @cfg {String} busyText
     * The default {@link #text} applied when calling {@link #showBusy}.
     * It can be overridden at any time by passing the `text` argument into {@link #showBusy}.
     */
    busyText : 'Loading...',
    /**
     * @cfg {Number} autoClear
     * The number of milliseconds to wait after setting the status via
     * {@link #setStatus} before automatically clearing the status text and icon.
     * Note that this only applies when passing the `clear` argument to {@link #setStatus}
     * since that is the only way to defer clearing the status.  This can
     * be overridden by specifying a different `wait` value in {@link #setStatus}.
     * Calls to {@link #clearStatus} always clear the status bar immediately and ignore this value.
     */
    autoClear : 5000,

    /**
     * @cfg {String} emptyText
     * The text string to use if no text has been set. If there are no other items in
     * the toolbar using an empty string (`''`) for this value would end up in the toolbar
     * height collapsing since the empty string will not maintain the toolbar height.
     * Use `''` if the toolbar should collapse in height vertically when no text is
     * specified and there are no other items in the toolbar.
     */
    emptyText : '&#160;',

    // private
    activeThreadId : 0,

    // private
    initComponent : function(){
        var right = this.statusAlign === 'right';

        this.callParent(arguments);
        this.currIconCls = this.iconCls || this.defaultIconCls;
        this.statusEl = Ext.create('Ext.toolbar.TextItem', {
            cls: 'x-status-text ' + (this.currIconCls || ''),
            text: this.text || this.defaultText || ''
        });

        if (right) {
            this.cls += ' x-status-right';
            this.add('->');
            this.add(this.statusEl);
        } else {
            this.insert(0, this.statusEl);
            this.insert(1, '->');
        }
    },

    /**
     * Sets the status {@link #text} and/or {@link #iconCls}. Also supports automatically clearing the
     * status that was set after a specified interval.
     *
     * Example usage:
     *
     *     // Simple call to update the text
     *     statusBar.setStatus('New status');
     *
     *     // Set the status and icon, auto-clearing with default options:
     *     statusBar.setStatus({
     *         text: 'New status',
     *         iconCls: 'x-status-custom',
     *         clear: true
     *     });
     *
     *     // Auto-clear with custom options:
     *     statusBar.setStatus({
     *         text: 'New status',
     *         iconCls: 'x-status-custom',
     *         clear: {
     *             wait: 8000,
     *             anim: false,
     *             useDefaults: false
     *         }
     *     });
     *
     * @param {Object/String} config A config object specifying what status to set, or a string assumed
     * to be the status text (and all other options are defaulted as explained below). A config
     * object containing any or all of the following properties can be passed:
     *
     * @param {String} config.text The status text to display.  If not specified, any current
     * status text will remain unchanged.
     *
     * @param {String} config.iconCls The CSS class used to customize the status icon (see
     * {@link #iconCls} for details). If not specified, any current iconCls will remain unchanged.
     *
     * @param {Boolean/Number/Object} config.clear Allows you to set an internal callback that will
     * automatically clear the status text and iconCls after a specified amount of time has passed. If clear is not
     * specified, the new status will not be auto-cleared and will stay until updated again or cleared using
     * {@link #clearStatus}. If `true` is passed, the status will be cleared using {@link #autoClear},
     * {@link #defaultText} and {@link #defaultIconCls} via a fade out animation. If a numeric value is passed,
     * it will be used as the callback interval (in milliseconds), overriding the {@link #autoClear} value.
     * All other options will be defaulted as with the boolean option.  To customize any other options,
     * you can pass an object in the format:
     * 
     * @param {Number} config.clear.wait The number of milliseconds to wait before clearing
     * (defaults to {@link #autoClear}).
     * @param {Boolean} config.clear.anim False to clear the status immediately once the callback
     * executes (defaults to true which fades the status out).
     * @param {Boolean} config.clear.useDefaults False to completely clear the status text and iconCls
     * (defaults to true which uses {@link #defaultText} and {@link #defaultIconCls}).
     *
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    setStatus : function(o) {
        var me = this;

        o = o || {};
        Ext.suspendLayouts();
        if (Ext.isString(o)) {
            o = {text:o};
        }
        if (o.text !== undefined) {
            me.setText(o.text);
        }
        if (o.iconCls !== undefined) {
            me.setIcon(o.iconCls);
        }

        if (o.clear) {
            var c = o.clear,
                wait = me.autoClear,
                defaults = {useDefaults: true, anim: true};

            if (Ext.isObject(c)) {
                c = Ext.applyIf(c, defaults);
                if (c.wait) {
                    wait = c.wait;
                }
            } else if (Ext.isNumber(c)) {
                wait = c;
                c = defaults;
            } else if (Ext.isBoolean(c)) {
                c = defaults;
            }

            c.threadId = this.activeThreadId;
            Ext.defer(me.clearStatus, wait, me, [c]);
        }
        Ext.resumeLayouts(true);
        return me;
    },

    /**
     * Clears the status {@link #text} and {@link #iconCls}. Also supports clearing via an optional fade out animation.
     *
     * @param {Object} [config] A config object containing any or all of the following properties.  If this
     * object is not specified the status will be cleared using the defaults below:
     * @param {Boolean} config.anim True to clear the status by fading out the status element (defaults
     * to false which clears immediately).
     * @param {Boolean} config.useDefaults True to reset the text and icon using {@link #defaultText} and
     * {@link #defaultIconCls} (defaults to false which sets the text to '' and removes any existing icon class).
     *
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    clearStatus : function(o) {
        o = o || {};

        var me = this,
            statusEl = me.statusEl;

        if (o.threadId && o.threadId !== me.activeThreadId) {
            // this means the current call was made internally, but a newer
            // thread has set a message since this call was deferred.  Since
            // we don't want to overwrite a newer message just ignore.
            return me;
        }

        var text = o.useDefaults ? me.defaultText : me.emptyText,
            iconCls = o.useDefaults ? (me.defaultIconCls ? me.defaultIconCls : '') : '';

        if (o.anim) {
            // animate the statusEl Ext.Element
            statusEl.el.puff({
                remove: false,
                useDisplay: true,
                callback: function() {
                    statusEl.el.show();
                    me.setStatus({
                        text: text,
                        iconCls: iconCls
                    });
                }
            });
        } else {
             me.setStatus({
                 text: text,
                 iconCls: iconCls
             });
        }
        return me;
    },

    /**
     * Convenience method for setting the status text directly.  For more flexible options see {@link #setStatus}.
     * @param {String} text (optional) The text to set (defaults to '')
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    setText : function(text) {
        var me = this;
        me.activeThreadId++;
        me.text = text || '';
        if (me.rendered) {
            me.statusEl.setText(me.text);
        }
        return me;
    },

    /**
     * Returns the current status text.
     * @return {String} The status text
     */
    getText : function(){
        return this.text;
    },

    /**
     * Convenience method for setting the status icon directly.  For more flexible options see {@link #setStatus}.
     * See {@link #iconCls} for complete details about customizing the icon.
     * @param {String} iconCls (optional) The icon class to set (defaults to '', and any current icon class is removed)
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    setIcon : function(cls) {
        var me = this;

        me.activeThreadId++;
        cls = cls || '';

        if (me.rendered) {
            if (me.currIconCls) {
                me.statusEl.removeCls(me.currIconCls);
                me.currIconCls = null;
            }
            if (cls.length > 0) {
                me.statusEl.addCls(cls);
                me.currIconCls = cls;
            }
        } else {
            me.currIconCls = cls;
        }
        return me;
    },

    /**
     * Convenience method for setting the status text and icon to special values that are pre-configured to indicate
     * a "busy" state, usually for loading or processing activities.
     *
     * @param {Object/String} config (optional) A config object in the same format supported by {@link #setStatus}, or a
     * string to use as the status text (in which case all other options for setStatus will be defaulted).  Use the
     * `text` and/or `iconCls` properties on the config to override the default {@link #busyText}
     * and {@link #busyIconCls} settings. If the config argument is not specified, {@link #busyText} and
     * {@link #busyIconCls} will be used in conjunction with all of the default options for {@link #setStatus}.
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    showBusy : function(o){
        if (Ext.isString(o)) {
            o = { text: o };
        }
        o = Ext.applyIf(o || {}, {
            text: this.busyText,
            iconCls: this.busyIconCls
        });
        return this.setStatus(o);
    }
});

/**
 * A {@link Ext.ux.statusbar.StatusBar} plugin that provides automatic error
 * notification when the associated form contains validation errors.
 */
Ext.define('Ext.ux.statusbar.ValidationStatus', {
    extend:  Ext.Component , 
                                           
    /**
     * @cfg {String} errorIconCls
     * The {@link Ext.ux.statusbar.StatusBar#iconCls iconCls} value to be applied
     * to the status message when there is a validation error.
     */
    errorIconCls : 'x-status-error',
    /**
     * @cfg {String} errorListCls
     * The css class to be used for the error list when there are validation errors.
     */
    errorListCls : 'x-status-error-list',
    /**
     * @cfg {String} validIconCls
     * The {@link Ext.ux.statusbar.StatusBar#iconCls iconCls} value to be applied
     * to the status message when the form validates.
     */
    validIconCls : 'x-status-valid',
    
    /**
     * @cfg {String} showText
     * The {@link Ext.ux.statusbar.StatusBar#text text} value to be applied when
     * there is a form validation error.
     */
    showText : 'The form has errors (click for details...)',
    /**
     * @cfg {String} hideText
     * The {@link Ext.ux.statusbar.StatusBar#text text} value to display when
     * the error list is displayed.
     */
    hideText : 'Click again to hide the error list',
    /**
     * @cfg {String} submitText
     * The {@link Ext.ux.statusbar.StatusBar#text text} value to be applied when
     * the form is being submitted.
     */
    submitText : 'Saving...',
    
    // private
    init : function(sb) {
        var me = this;

        me.statusBar = sb;
        sb.on({
            single: true,
            scope: me,
            render: me.onStatusbarRender,
            beforedestroy: me.destroy
        });
        sb.on({
            click: {
                element: 'el',
                fn: me.onStatusClick,
                scope: me,
                buffer: 200
            }
        });
    },

    onStatusbarRender: function(sb) {
        var me = this,
            startMonitor = function() {
                me.monitor = true;
            };

        me.monitor = true;
        me.errors = Ext.create('Ext.util.MixedCollection');
        me.listAlign = (sb.statusAlign === 'right' ? 'br-tr?' : 'bl-tl?');

        if (me.form) {
            me.formPanel = Ext.getCmp(me.form);
            me.basicForm = me.formPanel.getForm();
            me.startMonitoring();
            me.basicForm.on('beforeaction', function(f, action) {
                if (action.type === 'submit') {
                    // Ignore monitoring while submitting otherwise the field validation
                    // events cause the status message to reset too early
                    me.monitor = false;
                }
            });
            me.basicForm.on('actioncomplete', startMonitor);
            me.basicForm.on('actionfailed', startMonitor);
        }
   },
    
    // private
    startMonitoring : function() {
        this.basicForm.getFields().each(function(f) {
            f.on('validitychange', this.onFieldValidation, this);
        }, this);
    },
    
    // private
    stopMonitoring : function() {
        this.basicForm.getFields().each(function(f) {
            f.un('validitychange', this.onFieldValidation, this);
        }, this);
    },
    
    // private
    onDestroy : function() {
        this.stopMonitoring();
        this.statusBar.statusEl.un('click', this.onStatusClick, this);
        this.callParent(arguments);
    },
    
    // private
    onFieldValidation : function(f, isValid) {
        var me = this,
            msg;

        if (!me.monitor) {
            return false;
        }
        msg = f.getErrors()[0];
        if (msg) {
            me.errors.add(f.id, {field:f, msg:msg});
        } else {
            me.errors.removeAtKey(f.id);
        }
        this.updateErrorList();
        if (me.errors.getCount() > 0) {
            if (me.statusBar.getText() !== me.showText) {
                me.statusBar.setStatus({
                    text: me.showText,
                    iconCls: me.errorIconCls
                });
            }
        } else {
            me.statusBar.clearStatus().setIcon(me.validIconCls);
        }
    },

    // private
    updateErrorList : function() {
        var me = this,
            msg,
            msgEl = me.getMsgEl();

        if (me.errors.getCount() > 0) {
            msg = ['<ul>'];
            this.errors.each(function(err) {
                msg.push('<li id="x-err-', err.field.id, '"><a href="#">', err.msg, '</a></li>');
            });
            msg.push('</ul>');
            msgEl.update(msg.join(''));
        } else {
            msgEl.update('');
        }
        // reset msgEl size
        msgEl.setSize('auto', 'auto');
    },
    
    // private
    getMsgEl : function() {
        var me = this,
            msgEl = me.msgEl,
            t;

        if (!msgEl) {
            msgEl = me.msgEl = Ext.DomHelper.append(Ext.getBody(), {
                cls: me.errorListCls
            }, true);
            msgEl.hide();
            msgEl.on('click', function(e) {
                t = e.getTarget('li', 10, true);
                if (t) {
                    Ext.getCmp(t.id.split('x-err-')[1]).focus();
                    me.hideErrors();
                }
            }, null, {stopEvent: true}); // prevent anchor click navigation
        }
        return msgEl;
    },
    
    // private
    showErrors : function() {
        var me = this;

        me.updateErrorList();
        me.getMsgEl().alignTo(me.statusBar.getEl(), me.listAlign).slideIn('b', {duration: 300, easing: 'easeOut'});
        me.statusBar.setText(me.hideText);
        me.formPanel.body.on('click', me.hideErrors, me, {single:true}); // hide if the user clicks directly into the form
    },

    // private
    hideErrors : function() {
        var el = this.getMsgEl();
        if (el.isVisible()) {
            el.slideOut('b', {duration: 300, easing: 'easeIn'});
            this.statusBar.setText(this.showText);
        }
        this.formPanel.body.un('click', this.hideErrors, this);
    },
    
    // private
    onStatusClick : function() {
        if (this.getMsgEl().isVisible()) {
            this.hideErrors();
        } else if (this.errors.getCount() > 0) {
            this.showErrors();
        }
    }
});

/**
 * @class Ext.ux.upload.plugin.Window
 * @extends Ext.AbstractPlugin
 * 
 * @author Harald Hanek (c) 2011-2012
 * @license http://harrydeluxe.mit-license.org
 */
Ext.define('Ext.ux.upload.plugin.Window', {
    extend:  Ext.AbstractPlugin ,
    alias: 'plugin.ux.upload.window',
                                             
                                                      
            
    constructor: function(config)
    {
        var me = this;
        Ext.apply(me, config);
        me.callParent(arguments);
    },
    
    init: function(cmp)
    {
        var me = this,
            uploader = cmp.uploader;
        
        cmp.on({
            filesadded: {
                fn: function(uploader, files)
                {
                    me.window.show();
                },
                scope: me
            },
            updateprogress: {
                fn: function(uploader, total, percent, sent, success, failed, queued, speed)
                {
                    var t = Ext.String.format(i18n.t('Upload {0}% ({1} von {2})'), percent, sent, total);
                    me.statusbar.showBusy({
                        text: t,
                        clear: false
                    });
                },
                scope: me
            },
            uploadprogress: {
                fn: function(uploader, file, name, size, percent)
                {
                    // me.statusbar.setText(name + ' ' + percent + '%');
                },
                scope: me
            },
            uploadcomplete: {
                fn: function(uploader, success, failed)
                {
                    if(failed.length == 0)
                        me.window.hide();
                },
                scope: me
            }
        });
        
        me.statusbar = new Ext.ux.StatusBar({
            dock: 'bottom',
            id: 'form-statusbar',
            defaultText: i18n.t('Ready')
        });
        
        me.view = new Ext.grid.Panel({
            store: uploader.store,
            stateful: true,
            multiSelect: true,
            hideHeaders: true,
            stateId: 'stateGrid',
            columns: [{
                text: 'Name',
                flex: 1,
                sortable: false,
                dataIndex: 'name'
            },
                    {
                        text: 'Size',
                        width: 90,
                        sortable: true,
                        align: 'right',
                        renderer: Ext.util.Format.fileSize,
                        dataIndex: 'size'
                    },
                    {
                        text: 'Change',
                        width: 75,
                        sortable: true,
                        hidden: true,
                        dataIndex: 'percent'
                    },
                    {
                        text: 'status',
                        width: 75,
                        hidden: true,
                        sortable: true,
                        dataIndex: 'status'
                    },
                    {
                        text: 'msg',
                        width: 175,
                        sortable: true,
                        dataIndex: 'msg'
                    }],
            viewConfig: {
                stripeRows: true,
                enableTextSelection: false
            },
            dockedItems: [{
                dock: 'top',
                enableOverflow: true,
                xtype: 'toolbar',
                style: {
                    background: 'transparent',
                    border: 'none',
                    padding: '5px 0'
                },
                listeners: {
                    beforerender: function(toolbar)
                    {
                        if(uploader.autoStart == false)
                            toolbar.add(uploader.actions.start);
                        toolbar.add(uploader.actions.cancel);
                        toolbar.add(uploader.actions.removeAll);
                        if(uploader.autoRemoveUploaded == false)
                            toolbar.add(uploader.actions.removeUploaded);
                    },
                    scope: me
                }
            },
                    me.statusbar]
        });
        
        me.window = new Ext.Window({
            title: me.title || 'Upload files',
            width: me.width || 640,
            height: me.height || 380,
            modal : true, // harry
            plain: true,
            constrain: true,
            border: false,
            layout: 'fit',
            items: me.view,
            closeAction: 'hide',
            listeners: {
                hide: function(window)
                {
                    /*
                     * if(this.clearOnClose) { this.uploadpanel.onDeleteAll(); }
                     */
                },
                scope: this
            }
        });
    }
});

/**
 * @class RemoteImageField
 * <p>The RemoteImageField is a form field which can be used to upload one image. It automatically
 * displays the remote image by id, assigns a temporary ID if it's a new image so the model can be
 * syncronized at once.
 * 
 */
Ext.define('Ext.ux.form.field.ImageField', {
    extend: Ext.form.field.Base ,
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


Ext.define('tms.view.attachment.Form', {
    extend: tms.base.Form ,
    alias:'widget.attachmentForm',
    bodyStyle:'padding:2px',
    fieldDefaults:{
        msgTarget:'side',
        labelWidth:40,
        labelAlign:'right',
        anchor: '95%'
    },
    items : [
        {xtype:'hidden',name:'id',fieldLabel: i18n.t('attachment_id'), anchor:'95%'}
        ,{xtype:'imagefield',name:'filename', fieldLabel:'',imageWidth: 128,imageHeight: 128, anchor:'100%',style:{marginLeft:'15px'}}
        ,{xtype:'textfield',name:'title',fieldLabel: i18n.t('attachment_title'), anchor:'95%'}
        ,{xtype:'textarea',name:'description',fieldLabel: i18n.t('attachment_description'), anchor:'95%'}
        ,{xtype:'textfield',name:'sequence',fieldLabel: i18n.t('attachment_sequence'), anchor:'95%'}
        ]
});

Ext.define('tms.view.dropdown.DropdownCombo', {
    extend :  Ext.ux.form.field.BoxSelect ,
    alias:'widget.dropdownCombo',
    multiSelect: false,
    displayField: 'display',
    valueField: 'value',
    queryMode: 'local',
    forceSelection:false,
    queryCaching:true,
    initComponent: function() {
        this.store = new tms.store.DropdownOptionStore();
        this.store.load({params:{code:this.code},scope:this});
        this.callParent(arguments);

    }
});

Ext.define('tms.store.PropertyStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Property',
    storeId: 'PropertyStore'
});

Ext.define('tms.controller.PropertyController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.PropertyStore'],
    models:['tms.model.Property'],
    views:['tms.view.property.List',
        'tms.view.roomClasses.List',
        'tms.view.roomRates.List',
        'Ext.ux.view.IconWindow',
        'Ext.ux.view.IconBrowser',
        'Ext.ux.view.InfoPanel',
        'Ext.ux.upload.Button',
        'Ext.ux.upload.plugin.Window',
        'Ext.ux.upload.Basic',
        'tms.view.attachment.Form',
        'Ext.ux.form.field.ImageField',
        'tms.view.dropdown.DropdownCombo'],
    init:function (application) {
        this.control({
            'propertyList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'propertyList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'propertyList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'propertyList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'propertyList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'propertyList button[action=upload]':{
                click:{
                    fn:this.onUpload,
                    scope:this
                }
            },
            'propertyUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'propertyUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('propertyList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('propertyList button[action=delete]')[0];
        var uploadButton = Ext.ComponentQuery.query('propertyList button[action=upload]')[0];
        editButton.enable();
        deleteButton.enable();
        uploadButton.enable();
        var grid = Ext.ComponentQuery.query('propertyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];

        var roomClassesGrid =  Ext.ComponentQuery.query('roomClassesList')[0];

        roomClassesGrid.setPropertyRecord(record);

    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Property');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('propertyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    onUpload: function(me, e, eOpts){
        var grid = Ext.ComponentQuery.query('propertyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        var uploadWin = Ext.create('Ext.ux.view.IconWindow',{
            title: Ext.String.format(i18n.t('upload {0} picture'),i18n.t('property')),
            url: tms.getContextPath() + '/index.php?r=property/upload&id=' + record.get("id"),
            filters: [
                {type:'numeric', field: 'property_id',comparison:'eq', value :  record.get("id")},
                {type:'string', field: 'type',  value :  'IMG'}
            ]
        });
        uploadWin.width = Ext.getBody().getViewSize().width * 0.5;
        uploadWin.height = Ext.getBody().getViewSize().height * 0.5;
        uploadWin.show();
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.property.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('propertyForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('PropertyStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('propertyList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('property') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('propertyForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('propertyUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.RoomClasses', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('roomClasses'),
    fields:[
        {name:'id', type:'int'}
        ,{name:'property_id', type:'int'}
        ,{name:'room_classes_name', type:'string'}
        ,{name:'room_classes_features', type:'string'}
        ,{name:'bed', type:'string'}
        ,{name:'add_bed', type:'string'}
        ,{name:'floor', type:'string'}
        ,{name:'area', type:'string'}
        ,{name:'total_rooms', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});

Ext.define('tms.store.RoomClassesStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.RoomClasses',
    storeId: 'RoomClassesStore'
});

Ext.define('tms.controller.RoomClassesController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.RoomClassesStore'],
    models:['tms.model.RoomClasses'],
    views:['tms.view.roomClasses.List'],
    refs:[
        {
            ref:'grid',
            selector:'roomClassesList'
        }
    ],
    init:function (application) {
        this.control({
            'roomClassesList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'roomClassesList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'roomClassesList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'roomClassesList button[action=upload]':{
                click:{
                    fn:this.onUpload,
                    scope:this
                }
            },
            'roomClassesList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'roomClassesList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'roomClassesUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'roomClassesUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('roomClassesList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('roomClassesList button[action=delete]')[0];
        var uploadButton = Ext.ComponentQuery.query('roomClassesList button[action=upload]')[0];
        editButton.enable();
        deleteButton.enable();
        uploadButton.enable();

        var record = this.getGrid().getSelectionModel().getSelection()[0];
        var roomRatesGrid =  Ext.ComponentQuery.query('roomRatesList')[0];
        roomRatesGrid.setRoomClassesRecord(record);

    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        if(!this.getGrid().propertyRecord) {
            tms.notify(i18n.t("propertySelectForRoomClasses"),i18n.t("property_manage"));
            return;
        }
        var record = Ext.create('tms.model.RoomClasses');
        record.set('property_id', this.getGrid().propertyRecord.get('id'));
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('roomClassesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    onUpload: function(me, e, eOpts){
        var grid = Ext.ComponentQuery.query('roomClassesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        var uploadWin = Ext.create('Ext.ux.view.IconWindow',{
            title: Ext.String.format(i18n.t('upload {0} picture'),i18n.t('roomClasses')),
            url: tms.getContextPath() + '/index.php?r=roomClasses/upload&id=' + record.get("id") + '&property_id=' + record.get("property_id"),
            filters: [
                {type:'numeric', field: 'property_id',comparison:'eq', value :  record.get("property_id")},
                {type:'numeric', field: 'room_classes_id',comparison:'eq', value :  record.get("id")},
                {type:'string', field: 'type',  value :  'IMG'}
            ]
        });
        uploadWin.width = Ext.getBody().getViewSize().width * 0.5;
        uploadWin.height = Ext.getBody().getViewSize().height * 0.5;
        uploadWin.show();
    },

    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.roomClasses.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('roomClassesForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('RoomClassesStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('roomClassesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('roomClasses') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('roomClassesForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('roomClassesUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.RoomRates', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('roomRates'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'property_id', type:'int'}
    		,{name:'room_classes_id', type:'int'}
    		,{name:'rate_title', type:'string'}
    		,{name:'rate_description', type:'string'}
    		,{name:'validfrom', type:'date'}
    		,{name:'validto', type:'date'}
    		,{name:'roomrateperday', type:'string'}
    		,{name:'mindays', type:'string'}
    		,{name:'maxdays', type:'string'}
    		,{name:'minpeople', type:'string'}
    		,{name:'maxpeople', type:'string'}
    		,{name:'ignore_pppn', type:'string'}
    		,{name:'allow_ph', type:'string'}
    		,{name:'allow_we', type:'string'}
    		,{name:'weekendonly', type:'string'}
    		,{name:'dayofweek', type:'string'}
    		,{name:'minrooms_alreadyselected', type:'string'}
    		,{name:'maxrooms_alreadyselected', type:'string'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});

Ext.define('tms.store.RoomRatesStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.RoomRates',
    storeId: 'RoomRatesStore'
});

Ext.define('tms.controller.RoomRatesController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.RoomRatesStore'],
    models:['tms.model.RoomRates'],
    views:['tms.view.roomRates.List'],
    refs:[
        {
            ref:'grid',
            selector:'roomRatesList'
        }
    ],
    init:function (application) {
        this.control({
            'roomRatesList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'roomRatesList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'roomRatesList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'roomRatesList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'roomRatesList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'roomRatesUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'roomRatesUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('roomRatesList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('roomRatesList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        if(!this.getGrid().roomClassesRecord) {
            tms.notify(i18n.t("roomClassesSelectForRoomRates"),i18n.t("property_manage"));
            return;
        }

        var record = Ext.create('tms.model.RoomRates');
        record.set('room_classes_id',this.getGrid().roomClassesRecord.get('id'));
        record.set('property_id',this.getGrid().roomClassesRecord.get('property_id'));
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('roomRatesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.roomRates.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('roomRatesForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('RoomRatesStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('roomRatesList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('roomRates') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('roomRatesForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('roomRatesUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.Rooms', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('rooms'),
    fields:[
    		{name:'id', type:'string'}
    		,{name:'property_id', type:'string'}
    		,{name:'room_classes_id', type:'string'}
    		,{name:'room_features', type:'string'}
    		,{name:'room_name', type:'string'}
    		,{name:'room_number', type:'string'}
    		,{name:'room_floor', type:'string'}
    		,{name:'room_disabled_access', type:'string'}
    		,{name:'max_people', type:'string'}
    		,{name:'smoking', type:'string'}
    		,{name:'singleperson_suppliment', type:'float'}
        ],
    getRecordName: function () {
        return this.get("id");
    }
});

Ext.define('tms.view.rooms.List', {
    extend: tms.base.Grid ,
    alias:'widget.roomsList',
    store:'RoomsStore',
    columns:[
		{width: 50,  header:i18n.t('rooms_property_id'), sortable:true, dataIndex:'property_id', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_classes_id'), sortable:true, dataIndex:'room_classes_id', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_features'), sortable:true, dataIndex:'room_features', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_name'), sortable:true, dataIndex:'room_name', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_number'), sortable:true, dataIndex:'room_number', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_floor'), sortable:true, dataIndex:'room_floor', filter:true}
		,{width: 50,  header:i18n.t('rooms_room_disabled_access'), sortable:true, dataIndex:'room_disabled_access', filter:true}
		,{width: 50,  header:i18n.t('rooms_max_people'), sortable:true, dataIndex:'max_people', filter:true}
		,{width: 50,  header:i18n.t('rooms_smoking'), sortable:true, dataIndex:'smoking', filter:true}
		,{width: 50,  header:i18n.t('rooms_singleperson_suppliment'), sortable:true, dataIndex:'singleperson_suppliment', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'RoomsStore',
        displayInfo: true
    }]
});

Ext.define('tms.store.RoomsStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Rooms',
    storeId: 'RoomsStore'
});

Ext.define('tms.controller.RoomsController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.RoomsStore'],
    models:['tms.model.Rooms'],
    views:['tms.view.rooms.List'],
    init:function (application) {
        this.control({
            'roomsList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'roomsList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'roomsList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'roomsList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'roomsList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'roomsUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'roomsUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('roomsList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('roomsList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Rooms');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('roomsList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.rooms.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('roomsForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('RoomsStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('roomsList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('rooms') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('roomsForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('roomsUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



/*
 * Date picker with support for multiple selections.
 *
 * Version 0.99, compatible with Ext JS 4.1.
 *  
 * Copyright (c) 2011-2012 Alexander Tokarev.
 *  
 * This code is licensed under the terms of the Open Source LGPL 3.0 license.
 * Commercial use is permitted to the extent that the code/component(s) do NOT
 * become part of another Open Source or Commercially licensed development library
 * or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

Ext.define('Ext.ux.picker.MultiDate', {
    extend:  Ext.picker.Date ,
    alias:  'widget.multidatepicker',
    
    alternateClassName: [ 'Ext.picker.MultiDate', 'Ext.MultiDatePicker' ],
    childEls: [
        'innerEl', 'eventEl', 'prevEl', 'nextEl', 'middleBtnEl', 'footerEl'
    ],
    renderTpl: [
        '<div class="{cls}" id="{id}-innerEl" role="grid">',
            '<div role="presentation" class="{baseCls}-header">',
                //'<div class="{baseCls}-prev"><a id="{id}-prevEl" href="#" role="button" title="{prevText}"></a></div>',
                '<a id="{id}-prevEl" class="{baseCls}-prev {baseCls}-arrow" href="#" role="button" title="{prevText}" hidefocus="on" ></a>',
                '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
                //'<div class="{baseCls}-next"><a id="{id}-nextEl" href="#" role="button" title="{nextText}"></a></div>',
                '<a id="{id}-nextEl" class="{baseCls}-next {baseCls}-arrow" href="#" role="button" title="{nextText}" hidefocus="on" ></a>',
            '</div>',
            '<table id="{id}-eventEl" class="u{baseCls}-inner" cellspacing="0" role="presentation">',
                '<thead role="presentation"><tr role="presentation">',
                    '<tpl for="dayNames">',
                        '<th role="columnheader" title="{.}"><span>{.:this.firstInitial}</span></th>',
                    '</tpl>',
                '</tr></thead>',
                '<tbody role="presentation"><tr role="presentation">',
                    '<tpl for="days">',
                        '{#:this.isEndOfWeek}',
                        '<td role="gridcell" id="{[Ext.id()]}">',
                            '<a role="presentation" href="#" hidefocus="on" class="{parent.baseCls}-date" tabIndex="1">',
                                '<em role="presentation"><span role="presentation"></span></em>',
                            '</a>',
                        '</td>',
                    '</tpl>',
                '</tr></tbody>',
            '</table>',
            '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">',
                '<tpl if="this.showToday">',
                    '{%this.renderTodayBtn(values, out)%}',
                '<tpl else>',
                    '{%this.renderOkBtn(values, out)%}',
                    '{%this.renderCancelBtn(values, out)%}',
                    '{%this.renderClearBtn(values, out)%}',
                '</tpl>',
            '</div>',
        '</div>',
        {
            firstInitial: function(value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderOkBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.okBtn.getRenderTree(), out);
            },
            renderCancelBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.cancelBtn.getRenderTree(), out);
            },
            renderClearBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.clearBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],
    
    nextText:      Ext.isMac ? 'Next Month (&#x2318;&#x2192;)' : 'Next Month (Control+Right)',
    prevText:      Ext.isMac ? 'Previous Month (&#x2318&#x2190;)' : 'Previous Month (Control+Left)',
    monthYearText: Ext.isMac ? 'Choose a month (&#x2318 + &#x2191;/&#x2193; to move years)' : 'Choose a month (Control+Up/Down to move years)',
    
    /**
     * @cfg {String} okText OK button text.
     */
    okText:        'OK',
    
    /**
     * @cfg {String} okTooltip OK button tooltip text.
     */
    okTooltip:     Ext.isMac ? 'Confirm selection (⏎)' : 'Confirm selection (Enter)',
    
    /**
     * @cfg {String} cancelText Cancel button text.
     */
    cancelText:    'Cancel',
    
    /**
     * @cfg {String} cancelTooltip Cancel button tooltip text.
     */
    cancelTooltip: Ext.isMac ? 'Cancel selection (⎋)' : 'Cancel selection (Escape)',
    
    /**
     * @cfg {String} clearText 'Clear selection' button text.
     */
    clearText:     'Clear',
    
    /**
     * @cfg {String} clearTooltip 'Clear selection' button tooltip text.
     */
    clearTooltip:  Ext.isMac ? 'Clear selection (⌘⌫)' : 'Clear selection (Ctrl+Backspace)',
    
    /**
     * @cfg {Int[]/Boolean} workDays Array of 0-based week day numbers that represent
     * work week for given locale. Defaults to Monday-Friday. Set to 'false' to turn
     * this feature off.
     */
    workDays: [ 1, 2, 3, 4, 5 ],
    
    showToday: false,
    
    initComponent: function() {
        var me = this,
            wd = me.workDays;
        
        me.callParent(arguments);
        
        // Active cell class is different
        me.activeCls = 'ux-datepicker-active';
        
        me.selDates = [];
        
        if ( wd && Ext.isArray(wd) ) {
            var hash = {
                0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false
            };
            
            for ( var i = 0, l = wd.length; i < l; i++ ) {
                hash[ wd[i] ] = true;
            };
            
            me.workDaysHash = hash;
        }
        else {
            me.workDaysHash = {
                0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true
            };
        };
    },
    
    beforeRender: function() {
        var me = this;
        
        me.callParent(arguments);
        
        if ( !me.showToday ) {
            Ext.destroy(me.todayBtn);

            var layout = me.getComponentLayout();
        
            me.okBtn = new Ext.button.Button({
                ownerCt:     me,
                ownerLayout: layout,
                text:        me.okText,
                tooltip:     me.okTooltip,
                handler:     me.onOkButton,
                scope:       me
            });
            
            me.cancelBtn = new Ext.button.Button({
                ownerCt:     me,
                ownerLayout: layout,
                text:        me.cancelText,
                tooltip:     me.cancelTooltip,
                handler:     me.onCancelButton,
                scope:       me
            });
            
            me.clearBtn = new Ext.button.Button({
                ownerCt:     me,
                ownerLayout: layout,
                text:        me.clearText,
                tooltip:     me.clearTooltip,
                handler:     me.clearSelection,
                scope:       me
            });
        };
    },
    
    finishRenderChildren: function() {
        var me = this;
        
        me.callParent();
        
        if ( !me.showToday ) {
            me.okBtn.finishRender();
            me.cancelBtn.finishRender();
            me.clearBtn.finishRender();
        };
    },
    
    initEvents: function() {
        var me = this,
            evEl = me.eventEl;
        
        me.callParent(arguments);
        
        // Override default key handlers
        evEl.addKeyListener(Ext.EventObject.ENTER, me.onOkButton,     me);
        evEl.addKeyListener(Ext.EventObject.ESC,   me.onCancelButton, me);
        evEl.addKeyListener(Ext.EventObject.SPACE, me.handleSpacebar, me);
        evEl.addKeyListener({ key: Ext.EventObject.BACKSPACE, ctrl: true }, me.clearSelection, me);
    },
    
    /**
     * @private Assigns values and refreshes the picker.
     */
    setValue: function(values) {
        var me = this;
        
        function getClearTime(d) { return Ext.Date.clearTime(d).getTime() };
        
        me.selDates = Ext.isArray(values) ? Ext.Array.map(values, getClearTime)
                    :                      [ getClearTime(values) ]
                    ;
        
        me.update(me.selDates);
    },
    
    /**
     * @private Returns current selection range.
     */
    getValue: function() {
        var me = this;
        
        return Ext.Array.map(me.selDates, function(t) { return new Date(t) });
    },
    
    onOkButton: function() {
        var me = this,
            handler = me.handler;
        
        if ( !me.disabled ) {
            var value = me.getValue();
            
            me.fireEvent('select', me, value);
        
            if ( handler ) {
                handler.call(me.scope || me, me, value);
            };
            
            me.onSelect();
            me.clearSelection();
        };
    },
    
    onCancelButton: function() {
        var me = this;
        
        me.clearSelection();
        me.pickerField.collapse();
    },
    
    clearSelection: function() {
        var me = this,
            cells = me.cells,
            aCls = me.activeCls,
            sCls = me.selectedCls;
        
        // Clear the selection
        me.selDates = [];
        me.rangeSelection = false;
        cells.removeCls(aCls);
        cells.removeCls(sCls);
        
        me.update(Ext.Date.clearTime( new Date() ));
    },

    handleDateClick : function(event, target) {
        var me = this,
            selDates = me.selDates,
            el, dv, dt;

        event.stopEvent();
        
        el = Ext.fly(target.parentElement);
        dv = target.dateValue;
        
        if ( event.shiftKey && !event.ctrlKey ) {           // Select work week
            dt = me.toggleWeekSelection(el);
        }
        else if ( event.ctrlKey ) {        // Select range or work range (no toggling)
            if ( !me.rangeSelection ) {    // Start selection
                me.rangeSelection = dv;
                dt = me.toggleDateSelection(el, true, dv);
            }
            else {          // End selection
               dt = me.selectRange(me.rangeSelection, dv, event.shiftKey);
               me.rangeSelection = false;
            };
        }
        else {                                      // Select single day
            dt = me.toggleDateSelection(el, undefined, dv);
        };
        
        if ( dt ) {
            me.update(selDates);
        };
        
        // Set active date, too
        me.update( new Date(dv) );
    },

    handleSpacebar: function(keycode, event) {
        var me       = this,
            selDates = me.selDates,
            cells    = me.cells,
            activeDate, activeCell, activeIdx, dt;
        
        activeDate = me.activeDate.getTime();
        activeIdx  = me.getCellIndex(activeDate);
        
        if ( activeIdx == -1 ) {
            return;
        };
        
        activeCell = cells.item(activeIdx);
        
        dt = event.shiftKey ? me.toggleWeekSelection(activeCell, activeIdx)
           :                  me.toggleDateSelection(activeCell, undefined, activeDate)
           ;
        
        if ( dt ) {
            me.update(selDates);
        };
    },
    
    /**
     * @private Returns cell index by date value.
     */
    getCellIndex: function(value) {
        var me = this,
            cells = me.cells,
            index;
            
        // This is suboptimal but I don't know a way to do it otherwise
        // without affecting me.cells.
        cells.each(function(el, c, idx) {
            if ( !index && el.down('a').getAttribute('dateValue') === value ) {
                index = idx;
            };
        });
        
        return index === undefined ? -1 : index;
    },
    
    selectRange: function(start, end, workWeek) {
        var me       = this,
            selDates = me.selDates,
            wdHash   = me.workDaysHash,
            add      = Ext.Date.add,
            DAY      = Ext.Date.DAY,
            contains = Ext.Array.contains,
            include  = Ext.Array.include,
            tmp, dt, dv;
        
        // JS is ugly.
        if ( start > end ) {
            tmp   = start;
            start = end;
            end   = tmp;
        };
        
        // If start date falls on a weekend we shouldn't allow it
        // to be selected
        Ext.Array.remove( selDates, new Date(start).getTime() );
        
        DATE:
        for ( dt = new Date(start), dv = dt.getTime();
              dv <= end;
              dt = add(dt, DAY, 1), dv = dt.getTime() )
        {
            if ( workWeek && !wdHash[ dt.getDay() ] ) {
                continue DATE;
            };
            
            include(selDates, dv);
        };
        
        return true;
    },
    
    toggleWeekSelection: function(el, index) {
        var me          = this,
            cells       = me.cells,
            selectedCls = me.selectedCls,
            disabledCls = me.disabledCellCls,
            workDays    = me.workDays,
            selected, dayNo, firstDay;
        
        if ( index === undefined ) {
            index = me.getCellIndex( el.down('a').getAttribute('dateValue') );
        };
        
        if ( !me.disabled && !el.hasCls(disabledCls) ) {
            selected = el.hasCls(selectedCls);
            dayNo    = index % 7;
            firstDay = index - dayNo;
            
            // We're toggling only work week. If there's a need to toggle
            // whole week, adjust workDays to have values [0..6].
            if ( Ext.Array.contains(workDays, dayNo) ) {
                var i = firstDay + workDays[0],
                    l = firstDay + workDays[ workDays.length - 1 ];
                    
                for (; i <= l; i++ ) {
                    me.toggleDateSelection( cells.item(i), !selected );
                };
            };
        };
        
        return true;
    },
    
    toggleDateSelection: function(el, state, dv) {
        var me = this,
            selDates = me.selDates,
            selectedCls = me.selectedCls,
            disabledCls = me.disabledCellCls,
            selected, dv;
        
        if ( dv === undefined ) {
            dv = el.down('a').getAttribute('dateValue');
        };
        
        if ( !me.disabled && !el.hasCls(disabledCls) && dv ) {
            selected = state !== undefined ? !state : el.hasCls(selectedCls);
            
            if ( selected ) {
                Ext.Array.remove(selDates, dv);
            }
            else {
                Ext.Array.include(selDates, dv);
            };
            
            return el;
        };
        
        return undefined;
    },
    
    selectedUpdate: function(dates, active) {
        var me          = this,
            cells       = me.cells,
            selectedCls = me.selectedCls,
            activeCls   = me.activeCls,
            visible, cancelFocus;
        
        visible     = me.isVisible();
        cancelFocus = !me.focusOnSelect;
        
        cells.each( function(el) {
            var picker = this,
                dv;
            
            el.removeCls([activeCls, selectedCls]);
            
            dv = el.down('a').getAttribute('dateValue');
            
            if ( dv === active ) {
                picker.getEl().set({ 'aria-activedescendant': el.id });
                
                el.addCls(activeCls);
                
                if ( visible && !cancelFocus ) {
                    Ext.fly( el.down('a') ).focus(50);
                };
            };
            
            if ( Ext.Array.contains(dates, dv) ) {
                el.addCls(selectedCls);
            };
        }, me);
    },
    
    update: function(dates, forceRefresh) {
        var me = this,
            selDates,
            active = me.activeDate,
            newActive;
        
        if ( Ext.isArray(dates) ) {
            me.selDates = dates;
        };
        
        selDates = me.selDates || [];
        
        newActive = Ext.isDate(dates)       ? dates
                  :                           active
                  ;
        
        if ( me.rendered ) {
            var am = active    && active.getMonth(),
                ay = active    && active.getFullYear(),
                nm = newActive && newActive.getMonth(),
                ny = newActive && newActive.getFullYear();
                
            me.activeDate = newActive;

            if ( !forceRefresh && am == nm && ay == ny ) {
                me.selectedUpdate(selDates, newActive.getTime());
            }
            else {
                me.fullUpdate(newActive, active);
                me.selectedUpdate(selDates, newActive.getTime());
            };
        };
        
        return me;
    },
    
    beforeDestroy: function() {
        var me = this;
        
        if ( me.rendered ) {
            Ext.destroy(
                me.okBtn,
                me.cancelBtn,
                me.clearBtn
            );
            
            delete me.selDates;
        };
        
        me.callParent(arguments);
    }
});

/*
 * Mixin that allows multiple values or ranges of values of the same type to be entered in
 * a field.
 *
 * Version 0.99, compatible with Ext JS 4.1.
 *  
 * Copyright (c) 2011-2012 Alexander Tokarev.
 *  
 * This code is licensed under the terms of the Open Source LGPL 3.0 license.
 * Commercial use is permitted to the extent that the code/component(s) do NOT
 * become part of another Open Source or Commercially licensed development library
 * or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

Ext.define('Ext.ux.form.field.MultiValue', {
    /**
     * @private Mixin indicator.
     */
    isMultiValued: true,
    
    /**
     * @cfg {Boolean} [multiValue=false] Determines if multiple values are allowed in
     * the field.
     */
    multiValue: false,
    
    /**
     * @cfg {RegExp} valueSeparator Regular expression used to separate input values
     * from each other.
     */
    valueSeparatorRE: /[;,]\s*/,
    
    /**
     * @cfg {RegExp} rangeSeparator Regular expression used to separate start and end
     * of a range.
     */
    rangeSeparatorRE: /\s*-\s*/,

    /**
     * @cfg {RegExp} valuePattern Regular expression used to validate one value or
     * part of a range.
     */
    valuePatternRE: /\d+/,
    
    /**
     * @cfg {String} displayValueSeparator Character or string used to separate
     * displayed values from each other. It may differ from both valueSeparator regex
     * and submitValueSeparator.
     */
	displayValueSeparator: ', ',
	
	/**
	 * @cfg {String} displayRangeSeparator Character or string used to denote a range
	 * of values when displaying. It is placed between range start and end.
	 */
	displayRangeSeparator: '-',
    
    /**
     * @cfg {String} submitValueSeparator Character or string used to separate
     * submitted values from each other. It may differ from valueSeparator regex.
     */
    submitValueSeparator: ';',
    
    /**
     * @cfg {String} submitRangeSeparator Character or string used to denote a range;
     * it is placed between range start and end upon submitting values.
     */
    submitRangeSeparator: '-',
    
    constructor: function(config) {
        var me = this,
            config = config || {};
        
        Ext.apply(me, config);
        
        me.regex = me.multiValue ? me.initMultiRegex()
                 :                 me.initSingleRegex()
                 ;
        
        me.callParent(arguments);
    },
    
    /**
     * @private Creates regex for checking single value when multiValue is off.
     */
    initSingleRegex: function() {
        var me = this,
            value;
        
        value = me.valueRegex();
        
        return new RegExp( '^' + value + '$' );
    },
    
    /**
     * @private Creates regex for checking multiple values and ranges when multiValue is on.
     */
    initMultiRegex: function() {
        var me = this,
            value, vsep, rsep, range, valueOrRange;
        
        value = me.valueRegex();
        
        // Normalize regexen
        me.rangeSeparatorRE = new RegExp(me.rangeSeparatorRE);
        me.valueSeparatorRE = new RegExp(me.valueSeparatorRE);
        
        rsep  = me.rangeSeparatorRE.source;
        vsep  = me.valueSeparatorRE.source;
        
        range = value + rsep + value;
        valueOrRange = '(' + value + '|' + range + ')';
        
        return new RegExp(
            '^' +
                '(' + valueOrRange + ')'
                +
                '(' + vsep + valueOrRange + ')*'
                +
            '$'
        );
    },
    
    /**
     * @private Normalizes single value regex.
     */
    valueRegex: function() {
        var me = this,
            vp;
            
        me.valuePatternRE = vp = new RegExp(me.valuePatternRE);
        
        return vp.source;
    },
    
    /**
     * @private Formats single value for submission.
     */
    formatSubmitValue: function(value) {
        // Does nothing in mixin
        return value;
    },
    
    /**
     * @private Formats single range of values for submission.
     */
    formatSubmitRange: function(range, rsep) {
        var me = this,
            start, end;

        start = me.formatSubmitValue( range[0] );
        end   = me.formatSubmitValue( range[1] );
        
        return start + rsep + end;
    },
    
    /**
     * @private Formats current values as a string for submission.
     */
    formatSubmit: function(values, rsep, vsep) {
        var me = this,
            multi = me.multiValue,
            valsep = me.valueSeparatorRE,
            ransep = me.rangeSeparatorRE,
            items, isStr, doesMatch;
        
        items = me.splitValues(values, valsep);
        
        for ( var i = 0, l = items.length; i < l; i++ ) {
            var item = items[i],
                vr;
                
            vr = me.splitValues(item, ransep);
            
            items[i] = vr.length > 1 ? me.formatSubmitRange(vr, rsep || me.submitRangeSeparator)
                     :                 me.formatSubmitValue(vr)
                     ;
        };
        
        values = items.join(vsep || me.submitValueSeparator);
        
        return values;
    },
    
    /**
     * @private Splits string of values using provided normalized regex.
     * Always returns an array.
     */
    splitValues: function(values, regex) {
        var me = this;
        
        return me.multiValue && Ext.isString(values) &&
               regex.source !== '' && values.match(regex)   ? values.split(regex)
             :                                                [ values ]
             ;
    },

    /**
     * @private Formats single value for displaying in input field.
     */
    formatDisplayValue: function(value) {
        return Ext.isString(value) ? value : value.toString();  // Trying to be generic
    },
    
    /**
     * @private Formats single range of values for displaying in input field.
     */
    formatDisplayRange: function(range, rsep) {
        var me = this,
            start, end;
        
        start = me.formatDisplayValue( range[0] );
        end   = me.formatDisplayValue( range[1] );
        
        return start + rsep + end;
    },
    
    /**
     * @private Formats array of values for displaying in input field. This method is mostly
     * useful for using with pickers that return raw objects and arrays of objects.
     */
    formatDisplay: function(values, rsep, vsep) {
        var me = this,
            multi = me.multiValue,
            results = [];
        
        if ( !multi ) {
            return me.formatDisplayValue(values[0]);
        };
        
        for ( var i = 0, l = values.length; i < l; i++ ) {
            var value = values[i];
            
            if ( Ext.isArray(value) ) {
                results.push( me.formatDisplayRange(value, rsep || me.displayRangeSeparator) );
            }
            else {
                results.push( me.formatDisplayValue(value) );
            };
        };
        
        return results.join(vsep || me.displayValueSeparator);
    }
});

/*
 * Input field that allows multiple date values, including multiple contiguous ranges.
 *
 * Version 0.99, compatible with Ext JS 4.1.
 *  
 * Copyright (c) 2011-2012 Alexander Tokarev.
 *  
 * Usage: drop-in replacement for Ext.form.field.Date. See demo application
 * for more details.
 *
 * This code is licensed under the terms of the Open Source LGPL 3.0 license.
 * Commercial use is permitted to the extent that the code/component(s) do NOT
 * become part of another Open Source or Commercially licensed development library
 * or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

Ext.define('Ext.ux.form.field.MultiDate', {
	extend:  Ext.form.field.Date ,
	alias:	'widget.multidatefield',
	
	alternateClassName: [
	    'Ext.form.field.MultiDate',
	    'Ext.form.MultiDateField',
	    'Ext.form.MultiDate'
	],
	
	                                        

	mixins: {
	    multivalue:  Ext.ux.form.field.MultiValue 
	},

    /**
     * @cfg {String} okText OK button text.
     */
    okText: 'OK',
    
    /**
     * @cfg {String} cancelText Cancel button text.
     */
    cancelText: 'Cancel',
    	
    /**
     * @cfg {String} clearText 'Clear' button text.
     */
    clearText: 'Clear',

	/**
	 * @cfg {String} multiDisabledText
	 * Error text to display when multiple values are entered while multiValue is false.
	 */
	multiDisabledText: 'Multiple dates are not allowed',
	
	/**
	 * @cfg {String} invalidRangeText
	 * Error text to display when an invalid date range is entered.
	 */
	invalidRangeText: '{0} is not a valid date range',
	
	/**
	 * @cfg {String} invalidRangeEndsText
	 * Error text to display when range end is less than range start.
	 */
	invalidRangeEndsText: '{0} is invalid: start date must be earlier than end date',
	
    /**
     * @cfg {Int[]} workDays Array of 0-based week day numbers that represent work week
     * for given locale. Defaults to Monday-Friday.
     */
    workDays: [ 1, 2, 3, 4, 5 ],

    altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m/d|n/j",
    
    initComponent: function() {
        var me = this;
        
        me.callParent(arguments);
        
        // It's always turned off when multiValue is on
        if ( me.multiValue ) {
            me.showToday = false;
        };
    },
    
    initValue: function() {
        var me    = this,
            value = me.value;
        
        if ( value && Ext.isString(value) ) {
            me.setRawValue(value);
        }
        else if ( Ext.isDate(value) ) {
            me.setRawValue( me.formatDisplayValue(value) );
        }
        else {
            return;
        };
        
        me.validate();
    },
    
    setValue: function(value, isSubmit) {
        var me = this;
        
        if ( isSubmit ) {
            me.setSubmitValue(value);
        }
        else {
            me.callParent([value]);
        };
    },
    
    setSubmitValue: function(value) {
        var me = this,
            fmt = me.submitFormat,
            vsep, rsep, values, collapsed, text;
        
        vsep = new XRegExp(me.submitValueSeparator);
        rsep = new XRegExp(me.submitRangeSeparator);
        
        values = me.expandValues(value, fmt, vsep, rsep);
        
        if ( values && values.length ) {
            collapsed = me.collapseRange(values);
            text      = me.formatDisplay(collapsed);
            
            me.setRawValue(text);
        }
        else {
            me.setRawValue('');
        };
    },
    
    getSubmitValue: function() {
        var me = this,
            values;
        
        values = me.getRawValue();
        
        return me.formatSubmit(values);
    },

    createPicker: function() {
        var me = this,
            format = Ext.String.format;
            
        if ( !me.multiValue ) {
            return me.callParent(arguments);
        };
        
        return Ext.create('Ext.picker.MultiDate', {
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            okText: me.okText,
            cancelText: me.cancelText,
            clearText: me.clearText,
            workDays: Ext.Array.sort(me.workDays, function(a, b) { return a - b }),
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                scope: me,
                select: me.onSelect
            }
        });
    },
    
    getErrors: function(values) {
        var me = this,
            multi = me.multiValue,
            vsep = me.valueSeparatorRE,
            rsep = me.rangeSeparatorRE,
            errors = [],
            matches, range, isValid, dt;
        
        if ( values === null || values.length < 1 ) {
            if ( !me.allowBlank ) {
                errors.push(me.blankText);
            };
            
            return errors;
        };
        
        matches = me.splitValues(values, vsep);
        
        if ( !multi && matches.length > 1 ) {
            errors.push(me.multiDisabledText);
        };
        
        MATCHES:
        for ( var i = 0, l = matches.length; i < l; i++ ) {
            var match = matches[i];
        
            // Try to validate the match as a single date; it may just be one
            dt = me.parseDate(match);
            
            if ( Ext.isDate(dt) ) {
                isValid = me.validateDate(match);
            }
            else if ( !rsep.test(match) ) {
                isValid = Ext.String.format(me.invalidText, match, me.format);
            }
            else {
                range = me.splitValues(match, rsep);
                
                if ( !multi && range.length > 1 ) {       // Got date range
                    errors.push(me.multiDisabledText);
                };
                    
                isValid = me.validateRange(range);
            };

            if ( isValid !== true ) {
                errors.push(isValid);
            };
        };
        
        return errors;
    },
    
    splitValues: function(values, regex) {
        var me = this;
        
        return Ext.isString(values) &&
               regex.source !== '' && values.match(regex)   ? values.split(regex)
             :                                                [ values ]
             ;
    },

    onExpand: function() {
        var me = this,
            text, values;
            
        if ( !me.multiValue ) {
            return me.callParent(arguments);
        };
        
        text = me.getRawValue();

        // We don't care for invalid input
        if ( me.isValid() ) {
            values = me.expandValues( text );
            me.picker.setValue( values );
        }
        else if ( text === '' ) {
            me.clearInvalid();
        };
    },
    
    onSelect: function(picker, dates) {
        var me = this,
            collapsed, text;
        
        if ( !me.multiValue ) {
            return me.callParent(arguments);
        };
        
        collapsed = me.collapseRange(dates);
        text      = me.formatDisplay(collapsed);
        
        me.setRawValue(text);
        
        me.fireEvent('select', me, text);
        
        me.collapse();
    },
    
    parseDate: function(value, format) {
        var me = this,
            dt;
        
        if ( format && (dt = me.safeParse(value, format)) ) {
            return dt;
        };
        
        return me.callParent([value]);
    },
    
    validateDate: function(value) {
        var me = this,
            dt;
        
        dt = me.parseDate(value);
        
        return Ext.isDate(dt) || Ext.String.format(me.invalidText, value, me.format);
    },
    
    validateRange: function(range) {
        var me = this,
            rsep = me.displayRangeSeparator,
            isDate = Ext.isDate,
            getElapsed = Ext.Date.getElapsed,
            format = Ext.String.format,
            start, end,
            isValid = false;
        
        try {
            start   = me.parseDate( range[0] );
            end     = me.parseDate( range[1] );
            
            isValid = !!(isDate(start) && isDate(end) && start.getTime() <= end.getTime());
        } catch (e) {};
        
        if ( !isDate(start) || !isDate(end) ) {
            return format(me.invalidRangeText, range[0] + rsep + range[1] );
        };
        
        if ( start.getTime() > end.getTime() ) {
            return format(me.invalidRangeEndsText, me.formatDisplayRange(range, rsep) );
        };
        
        if ( (isValid = me.validateDate(range[0])) !== true ) {
            return isValid;
        };
        
        if ( (isValid = me.validateDate(range[1])) !== true ) {
            return isValid;
        };
        
        return true;
    },
    
    formatSubmit: function(values, rsep, vsep) {
        var me = this,
            multi = me.multiValue,
            valsep = me.valueSeparatorRE,
            ransep = me.rangeSeparatorRE,
            items, isStr, doesMatch, dt;
        
        items = me.splitValues(values, valsep);
        
        for ( var i = 0, l = items.length; i < l; i++ ) {
            var item = items[i],
                vr;
            
            if ( Ext.isDate( me.parseDate(item) ) ) {
                items[i] = me.formatSubmitValue(item);
            }
            else {
                vr = me.splitValues(item, ransep);
                
                items[i] = vr.length > 1 ? me.formatSubmitRange(vr, rsep || me.submitRangeSeparator)
                         :                 me.formatSubmitValue(vr)
                         ;
            };
        };
        
        values = items.join(vsep || me.submitValueSeparator);
        
        return values;
    },
    
    formatSubmitValue: function(value) {
        var me = this,
            fmt = me.submitFormat || me.format,
            dt, res;
        
        try {
            dt  = Ext.Date.clearTime( me.parseDate(value) );
            res = Ext.Date.format(dt, fmt);
        } catch (e) {};
        
        return Ext.isString(res) ? res : '';
    },
    
    formatDisplayValue: function(value) {
        var me = this,
            fmt = me.format,
            dt, res;
        
        try { res = Ext.Date.format(value, fmt); } catch (e) {};
        
        return Ext.isString(res) ? res : '';
    },
    
    expandValues: function(text, format, vSeparator, rSeparator) {
        var me   = this,
            vsep = vSeparator || me.valueSeparatorRE,
            rsep = rSeparator || me.rangeSeparatorRE,
            values, dt,
            result = [];
        
        if ( text === '' || text === null ) {
            return [];
        };
        
        values = me.splitValues(text, vsep);
        
        for ( var i = 0, l = values.length; i < l; i++ ) {
            var value = values[i];
            
            dt = me.parseDate(value, format);
            
            if ( Ext.isDate(dt) ) {
                result.push(dt);
            }
            else {
                var range = me.splitValues(value, rsep);
                
                // Ugh. What an ugliness.
                result = [].concat( result, 
                                    range.length > 1 ? me.expandRange(range, format)
                                  :                    me.parseDate(range[0])
                                  );
            };
        };
        
        return result;
    },
    
    expandRange: function(range, format) {
        var me = this,
            start, end,
            result = [];
        
        start = me.parseDate( range[0], format );
        end   = me.parseDate( range[1], format );
        
        if ( !Ext.isDate(start) || !Ext.isDate(end) || Ext.Date.getElapsed(start, end) < 0 ) {
            return [];
        };
        
        dt = start;
        
        for ( var dt = start; dt <= end; dt = Ext.Date.add(dt, Ext.Date.DAY, 1) ) {
            result.push(dt);
        };
        
        return result;
    },

	/**
	 * @private
	 * Collapses item ranges. The code is adapted from Perl module Range::Object
	 */
	collapseRange: function(data) {
		var me = this,
			range = Ext.clone(data),
			first, last,
			result = [];
		
		if ( Ext.isEmpty(data) ) {
		    return result;
		};
		
		range.sort( function(a, b) { return a.getTime() - b.getTime() } );
		
		ITEM:
		for ( var i = 0, l = range.length; i < l; i++ ) {
			var item = range[i];
			
			// If first is defined, it means range has started
			if ( first === undefined ) {
				first = last = item;
				continue ITEM;
			};
			
			// If last immediately preceeds item in range,
			// item becomes next last
			if ( me.nextInRange(last, item) ) {
				last = item;
				continue ITEM;
			};
			
			// If item doesn't follow last and last is defined,
			// it means that current contiguous range is complete
			if ( !me.equalValues(first, last) ) {
				result.push( [first, last] );
				first = last = item;
				continue ITEM;
			};
			
			// If last wasn't defined, range was never contiguous
			result.push( first );
			first = last = item;
		};
		
		// We're here when last item has been processed
		if ( me.equalValues(first, last) ) {
			result.push( first );
		}
		else {
			result.push( [first, last] );
		};
		
		return result;
	},
	
	nextInRange: function(first, last) {
		var dt;
		
		dt = Ext.Date.add(first, Ext.Date.DAY, 1);
		
		return !!(dt.getTime() === last.getTime());
	},
	
	equalValues: function(first, last) {
		return first.getTime() === last.getTime();
	}
});

Ext.define('tms.model.Trip', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('trip'),
    fields:[
        {name:'id', type:'int'}
        ,
        {name:'title', type:'string'}
        ,
        {name:'team_no', type:'string'}
        ,
        {name:'trip_days', type:'int'}
        ,
        {name:'product_type', type:'string'}
        ,
        {name:'product_theme', type:'string'}
        ,
        {name:'crowd', type:'string'}
        ,
        {name:'dest_city', type:'string'}
        ,
        {name:'departure_city', type:'string'}
        ,
        {name:'high_lights', type:'string'}
        ,
        {name:'main_attractions', type:'string'}
        ,
        {name:'line_details', type:'string'}
        ,
        {name:'daily_schedule', type:'string'}
        ,
        {name:'charges_exp', type:'string'}
        ,
        {name:'notes', type:'string'}
        ,
        {name:'advice_price', type:'float'}
        ,
        {name:'promotion', type:'string'}
    ],
    getRecordName: function () {
        return this.get("title");
    }
});

Ext.define('tms.view.trip.List', {
    extend: tms.base.Grid ,
    alias:'widget.tripList',
    store:'TripStore',
    columns:[
        {width: 50,  header:i18n.t('trip_teamno'), sortable:true, dataIndex:'team_no', filter:true, editor:{ xtype:'textfield', allowBlank:false}}
        ,
        {width: 200, header:i18n.t('trip_title'), sortable:true, dataIndex:'title', filter:true, editor:{ xtype:'numberfield', allowBlank:false}}
        //,{width: 100, header:i18n.t('trip_promotion'), sortable:true, dataIndex:'promotion', filter:true, editor:{ xtype:'textfield', allowBlank:false}}
        /*,{
            xtype:'actioncolumn',
            width:50,
            items: [{
                iconCls: 'icon-quote',  // Use a URL in the icon config
                xtype: 'button',
                tooltip: i18n.t('quote'),
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var tripQuoteModule = tms.app.desktop.getModule('tripQuote-win');
                    tripQuoteModule.tripRecord = rec;
                    var tripQuoteWindow = tripQuoteModule.createWindow();
                    tripQuoteWindow.show();
                }
            },{
                iconCls: 'icon-schedule',
                xtype: 'button',
                tooltip: i18n.t('trip_dailyschedule'),
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var tripScheduleModule = tms.app.desktop.getModule('tripSchedule-win');
                    tripScheduleModule.tripRecord = rec;
                    var tripScheduleWindow = tripScheduleModule.createWindow();
                    tripScheduleWindow.show();
                }
            }]
        }*/
    ],
    initComponent:function () {
        this.callParent();
        this.topToolbar.add({
            xtype: 'button',
            text: i18n.t("button_upload"),
            action: 'upload',
            iconCls: 'upload',
            disabled: true
        });
    }
});

Ext.define('tms.store.TripStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.Trip',
    storeId: 'TripStore'
});

Ext.define('tms.controller.TripController', {
  extend: Ext.app.Controller ,
  stores:['tms.store.TripStore'],
  models:['tms.model.Trip'],
  views:['tms.view.trip.List'],
                                     
                                
                              
                             
                                    
                            
                                 
                                     
                                    
                                         
    refs:[
        {
            ref:'grid',
            selector:'tripList'
        }
    ],
  init:function (application) {
    this.control({
        'tripList':{
            itemclick: {
                fn: this.onItemclick,
                scope: this
            },
            itemdblclick: {
                fn: this.onItemDblClick,
                scope: this
            }
        },
        'tripList button[action=create]':{
            click:{
                fn:this.onAdd,
                scope:this
            }
        },
        'tripList button[action=update]':{
            click:{
                fn:this.onEdit,
                scope:this
            }
        },
        'tripList button[action=delete]':{
            click:{
                fn:this.onDelete,
                scope:this
            }
        },
        'tripList button[action=refresh]':{
            click:{
                fn:this.onRefresh,
                scope:this
            }
        },
        'tripList button[action=upload]':{
            click:{
                fn:this.onUpload,
                scope:this
            }
        },
        'tripUpdate button[action=submitForm]':{
            click:{
                fn:this.onSubmit,
                scope:this
            }
        },
        'tripUpdate button[action=cancelForm]':{
            click:{
                fn:this.onCancel,
                scope:this
            }
        }
    });
  },

    onItemclick: function(me, e, eOpts){
        var editButton = Ext.ComponentQuery.query('tripList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripList button[action=delete]')[0];
        var uploadButton = Ext.ComponentQuery.query('tripList button[action=upload]')[0];
        editButton.enable();
        deleteButton.enable();
        uploadButton.enable();

        var grid = Ext.ComponentQuery.query('tripList')[0];
        var record = grid.getSelectionModel().getSelection()[0];

        var scheduleGrid =  Ext.ComponentQuery.query('tripScheduleList')[0];
        var quoteGrid = Ext.ComponentQuery.query('tripQuoteList')[0];

        scheduleGrid.setTripRecord(record);
        quoteGrid.setTripRecord(record);
    },
    onItemDblClick: function(me, e, eOpts){
        this.onEdit();
    },

    onUpload: function(me, e, eOpts){
        var grid = Ext.ComponentQuery.query('tripList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        var uploadWin = Ext.create('Ext.ux.view.IconWindow',{
            title: Ext.String.format(i18n.t('upload {0} picture'),i18n.t('trip')),
            url: tms.getContextPath() + '/index.php?r=trip/upload&id=' + record.get("id"),
            filters: [
                {type:'numeric', field: 'trip_id',comparison:'eq', value :  record.get("id")},
                {type:'string', field: 'type',  value :  'IMG'}
            ]
        });
        uploadWin.width = Ext.getBody().getViewSize().width * 0.5;
        uploadWin.height = Ext.getBody().getViewSize().height * 0.5;
        uploadWin.show();
    },

    onAdd: function(me, e, eOpts){
        var record = Ext.create('tms.model.Trip');
        this._openUpdateWin(record);
    },
    onEdit: function(me, e, eOpts){
        var grid = Ext.ComponentQuery.query('tripList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin: function (record) {
        var updateWin = Ext.create('tms.view.trip.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore: function() {
        return  this.getGrid().store;
    },

    onDelete: function(me, e, eOpts){
        //var grid = Ext.ComponentQuery.query('tripList')[0];
        var record =  this.getGrid().getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('trip') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this.getGrid().store.remove(record);
                    this.getGrid().store.sync();
                }
            }, this);

    },

    onRefresh: function(me, e, eOpts){
        this._getStore().load();
    },

    // This is called when you submit a form for creating or editing a .
    onSubmit: function(me, e, eOpts){
        var formPanel = Ext.ComponentQuery.query('tripForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if(this._curRecord.phantom) {
                this._getStore().insert(0,this._curRecord);
            }
            if(!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function(){
                   this._closeWin();
                },
                failure: function(form, action) {
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
                scope: this
            });
        }
    },
    _closeWin : function ()  {
        var win = Ext.ComponentQuery.query('tripUpdate')[0];
        win.close();
    },
    onCancel: function(me, e, eOpts){
        this._closeWin();
    }
});

Ext.define('tms.model.TripCrowd', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('tripCrowd'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'subdomain', type:'string'}
    		,{name:'desc', type:'string'}
    		,{name:'seqence', type:'int'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});

Ext.define('tms.view.tripCrowd.List', {
    extend: tms.base.Grid ,
    alias:'widget.tripCrowdList',
    store:'TripCrowdStore',
    columns:[
		{width: 50,  header:i18n.t('tripCrowd_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('tripCrowd_subdomain'), sortable:true, dataIndex:'subdomain', filter:true}
		,{width: 50,  header:i18n.t('tripCrowd_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('tripCrowd_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripCrowdStore',
        displayInfo: true
    }]
});

Ext.define('tms.store.TripCrowdStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.TripCrowd',
    storeId: 'TripCrowdStore'
});

Ext.define('tms.controller.TripCrowdController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.TripCrowdStore'],
    models:['tms.model.TripCrowd'],
    views:['tms.view.tripCrowd.List'],
    init:function (application) {
        this.control({
            'tripCrowdList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'tripCrowdList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'tripCrowdList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'tripCrowdList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'tripCrowdList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'tripCrowdUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'tripCrowdUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('tripCrowdList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripCrowdList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.TripCrowd');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripCrowdList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.tripCrowd.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripCrowdForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('TripCrowdStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripCrowdList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('tripCrowd') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('tripCrowdForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('tripCrowdUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.TripMethod', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('tripMethod'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'subdomain', type:'string'}
    		,{name:'desc', type:'string'}
    		,{name:'seqence', type:'int'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});

Ext.define('tms.view.tripMethod.List', {
    extend: tms.base.Grid ,
    alias:'widget.tripMethodList',
    store:'TripMethodStore',
    columns:[
		{width: 50,  header:i18n.t('tripMethod_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('tripMethod_subdomain'), sortable:true, dataIndex:'subdomain', filter:true}
		,{width: 50,  header:i18n.t('tripMethod_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('tripMethod_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripMethodStore',
        displayInfo: true
    }]
});

Ext.define('tms.store.TripMethodStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.TripMethod',
    storeId: 'TripMethodStore'
});

Ext.define('tms.controller.TripMethodController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.TripMethodStore'],
    models:['tms.model.TripMethod'],
    views:['tms.view.tripMethod.List'],
    init:function (application) {
        this.control({
            'tripMethodList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'tripMethodList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'tripMethodList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'tripMethodList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'tripMethodList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'tripMethodUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'tripMethodUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('tripMethodList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripMethodList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.TripMethod');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripMethodList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.tripMethod.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripMethodForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('TripMethodStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripMethodList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('tripMethod') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('tripMethodForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('tripMethodUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.TripQuote', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('tripQuote'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'trip_id', type:'int'}
    		,{name:'title', type:'string'}
    		,{name:'description', type:'string'}
    		,{name:'validFrom', type:'date'}
    		,{name:'validTo', type:'date'}
            ,{name:'rrule', type:'string'}
            ,{name:'rdate', type:'string'}
    		,{name:'minPeople', type:'int'}
    		,{name:'maxPeople', type:'int'}
    		,{name:'adult_price', type:'string'}
    		,{name:'child_price', type:'string'}
    		,{name:'adult_net_price', type:'string'}
    		,{name:'child_net_price', type:'string'}
        ],
    getRecordName: function () {
        return this.get("title");
    }
});

Ext.define('tms.view.tripQuote.List', {
    extend: tms.base.Grid ,
    alias:'widget.tripQuoteList',
    store:'TripQuoteStore',
    columns:[
		{width: 50,  header:i18n.t('tripQuote_title'), sortable:true, dataIndex:'title', filter:true}
		,{width: 50,  header:i18n.t('tripQuote_validTo'), sortable:true, dataIndex:'validTo', renderer: Ext.util.Format.dateRenderer('Y-m-d')}
		,{width: 50,  header:i18n.t('tripQuote_maxPeople'), sortable:true, dataIndex:'maxPeople', filter:true}
		,{width: 50,  header:i18n.t('tripQuote_adult_price'), sortable:true, dataIndex:'adult_price', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripQuoteStore',
        displayInfo: true
    }],
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'trip_id',comparison:'eq',value:this.tripRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setTripRecord : function(record) {
        this.tripRecord = record;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    }
});

Ext.define('tms.store.TripQuoteStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.TripQuote',
    storeId: 'TripQuoteStore'
});

Ext.define('tms.controller.TripQuoteController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.TripQuoteStore'],
    models:['tms.model.TripQuote'],
    views:['tms.view.tripQuote.List'],
    refs:[
        {
            ref:'grid',
            selector:'tripQuoteList'
        }
    ],
    init:function (application) {
        this.control({
            'tripQuoteList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'tripQuoteList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'tripQuoteList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'tripQuoteList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'tripQuoteList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'tripQuoteUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'tripQuoteUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('tripQuoteList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripQuoteList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        if(this.getGrid().tripRecord) {
            var record = Ext.create('tms.model.TripQuote');
            record.set('trip_id', this.getGrid().tripRecord.get('id'));
            this._openUpdateWin(record);
        } else {
            tms.notify(i18n.t("tripSelectForQuoteOrSchedule"),i18n.t("tripQuote"));
        }
    },
    onEdit:function (me, e, eOpts) {
        var record = this.getGrid().getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.tripQuote.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripQuoteForm')[0];
        form.loadRecord(record);

        if(record.get("rrule") != "") {
            alert(record.get("rrule"));
            var rrule = RRule.fromString(record.get("rrule"));

            if(rrule.options.freq) {
                form.getForm().findField("freqgroup").getBoxes()[rrule.options.freq].setValue(true);
            }
            if(rrule.options.count) {
                form.getForm().findField("COUNT").setValue(rrule.options.count);
            }

            if(rrule.options.byweekday) {
                Ext.each(rrule.options.byweekday,function(item) {
                    form.getForm().findField("bydaygroup").getBoxes()[item].setValue(true);
                });

            }
        }

        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('TripQuoteStore');
    },
    onDelete:function (me, e, eOpts) {
        var record = this.getGrid().getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('tripQuote') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        if(this.getGrid().tripRecord) {
            this._getStore().load();
        } else {
            tms.notify(i18n.t("tripSelectForQuoteOrSchedule"),i18n.t("tripQuote"));
        }
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('tripQuoteForm')[0];

        //If check the rrule panel
        var rrule = new Array();
        if(formPanel.getForm().findField("freqgroup").getChecked().length > 0) {
            rrule.push("FREQ=" + formPanel.getForm().findField("freqgroup").getChecked()[0].inputValue);
        }
        if(formPanel.getForm().findField("COUNT").getValue() != "") {
            rrule.push("COUNT=" + formPanel.getForm().findField("COUNT").getValue());
        }
        if(formPanel.getForm().findField("bydaygroup").getChecked().length > 0) {
            var byday = new Array();
            Ext.each(formPanel.getForm().findField("bydaygroup").getChecked(),
                function(item) {
                    byday.push(item.inputValue);
                }
            );
            rrule.push("BYDAY=" + byday.join());
        }
        formPanel.getForm().findField("rrule").setValue(rrule.join(';'));

        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('tripQuoteUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.TripSchedule', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('tripSchedule'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'trip_id', type:'int'}
    		,{name:'days', type:'string'}
    		,{name:'dest_type', type:'string'}
    		,{name:'location', type:'string'}
    		,{name:'schedule', type:'string'}
    		,{name:'meal', type:'string'}
    		,{name:'accommodation', type:'string'}
    		,{name:'attraction', type:'string'}
    		,{name:'arrangement', type:'string'}
    		,{name:'not_free', type:'string'}
    		,{name:'not_free_price', type:'string'}
    		,{name:'not_free_desc', type:'string'}
    		,{name:'shopping', type:'string'}
    		,{name:'product', type:'string'}
    		,{name:'stay_time', type:'string'}
    		,{name:'shop_desc', type:'string'}
        ],
    getRecordName: function () {
        return this.get("schedule");
    }
});

Ext.define('tms.view.tripSchedule.List', {
    extend: tms.base.Grid ,
    alias:'widget.tripScheduleList',
    store:'TripScheduleStore',
    columns:[
		{width: 50,  header:i18n.t('tripSchedule_days'), sortable:true, dataIndex:'days', filter:true}
		,{width: 50,  header:i18n.t('tripSchedule_schedule'), sortable:true, dataIndex:'schedule', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripScheduleStore',
        displayInfo: true
    }],
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'trip_id',comparison:'eq',value:this.tripRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setTripRecord : function(record) {
        this.tripRecord = record;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    }
});

Ext.define('tms.store.TripScheduleStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.TripSchedule',
    storeId: 'TripScheduleStore'
});

Ext.define('tms.controller.TripScheduleController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.TripScheduleStore'],
    models:['tms.model.TripSchedule'],
    views:['tms.view.tripSchedule.List'],
    refs:[
        {
            ref:'grid',
            selector:'tripScheduleList'
        }
    ],
    init:function (application) {
        this.control({
            'tripScheduleList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'tripScheduleList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'tripScheduleList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'tripScheduleList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'tripScheduleList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'tripScheduleUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'tripScheduleUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('tripScheduleList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripScheduleList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        if(this.getGrid().tripRecord) {
            var record = Ext.create('tms.model.TripSchedule');
            record.set('trip_id', this.getGrid().tripRecord.get('id'));
            this._openUpdateWin(record);
        } else {
            tms.notify(i18n.t("tripSelectForQuoteOrSchedule"),i18n.t("tripSchedule_arrangement"));
        }
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripScheduleList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.tripSchedule.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripScheduleForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('TripScheduleStore');
        //return this.getGrid().store;
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripScheduleList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('tripSchedule') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        if(this.getGrid().tripRecord) {
            this._getStore().load();
        } else {
            tms.notify(i18n.t("tripSelectForQuoteOrSchedule"),i18n.t("tripSchedule_arrangement"));
        }
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('tripScheduleForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('tripScheduleUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.TripTheme', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('tripTheme'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'subdomain', type:'string'}
    		,{name:'desc', type:'string'}
    		,{name:'seqence', type:'int'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});

Ext.define('tms.view.tripTheme.List', {
    extend: tms.base.Grid ,
    alias:'widget.tripThemeList',
    store:'TripThemeStore',
    columns:[
		{width: 50,  header:i18n.t('tripTheme_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('tripTheme_subdomain'), sortable:true, dataIndex:'subdomain', filter:true}
		,{width: 50,  header:i18n.t('tripTheme_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('tripTheme_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripThemeStore',
        displayInfo: true
    }]
});

Ext.define('tms.store.TripThemeStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.TripTheme',
    storeId: 'TripThemeStore'
});

Ext.define('tms.controller.TripThemeController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.TripThemeStore'],
    models:['tms.model.TripTheme'],
    views:['tms.view.tripTheme.List'],
    init:function (application) {
        this.control({
            'tripThemeList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'tripThemeList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'tripThemeList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'tripThemeList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'tripThemeList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'tripThemeUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'tripThemeUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('tripThemeList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripThemeList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.TripTheme');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripThemeList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.tripTheme.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripThemeForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('TripThemeStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripThemeList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('tripTheme') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('tripThemeForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('tripThemeUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.TripType', {
    extend: Ext.data.Model ,
    proxy: tms.getAjaxProxy('tripType'),
    fields:[
    		{name:'id', type:'int'}
    		,{name:'name', type:'string'}
    		,{name:'subdomain', type:'string'}
    		,{name:'desc', type:'string'}
    		,{name:'seqence', type:'int'}
        ],
    getRecordName: function () {
        return this.get("name");
    }
});

Ext.define('tms.view.tripType.List', {
    extend: tms.base.Grid ,
    alias:'widget.tripTypeList',
    store:'TripTypeStore',
    columns:[
		{width: 50,  header:i18n.t('tripType_name'), sortable:true, dataIndex:'name', filter:true}
		,{width: 50,  header:i18n.t('tripType_subdomain'), sortable:true, dataIndex:'subdomain', filter:true}
		,{width: 50,  header:i18n.t('tripType_desc'), sortable:true, dataIndex:'desc', filter:true}
		,{width: 50,  header:i18n.t('tripType_seqence'), sortable:true, dataIndex:'seqence', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'TripTypeStore',
        displayInfo: true
    }]
});

Ext.define('tms.store.TripTypeStore', {
    extend:  tms.base.Store ,
    model: 'tms.model.TripType',
    storeId: 'TripTypeStore'
});

Ext.define('tms.controller.TripTypeController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.TripTypeStore'],
    models:['tms.model.TripType'],
    views:['tms.view.tripType.List'],
    init:function (application) {
        this.control({
            'tripTypeList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'tripTypeList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'tripTypeList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'tripTypeList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'tripTypeList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'tripTypeUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'tripTypeUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('tripTypeList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('tripTypeList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();
    },
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.TripType');
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripTypeList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.tripType.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('tripTypeForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('TripTypeStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('tripTypeList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            i18n.t('small_hint')
            , Ext.String.format(i18n.t('records_delete_confirm'), i18n.t('tripType') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('tripTypeForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('tripTypeUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.view.company.CompanyCombo', {
    extend :  Ext.ux.form.field.BoxSelect ,
    alias:'widget.companyCombo',
    multiSelect: false,
    displayField: 'name',
    valueField: 'id',
    queryMode: 'local',
    store: 'CompanyStore',
    forceSelection:false,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});

Ext.define('tms.view.users.List', {
    extend: tms.base.Grid ,
    alias:'widget.usersList',
    store:'UsersStore',
    columns:[
		{width: 50,  header:i18n.t('users_username'), sortable:true, dataIndex:'username', filter:true}
		,{width: 50,  header:i18n.t('users_email'), sortable:true, dataIndex:'email', filter:true}
		,{width: 50,  header:i18n.t('users_superuser'), sortable:true, dataIndex:'superuser', renderer: function(value){
            if(1 == value) {
                return '<font color="green">是</font>'
            }
            if(0 == value) {
                return '<font color="red">否</font>'
            }

        }}
		,{width: 50,  header:i18n.t('users_status'), sortable:true, dataIndex:'status', renderer: function(value){
            if(1 == value) {
                return '<font color="green">正常</font>'
            }
            if(0 == value) {
                return '<font color="red">未激活</font>'
            }

        }}
		,{width: 50,  header:i18n.t('users_mobile'), sortable:true, dataIndex:'mobile', filter:true}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'UsersStore',
        displayInfo: true
    }],
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'company_id',comparison:'eq',value:this.companyRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    setCompanyRecord : function(record) {
        this.companyRecord = record;
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.load();
    },
    initComponent:function () {
        this.callParent();
        this.topToolbar.add({
            xtype: 'button',
            text: i18n.t("NoCompany"),
            action: 'nocompany',
            iconCls: 'upload'
        });
    }
});

Ext.define('tms.view.profiles.Form', {
    extend: tms.base.Form ,
    alias:'widget.profilesForm',
    layout:'form',
    border:false,
    unstyled:true,
    buttonAlign:'center',
    buttons:[
        { text:i18n.t('button_save'), action:'submitForm' },
        { text:i18n.t('button_cancel'), action:'cancelForm' }
    ],
    items:[
        {xtype:'hidden', name:'user_id', fieldLabel:i18n.t('profiles_user_id'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'lastname', fieldLabel:i18n.t('profiles_lastname'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'firstname', fieldLabel:i18n.t('profiles_firstname'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'address', fieldLabel:i18n.t('profiles_address'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'postcode', fieldLabel:i18n.t('profiles_postcode'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'city', fieldLabel:i18n.t('profiles_city'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'town', fieldLabel:i18n.t('profiles_town'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'tel', fieldLabel:i18n.t('profiles_tel'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'fax', fieldLabel:i18n.t('profiles_fax'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccv', fieldLabel:i18n.t('profiles_ccv'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccard_no', fieldLabel:i18n.t('profiles_ccard_no'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccard_expiry', fieldLabel:i18n.t('profiles_ccard_expiry'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccard_name', fieldLabel:i18n.t('profiles_ccard_name'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'car_regno', fieldLabel:i18n.t('profiles_car_regno'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'ccard_issued', fieldLabel:i18n.t('profiles_ccard_issued'), anchor:'95%'}
        ,
        {xtype:'textfield', name:'type', fieldLabel:i18n.t('profiles_type'), anchor:'95%'}

    ]
});

Ext.define('tms.controller.UsersController', {
    extend: Ext.app.Controller ,
    stores:['tms.store.UsersStore'],
    models:['tms.model.Users'],
    views:['tms.view.users.List','tms.view.company.List','tms.view.profiles.Form'],
                                                                                 
    refs:[
        {
            ref:'grid',
            selector:'usersList'
        }
    ],
    init:function (application) {
        this.control({
            'usersList':{
                selectionchange:{
                    fn:this.onGridSelectionChange,
                    scope:this
                },
                itemdblclick:{
                    fn:this.onItemDblClick,
                    scope:this
                }
            },
            'usersList button[action=create]':{
                click:{
                    fn:this.onAdd,
                    scope:this
                }
            },
            'usersList button[action=update]':{
                click:{
                    fn:this.onEdit,
                    scope:this
                }
            },
            'usersList button[action=delete]':{
                click:{
                    fn:this.onDelete,
                    scope:this
                }
            },
            'usersList button[action=refresh]':{
                click:{
                    fn:this.onRefresh,
                    scope:this
                }
            },
            'usersList button[action=nocompany]':{
                click:{
                    fn:this.onNoCompany,
                    scope:this
                }
            },
            'usersUpdate button[action=submitForm]':{
                click:{
                    fn:this.onSubmit,
                    scope:this
                }
            },
            'usersUpdate button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            },
            'profilesForm button[action=submitForm]':{
                click:{
                    fn:this.submitProfile,
                    scope:this
                }
            },
            'profilesForm button[action=cancelForm]':{
                click:{
                    fn:this.onCancel,
                    scope:this
                }
            }
        });
    },

    onGridSelectionChange:function (me, e, eOpts) {
        var editButton = Ext.ComponentQuery.query('usersList button[action=update]')[0];
        var deleteButton = Ext.ComponentQuery.query('usersList button[action=delete]')[0];
        editButton.enable();
        deleteButton.enable();

        var userList = Ext.ComponentQuery.query('usersList')[0];
        var userRec = userList.getSelectionModel().getSelection()[0];
        if(null != userRec) {
            var profilesForm = Ext.ComponentQuery.query('profilesForm')[0];
            var profileStore = Ext.create('tms.store.ProfilesStore');
            var filters = new Array();
            filters.push({type:'numeric', field: 'user_id',comparison:'eq',value:userRec.get("id")});
            var sort = new Array();
            sort.push({"property":"user_id","direction":"DESC"});
            profileStore.load({
                params: {"start":0, "limit":50, "filter":Ext.JSON.encode(filters),"sort":Ext.JSON.encode(sort)},
                callback: function(records, operation, success) {
                    if(success) {
                        //profilesForm._curRecord = records[0];
                        profilesForm.loadRecord(records[0]);
                    }
                },
                scope: this
            });
        }
    },
    submitProfile: function (me, e, eOpts) {
        var profilesForm = Ext.ComponentQuery.query('profilesForm')[0];
        profilesForm.updateRecord();
        var profileStore = Ext.data.StoreManager.lookup('ProfilesStore');
        profileStore.sync({
            success:function () {
                tms.notify(i18n.t("Update UserProfile Success"),i18n.t("profiles"));
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
    onItemDblClick:function (me, e, eOpts) {
        this.onEdit();
    },

    onAdd:function (me, e, eOpts) {
        var record = Ext.create('tms.model.Users');
        if(this.getGrid().companyRecord) {
            record.set('company_id', this.getGrid().companyRecord.get('id'));
        }
        this._openUpdateWin(record);
    },
    onEdit:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('usersList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        this._openUpdateWin(record);
    },
    onNoCompany:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('usersList')[0];
        var noCompanyRec = Ext.create('tms.model.Company');
        noCompanyRec.set('id',0);
        grid.setCompanyRecord(noCompanyRec);
    },
    _openUpdateWin:function (record) {
        var updateWin = Ext.create('tms.view.users.Update');
        updateWin.width = Ext.getBody().getViewSize().width * 0.6;
        updateWin.height = Ext.getBody().getViewSize().height * 0.6;
        var form = Ext.ComponentQuery.query('usersForm')[0];
        form.loadRecord(record);
        updateWin._setTitle(record);
        updateWin.show();
        this._curRecord = record;
    },
    _getStore:function () {
        return  Ext.data.StoreManager.lookup('UsersStore');
    },
    onDelete:function (me, e, eOpts) {
        var grid = Ext.ComponentQuery.query('usersList')[0];
        var record = grid.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm(
            small_hint
            , Ext.String.format(records_delete_confirm, i18n.t('users') + ":" + record.getRecordName())
            , function (btn) {
                if (btn == "yes") {
                    this._getStore().remove(record);
                    this._getStore().sync();
                }
            }, this);

    },
    onRefresh:function (me, e, eOpts) {
        this._getStore().load();
    },
    onSubmit:function (me, e, eOpts) {
        var formPanel = Ext.ComponentQuery.query('usersForm')[0];
        formPanel.getForm().updateRecord(this._curRecord);
        if (formPanel.getForm().isValid()) {
            if (this._curRecord.phantom) {
                this._getStore().insert(0, this._curRecord);
            }
            if (!this._curRecord.dirty) {
                this._closeWin();
                return;
            }
            this._getStore().sync({
                success:function () {
                    this._closeWin();
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
        }
    },
    _closeWin:function () {
        var win = Ext.ComponentQuery.query('usersUpdate')[0];
        win.close();
    },
    onCancel:function (me, e, eOpts) {
        this._closeWin();
    }
});



Ext.define('tms.model.DropdownOption',{
    extend: Ext.data.Model ,
    proxy: {
        type: 'ajax',
        url: tms.getContextPath() + '/index.php?r=Dropdown/getOptions',
        reader: {
            totalProperty:'total',
            successProperty:'success',
            idProperty:'id',
            root:'data',
            messageProperty:'message',
            type:'json'
        }
    },
    fields:[
        {name:'sequence', type:'int'}
        ,{name:'display', type:'string'}
        ,{name:'value', type:'string'}
    ],
    getRecordName: function () {
        return this.get("display");
    }
});

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('tms.model.Wallpaper', {
    extend:  Ext.data.Model ,
    fields: [
        { name: 'text' },
        { name: 'img' }
    ]
});

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.ux.desktop.Module', {
    mixins: {
        observable:  Ext.util.Observable 
    },

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.init();
    },

    init: Ext.emptyFn
});

Ext.define('tms.module.AttachmentModule', {
    extend: Ext.ux.desktop.Module ,
    id:'attachment-win',
    titleText : i18n.t("attachment"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-attachment'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('attachment-win');
        if (!win) {
            win = desktop.createWindow({
                id:'attachment-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-attachment',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'attachmentList'}]
            });
        }
        return win;
    }
});


Ext.define('tms.module.DropdownModule', {
    extend: Ext.ux.desktop.Module ,
    id:'dropdown-win',
    titleText : i18n.t("dropdown"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-dropdown'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('dropdown-win');
        if (!win) {
            win = desktop.createWindow({
                id:'dropdown-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-dropdown',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'dropdownList'}]
            });
        }
        return win;
    }
});


Ext.define('tms.module.InsuranceModule', {
    extend: Ext.ux.desktop.Module ,
    id:'insurance-win',
    titleText : i18n.t("insurance"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-insurance'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('insurance-win');
        if (!win) {
            win = desktop.createWindow({
                id:'insurance-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-insurance',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'insuranceList'}]
            });
        }
        return win;
    }
});


Ext.define('tms.module.OrdersModule', {
    extend: Ext.ux.desktop.Module ,
    id:'orders-win',
    titleText:i18n.t("orders"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-orders'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('orders-win');
        if (!win) {
            win = desktop.createWindow({
                id:'orders-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-orders',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                    {xtype:'ordersNav', region:'west', width:200, split:true,
                        stateful:true,
                        stateId:'nav.west',
                        collapsible:true},
                    {xtype:'ordersList', region:'center'},
                    {xtype:'ordersDetail', region:'east', stateful:true,
                        stateId:'mainnav.east',
                        split:true,
                        collapsible:true,
                        width:500
                    }
                ]
            });
        }
        return win;
    }
});


Ext.define('tms.module.PropertyModule', {
    extend: Ext.ux.desktop.Module ,
    id:'property-win',
    titleText : i18n.t("property"),
    iconCls:'property-module',
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-property'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('property-win');
        if (!win) {
            win = desktop.createWindow({
                id:'property-win',
                title:this.titleText,
                iconCls:'property-module',
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-property',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                    {xtype:'propertyList',split:true, border:false, region:'west',flex:1},
                    {xtype:'roomClassesList', region:'center',flex:2},
                    {xtype:'roomRatesList', split:true,border:false, flex : 3,  region: 'east'}
                ]
            });
        }
        return win;
    }
});


/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('tms.module.Settings', {
    extend:  Ext.window.Window ,
           
                         
                        
                                  
                                      
                                      
                                   
                             
      

    layout: 'anchor',
    title: i18n.t('Change Settings'),
    modal: true,
    width: 640,
    height: 480,
    border: false,

    initComponent: function () {
        var me = this;

        me.selected = me.desktop.getWallpaper();
        me.stretch = me.desktop.wallpaper.stretch;

        me.preview = Ext.create('widget.wallpaper');
        me.preview.setWallpaper(me.selected);
        me.tree = me.createTree();

        me.buttons = [
            { text: i18n.t('button_ok'), handler: me.onOK, scope: me },
            { text: i18n.t('button_cancel'), handler: me.close, scope: me }
        ];

        me.items = [
            {
                anchor: '0 -30',
                border: false,
                layout: 'border',
                items: [
                    me.tree,
                    {
                        xtype: 'panel',
                        title: i18n.t('Preview'),
                        region: 'center',
                        layout: 'fit',
                        items: [ me.preview ]
                    }
                ]
            },
            {
                xtype: 'checkbox',
                boxLabel: i18n.t('Stretch to fit'),
                checked: me.stretch,
                listeners: {
                    change: function (comp) {
                        me.stretch = comp.checked;
                    }
                }
            }
        ];

        me.callParent();
    },

    createTree : function() {
        var me = this;

        function child (img) {
            return { img: img, text: me.getTextOfWallpaper(img), iconCls: '', leaf: true };
        }

        var tree = new Ext.tree.Panel({
            title: i18n.t('Desktop Background'),
            rootVisible: false,
            lines: false,
            autoScroll: true,
            width: 150,
            region: 'west',
            split: true,
            minWidth: 100,
            listeners: {
                afterrender: { fn: this.setInitialSelection, delay: 100 },
                select: this.onSelect,
                scope: this
            },
            store: new Ext.data.TreeStore({
                model: 'tms.model.Wallpaper',
                root: {
                    text: i18n.t('Wallpaper'),
                    expanded: true,
                    children:[
                        { text: "None", iconCls: '', leaf: true },
                        child('Blue-Sencha.jpg'),
                        child('Dark-Sencha.jpg'),
                        child('Wood-Sencha.jpg'),
                        child('blue.jpg'),
                        child('desk.jpg'),
                        child('desktop.jpg'),
                        child('desktop2.jpg'),
                        child('sky.jpg')
                    ]
                }
            })
        });

        return tree;
    },

    getTextOfWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = text.replace(/[-]/g, ' ');
        return text;
    },

    onOK: function () {
        var me = this;
        if (me.selected) {
            me.desktop.setWallpaper(me.selected, me.stretch);
        }
        me.destroy();
    },

    onSelect: function (tree, record) {
        var me = this;

        if (record.data.img) {
            me.selected = 'admin/wallpapers/' + record.data.img;
        } else {
            me.selected = Ext.BLANK_IMAGE_URL;
        }

        me.preview.setWallpaper(me.selected);
    },

    setInitialSelection: function () {
        var s = this.desktop.getWallpaper();
        if (s) {
            var path = '/Wallpaper/' + this.getTextOfWallpaper(s);
            this.tree.selectPath(path, 'text');
        }
    }
});

Ext.define('tms.module.TripCrowdModule', {
    extend: Ext.ux.desktop.Module ,
    id:'tripCrowd-win',
    titleText : i18n.t("tripCrowd"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripCrowd'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripCrowd-win');
        if (!win) {
            win = desktop.createWindow({
                id:'tripCrowd-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripCrowd',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'tripCrowdList'}]
            });
        }
        return win;
    }
});


Ext.define('tms.module.TripMethodModule', {
    extend: Ext.ux.desktop.Module ,
    id:'tripMethod-win',
    titleText : i18n.t("tripMethod"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripMethod'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripMethod-win');
        if (!win) {
            win = desktop.createWindow({
                id:'tripMethod-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripMethod',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'tripMethodList'}]
            });
        }
        return win;
    }
});


Ext.define('tms.module.TripQuoteModule', {
    extend: Ext.ux.desktop.Module ,
    id:'tripQuote-win',
    titleText : i18n.t("tripQuote"),
    tripRecord : null,
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripQuote'
        };
    },
    onBeforeLoad : function (store, options) {
        options.params = options.params || {};
        delete options.params["start"];
        delete options.params["limit"];
        delete options.params["filter"];
        var filters = new Array();
        filters.push({type:'numeric', field: 'trip_id',comparison:'eq',value:this.tripRecord.get("id")});
        var params = {"start":0, "limit":50, "filter":Ext.JSON.encode(filters)};
        Ext.apply(options.params, params);
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripQuote-win');
        if (!win) {
            var tripQuoteList = Ext.create('widget.tripQuoteList',{tripRecord: this.tripRecord});
            tripQuoteList.store.on('beforeload', this.onBeforeLoad, this);
            win = desktop.createWindow({
                id:'tripQuote-win',
                modal: true,
                title: this.tripRecord.get('title') + this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripQuote',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[tripQuoteList]
            });
        }
        return win;
    }
});


Ext.define('tms.module.TripScheduleModule', {
    extend: Ext.ux.desktop.Module ,
    id:'tripSchedule-win',
    titleText : i18n.t("tripSchedule"),
    tripRecord : null,
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripSchedule'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripSchedule-win');
        if (!win) {
            var tripScheduleList = Ext.create('widget.tripScheduleList',{tripRecord: this.tripRecord});
            tripScheduleList.store.on('beforeload', this.onBeforeLoad, this);
            win = desktop.createWindow({
                id:'tripSchedule-win',
                modal: true,
                title: this.tripRecord.get('title') + this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripSchedule',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[tripScheduleList]
            });
        }
        return win;
    }
});


Ext.define('tms.module.TripThemeModule', {
    extend: Ext.ux.desktop.Module ,
    id:'tripTheme-win',
    titleText : i18n.t("tripTheme"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripTheme'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripTheme-win');
        if (!win) {
            win = desktop.createWindow({
                id:'tripTheme-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripTheme',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'tripThemeList'}]
            });
        }
        return win;
    }
});


Ext.define('tms.module.TripTypeModule', {
    extend: Ext.ux.desktop.Module ,
    id:'tripType-win',
    titleText : i18n.t("tripType"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-tripType'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tripType-win');
        if (!win) {
            win = desktop.createWindow({
                id:'tripType-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-tripType',
                animCollapse:false,
                constrainHeader:true,
                layout:'fit',
                items:[{xtype:'tripTypeList'}]
            });
        }
        return win;
    }
});


Ext.define('tms.module.TripWindow', {
    extend: Ext.ux.desktop.Module ,
    id:'trip-win',
    titleText:i18n.t("trip"),
    iconCls:'trip-module',
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:this.iconCls
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('trip-win');
        if (!win) {
            win = desktop.createWindow({
                id:'trip-win',
                title:i18n.t('tripManage'),
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:this.iconCls,
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                    {xtype:'tripList', region:'center'},
                    {xtype:'panel', split:true, border:false, layout:{
                        type:'vbox', align:'stretch'
                    }, region:'east', width:500, items:[
                        {xtype:'tripScheduleList',title: i18n.t('tripSchedule'),flex: 1},
                        {xtype:'tripQuoteList',title: i18n.t('tripQuote'),flex: 1}
                    ] }
                ]
            });
        }
        return win;
    }
});


Ext.define('tms.module.UsersModule', {
    extend: Ext.ux.desktop.Module ,
    id:'users-win',
    titleText : i18n.t("users"),
    init:function () {
        this.launcher = {
            text:this.titleText,
            iconCls:'icon-users'
        };
    },
    createWindow:function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('users-win');
        if (!win) {
            win = desktop.createWindow({
                id:'users-win',
                title:this.titleText,
                width:Ext.getBody().getViewSize().width - 160,
                height:Ext.getBody().getViewSize().height - 40,
                iconCls:'icon-users',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
                items:[
                    {xtype:'companyList',split:true, border:false, region:'west', width:200},
                    {xtype:'usersList', region:'center'},
                    {xtype:'panel',items: [{xtype:'profilesForm'}], split:true,border:false, width: 400,  region: 'east'}
                ]
            });
        }
        return win;
    }
});


Ext.define('tms.store.DropdownOptionStore', {
    extend:  Ext.data.Store ,
    model: 'tms.model.DropdownOption',
    storeId: 'DropdownOptionStore',
    autoLoad: false,
    sorters: [{
        property: 'sequence',
        direction: 'ASC'
    }]
});

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.desktop.Desktop
 * @extends Ext.panel.Panel
 * <p>This class manages the wallpaper, shortcuts and taskbar.</p>
 */
Ext.define('Ext.ux.desktop.Desktop', {
    extend:  Ext.panel.Panel ,

    alias: 'widget.desktop',

           
                                   
                        
                                    
                            

                                 
                                  
      

    activeWindowCls: 'ux-desktop-active-win',
    inactiveWindowCls: 'ux-desktop-inactive-win',
    lastActiveWindow: null,

    border: false,
    html: '&#160;',
    layout: 'fit',

    xTickSize: 1,
    yTickSize: 1,

    app: null,

    /**
     * @cfg {Array|Store} shortcuts
     * The items to add to the DataView. This can be a {@link Ext.data.Store Store} or a
     * simple array. Items should minimally provide the fields in the
     * {@link Ext.ux.desktop.ShorcutModel ShortcutModel}.
     */
    shortcuts: null,

    /**
     * @cfg {String} shortcutItemSelector
     * This property is passed to the DataView for the desktop to select shortcut items.
     * If the {@link #shortcutTpl} is modified, this will probably need to be modified as
     * well.
     */
    shortcutItemSelector: 'div.ux-desktop-shortcut',

    /**
     * @cfg {String} shortcutTpl
     * This XTemplate is used to render items in the DataView. If this is changed, the
     * {@link shortcutItemSelect} will probably also need to changed.
     */
    shortcutTpl: [
        '<tpl for=".">',
            '<div class="ux-desktop-shortcut" id="{name}-shortcut">',
                '<div class="ux-desktop-shortcut-icon {iconCls}">',
                    '<span class="badge pull-right">{badge}</span>',
                    '<img src="',Ext.BLANK_IMAGE_URL,'" title="{name}">',
                '</div>',
                '<span class="ux-desktop-shortcut-text">{name}</span>',
            '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
    ],

    /**
     * @cfg {Object} taskbarConfig
     * The config object for the TaskBar.
     */
    taskbarConfig: null,

    windowMenu: null,

    initComponent: function () {
        var me = this;

        me.windowMenu = new Ext.menu.Menu(me.createWindowMenu());

        me.bbar = me.taskbar = new Ext.ux.desktop.TaskBar(me.taskbarConfig);
        me.taskbar.windowMenu = me.windowMenu;

        me.windows = new Ext.util.MixedCollection();

        me.contextMenu = new Ext.menu.Menu(me.createDesktopMenu());

        me.items = [
            { xtype: 'wallpaper', id: me.id+'_wallpaper' },
            me.createDataView()
        ];

        me.callParent();

        me.shortcutsView = me.items.getAt(1);
        me.shortcutsView.on('itemclick', me.onShortcutItemClick, me);

        var wallpaper = me.wallpaper;
        me.wallpaper = me.items.getAt(0);
        if (wallpaper) {
            me.setWallpaper(wallpaper, me.wallpaperStretch);
        }
    },

    afterRender: function () {
        var me = this;
        me.callParent();
        me.el.on('contextmenu', me.onDesktopMenu, me);
        Ext.Function.defer(me.initShortcut,1);
    },

    //------------------------------------------------------
    // Overrideable configuration creation methods

    createDataView: function () {
        var me = this;
        return {
            xtype: 'dataview',
            overItemCls: 'x-view-over',
            trackOver: true,
            itemSelector: me.shortcutItemSelector,
            store: me.shortcuts,
            style: {
                position: 'absolute'
            },
            x: 0, y: 0,
            tpl: new Ext.XTemplate(me.shortcutTpl),
            listeners:{
                resize:me.initShortcut
            }
        };
    },

    createDesktopMenu: function () {
        var me = this, ret = {
            items: me.contextMenuItems || []
        };

        if (ret.items.length) {
            ret.items.push('-');
        }

        ret.items.push(
                { text: i18n.t('Tile'), handler: me.tileWindows, scope: me, minWindows: 1 },
                { text: i18n.t('Cascade'), handler: me.cascadeWindows, scope: me, minWindows: 1 })

        return ret;
    },

    createWindowMenu: function () {
        var me = this;
        return {
            defaultAlign: 'br-tr',
            items: [
                { text: 'Restore', handler: me.onWindowMenuRestore, scope: me },
                { text: 'Minimize', handler: me.onWindowMenuMinimize, scope: me },
                { text: 'Maximize', handler: me.onWindowMenuMaximize, scope: me },
                '-',
                { text: 'Close', handler: me.onWindowMenuClose, scope: me }
            ],
            listeners: {
                beforeshow: me.onWindowMenuBeforeShow,
                hide: me.onWindowMenuHide,
                scope: me
            }
        };
    },

    //------------------------------------------------------
    // Event handler methods

    onDesktopMenu: function (e) {
        var me = this, menu = me.contextMenu;
        e.stopEvent();
        if (!menu.rendered) {
            menu.on('beforeshow', me.onDesktopMenuBeforeShow, me);
        }
        menu.showAt(e.getXY());
        menu.doConstrain();
    },

    onDesktopMenuBeforeShow: function (menu) {
        var me = this, count = me.windows.getCount();

        menu.items.each(function (item) {
            var min = item.minWindows || 0;
            item.setDisabled(count < min);
        });
    },

    onShortcutItemClick: function (dataView, record) {
        var me = this, module = me.app.getModule(record.data.module),
            win = module && module.createWindow();

        if (win) {
            me.restoreWindow(win);
        }
    },

    onWindowClose: function(win) {
        var me = this;
        me.windows.remove(win);
        me.taskbar.removeTaskButton(win.taskButton);
        me.updateActiveWindow();
    },

    //------------------------------------------------------
    // Window context menu handlers

    onWindowMenuBeforeShow: function (menu) {
        var items = menu.items.items, win = menu.theWin;
        items[0].setDisabled(win.maximized !== true && win.hidden !== true); // Restore
        items[1].setDisabled(win.minimized === true); // Minimize
        items[2].setDisabled(win.maximized === true || win.hidden === true); // Maximize
    },

    onWindowMenuClose: function () {
        var me = this, win = me.windowMenu.theWin;

        win.close();
    },

    onWindowMenuHide: function (menu) {
        menu.theWin = null;
    },

    onWindowMenuMaximize: function () {
        var me = this, win = me.windowMenu.theWin;

        win.maximize();
        win.toFront();
    },

    onWindowMenuMinimize: function () {
        var me = this, win = me.windowMenu.theWin;

        win.minimize();
    },

    onWindowMenuRestore: function () {
        var me = this, win = me.windowMenu.theWin;

        me.restoreWindow(win);
    },

    //------------------------------------------------------
    // Dynamic (re)configuration methods

    getWallpaper: function () {
        return this.wallpaper.wallpaper;
    },

    setTickSize: function(xTickSize, yTickSize) {
        var me = this,
            xt = me.xTickSize = xTickSize,
            yt = me.yTickSize = (arguments.length > 1) ? yTickSize : xt;

        me.windows.each(function(win) {
            var dd = win.dd, resizer = win.resizer;
            dd.xTickSize = xt;
            dd.yTickSize = yt;
            resizer.widthIncrement = xt;
            resizer.heightIncrement = yt;
        });
    },

    setWallpaper: function (wallpaper, stretch) {
        this.wallpaper.setWallpaper(wallpaper, stretch);
        return this;
    },

    //------------------------------------------------------
    // Window management methods

    cascadeWindows: function() {
        var x = 0, y = 0,
            zmgr = this.getDesktopZIndexManager();

        zmgr.eachBottomUp(function(win) {
            if (win.isWindow && win.isVisible() && !win.maximized) {
                win.setPosition(x, y);
                x += 20;
                y += 20;
            }
        });
    },

    createWindow: function(config, cls) {
        var me = this, win, cfg = Ext.applyIf(config || {}, {
                stateful: false,
                isWindow: true,
                constrainHeader: true,
                minimizable: true,
                maximizable: true
            });

        cls = cls || Ext.window.Window;
        win = me.add(new cls(cfg));

        me.windows.add(win);

        win.taskButton = me.taskbar.addTaskButton(win);
        //win.animateTarget = win.taskButton.el;

        win.on({
            activate: me.updateActiveWindow,
            beforeshow: me.updateActiveWindow,
            deactivate: me.updateActiveWindow,
            minimize: me.minimizeWindow,
            destroy: me.onWindowClose,
            scope: me
        });

        win.on({
            boxready: function () {
                win.dd.xTickSize = me.xTickSize;
                win.dd.yTickSize = me.yTickSize;

                if (win.resizer) {
                    win.resizer.widthIncrement = me.xTickSize;
                    win.resizer.heightIncrement = me.yTickSize;
                }
            },
            single: true
        });

        // replace normal window close w/fadeOut animation:
        win.doClose = function ()  {
            win.doClose = Ext.emptyFn; // dblclick can call again...
            win.el.disableShadow();
            win.el.fadeOut({
                listeners: {
                    afteranimate: function () {
                        win.destroy();
                    }
                }
            });
        };

        return win;
    },

    getActiveWindow: function () {
        var win = null,
            zmgr = this.getDesktopZIndexManager();

        if (zmgr) {
            // We cannot rely on activate/deactive because that fires against non-Window
            // components in the stack.

            zmgr.eachTopDown(function (comp) {
                if (comp.isWindow && !comp.hidden) {
                    win = comp;
                    return false;
                }
                return true;
            });
        }

        return win;
    },

    getDesktopZIndexManager: function () {
        var windows = this.windows;
        // TODO - there has to be a better way to get this...
        return (windows.getCount() && windows.getAt(0).zIndexManager) || null;
    },

    getWindow: function(id) {
        return this.windows.get(id);
    },

    minimizeWindow: function(win) {
        win.minimized = true;
        win.hide();
    },

    restoreWindow: function (win) {
        if (win.isVisible()) {
            win.restore();
            win.toFront();
        } else {
            win.show();
        }
        return win;
    },

    tileWindows: function() {
        var me = this, availWidth = me.body.getWidth(true);
        var x = me.xTickSize, y = me.yTickSize, nextY = y;

        me.windows.each(function(win) {
            if (win.isVisible() && !win.maximized) {
                var w = win.el.getWidth();

                // Wrap to next row if we are not at the line start and this Window will
                // go off the end
                if (x > me.xTickSize && x + w > availWidth) {
                    x = me.xTickSize;
                    y = nextY;
                }

                win.setPosition(x, y);
                x += w + me.xTickSize;
                nextY = Math.max(nextY, y + win.el.getHeight() + me.yTickSize);
            }
        });
    },

    updateActiveWindow: function () {
        var me = this, activeWindow = me.getActiveWindow(), last = me.lastActiveWindow;
        if (activeWindow === last) {
            return;
        }

        if (last) {
            if (last.el.dom) {
                last.addCls(me.inactiveWindowCls);
                last.removeCls(me.activeWindowCls);
            }
            last.active = false;
        }

        me.lastActiveWindow = activeWindow;

        if (activeWindow) {
            activeWindow.addCls(me.activeWindowCls);
            activeWindow.removeCls(me.inactiveWindowCls);
            activeWindow.minimized = false;
            activeWindow.active = true;
        }

        me.taskbar.setActiveButton(activeWindow && activeWindow.taskButton);
    },

    initShortcut : function() {
        var btnHeight = 64;
        var btnWidth = 64;
        var btnPadding = 30;
        var col = {index : 1,x : btnPadding};
        var row = {index : 1,y : btnPadding};
        var bottom;
        var numberOfItems = 0;
        var taskBarHeight = Ext.query(".ux-taskbar")[0].clientHeight + 40;
        var bodyHeight = Ext.getBody().getHeight() - taskBarHeight;
        var items = Ext.query(".ux-desktop-shortcut");

        for (var i = 0, len = items.length; i < len; i++) {
            numberOfItems += 1;
            bottom = row.y + btnHeight;
            if (((bodyHeight < bottom) ? true : false) && bottom > (btnHeight + btnPadding)) {
                numberOfItems = 0;
                col = {index : col.index++,x : col.x + btnWidth + btnPadding};
                row = {index : 1,y : btnPadding};
            }
            Ext.fly(items[i]).setXY([col.x, row.y]);
            row.index++;
            row.y = row.y + btnHeight + btnPadding;
        }
    }
});

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.ux.desktop.App', {
    mixins: {
        observable:  Ext.util.Observable 
    },

               
                                 
                                
      

    isReady: false,
    modules: null,
    useQuickTips: true,

    constructor: function (config) {
        var me = this;
        me.addEvents(
            'ready',
            'beforeunload'
        );

        me.mixins.observable.constructor.call(this, config);

        if (Ext.isReady) {
            Ext.Function.defer(me.init, 10, me);
        } else {
            Ext.onReady(me.init, me);
        }
    },

    init: function() {
        var me = this, desktopCfg;

        if (me.useQuickTips) {
            Ext.QuickTips.init();
        }

        me.modules = me.getModules();
        if (me.modules) {
            me.initModules(me.modules);
        }

        desktopCfg = me.getDesktopConfig();
        me.desktop = new Ext.ux.desktop.Desktop(desktopCfg);

        me.viewport = new Ext.container.Viewport({
            layout: 'fit',
            items: [ me.desktop ]
        });

        Ext.EventManager.on(window, 'beforeunload', me.onUnload, me);

        me.isReady = true;
        me.fireEvent('ready', me);
    },

    /**
     * This method returns the configuration object for the Desktop object. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getDesktopConfig: function () {
        var me = this, cfg = {
            app: me,
            taskbarConfig: me.getTaskbarConfig()
        };

        Ext.apply(cfg, me.desktopConfig);
        return cfg;
    },

    getModules: Ext.emptyFn,

    /**
     * This method returns the configuration object for the Start Button. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getStartConfig: function () {
        var me = this,
            cfg = {
                app: me,
                menu: []
            },
            launcher;

        Ext.apply(cfg, me.startConfig);

        Ext.each(me.modules, function (module) {
            launcher = module.launcher;
            if (launcher) {
                launcher.handler = launcher.handler || Ext.bind(me.createWindow, me, [module]);
                cfg.menu.push(module.launcher);
            }
        });

        return cfg;
    },

    createWindow: function(module) {
        var window = module.createWindow();
        window.show();
    },

    /**
     * This method returns the configuration object for the TaskBar. A derived class
     * can override this method, call the base version to build the config and then
     * modify the returned object before returning it.
     */
    getTaskbarConfig: function () {
        var me = this, cfg = {
            app: me,
            startConfig: me.getStartConfig()
        };

        Ext.apply(cfg, me.taskbarConfig);
        return cfg;
    },

    initModules : function(modules) {
        var me = this;
        Ext.each(modules, function (module) {
            module.app = me;
        });
    },

    getModule : function(name) {
    	var ms = this.modules;
        for (var i = 0, len = ms.length; i < len; i++) {
            var m = ms[i];
            if (m.id == name || m.appType == name) {
                return m;
            }
        }
        return null;
    },

    onReady : function(fn, scope) {
        if (this.isReady) {
            fn.call(scope, this);
        } else {
            this.on({
                ready: fn,
                scope: scope,
                single: true
            });
        }
    },

    getDesktop : function() {
        return this.desktop;
    },

    onUnload : function(e) {
        if (this.fireEvent('beforeunload', this) === false) {
            e.stopEvent();
        }
    }
});

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.desktop.ShortcutModel
 * @extends Ext.data.Model
 * This model defines the minimal set of fields for desktop shortcuts.
 */
Ext.define('Ext.ux.desktop.ShortcutModel', {
    extend:  Ext.data.Model ,
    fields: [
       { name: 'name' },
       { name: 'iconCls' },
       { name: 'module' },
       { name: 'badge' }
    ]
});

Ext.define('tms.view.Desktop', {
    extend: Ext.ux.desktop.App ,

              
                                
                                       
                              
                                
                                      
                                    
                                     
                                      
                                     
                                    
                                     
                                     
                                        
                                    
                                 
                                 
      

    init:function () {
        if(tms.app.session) {
            this.callParent();
        } else {
            return;
        }
    },

    getModules:function () {
        return [
            new tms.module.TripWindow(),
            new tms.module.PropertyModule(),
            new tms.module.UsersModule(),
            new tms.module.DropdownModule(),
            new tms.module.OrdersModule()
            //new tms.module.AttachmentModule(),
            //new tms.module.InsuranceModule(),
            //new tms.module.TripCrowdModule(),
            //new tms.module.TripMethodModule(),
            //new tms.module.TripThemeModule(),
            //new tms.module.TripTypeModule(),
            //new tms.module.TripQuoteModule(),
            //new tms.module.TripScheduleModule()

        ];
    },

    getDesktopConfig:function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            contextMenuItems:[
                { text:i18n.t('Change Settings'), handler:me.onSettings, scope:me }
            ],
            shortcuts:Ext.create('Ext.data.Store', {
                model:'Ext.ux.desktop.ShortcutModel',
                data:[
                    { name:i18n.t('user_manage'), iconCls:'users-shortcut', module:'users-win'}
                    ,{ name:i18n.t('tripManage'), iconCls:'trip-shortcut', module:'trip-win'}
                    ,{ name:i18n.t('property_manage'), iconCls:'property-shortcut', module:'property-win'}
                    ,{ name:i18n.t('order_manage'), iconCls:'orders-shortcut', module:'orders-win',badge: 5}
                ]
            }),
            wallpaper:'admin/wallpapers/desk.jpg',
            wallpaperStretch:false
        });
    },

    // config for the start menu
    getStartConfig:function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //title:'Don Griffin',
            iconCls:'user',
            height:300,
            toolConfig:{
                width:100,
                items:[
                    {
                        text:i18n.t('Settings'),
                        iconCls:'settings',
                        handler:me.onSettings,
                        scope:me
                    },
                    '-',
                    {
                        text:i18n.t('Logout'),
                        iconCls:'logout',
                        handler:me.onLogout,
                        scope:me
                    }
                ]
            }
        });
    },

    getTaskbarConfig:function () {
        var ret = this.callParent();
        return Ext.apply(ret, {
            width:300,
            quickStart:[
                { name:i18n.t('user_manage'), iconCls:'icon-users',module:'users-win' }
                ,{ name:i18n.t('tripManage'), iconCls:'trip-module', module:'trip-win' }
                ,{ name:i18n.t('property_manage'), iconCls:'icon-property', module:'property-win' }
            ],
            trayItems:[
                { xtype:'trayclock', flex:1 }
            ]
        });
    },

    onLogout:function () {
        Ext.Msg.confirm(i18n.t('Logout'), i18n.t('Are you sure you want to logout?'),function(btn, text){
                if (btn == 'yes'){
                    Ext.Ajax.request({
                        url:tms.getContextPath() + '/index.php?r=user/adminLogout',
                        success: function(response){
                            this.viewport.removeAll();
                            if(!tms.app.loginDiag) {
                                tms.app.loginDiag = Ext.create("tms.view.users.LoginDialog");
                            }
                            delete tms.app.session;
                            tms.app.loginDiag.loginForm.getForm().setValues({"username":'',"password":''});
                            tms.app.loginDiag.show();
                        } ,
                        scope:this
                    });
                }
        },this);

    },

    onSettings:function () {
        var dlg = new tms.module.Settings({
            desktop:this.desktop
        });
        dlg.show();
    }
});

Ext.define('tms.view.attachment.Update', {
    extend:  tms.base.Window ,
                                            
    alias:'widget.attachmentUpdate',
    title: i18n.t('attachment'),
    items: [{
        xtype: 'attachmentForm'
    }]
});

Ext.define('tms.view.company.Form', {
    extend: tms.base.Form ,
    alias:'widget.companyForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('company_id'), anchor:'95%'},
                        {xtype:'textfield', name:'name', fieldLabel:i18n.t('company_name'), anchor:'95%'},
                        {xtype:'textfield', name:'mobile', fieldLabel:i18n.t('company_mobile'), anchor:'95%'},
                        {xtype:'textfield', name:'fax', fieldLabel:i18n.t('company_fax'), anchor:'95%'},
                        {xtype:'hidden', name:'activkey', fieldLabel:i18n.t('company_activkey'), anchor:'95%'},
                        {xtype:'hidden', name:'status', fieldLabel:i18n.t('company_status'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'credit_limit', fieldLabel:i18n.t('company_credit_limit'), anchor:'95%'},
                        {xtype:'textfield', name:'tel', fieldLabel:i18n.t('company_tel'), anchor:'95%'},
                        {xtype:'textfield', name:'email', fieldLabel:i18n.t('company_email'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});

Ext.define('tms.view.company.Update', {
    extend:  tms.base.Window ,
                                         
    alias:'widget.companyUpdate',
    title: i18n.t('company'),
    items: [{
        xtype: 'companyForm'
    }]
});

Ext.define('tms.view.dropdown.Form', {
    extend: tms.base.Form ,
    alias:'widget.dropdownForm',
                                                   
    items:[
        {xtype:'hidden', name:'id', fieldLabel:i18n.t('dropdown_id')}
        ,
        {xtype:'textfield', name:'name', fieldLabel:i18n.t('dropdown_name'), anchor:'90%'}
        ,
        {xtype:'textfield', name:'code', fieldLabel:i18n.t('dropdown_code'), anchor:'90%'}
        ,
        {xtype:'dropdownGrid', name:'options', title:i18n.t('dropdown_options'), anchor: '90%', margin:'0 0 0 20'}
    ]
});

Ext.define('tms.view.dropdown.Update', {
    extend:  tms.base.Window ,
                                          
    alias:'widget.dropdownUpdate',
    title: i18n.t('dropdown'),
    items: [{
        xtype: 'dropdownForm'
    }]
});

Ext.define('tms.view.insurance.Form', {
    extend: tms.base.Form ,
    alias:'widget.insuranceForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{xtype:'hidden',name:'id',fieldLabel: i18n.t('insurance_id'), anchor:'95%'}
                    ,{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                            {xtype:'textfield',name:'price',fieldLabel: i18n.t('insurance_price'), anchor:'95%'}
                            ,{xtype:'textfield',name:'desc',fieldLabel: i18n.t('insurance_desc'), anchor:'95%'}
                            ,{xtype:'numberfield',name:'seqence',fieldLabel: i18n.t('insurance_seqence'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'name',fieldLabel: i18n.t('insurance_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'term',fieldLabel: i18n.t('insurance_term'), anchor:'95%'}
                            ,{xtype:'textarea',name:'summary',fieldLabel: i18n.t('insurance_summary'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});

Ext.define('tms.view.insurance.Update', {
    extend:  tms.base.Window ,
                                           
    alias:'widget.insuranceUpdate',
    title: i18n.t('insurance'),
    items: [{
        xtype: 'insuranceForm'
    }]
});

Ext.define('tms.view.orders.Form', {
    extend: tms.base.Form ,
    alias:'widget.ordersForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('orders_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'no',fieldLabel: i18n.t('orders_no'), readOnly:true, anchor:'95%'}
                        ,{xtype:'textfield',name:'total_paid',fieldLabel: i18n.t('orders_total_paid'), readOnly:true, anchor:'95%'}
                        ,{xtype:'datefield',name:'paid',fieldLabel: i18n.t('orders_paid'), readOnly:true, anchor:'95%'}

                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        ,{xtype:'orderStatusCombo',name:'status',fieldLabel: i18n.t('orders_status'), anchor:'95%'}
                        ,{xtype:'textfield',name:'total_paid_real',fieldLabel: i18n.t('orders_total_paid_real'),readOnly:true,  anchor:'95%'}
                        ,{xtype:'textfield',name:'payment',fieldLabel: i18n.t('orders_payment'), readOnly:true, anchor:'95%'}

                    ]
                }
                ]
            },
            {xtype:'textarea',name:'comment',fieldLabel: i18n.t('ordersStatus_comments'), allowBlank: false,anchor:'100%'}
    ]
});

Ext.define('tms.view.orders.Update', {
    extend:  tms.base.Window ,
                                        
    alias:'widget.ordersUpdate',
    title: i18n.t('orders'),
    items: [{
        xtype: 'ordersForm'
    }]
});

Ext.define('tms.view.profiles.Update', {
    extend:  tms.base.Window ,
                                          
    alias:'widget.profilesUpdate',
    title: i18n.t('profiles'),
    items: [{
        xtype: 'profilesForm'
    }]
});

Ext.define('tms.view.property.Form', {
    extend: tms.base.Form ,
    alias:'widget.propertyForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('property_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'name',fieldLabel: i18n.t('property_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'sub_title',fieldLabel: i18n.t('property_sub_title'), anchor:'95%'}
                            ,{xtype:'textfield',name:'town',fieldLabel: i18n.t('property_town'), anchor:'95%'}
                            ,{xtype:'textfield',name:'country',fieldLabel: i18n.t('property_country'), anchor:'95%'}
                            ,{xtype:'textfield',name:'tel',fieldLabel: i18n.t('property_tel'), anchor:'95%'}
                            ,{xtype:'textfield',name:'email',fieldLabel: i18n.t('property_email'), anchor:'95%'}
                            ,{xtype:'textarea',name:'mappinglink',fieldLabel: i18n.t('property_mappinglink'), anchor:'95%'}
                            ,{xtype:'textarea',name:'checkin_times',fieldLabel: i18n.t('property_checkin_times'), anchor:'95%'}
                            ,{xtype:'textarea',name:'driving_directions',fieldLabel: i18n.t('property_driving_directions'), anchor:'95%'}
                            ,{xtype:'textarea',name:'othertransport',fieldLabel: i18n.t('property_othertransport'), anchor:'95%'}
                            //,{xtype:'textfield',name:'property_key',fieldLabel: i18n.t('property_property_key'), anchor:'95%'}
                            ,{xtype:'dropdownCombo',name:'stars',fieldLabel: i18n.t('property_stars'), anchor:'95%',code:'Stars'}
                            //,{xtype:'textfield',name:'apikey',fieldLabel: i18n.t('property_apikey'), anchor:'95%'}
                            //,{xtype:'textfield',name:'long',fieldLabel: i18n.t('property_long'), anchor:'95%'}
                            //,{xtype:'textfield',name:'metadescription',fieldLabel: i18n.t('property_metadescription'), anchor:'95%'}
                            ,{xtype:'textfield',name:'approved',fieldLabel: i18n.t('property_approved'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[

                            {xtype:'textfield',name:'street',fieldLabel: i18n.t('property_street'), anchor:'95%'}
                            ,{xtype:'textfield',name:'region',fieldLabel: i18n.t('property_region'), anchor:'95%'}
                            ,{xtype:'textfield',name:'postcode',fieldLabel: i18n.t('property_postcode'), anchor:'95%'}
                            ,{xtype:'textfield',name:'fax',fieldLabel: i18n.t('property_fax'), anchor:'95%'}
                            ,{xtype:'textfield',name:'features',fieldLabel: i18n.t('property_features'), anchor:'95%'}
                            ,{xtype:'textarea',name:'description',fieldLabel: i18n.t('property_description'), anchor:'95%'}
                            //,{xtype:'textarea',name:'area_activities',fieldLabel: i18n.t('property_area_activities'), anchor:'95%'}
                            ,{xtype:'textarea',name:'airports',fieldLabel: i18n.t('property_airports'), anchor:'95%'}
                            ,{xtype:'textarea',name:'policies_disclaimers',fieldLabel: i18n.t('property_policies_disclaimers'), anchor:'95%'}
                            ,{xtype:'textfield',name:'published',fieldLabel: i18n.t('property_published'), anchor:'95%'}
                            //,{xtype:'textfield',name:'ptype_id',fieldLabel: i18n.t('property_ptype_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'lat',fieldLabel: i18n.t('property_lat'), anchor:'95%'}
                            ,{xtype:'dropdownCombo', fieldLabel:'优惠促销', name:'promotion', anchor:'95%',code:'Promotion'}
                            //,{xtype:'textfield',name:'metatitle',fieldLabel: i18n.t('property_metatitle'), anchor:'95%'}
                            //,{xtype:'datefield',name:'timestamp',fieldLabel: i18n.t('property_timestamp'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});

Ext.define('tms.view.property.Update', {
    extend:  tms.base.Window ,
                                          
    alias:'widget.propertyUpdate',
    title: i18n.t('property'),
    items: [{
        xtype: 'propertyForm'
    }]
});

Ext.define('tms.view.roomClasses.Form', {
    extend: tms.base.Form ,
    alias:'widget.roomClassesForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('roomClasses_id'), anchor:'95%'}
                        ,{xtype:'textfield', name:'room_classes_name', fieldLabel:i18n.t('roomClasses_room_classes_name'), anchor:'95%'}
                        ,{xtype:'textfield',name:'bed',fieldLabel: i18n.t('roomClasses_bed'), anchor:'95%'}
                        ,{xtype:'textfield',name:'floor',fieldLabel: i18n.t('roomClasses_floor'), anchor:'95%'}
                        ,{xtype:'textarea',name:'room_classes_features',fieldLabel: i18n.t('roomClasses_room_classes_features'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'property_id', fieldLabel:i18n.t('roomClasses_property_id'), anchor:'95%'}
                        ,{xtype:'textfield',name:'total_rooms',fieldLabel: i18n.t('roomClasses_total_rooms'), anchor:'95%'}
                        ,{xtype:'textfield',name:'add_bed',fieldLabel: i18n.t('roomClasses_add_bed'), anchor:'95%'}
                        ,{xtype:'textfield',name:'area',fieldLabel: i18n.t('roomClasses_area'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});

Ext.define('tms.view.roomClasses.Update', {
    extend:  tms.base.Window ,
                                             
    alias:'widget.roomClassesUpdate',
    title: i18n.t('roomClasses'),
    items: [{
        xtype: 'roomClassesForm'
    }]
});

Ext.define('tms.view.roomRates.Form', {
    extend: tms.base.Form ,
    alias:'widget.roomRatesForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('roomRates_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_classes_id',fieldLabel: i18n.t('roomRates_room_classes_id'), anchor:'95%'}
                            ,{xtype:'textarea',name:'rate_description',fieldLabel: i18n.t('roomRates_rate_description'), anchor:'95%'}
                            ,{xtype:'datefield',name:'validto',fieldLabel: i18n.t('roomRates_validto'), anchor:'95%'}
                            ,{xtype:'textfield',name:'mindays',fieldLabel: i18n.t('roomRates_mindays'), anchor:'95%'}
                            ,{xtype:'textfield',name:'minpeople',fieldLabel: i18n.t('roomRates_minpeople'), anchor:'95%'}
                            //,{xtype:'textfield',name:'ignore_pppn',fieldLabel: i18n.t('roomRates_ignore_pppn'), anchor:'95%'}
                            //,{xtype:'textfield',name:'allow_we',fieldLabel: i18n.t('roomRates_allow_we'), anchor:'95%'}
                            ,{xtype:'textfield',name:'dayofweek',fieldLabel: i18n.t('roomRates_dayofweek'), anchor:'95%'}
                            ,{xtype:'textfield',name:'maxrooms_alreadyselected',fieldLabel: i18n.t('roomRates_maxrooms_alreadyselected'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'property_id',fieldLabel: i18n.t('roomRates_property_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'rate_title',fieldLabel: i18n.t('roomRates_rate_title'), anchor:'95%'}
                            ,{xtype:'datefield',name:'validfrom',fieldLabel: i18n.t('roomRates_validfrom'), anchor:'95%'}
                            ,{xtype:'textfield',name:'roomrateperday',fieldLabel: i18n.t('roomRates_roomrateperday'), anchor:'95%'}
                            ,{xtype:'textfield',name:'maxdays',fieldLabel: i18n.t('roomRates_maxdays'), anchor:'95%'}
                            ,{xtype:'textfield',name:'maxpeople',fieldLabel: i18n.t('roomRates_maxpeople'), anchor:'95%'}
                            //,{xtype:'textfield',name:'allow_ph',fieldLabel: i18n.t('roomRates_allow_ph'), anchor:'95%'}
                            ,{xtype:'textfield',name:'weekendonly',fieldLabel: i18n.t('roomRates_weekendonly'), anchor:'95%'}
                            ,{xtype:'textfield',name:'minrooms_alreadyselected',fieldLabel: i18n.t('roomRates_minrooms_alreadyselected'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});

Ext.define('tms.view.roomRates.Update', {
    extend:  tms.base.Window ,
                                           
    alias:'widget.roomRatesUpdate',
    title: i18n.t('roomRates'),
    items: [{
        xtype: 'roomRatesForm'
    }]
});

Ext.define('tms.view.rooms.Form', {
    extend: tms.base.Form ,
    alias:'widget.roomsForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden',name:'id',fieldLabel: i18n.t('rooms_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_classes_id',fieldLabel: i18n.t('rooms_room_classes_id'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_name',fieldLabel: i18n.t('rooms_room_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_floor',fieldLabel: i18n.t('rooms_room_floor'), anchor:'95%'}
                            ,{xtype:'textfield',name:'max_people',fieldLabel: i18n.t('rooms_max_people'), anchor:'95%'}
                            ,{xtype:'numberfield',name:'singleperson_suppliment',fieldLabel: i18n.t('rooms_singleperson_suppliment'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'property_id',fieldLabel: i18n.t('rooms_property_id'), anchor:'95%'}
                            ,{xtype:'textarea',name:'room_features',fieldLabel: i18n.t('rooms_room_features'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_number',fieldLabel: i18n.t('rooms_room_number'), anchor:'95%'}
                            ,{xtype:'textfield',name:'room_disabled_access',fieldLabel: i18n.t('rooms_room_disabled_access'), anchor:'95%'}
                            ,{xtype:'textfield',name:'smoking',fieldLabel: i18n.t('rooms_smoking'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});

Ext.define('tms.view.rooms.Update', {
    extend:  tms.base.Window ,
                                       
    alias:'widget.roomsUpdate',
    title: i18n.t('rooms'),
    items: [{
        xtype: 'roomsForm'
    }]
});

Ext.define('tms.view.tripCrowd.Form', {
    extend: tms.base.Form ,
    alias:'widget.tripCrowdForm',
    items : [{
                layout:'column',
                border:false,
                unstyled:true,
                items:[{xtype:'hidden',name:'id',fieldLabel: i18n.t('tripCrowd_id'), anchor:'95%'}
                    ,{
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'subdomain',fieldLabel: i18n.t('tripCrowd_subdomain'), anchor:'95%'}
                            ,{xtype:'numberfield',name:'seqence',fieldLabel: i18n.t('tripCrowd_seqence'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield',name:'name',fieldLabel: i18n.t('tripCrowd_name'), anchor:'95%'}
                            ,{xtype:'textfield',name:'desc',fieldLabel: i18n.t('tripCrowd_desc'), anchor:'95%'}
                        ]
        }
        ]
    }
    ]
});

Ext.define('tms.view.tripCrowd.Update', {
    extend:  tms.base.Window ,
                                           
    alias:'widget.tripCrowdUpdate',
    title: i18n.t('tripCrowd'),
    items: [{
        xtype: 'tripCrowdForm'
    }]
});

Ext.define('tms.view.tripMethod.Form', {
    extend: tms.base.Form ,
    alias:'widget.tripMethodForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {xtype:'hidden', name:'id', fieldLabel:i18n.t('tripMethod_id'), anchor:'95%'}
                ,
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'subdomain', fieldLabel:i18n.t('tripMethod_subdomain'), anchor:'95%'}
                        ,
                        {xtype:'numberfield', name:'seqence', fieldLabel:i18n.t('tripMethod_seqence'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'name', fieldLabel:i18n.t('tripMethod_name'), anchor:'95%'}
                        ,
                        {xtype:'textfield', name:'desc', fieldLabel:i18n.t('tripMethod_desc'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});

Ext.define('tms.view.tripMethod.Update', {
    extend:  tms.base.Window ,
                                            
    alias:'widget.tripMethodUpdate',
    title: i18n.t('tripMethod'),
    items: [{
        xtype: 'tripMethodForm'
    }]
});

Ext.define('tms.view.tripQuote.Form', {
    extend: tms.base.Form ,
    alias:'widget.tripQuoteForm',
    fieldDefaults:{
        msgTarget:'side',
        labelWidth:120,
        labelAlign:'right',
        anchor: '95%'
    },
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('tripQuote_id'), anchor:'95%'},
                        {xtype:'textfield', name:'title', fieldLabel:i18n.t('tripQuote_title'), anchor:'95%'},
                        {xtype:'datefield', name:'validTo', fieldLabel:i18n.t('tripQuote_validTo'), anchor:'95%'},
                        {xtype:'numberfield', name:'minPeople', fieldLabel:i18n.t('tripQuote_minPeople'), anchor:'95%'},
                        {xtype:'textfield', name:'adult_price', fieldLabel:i18n.t('tripQuote_adult_price'), anchor:'95%'},
                        {xtype:'textfield', name:'adult_net_price', fieldLabel:i18n.t('tripQuote_adult_net_price'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'trip_id', fieldLabel:i18n.t('tripQuote_trip_id'), anchor:'95%'},
                        {xtype:'datefield', name:'validFrom', fieldLabel:i18n.t('tripQuote_validFrom'), anchor:'95%'},
                        {xtype:'numberfield', name:'maxPeople', fieldLabel:i18n.t('tripQuote_maxPeople'), anchor:'95%'},
                        {xtype:'textfield', name:'child_price', fieldLabel:i18n.t('tripQuote_child_price'), anchor:'95%'},
                        {xtype:'textfield', name:'child_net_price', fieldLabel:i18n.t('tripQuote_child_net_price'), anchor:'95%'}
                    ]
                }
            ]
        },
        {
            xtype:'tabpanel',
            layout:'fit',
            plain:true,

            items:[
                {
                    title:i18n.t('tripQuote_rrule'),
                    items:[
                        {
                            xtype: 'radiogroup',
                            fieldLabel: i18n.t('tripQuote_freq'),
                            width:'60%',
                            name: 'freqgroup',
                            items: [
                                {boxLabel: i18n.t('tripQuote_yearly'), name: 'FREQ',inputValue: 'YEARLY'},
                                {boxLabel: i18n.t('tripQuote_monthly'), name: 'FREQ',inputValue: 'MONTHLY'},
                                {boxLabel: i18n.t('tripQuote_weekly'), name: 'FREQ',inputValue: 'WEEKLY'},
                                {boxLabel: i18n.t('tripQuote_daily'), name: 'FREQ',inputValue: 'DAILY'}
                            ]
                        },
                        {xtype:'numberfield', name:'COUNT', fieldLabel:i18n.t('tripQuote_count')},
                        {
                            xtype: 'checkboxgroup',
                            name: 'bydaygroup',
                            fieldLabel: i18n.t('tripQuote_byweekday'),
                            width:'60%',
                            items: [
                                {boxLabel: Ext.Date.dayNames[1], name: 'BYDAY',inputValue: 'MO'},
                                {boxLabel: Ext.Date.dayNames[2], name: 'BYDAY',inputValue: 'TU'},
                                {boxLabel: Ext.Date.dayNames[3], name: 'BYDAY',inputValue: 'WE'},
                                {boxLabel: Ext.Date.dayNames[4], name: 'BYDAY',inputValue: 'TH'},
                                {boxLabel: Ext.Date.dayNames[5], name: 'BYDAY',inputValue: 'FR'},
                                {boxLabel: Ext.Date.dayNames[6], name: 'BYDAY',inputValue: 'SA'},
                                {boxLabel: Ext.Date.dayNames[0], name: 'BYDAY',inputValue: 'SU'}
                            ]
                        },
                        {xtype:'numberfield', name:'bymonthday', fieldLabel:i18n.t('tripQuote_bymonthday')},
                        {xtype:'numberfield', name:'byyearday', fieldLabel:i18n.t('tripQuote_byyearday')},
                        {xtype:'textfield', readOnly:true, width:'100%', height:'100%', name:'rrule'}
                    ]
                },
                {
                    title:i18n.t('tripQuote_rdate'),
                    items:[
                        {xtype:'multidatefield', multiValue: true, width:800, name:'rdate'}
                    ]
                },
                {
                    title:i18n.t('tripQuote_description'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'description'}
                    ]
                }
            ]
        }
    ]
});

Ext.define('tms.view.tripQuote.Update', {
    extend:  tms.base.Window ,
                                           
    alias:'widget.tripQuoteUpdate',
    title: i18n.t('tripQuote'),
    items: [{
        xtype: 'tripQuoteForm'
    }]
});

Ext.define('tms.view.tripSchedule.Form', {
    extend: tms.base.Form ,
    alias:'widget.tripScheduleForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('tripSchedule_id'), anchor:'95%'},
                        {xtype:'textfield', name:'days', fieldLabel:i18n.t('tripSchedule_days'), anchor:'95%'},
                        {xtype:'textfield', name:'location', fieldLabel:i18n.t('tripSchedule_location'), anchor:'95%'},
                        {xtype:'textfield', name:'meal', fieldLabel:i18n.t('tripSchedule_meal'), anchor:'95%'},
                        {xtype:'textfield', name:'not_free', fieldLabel:i18n.t('tripSchedule_not_free'), anchor:'95%'},
                        {xtype:'hidden', name:'product', fieldLabel:i18n.t('tripSchedule_product'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'trip_id', fieldLabel:i18n.t('tripSchedule_trip_id'), anchor:'95%'},
                        {xtype:'textfield', name:'schedule', fieldLabel:i18n.t('tripSchedule_schedule'), anchor:'95%'},
                        {xtype:'hidden', name:'dest_type', fieldLabel:i18n.t('tripSchedule_dest_type'), anchor:'95%'},
                        {xtype:'hidden', name:'not_free_price', fieldLabel:i18n.t('tripSchedule_not_free_price'), anchor:'95%'},
                        {xtype:'textfield', name:'shopping', fieldLabel:i18n.t('tripSchedule_shopping'), anchor:'95%'},
                        {xtype:'textfield', name:'stay_time', fieldLabel:i18n.t('tripSchedule_stay_time'), anchor:'95%'}
                    ]
                }
            ]
        },
        {
            xtype:'tabpanel',
            layout:'fit',
            plain:true,
            items:[
                {
                    title:i18n.t('tripSchedule_arrangement'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'arrangement'}
                    ]
                },
                {
                    title:i18n.t('tripSchedule_attraction'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'attraction'}
                    ]
                },
                {
                    title:i18n.t('tripSchedule_accommodation'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'accommodation'}
                    ]
                },
                {
                    title:i18n.t('tripSchedule_not_free_desc'),
                    items:[
                        {xtype:'htmleditor', width:'100%', height:'100%', name:'shop_desc'}
                    ]
                }
            ]
        }
    ]
});

Ext.define('tms.view.tripSchedule.Update', {
    extend:  tms.base.Window ,
                                              
    alias:'widget.tripScheduleUpdate',
    title: i18n.t('tripSchedule'),
    items: [{
        xtype: 'tripScheduleForm'
    }]
});

Ext.define('tms.view.tripTheme.Form', {
    extend: tms.base.Form ,
    alias:'widget.tripThemeForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {xtype:'hidden', name:'id', fieldLabel:i18n.t('tripTheme_id'), anchor:'95%'}
                ,
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'subdomain', fieldLabel:i18n.t('tripTheme_subdomain'), anchor:'95%'}
                        ,
                        {xtype:'numberfield', name:'seqence', fieldLabel:i18n.t('tripTheme_seqence'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'name', fieldLabel:i18n.t('tripTheme_name'), anchor:'95%'}
                        ,
                        {xtype:'textfield', name:'desc', fieldLabel:i18n.t('tripTheme_desc'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});

Ext.define('tms.view.tripTheme.Update', {
    extend:  tms.base.Window ,
                                           
    alias:'widget.tripThemeUpdate',
    title: i18n.t('tripTheme'),
    items: [{
        xtype: 'tripThemeForm'
    }]
});

Ext.define('tms.view.tripType.Form', {
    extend: tms.base.Form ,
    alias:'widget.tripTypeForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {xtype:'hidden', name:'id', fieldLabel:i18n.t('tripType_id'), anchor:'95%'}
                ,
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'subdomain', fieldLabel:i18n.t('tripType_subdomain'), anchor:'95%'}
                        ,
                        {xtype:'numberfield', name:'seqence', fieldLabel:i18n.t('tripType_seqence'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', name:'name', fieldLabel:i18n.t('tripType_name'), anchor:'95%'}
                        ,
                        {xtype:'textfield', name:'desc', fieldLabel:i18n.t('tripType_desc'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});

Ext.define('tms.view.tripType.Update', {
    extend:  tms.base.Window ,
                                          
    alias:'widget.tripTypeUpdate',
    title: i18n.t('tripType'),
    items: [{
        xtype: 'tripTypeForm'
    }]
});

Ext.define('tms.view.trip.Form', {
    extend: tms.base.Form ,
    alias:'widget.tripForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[{xtype:'hidden', name:'id', anchor:'95%'},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', fieldLabel:'线路名称', name:'title', afterLabelTextTpl:tms.getRequiredTpl(), anchor:'95%'}
                        ,
                        {xtype:'numberfield', fieldLabel:'行程天数', name:'trip_days', anchor:'95%'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'旅游主题', name:'product_theme', anchor:'95%',code:'TripTheme'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'出发城市', name:'departure_city', anchor:'95%',code:'DepartureCity'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'优惠促销', name:'promotion', anchor:'95%',code:'Promotion'}
                    ]
                },
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'textfield', fieldLabel:'团队编号', name:'team_no', afterLabelTextTpl:tms.getRequiredTpl(), minLength:1, anchor:'95%'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'产品类型', name:'product_type', anchor:'95%',code:'TripType'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'适宜人群', name:'crowd', anchor:'95%',code:'TripCrowd'}
                        ,
                        {xtype:'dropdownCombo', fieldLabel:'目的地', name:'dest_city', anchor:'95%',code:'Destination'}
                        ,
                        {xtype:'numberfield', fieldLabel:'建议售价', name:'advice_price', anchor:'95%'}
                    ]
                }
            ]
        },{
            xtype:'tabpanel',
            layout: 'fit',
            plain: true,
            items: [{
                title: '主要景点',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'main_attractions'}]
            },{
                title: '行程简介',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'daily_schedule'}]
            },{
                title: '行程特色',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'high_lights'}]
            },{
                title: '特别提醒',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'notes'}]
            },{
                title: '费用说明',
                items: [{xtype: 'htmleditor',width:'100%',height:'100%',name:'charges_exp'}]
            }]
        }
    ]
});

Ext.define('tms.view.trip.Update', {
    extend:  tms.base.Window ,
    alias:'widget.tripUpdate',
                                      
    title: i18n.t('trip'),
    items: [{
        xtype: 'tripForm'
    }]
});

Ext.define('tms.view.users.Form', {
    extend: tms.base.Form ,
    alias:'widget.usersForm',
    items:[
        {
            layout:'column',
            border:false,
            unstyled:true,
            items:[
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'hidden', name:'id', fieldLabel:i18n.t('users_id'), anchor:'95%'},
                        {xtype:'textfield', name:'username', fieldLabel:i18n.t('users_username'), anchor:'95%'},
                        {xtype:'textfield', name:'email', fieldLabel:i18n.t('users_email'), anchor:'95%'},

                        {xtype:'dropdownCombo', code:'Superuser', name:'superuser', fieldLabel:i18n.t('users_superuser'), anchor:'95%'},
                        {xtype:'datefield', name:'lastvisit', fieldLabel:i18n.t('users_lastvisit'), anchor:'95%'}
                    ]},
                {
                    columnWidth:.5,
                    layout:'form',
                    border:false,
                    unstyled:true,
                    items:[
                        {xtype:'companyCombo', name:'company_id', fieldLabel:i18n.t('users_company_id'), anchor:'95%'},
                        {xtype:'textfield', name:'mobile', allowBlank:false, fieldLabel:i18n.t('users_mobile'), anchor:'95%'},
                        //{xtype:'textfield', name:'password', fieldLabel:i18n.t('users_password'), anchor:'95%'},
                        {xtype:'dropdownCombo', code:'UserStatus', name:'status', fieldLabel:i18n.t('users_status'), anchor:'95%'},
                        {xtype:'datefield', name:'create_at', fieldLabel:i18n.t('users_create_at'), anchor:'95%'}
                    ]
                }
            ]
        }
    ]
});

Ext.define('tms.view.users.Update', {
    extend:  tms.base.Window ,
                                       
    alias:'widget.usersUpdate',
    title: i18n.t('users'),
    items: [{
        xtype: 'usersForm'
    }]
});

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.ux.desktop.StartMenu', {
    extend:  Ext.panel.Panel ,

               
                        
                             
      

    ariaRole: 'menu',

    cls: 'x-menu ux-start-menu',

    defaultAlign: 'bl-tl',

    iconCls: 'user',

    floating: true,

    shadow: true,

    // We have to hardcode a width because the internal Menu cannot drive our width.
    // This is combined with changing the align property of the menu's layout from the
    // typical 'stretchmax' to 'stretch' which allows the the items to fill the menu
    // area.
    width: 300,

    initComponent: function() {
        var me = this, menu = me.menu;

        me.menu = new Ext.menu.Menu({
            cls: 'ux-start-menu-body',
            border: false,
            floating: false,
            items: menu
        });
        me.menu.layout.align = 'stretch';

        me.items = [me.menu];
        me.layout = 'fit';

        Ext.menu.Manager.register(me);
        me.callParent();
        // TODO - relay menu events

        me.toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            dock: 'right',
            cls: 'ux-start-menu-toolbar',
            vertical: true,
            width: 100,
            listeners: {
                add: function(tb, c) {
                    c.on({
                        click: function() {
                            me.hide();
                        }
                    });
                }
            }
        }, me.toolConfig));

        me.toolbar.layout.align = 'stretch';
        me.addDocked(me.toolbar);

        delete me.toolItems;
    },

    addMenuItem: function() {
        var cmp = this.menu;
        cmp.add.apply(cmp, arguments);
    },

    addToolItem: function() {
        var cmp = this.toolbar;
        cmp.add.apply(cmp, arguments);
    }
}); // StartMenu

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.desktop.TaskBar
 * @extends Ext.toolbar.Toolbar
 */
Ext.define('Ext.ux.desktop.TaskBar', {
    // This must be a toolbar. we rely on acquired toolbar classes and inherited toolbar methods for our
    // child items to instantiate and render correctly.
    extend:  Ext.toolbar.Toolbar ,

               
                            
                               
                        

                                  
      

    alias: 'widget.taskbar',

    cls: 'ux-taskbar',

    /**
     * @cfg {String} startBtnText
     * The text for the Start Button.
     */
    startBtnText: i18n.t('Start'),

    initComponent: function () {
        var me = this;
        
        me.startMenu = new Ext.ux.desktop.StartMenu(me.startConfig);

        me.quickStart = new Ext.toolbar.Toolbar(me.getQuickStart());

        me.windowBar = new Ext.toolbar.Toolbar(me.getWindowBarConfig());

        me.tray = new Ext.toolbar.Toolbar(me.getTrayConfig());

        me.items = [
            {
                xtype: 'button',
                cls: 'ux-start-button',
                iconCls: 'ux-start-button-icon',
                menu: me.startMenu,
                menuAlign: 'bl-tl',
                text: me.startBtnText
            },
            me.quickStart,
            {
                xtype: 'splitter', html: '&#160;',
                height: 14, width: 2, // TODO - there should be a CSS way here
                cls: 'x-toolbar-separator x-toolbar-separator-horizontal'
            },
            me.windowBar,
            '-',
            me.tray
        ];

        me.callParent();
    },

    afterLayout: function () {
        var me = this;
        me.callParent();
        me.windowBar.el.on('contextmenu', me.onButtonContextMenu, me);
    },

    /**
     * This method returns the configuration object for the Quick Start toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getQuickStart: function () {
        var me = this, ret = {
            minWidth: 60,
            width: Ext.themeName === 'neptune' ? 100 : 100,
            items: [],
            enableOverflow: true
        };

        Ext.each(this.quickStart, function (item) {
            ret.items.push({
                tooltip: { text: item.name, align: 'bl-tl' },
                //tooltip: item.name,
                overflowText: item.name,
                iconCls: item.iconCls,
                module: item.module,
                handler: me.onQuickStartClick,
                scope: me
            });
        });

        return ret;
    },

    /**
     * This method returns the configuration object for the Tray toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getTrayConfig: function () {
        var ret = {
            items: this.trayItems
        };
        delete this.trayItems;
        return ret;
    },

    getWindowBarConfig: function () {
        return {
            flex: 1,
            cls: 'ux-desktop-windowbar',
            items: [ '&#160;' ],
            layout: { overflowHandler: 'Scroller' }
        };
    },

    getWindowBtnFromEl: function (el) {
        var c = this.windowBar.getChildByElement(el);
        return c || null;
    },

    onQuickStartClick: function (btn) {
        var module = this.app.getModule(btn.module),
            window;

        if (module) {
            window = module.createWindow();
            window.show();
        }
    },
    
    onButtonContextMenu: function (e) {
        var me = this, t = e.getTarget(), btn = me.getWindowBtnFromEl(t);
        if (btn) {
            e.stopEvent();
            me.windowMenu.theWin = btn.win;
            me.windowMenu.showBy(t);
        }
    },

    onWindowBtnClick: function (btn) {
        var win = btn.win;

        if (win.minimized || win.hidden) {
            btn.disable();
            win.show(null, function() {
                btn.enable();
            });
        } else if (win.active) {
            btn.disable();
            win.on('hide', function() {
                btn.enable();
            }, null, {single: true});
            win.minimize();
        } else {
            win.toFront();
        }
    },

    addTaskButton: function(win) {
        var config = {
            iconCls: win.iconCls,
            enableToggle: true,
            toggleGroup: 'all',
            width: 140,
            margins: '0 2 0 3',
            text: Ext.util.Format.ellipsis(win.title, 20),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };

        var cmp = this.windowBar.add(config);
        cmp.toggle(true);
        return cmp;
    },

    removeTaskButton: function (btn) {
        var found, me = this;
        me.windowBar.items.each(function (item) {
            if (item === btn) {
                found = item;
            }
            return !found;
        });
        if (found) {
            me.windowBar.remove(found);
        }
        return found;
    },

    setActiveButton: function(btn) {
        if (btn) {
            btn.toggle(true);
        } else {
            this.windowBar.items.each(function (item) {
                if (item.isButton) {
                    item.toggle(false);
                }
            });
        }
    }
});

/**
 * @class Ext.ux.desktop.TrayClock
 * @extends Ext.toolbar.TextItem
 * This class displays a clock on the toolbar.
 */
Ext.define('Ext.ux.desktop.TrayClock', {
    extend:  Ext.toolbar.TextItem ,

    alias: 'widget.trayclock',

    cls: 'ux-desktop-trayclock',

    html: '&#160;',

    timeFormat: 'G:i',

    tpl: '{time}',

    initComponent: function () {
        var me = this;

        me.callParent();

        if (typeof(me.tpl) == 'string') {
            me.tpl = new Ext.XTemplate(me.tpl);
        }
    },

    afterRender: function () {
        var me = this;
        Ext.Function.defer(me.updateTime, 100, me);
        me.callParent();
    },

    onDestroy: function () {
        var me = this;

        if (me.timer) {
            window.clearTimeout(me.timer);
            me.timer = null;
        }

        me.callParent();
    },

    updateTime: function () {
        var me = this, time = Ext.Date.format(new Date(), me.timeFormat),
            text = me.tpl.apply({ time: time });
        if (me.lastText != text) {
            me.setText(text);
            me.lastText = text;
        }
        me.timer = Ext.Function.defer(me.updateTime, 10000, me);
    }
});

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.desktop.Wallpaper
 * @extends Ext.Component
 * <p>This component renders an image that stretches to fill the component.</p>
 */
Ext.define('Ext.ux.desktop.Wallpaper', {
    extend:  Ext.Component ,

    alias: 'widget.wallpaper',

    cls: 'ux-wallpaper',
    html: '<img src="'+Ext.BLANK_IMAGE_URL+'">',

    stretch: false,
    wallpaper: null,
    stateful  : true,
    stateId  : 'desk-wallpaper',

    afterRender: function () {
        var me = this;
        me.callParent();
        me.setWallpaper(me.wallpaper, me.stretch);
    },

    applyState: function () {
        var me = this, old = me.wallpaper;
        me.callParent(arguments);
        if (old != me.wallpaper) {
            me.setWallpaper(me.wallpaper);
        }
    },

    getState: function () {
        return this.wallpaper && { wallpaper: this.wallpaper };
    },

    setWallpaper: function (wallpaper, stretch) {
        var me = this, imgEl, bkgnd;

        me.stretch = (stretch !== false);
        me.wallpaper = wallpaper;

        if (me.rendered) {
            imgEl = me.el.dom.firstChild;

            if (!wallpaper || wallpaper == Ext.BLANK_IMAGE_URL) {
                Ext.fly(imgEl).hide();
            } else if (me.stretch) {
                imgEl.src = wallpaper;

                me.el.removeCls('ux-wallpaper-tiled');
                Ext.fly(imgEl).setStyle({
                    width: '100%',
                    height: '100%'
                }).show();
            } else {
                Ext.fly(imgEl).hide();

                bkgnd = 'url('+wallpaper+')';
                me.el.addCls('ux-wallpaper-tiled');
            }

            me.el.setStyle({
                backgroundImage: bkgnd || ''
            });
            if(me.stateful) {
                me.saveState();
            }
        }
        return me;
    }
});

/**
 * Abstract base class for filter implementations.
 */
Ext.define('Ext.ux.grid.filter.Filter', {
    extend:  Ext.util.Observable ,

    /**
     * @cfg {Boolean} active
     * Indicates the initial status of the filter (defaults to false).
     */
    active : false,
    /**
     * True if this filter is active.  Use setActive() to alter after configuration.
     * @type Boolean
     * @property active
     */
    /**
     * @cfg {String} dataIndex
     * The {@link Ext.data.Store} dataIndex of the field this filter represents.
     * The dataIndex does not actually have to exist in the store.
     */
    dataIndex : null,
    /**
     * The filter configuration menu that will be installed into the filter submenu of a column menu.
     * @type Ext.menu.Menu
     * @property s
     */
    menu : null,
    /**
     * @cfg {Number} updateBuffer
     * Number of milliseconds to wait after user interaction to fire an update. Only supported
     * by filters: 'list', 'numeric', and 'string'. Defaults to 500.
     */
    updateBuffer : 500,

    constructor : function (config) {
        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event activate
             * Fires when an inactive filter becomes active
             * @param {Ext.ux.grid.filter.Filter} this
             */
            'activate',
            /**
             * @event deactivate
             * Fires when an active filter becomes inactive
             * @param {Ext.ux.grid.filter.Filter} this
             */
            'deactivate',
            /**
             * @event serialize
             * Fires after the serialization process. Use this to attach additional parameters to serialization
             * data before it is encoded and sent to the server.
             * @param {Array/Object} data A map or collection of maps representing the current filter configuration.
             * @param {Ext.ux.grid.filter.Filter} filter The filter being serialized.
             */
            'serialize',
            /**
             * @event update
             * Fires when a filter configuration has changed
             * @param {Ext.ux.grid.filter.Filter} this The filter object.
             */
            'update'
        );
        Ext.ux.grid.filter.Filter.superclass.constructor.call(this);

        this.menu = this.createMenu(config);
        this.init(config);
        if(config && config.value){
            this.setValue(config.value);
            this.setActive(config.active !== false, true);
            delete config.value;
        }
    },

    /**
     * Destroys this filter by purging any event listeners, and removing any menus.
     */
    destroy : function(){
        if (this.menu){
            this.menu.destroy();
        }
        this.clearListeners();
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * initialize the filter and install required menu items.
     * Defaults to Ext.emptyFn.
     */
    init : Ext.emptyFn,

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        config.plain = true;
        return Ext.create('Ext.menu.Menu', config);
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * get and return the value of the filter.
     * Defaults to Ext.emptyFn.
     * @return {Object} The 'serialized' form of this filter
     * @template
     */
    getValue : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * set the value of the filter and fire the 'update' event.
     * Defaults to Ext.emptyFn.
     * @param {Object} data The value to set the filter
     * @template
     */
    setValue : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * return <tt>true</tt> if the filter has enough configuration information to be activated.
     * Defaults to <tt>return true</tt>.
     * @return {Boolean}
     */
    isActivatable : function(){
        return true;
    },

    /**
     * Template method to be implemented by all subclasses that is to
     * get and return serialized filter data for transmission to the server.
     * Defaults to Ext.emptyFn.
     */
    getSerialArgs : Ext.emptyFn,

    /**
     * Template method to be implemented by all subclasses that is to
     * validates the provided Ext.data.Record against the filters configuration.
     * Defaults to <tt>return true</tt>.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function(){
        return true;
    },

    /**
     * Returns the serialized filter data for transmission to the server
     * and fires the 'serialize' event.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    serialize : function(){
        var args = this.getSerialArgs();
        this.fireEvent('serialize', args, this);
        return args;
    },

    /** @private */
    fireUpdate : function(){
        if (this.active) {
            this.fireEvent('update', this);
        }
        this.setActive(this.isActivatable());
    },

    /**
     * Sets the status of the filter and fires the appropriate events.
     * @param {Boolean} active        The new filter state.
     * @param {Boolean} suppressEvent True to prevent events from being fired.
     */
    setActive : function(active, suppressEvent){
        if(this.active != active){
            this.active = active;
            if (suppressEvent !== true) {
                this.fireEvent(active ? 'activate' : 'deactivate', this);
            }
        }
    }
});

/**
 * Boolean filters use unique radio group IDs (so you can have more than one!)
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'boolean',
        dataIndex: 'visible'

        // optional configs
        defaultValue: null, // leave unselected (false selected by default)
        yesText: 'Yes',     // default
        noText: 'No'        // default
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.BooleanFilter', {
    extend:  Ext.ux.grid.filter.Filter ,
    alias: 'gridfilter.boolean',

	/**
	 * @cfg {Boolean} defaultValue
	 * Set this to null if you do not want either option to be checked by default. Defaults to false.
	 */
	defaultValue : false,
	/**
	 * @cfg {String} yesText
	 * Defaults to 'Yes'.
	 */
	yesText : 'Yes',
	/**
	 * @cfg {String} noText
	 * Defaults to 'No'.
	 */
	noText : 'No',

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var gId = Ext.id();
		this.options = [
			Ext.create('Ext.menu.CheckItem', {text: this.yesText, group: gId, checked: this.defaultValue === true}),
			Ext.create('Ext.menu.CheckItem', {text: this.noText, group: gId, checked: this.defaultValue === false})];

		this.menu.add(this.options[0], this.options[1]);

		for(var i=0; i<this.options.length; i++){
			this.options[i].on('click', this.fireUpdate, this);
			this.options[i].on('checkchange', this.fireUpdate, this);
		}
	},

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
		return this.options[0].checked;
	},

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
	setValue : function (value) {
		this.options[value ? 0 : 1].setChecked(true);
	},

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
		var args = {type: 'boolean', value: this.getValue()};
		return args;
	},

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
		return record.get(this.dataIndex) == this.getValue();
	}
});

/**
 * Filter by a configurable Ext.picker.DatePicker menu
 *
 * Example Usage:
 *
 *     var filters = Ext.create('Ext.ux.grid.GridFilters', {
 *         ...
 *         filters: [{
 *             // required configs
 *             type: 'date',
 *             dataIndex: 'dateAdded',
 *      
 *             // optional configs
 *             dateFormat: 'm/d/Y',  // default
 *             beforeText: 'Before', // default
 *             afterText: 'After',   // default
 *             onText: 'On',         // default
 *             pickerOpts: {
 *                 // any DatePicker configs
 *             },
 *      
 *             active: true // default is false
 *         }]
 *     });
 */
Ext.define('Ext.ux.grid.filter.DateFilter', {
    extend:  Ext.ux.grid.filter.Filter ,
    alias: 'gridfilter.date',
                                               

    /**
     * @cfg {String} afterText
     * Defaults to 'After'.
     */
    afterText : 'After',
    /**
     * @cfg {String} beforeText
     * Defaults to 'Before'.
     */
    beforeText : 'Before',
    /**
     * @cfg {Object} compareMap
     * Map for assigning the comparison values used in serialization.
     */
    compareMap : {
        before: 'lt',
        after:  'gt',
        on:     'eq'
    },
    /**
     * @cfg {String} dateFormat
     * The date format to return when using getValue.
     * Defaults to 'm/d/Y'.
     */
    dateFormat : 'm/d/Y',

    /**
     * @cfg {Date} maxDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Date} minDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu
     * Defaults to:<pre>
     * menuItems : ['before', 'after', '-', 'on'],
     * </pre>
     */
    menuItems : ['before', 'after', '-', 'on'],

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     */
    menuItemCfgs : {
        selectOnFocus: true,
        width: 125
    },

    /**
     * @cfg {String} onText
     * Defaults to 'On'.
     */
    onText : 'On',

    /**
     * @cfg {Object} pickerOpts
     * Configuration options for the date picker associated with each field.
     */
    pickerOpts : {},

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var me = this,
            pickerCfg, i, len, item, cfg;

        pickerCfg = Ext.apply(me.pickerOpts, {
            xtype: 'datepicker',
            minDate: me.minDate,
            maxDate: me.maxDate,
            format:  me.dateFormat,
            listeners: {
                scope: me,
                select: me.onMenuSelect
            }
        });

        me.fields = {};
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                cfg = {
                    itemId: 'range-' + item,
                    text: me[item + 'Text'],
                    menu: Ext.create('Ext.menu.Menu', {
                        plain: true,
                        items: [
                            Ext.apply(pickerCfg, {
                                itemId: item,
                                listeners: {
                                    select: me.onPickerSelect,
                                    scope: me
                                }
                            })
                        ]
                    }),
                    listeners: {
                        scope: me,
                        checkchange: me.onCheckChange
                    }
                };
                item = me.fields[item] = Ext.create('Ext.menu.CheckItem', cfg);
            }
            //me.add(item);
            me.menu.add(item);
        }
        me.values = {};
    },

    onCheckChange : function (item, checked) {
        var me = this,
            picker = item.menu.items.first(),
            itemId = picker.itemId,
            values = me.values;

        if (checked) {
            values[itemId] = picker.getValue();
        } else {
            delete values[itemId]
        }
        me.setActive(me.isActivatable());
        me.fireEvent('update', me);
    },

    /**
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
        }
    },

    /**
     * Handler for when the DatePicker for a field fires the 'select' event
     * @param {Ext.picker.Date} picker
     * @param {Object} date
     */
    onMenuSelect : function (picker, date) {
        var fields = this.fields,
            field = this.fields[picker.itemId];

        field.setChecked(true);

        if (field == fields.on) {
            fields.before.setChecked(false, true);
            fields.after.setChecked(false, true);
        } else {
            fields.on.setChecked(false, true);
            if (field == fields.after && this.getFieldValue('before') < date) {
                fields.before.setChecked(false, true);
            } else if (field == fields.before && this.getFieldValue('after') > date) {
                fields.after.setChecked(false, true);
            }
        }
        this.fireEvent('update', this);

        picker.up('menu').hide();
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var key, result = {};
        for (key in this.fields) {
            if (this.fields[key].checked) {
                result[key] = this.getFieldValue(key);
            }
        }
        return result;
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     * @param {Boolean} preserve true to preserve the checked status
     * of the other fields.  Defaults to false, unchecking the
     * other fields
     */
    setValue : function (value, preserve) {
        var key;
        for (key in this.fields) {
            if(value[key]){
                this.getPicker(key).setValue(value[key]);
                this.fields[key].setChecked(true);
            } else if (!preserve) {
                this.fields[key].setChecked(false);
            }
        }
        this.fireEvent('update', this);
    },

    /**
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var key;
        for (key in this.fields) {
            if (this.fields[key].checked) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var args = [];
        for (var key in this.fields) {
            if(this.fields[key].checked){
                args.push({
                    type: 'date',
                    comparison: this.compareMap[key],
                    value: Ext.Date.format(this.getFieldValue(key), this.dateFormat)
                });
            }
        }
        return args;
    },

    /**
     * Get and return the date menu picker value
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Date} Gets the current selected value of the date field
     */
    getFieldValue : function(item){
        return this.values[item];
    },

    /**
     * Gets the menu picker associated with the passed field
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Object} The menu picker
     */
    getPicker : function(item){
        return this.fields[item].menu.items.first();
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var key,
            pickerValue,
            val = record.get(this.dataIndex),
            clearTime = Ext.Date.clearTime;

        if(!Ext.isDate(val)){
            return false;
        }
        val = clearTime(val, true).getTime();

        for (key in this.fields) {
            if (this.fields[key].checked) {
                pickerValue = clearTime(this.getFieldValue(key), true).getTime();
                if (key == 'before' && pickerValue <= val) {
                    return false;
                }
                if (key == 'after' && pickerValue >= val) {
                    return false;
                }
                if (key == 'on' && pickerValue != val) {
                    return false;
                }
            }
        }
        return true;
    },

    onPickerSelect: function(picker, date) {
        // keep track of the picker value separately because the menu gets destroyed
        // when columns order changes.  We return this value from getValue() instead
        // of picker.getValue()
        this.values[picker.itemId] = date;
        this.fireEvent('update', this);
    }
});

/**
 * Filter by a configurable Ext.picker.DatePicker menu
 *
 * This filter allows for the following configurations:
 *
 * - Any of the normal configs will be passed through to either component.
 * - There can be a docked config.
 * - The timepicker can be on the right or left (datepicker, too, of course).
 * - Choose which component will initiate the filtering, i.e., the event can be
 *   configured to be bound to either the datepicker or the timepicker, or if
 *   there is a docked config it be automatically have the handler bound to it.
 *
 * Although not shown here, this class accepts all configuration options
 * for {@link Ext.picker.Date} and {@link Ext.picker.Time}.
 *
 * In the case that a custom dockedItems config is passed in, the
 * class will handle binding the default listener to it so the
 * developer need not worry about having to do it.
 *
 * The default dockedItems position and the toolbar's
 * button text can be passed a config for convenience, i.e.,:
 *
 *     dock: {
 *        buttonText: 'Click to Filter',
 *        dock: 'left'
 *     }
 *
 * Or, pass in a full dockedItems config:
 *
 *     dock: {
 *        dockedItems: {
 *            xtype: 'toolbar',
 *            dock: 'bottom',
 *            ...
 *        }
 *     }
 *
 * Or, give a value of `true` to accept dock defaults:
 *
 *     dock: true
 *
 * But, it must be one or the other.
 *
 * Example Usage:
 *
 *     var filters = Ext.create('Ext.ux.grid.GridFilters', {
 *         ...
 *         filters: [{
 *             // required configs
 *             type: 'datetime',
 *             dataIndex: 'date',
 *
 *             // optional configs
 *             positionDatepickerFirst: false,
 *             //selectDateToFilter: false, // this is overridden b/c of the presence of the dock cfg object
 *
 *             date: {
 *                 format: 'm/d/Y',
 *             },
 *
 *             time: {
 *                 format: 'H:i:s A',
 *                 increment: 1
 *             },
 *
 *             dock: {
 *                 buttonText: 'Click to Filter',
 *                 dock: 'left'
 *
 *                 // allows for custom dockedItems cfg
 *                 //dockedItems: {}
 *             }
 *         }]
 *     });
 *
 * In the above example, note that the filter is being passed a {@link #date} config object,
 * a {@link #time} config object and a {@link #dock} config. These are all optional.
 *
 * As for positioning, the datepicker will be on the right, the timepicker on the left
 * and the docked items will be docked on the left. In addition, since there's a {@link #dock}
 * config, clicking the button in the dock will trigger the filtering.
 */
Ext.define('Ext.ux.grid.filter.DateTimeFilter', {
    extend:  Ext.ux.grid.filter.DateFilter ,
    alias: 'gridfilter.datetime',

    /**
     * @private
     */
    dateDefaults: {
        xtype: 'datepicker',
        format: 'm/d/Y'
    },

    /**
     * @private
     */
    timeDefaults: {
        xtype: 'timepicker',
        width: 100,
        height: 200,
        format: 'g:i A'
    },

    /**
     * @private
     */
    dockDefaults: {
        dock: 'top',
        buttonText: 'Filter'
    },

    /**
     * @cfg {Object} date
     * A {@link Ext.picker.Date} can be configured here.
     * Uses {@link #dateDefaults} by default.
     */

    /**
     * @cfg {Object} time
     * A {@link Ext.picker.Time} can be configured here.
     * Uses {@link #timeDefaults} by default.
     */

    /**
     * @cfg {Boolean/Object} dock
     * A {@link Ext.panel.AbstractPanel#cfg-dockedItems} can be configured here.
     * A `true` value will use the {@link #dockDefaults} default configuration.
     * If present, the button in the docked items will initiate the filtering.
     */

    /**
     * @cfg {Boolean} [selectDateToFilter=true]
     * By default, the datepicker has the default event listener bound to it.
     * Setting to `false` will bind it to the timepicker.
     *
     * The config will be ignored if there is a `dock` config.
     */
    selectDateToFilter: true,

    /**
     * @cfg {Boolean} [positionDatepickerFirst=true]
     * Positions the datepicker within its container.
     * A `true` value will place it on the left in the container.
     * Set to `false` if the timepicker should be placed on the left.
     * Defaults to `true`.
     */
    positionDatepickerFirst: true,

    reTime: /\s(am|pm)/i,
    reItemId: /\w*-(\w*)$/,

    /**
     * Replaces the selected value of the timepicker with the default 00:00:00.
     * @private
     * @param {Object} date
     * @param {Ext.picker.Time} timepicker
     * @return Date object
     */
    addTimeSelection: function (date, timepicker) {
        var me = this,
            selection = timepicker.getSelectionModel().getSelection(),
            time, len, fn, val,
            i = 0,
            arr = [],
            timeFns = ['setHours', 'setMinutes', 'setSeconds', 'setMilliseconds'];


        if (selection.length) {
            time = selection[0].get('disp');

            // Loop through all of the splits and add the time values.
            arr = time.replace(me.reTime, '').split(':');

            for (len = arr.length; i < len; i++) {
                fn = timeFns[i];
                val = arr[i];

                if (val) {
                    date[fn](parseInt(val, 10));
                }
            }
        }

        return date;
    },

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init: function (config) {
        var me = this,
            dateCfg = Ext.applyIf(me.date || {}, me.dateDefaults),
            timeCfg = Ext.applyIf(me.time || {}, me.timeDefaults),
            dockCfg = me.dock, // should not default to empty object
            defaultListeners = {
                click: {
                    scope: me,
                    click: me.onMenuSelect
                },
                select: {
                    scope: me,
                    select: me.onMenuSelect
                }
            },
            pickerCtnCfg, i, len, item, cfg,
            items = [dateCfg, timeCfg],

            // we need to know the datepicker's position in the items array
            // for when the itemId name is bound to it before adding to the menu
            datepickerPosition = 0;

        if (!me.positionDatepickerFirst) {
            items = items.reverse();
            datepickerPosition = 1;
        }

        pickerCtnCfg = Ext.apply(me.pickerOpts, {
            xtype: !dockCfg ? 'container' : 'panel',
            layout: 'hbox',
            items: items
        });

        // If there's no dock config then bind the default listener to the desired picker.
        if (!dockCfg) {
            if (me.selectDateToFilter) {
                dateCfg.listeners = defaultListeners.select;
            } else {
                timeCfg.listeners = defaultListeners.select;
            }
        } else if (dockCfg) {
            me.selectDateToFilter = null;

            if (dockCfg.dockedItems) {
                pickerCtnCfg.dockedItems = dockCfg.dockedItems;
                // TODO: allow config that will tell which item to bind the listener to
                // right now, it's using the first item
                pickerCtnCfg.dockedItems.items[dockCfg.bindToItem || 0].listeners = defaultListeners.click;
            } else {
                // dockCfg can be `true` if button text and dock position defaults are wanted
                if (Ext.isBoolean(dockCfg)) {
                    dockCfg = {};
                }
                dockCfg = Ext.applyIf(dockCfg, me.dockDefaults);
                pickerCtnCfg.dockedItems = {
                    xtype: 'toolbar',
                    dock: dockCfg.dock,
                    items: [
                        {
                            xtype: 'button',
                            text: dockCfg.buttonText,
                            flex: 1,
                            listeners: defaultListeners.click
                        }
                    ]   
                };
            }
        }

        me.fields = {};
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                pickerCtnCfg.items[datepickerPosition].itemId = item;

                cfg = {
                    itemId: 'range-' + item,
                    text: me[item + 'Text'],
                    menu: Ext.create('Ext.menu.Menu', {
                        items: pickerCtnCfg
                    }),
                    listeners: {
                        scope: me,
                        checkchange: me.onCheckChange
                    }
                };
                item = me.fields[item] = Ext.create('Ext.menu.CheckItem', cfg);
            }
            me.menu.add(item);
        }
        me.values = {};
    },

    /**
     * @private
     */
    onCheckChange: function (item, checked) {
        var me = this,
            menu = item.menu,
            timepicker = menu.down('timepicker'),
            datepicker = menu.down('datepicker'),
            itemId = datepicker.itemId,
            values = me.values;

        if (checked) {
            values[itemId] = me.addTimeSelection(datepicker.value, timepicker);
        } else {
            delete values[itemId];
        }
        me.setActive(me.isActivatable());
        me.fireEvent('update', me);
    },

    /** 
     * Handler for when the DatePicker for a field fires the 'select' event
     * @param {Ext.picker.Date} picker
     * @param {Object} date
     */
    onMenuSelect: function (picker, date) {
        // NOTE: we need to redefine the picker.
        var me = this,
            menu = me.menu,
            checkItemId = menu.getFocusEl().itemId.replace(me.reItemId, '$1'),
            fields = me.fields,
            field;

        picker = menu.queryById(checkItemId);
        field = me.fields[picker.itemId];
        field.setChecked(true);

        if (field == fields.on) {
            fields.before.setChecked(false, true);
            fields.after.setChecked(false, true);
        } else {
            fields.on.setChecked(false, true);
            if (field == fields.after && me.getFieldValue('before') < date) {
                fields.before.setChecked(false, true);
            } else if (field == fields.before && me.getFieldValue('after') > date) {
                fields.after.setChecked(false, true);
            }   
        }   
        me.fireEvent('update', me);

        // The timepicker's getBubbleTarget() returns the boundlist's implementation,
        // so it doesn't look up ownerCt chain (it looks up this.pickerField).
        // This is a problem :)
        // This can be fixed by just walking up the ownerCt chain
        // (same thing, but confusing without comment).
        picker.ownerCt.ownerCt.hide();
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs: function () {
        var me = this,
            key,
            fields = me.fields,
            args = [];

        for (key in fields) {
            if (fields[key].checked) {
                args.push({
                    type: 'datetime',
                    comparison: me.compareMap[key],
                    value: Ext.Date.format(me.getFieldValue(key), (me.date.format || me.dateDefaults.format) + ' ' + (me.time.format || me.timeDefaults.format))
                });
            }
        }
        return args;
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     * @param {Boolean} preserve true to preserve the checked status
     * of the other fields.  Defaults to false, unchecking the
     * other fields
     */
    setValue: function (value, preserve) {
        var me = this,
            fields = me.fields,
            key,
            val,
            datepicker;

        for (key in fields) {
            val = value[key];
            if (val) {
                datepicker = me.menu.down('datepicker[itemId="' + key + '"]');
                // Note that calling the Ext.picker.Date:setValue() calls Ext.Date.clearTime(),
                // which we don't want, so just call update() instead and set the value on the component.
                datepicker.update(val);
                datepicker.value = val;

                fields[key].setChecked(true);
            } else if (!preserve) {
                fields[key].setChecked(false);
            }
        }
        me.fireEvent('update', me);
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord: function (record) {
        // remove calls to Ext.Date.clearTime
        var me = this,
            key,
            pickerValue,
            val = record.get(me.dataIndex);

        if(!Ext.isDate(val)){
            return false;
        }

        val = val.getTime();

        for (key in me.fields) {
            if (me.fields[key].checked) {
                pickerValue = me.getFieldValue(key).getTime();
                if (key == 'before' && pickerValue <= val) {
                    return false;
                }
                if (key == 'after' && pickerValue >= val) {
                    return false;
                }
                if (key == 'on' && pickerValue != val) {
                    return false;
                }
            }
        }
        return true;
    }
});

/**
 * List filters are able to be preloaded/backed by an Ext.data.Store to load
 * their options the first time they are shown. ListFilter utilizes the
 * {@link Ext.ux.grid.menu.ListMenu} component.
 *
 * Although not shown here, this class accepts all configuration options
 * for {@link Ext.ux.grid.menu.ListMenu}.
 *
 * Example Usage:
 *
 *     var filters = Ext.create('Ext.ux.grid.GridFilters', {
 *         ...
 *         filters: [{
 *             type: 'list',
 *             dataIndex: 'size',
 *             phpMode: true,
 *             // options will be used as data to implicitly creates an ArrayStore
 *             options: ['extra small', 'small', 'medium', 'large', 'extra large']
 *         }]
 *     });
 *
 */
Ext.define('Ext.ux.grid.filter.ListFilter', {
    extend:  Ext.ux.grid.filter.Filter ,
    alias: 'gridfilter.list',

    /**
     * @cfg {Array} options
     * `data` to be used to implicitly create a data store
     * to back this list when the data source is **local**. If the
     * data for the list is remote, use the {@link #store}
     * config instead.
     *
     * Each item within the provided array may be in one of the
     * following formats:
     *
     *   - **Array** :
     *
     *         options: [
     *             [11, 'extra small'],
     *             [18, 'small'],
     *             [22, 'medium'],
     *             [35, 'large'],
     *             [44, 'extra large']
     *         ]
     *
     *   - **Object** :
     *
     *         labelField: 'name', // override default of 'text'
     *         options: [
     *             {id: 11, name:'extra small'},
     *             {id: 18, name:'small'},
     *             {id: 22, name:'medium'},
     *             {id: 35, name:'large'},
     *             {id: 44, name:'extra large'}
     *         ]
     * 
     *   - **String** :
     *
     *         options: ['extra small', 'small', 'medium', 'large', 'extra large']
     *
     */
    /**
     * @cfg {Boolean} phpMode
     * Adjust the format of this filter. Defaults to false.
     *
     * When GridFilters `@cfg encode = false` (default):
     *
     *     // phpMode == false (default):
     *     filter[0][data][type] list
     *     filter[0][data][value] value1
     *     filter[0][data][value] value2
     *     filter[0][field] prod
     *
     *     // phpMode == true:
     *     filter[0][data][type] list
     *     filter[0][data][value] value1, value2
     *     filter[0][field] prod
     *
     * When GridFilters `@cfg encode = true`:
     *
     *     // phpMode == false (default):
     *     filter : [{"type":"list","value":["small","medium"],"field":"size"}]
     *
     *     // phpMode == true:
     *     filter : [{"type":"list","value":"small,medium","field":"size"}]
     *
     */
    phpMode : false,
    /**
     * @cfg {Ext.data.Store} store
     * The {@link Ext.data.Store} this list should use as its data source
     * when the data source is **remote**. If the data for the list
     * is local, use the {@link #options} config instead.
     */

    /**
     * @private
     * Template method that is to initialize the filter.
     * @param {Object} config
     */
    init : function (config) {
        this.dt = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
    },

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var menu = Ext.create('Ext.ux.grid.menu.ListMenu', config);
        menu.on('checkchange', this.onCheckChange, this);
        return menu;
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.menu.getSelected();
    },
    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.menu.setSelected(value);
        this.fireEvent('update', this);
    },

    /**
     * Template method that is to return true if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        return this.getValue().length > 0;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        return {type: 'list', value: this.phpMode ? this.getValue().join(',') : this.getValue()};
    },

    /** @private */
    onCheckChange : function(){
        this.dt.delay(this.updateBuffer);
    },


    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var valuesArray = this.getValue();
        return Ext.Array.indexOf(valuesArray, record.get(this.dataIndex)) > -1;
    }
});

/**
 * Filters using an Ext.ux.grid.menu.RangeMenu.
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        type: 'numeric',
        dataIndex: 'price'
    }]
});
 * </code></pre>
 * <p>Any of the configuration options for {@link Ext.ux.grid.menu.RangeMenu} can also be specified as
 * configurations to NumericFilter, and will be copied over to the internal menu instance automatically.</p>
 */
Ext.define('Ext.ux.grid.filter.NumericFilter', {
    extend:  Ext.ux.grid.filter.Filter ,
    alias: 'gridfilter.numeric',
                                    

    /**
     * @private @override
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var me = this,
            menu;
        menu = Ext.create('Ext.ux.grid.menu.RangeMenu', config);
        menu.on('update', me.fireUpdate, me);
        return menu;
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.menu.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.menu.setValue(value);
    },

    /**
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var values = this.getValue(),
            key;
        for (key in values) {
            if (values[key] !== undefined) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        var key,
            args = [],
            values = this.menu.getValue();
        for (key in values) {
            args.push({
                type: 'numeric',
                comparison: key,
                value: values[key]
            });
        }
        return args;
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex),
            values = this.getValue(),
            isNumber = Ext.isNumber;
        if (isNumber(values.eq) && val != values.eq) {
            return false;
        }
        if (isNumber(values.lt) && val >= values.lt) {
            return false;
        }
        if (isNumber(values.gt) && val <= values.gt) {
            return false;
        }
        return true;
    }
});

/**
 * Filter by a configurable Ext.form.field.Text
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'string',
        dataIndex: 'name',

        // optional configs
        value: 'foo',
        active: true, // default is false
        iconCls: 'ux-gridfilter-text-icon' // default
        // any Ext.form.field.Text configs accepted
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.StringFilter', {
    extend:  Ext.ux.grid.filter.Filter ,
    alias: 'gridfilter.string',

    /**
     * @cfg {String} iconCls
     * The iconCls to be applied to the menu item.
     * Defaults to <tt>'ux-gridfilter-text-icon'</tt>.
     */
    iconCls : 'ux-gridfilter-text-icon',

    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125,

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        Ext.applyIf(config, {
            enableKeyEvents: true,
            labelCls: 'ux-rangemenu-icon ' + this.iconCls,
            hideEmptyLabel: false,
            labelSeparator: '',
            labelWidth: 29,
            listeners: {
                scope: this,
                keyup: this.onInputKeyUp,
                el: {
                    click: function(e) {
                        e.stopPropagation();
                    }
                }
            }
        });

        this.inputItem = Ext.create('Ext.form.field.Text', config);
        this.menu.add(this.inputItem);
        this.menu.showSeparator = false;
        this.updateTask = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        return this.inputItem.getValue();
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     */
    setValue : function (value) {
        this.inputItem.setValue(value);
        this.fireEvent('update', this);
    },

    /**
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        return this.inputItem.getValue().length > 0;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () {
        return {type: 'string', value: this.getValue()};
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var val = record.get(this.dataIndex);

        if(typeof val != 'string') {
            return (this.getValue().length === 0);
        }

        return val.toLowerCase().indexOf(this.getValue().toLowerCase()) > -1;
    },

    /**
     * @private
     * Handler method called when there is a keyup event on this.inputItem
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
            return;
        }
        // restart the timer
        this.updateTask.delay(this.updateBuffer);
    }
});

/**
 * This is a supporting class for {@link Ext.ux.grid.filter.ListFilter}.
 * Although not listed as configuration options for this class, this class
 * also accepts all configuration options from {@link Ext.ux.grid.filter.ListFilter}.
 */
Ext.define('Ext.ux.grid.menu.ListMenu', {
    extend:  Ext.menu.Menu ,
    
    /**
     * @cfg {String} idField
     * Defaults to 'id'.
     */
    idField :  'id',

    /**
     * @cfg {String} labelField
     * Defaults to 'text'.
     */
    labelField :  'text',
    /**
     * @cfg {String} paramPrefix
     * Defaults to 'Loading...'.
     */
    loadingText : 'Loading...',
    /**
     * @cfg {Boolean} loadOnShow
     * Defaults to true.
     */
    loadOnShow : true,
    /**
     * @cfg {Boolean} single
     * Specify true to group all items in this list into a single-select
     * radio button group. Defaults to false.
     */
    single : false,

    plain: true,

    constructor : function (cfg) {
        var me = this,
            options,
            i,
            len,
            value;
            
        me.selected = [];
        me.addEvents(
            /**
             * @event checkchange
             * Fires when there is a change in checked items from this list
             * @param {Object} item Ext.menu.CheckItem
             * @param {Object} checked The checked value that was set
             */
            'checkchange'
        );

        me.callParent([cfg = cfg || {}]);

        if(!cfg.store && cfg.options) {
            options = [];
            for(i = 0, len = cfg.options.length; i < len; i++){
                value = cfg.options[i];
                switch(Ext.type(value)){
                    case 'array':  options.push(value); break;
                    case 'object': options.push([value[me.idField], value[me.labelField]]); break;
                    case 'string': options.push([value, value]); break;
                }
            }

            me.store = Ext.create('Ext.data.ArrayStore', {
                fields: [me.idField, me.labelField],
                data:   options,
                listeners: {
                    load: me.onLoad,
                    scope:  me
                }
            });
            me.loaded = true;
            me.autoStore = true;
        } else {
            me.add({
                text: me.loadingText,
                iconCls: 'loading-indicator'
            });
            me.store.on('load', me.onLoad, me);
        }
    },

    destroy : function () {
        var me = this,
            store = me.store;
            
        if (store) {
            if (me.autoStore) {
                store.destroyStore();
            } else {
                store.un('unload', me.onLoad, me);
            }
        }
        me.callParent();
    },

    /**
     * Lists will initially show a 'loading' item while the data is retrieved from the store.
     * In some cases the loaded data will result in a list that goes off the screen to the
     * right (as placement calculations were done with the loading item). This adapter will
     * allow show to be called with no arguments to show with the previous arguments and
     * thus recalculate the width and potentially hang the menu from the left.
     */
    show : function () {
        var me = this;
        if (me.loadOnShow && !me.loaded && !me.store.loading) {
            me.store.load();
        }
        me.callParent();
    },

    /** @private */
    onLoad : function (store, records) {
        var me = this,
            gid, itemValue, i, len,
            listeners = {
                checkchange: me.checkChange,
                scope: me
            };

        Ext.suspendLayouts();
        me.removeAll(true);
        gid = me.single ? Ext.id() : null;
        for (i = 0, len = records.length; i < len; i++) {
            itemValue = records[i].get(me.idField);
            me.add(Ext.create('Ext.menu.CheckItem', {
                text: records[i].get(me.labelField),
                group: gid,
                checked: Ext.Array.contains(me.selected, itemValue),
                hideOnClick: false,
                value: itemValue,
                listeners: listeners
            }));
        }

        me.loaded = true;
        Ext.resumeLayouts(true);
        me.fireEvent('load', me, records);
    },

    /**
     * Get the selected items.
     * @return {Array} selected
     */
    getSelected : function () {
        return this.selected;
    },

    /** @private */
    setSelected : function (value) {
        value = this.selected = [].concat(value);

        if (this.loaded) {
            this.items.each(function(item){
                item.setChecked(false, true);
                for (var i = 0, len = value.length; i < len; i++) {
                    if (item.value == value[i]) {
                        item.setChecked(true, true);
                    }
                }
            });
        }
    },

    /**
     * Handler for the 'checkchange' event from an check item in this menu
     * @param {Object} item Ext.menu.CheckItem
     * @param {Object} checked The checked value that was set
     */
    checkChange : function (item, checked) {
        var value = [];
        this.items.each(function(item){
            if (item.checked) {
                value.push(item.value);
            }
        });
        this.selected = value;

        this.fireEvent('checkchange', item, checked);
    }
});

/**
 * Custom implementation of {@link Ext.menu.Menu} that has preconfigured items for entering numeric
 * range comparison values: less-than, greater-than, and equal-to. This is used internally
 * by {@link Ext.ux.grid.filter.NumericFilter} to create its menu.
 */
Ext.define('Ext.ux.grid.menu.RangeMenu', {
    extend:  Ext.menu.Menu ,

    /**
     * @cfg {String} fieldCls
     * The Class to use to construct each field item within this menu
     * Defaults to:<pre>
     * fieldCls : Ext.form.field.Number
     * </pre>
     */
    fieldCls : 'Ext.form.field.Number',

    /**
     * @cfg {Object} fieldCfg
     * The default configuration options for any field item unless superseded
     * by the <code>{@link #fields}</code> configuration.
     * Defaults to:<pre>
     * fieldCfg : {}
     * </pre>
     * Example usage:
     * <pre><code>
fieldCfg : {
    width: 150,
},
     * </code></pre>
     */

    /**
     * @cfg {Object} fields
     * The field items may be configured individually
     * Defaults to <tt>undefined</tt>.
     * Example usage:
     * <pre><code>
fields : {
    gt: { // override fieldCfg options
        width: 200,
        fieldCls: Ext.ux.form.CustomNumberField // to override default {@link #fieldCls}
    }
},
     * </code></pre>
     */

    /**
     * @cfg {Object} itemIconCls
     * The itemIconCls to be applied to each comparator field item.
     * Defaults to:<pre>
itemIconCls : {
    gt : 'ux-rangemenu-gt',
    lt : 'ux-rangemenu-lt',
    eq : 'ux-rangemenu-eq'
}
     * </pre>
     */
    itemIconCls : {
        gt : 'ux-rangemenu-gt',
        lt : 'ux-rangemenu-lt',
        eq : 'ux-rangemenu-eq'
    },

    /**
     * @cfg {Object} fieldLabels
     * Accessible label text for each comparator field item. Can be overridden by localization
     * files. Defaults to:<pre>
fieldLabels : {
     gt: 'Greater Than',
     lt: 'Less Than',
     eq: 'Equal To'
}</pre>
     */
    fieldLabels: {
        gt: 'Greater Than',
        lt: 'Less Than',
        eq: 'Equal To'
    },

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     * Defaults to:<pre>
menuItemCfgs : {
    emptyText: 'Enter Filter Text...',
    selectOnFocus: true,
    width: 125
}
     * </pre>
     */
    menuItemCfgs : {
        emptyText: 'Enter Number...',
        selectOnFocus: false,
        width: 155
    },

    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu.  Items are added to the menu
     * according to their position within this array. Defaults to:<pre>
     * menuItems : ['lt','gt','-','eq']
     * </pre>
     */
    menuItems : ['lt', 'gt', '-', 'eq'],

    plain: true,

    constructor : function (config) {
        var me = this,
            fields, fieldCfg, i, len, item, cfg, Cls;

        me.callParent(arguments);

        fields = me.fields = me.fields || {};
        fieldCfg = me.fieldCfg = me.fieldCfg || {};
        
        me.addEvents(
            /**
             * @event update
             * Fires when a filter configuration has changed
             * @param {Ext.ux.grid.filter.Filter} this The filter object.
             */
            'update'
        );
      
        me.updateTask = Ext.create('Ext.util.DelayedTask', me.fireUpdate, me);
    
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                // defaults
                cfg = {
                    itemId: 'range-' + item,
                    enableKeyEvents: true,
                    hideEmptyLabel: false,
                    labelCls: 'ux-rangemenu-icon ' + me.itemIconCls[item],
                    labelSeparator: '',
                    labelWidth: 29,
                    listeners: {
                        scope: me,
                        change: me.onInputChange,
                        keyup: me.onInputKeyUp,
                        el: {
                            click: this.stopFn
                        }
                    },
                    activate: Ext.emptyFn,
                    deactivate: Ext.emptyFn
                };
                Ext.apply(
                    cfg,
                    // custom configs
                    Ext.applyIf(fields[item] || {}, fieldCfg[item]),
                    // configurable defaults
                    me.menuItemCfgs
                );
                Cls = cfg.fieldCls || me.fieldCls;
                item = fields[item] = Ext.create(Cls, cfg);
            }
            me.add(item);
        }
    },
    
    stopFn: function(e) {
        e.stopPropagation();
    },

    /**
     * @private
     * called by this.updateTask
     */
    fireUpdate : function () {
        this.fireEvent('update', this);
    },
    
    /**
     * Get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var result = {},
            fields = this.fields, 
            key, field;
            
        for (key in fields) {
            if (fields.hasOwnProperty(key)) {
                field = fields[key];
                if (field.isValid() && field.getValue() !== null) {
                    result[key] = field.getValue();
                }
            }
        }
        return result;
    },
  
    /**
     * Set the value of this menu and fires the 'update' event.
     * @param {Object} data The data to assign to this menu
     */	
    setValue : function (data) {
        var me = this,
            fields = me.fields,
            key,
            field;

        for (key in fields) {
            if (fields.hasOwnProperty(key)) {
                // Prevent field's change event from tiggering a Store filter. The final upate event will do that
                field =fields[key];
                field.suspendEvents();
                field.setValue(key in data ? data[key] : '');
                field.resumeEvents();
            }
        }

        // Trigger the filering of the Store
        me.fireEvent('update', me);
    },

    /**  
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp: function(field, e) {
        if (e.getKey() === e.RETURN && field.isValid()) {
            e.stopEvent();
            this.hide();
        }
    },

    /**
     * @private
     * Handler method called when the user changes the value of one of the input
     * items in this menu.
     */
    onInputChange: function(field) {
        var me = this,
            fields = me.fields,
            eq = fields.eq,
            gt = fields.gt,
            lt = fields.lt;

        if (field == eq) {
            if (gt) {
                gt.setValue(null);
            }
            if (lt) {
                lt.setValue(null);
            }
        }
        else {
            eq.setValue(null);
        }

        // restart the timer
        this.updateTask.delay(this.updateBuffer);
    }
});

/**
 * Created by JetBrains PhpStorm.
 * User: qingt
 * Date: 13-3-21
 * Time: 上午9:28
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext.ux.window.Notification', {
    extend:  Ext.window.Window ,
    alias: 'widget.uxNotification',

    cls: 'ux-notification-window',
    autoClose: true,
    autoHeight: true,
    plain: false,
    draggable: false,
    shadow: false,
    focus: Ext.emptyFn,

    // For alignment and to store array of rendered notifications. Defaults to document if not set.
    manager: null,

    useXAxis: false,

    // Options: br, bl, tr, tl, t, l, b, r
    position: 'br',

    // Pixels between each notification
    spacing: 6,

    // Pixels from the managers borders to start the first notification
    paddingX: 30,
    paddingY: 10,

    slideInAnimation: 'easeIn',
    slideBackAnimation: 'bounceOut',
    slideInDuration: 1500,
    slideBackDuration: 1000,
    hideDuration: 500,
    autoCloseDelay: 7000,
    stickOnClick: true,
    stickWhileHover: true,

    // Private. Do not override!
    isHiding: false,
    readyToHide: false,
    destroyAfterHide: false,
    closeOnMouseOut: false,

    // Caching coordinates to be able to align to final position of siblings being animated
    xPos: 0,
    yPos: 0,

    statics: {
        defaultManager: {
            el: null
        }
    },

    initComponent: function() {
        var me = this;

        // Backwards compatibility
        if (Ext.isDefined(me.corner)) {
            me.position = me.corner;
        }
        if (Ext.isDefined(me.slideDownAnimation)) {
            me.slideBackAnimation = me.slideDownAnimation;
        }
        if (Ext.isDefined(me.autoDestroyDelay)) {
            me.autoCloseDelay = me.autoDestroyDelay;
        }
        if (Ext.isDefined(me.autoHideDelay)) {
            me.autoCloseDelay = me.autoHideDelay;
        }
        if (Ext.isDefined(me.autoHide)) {
            me.autoClose = me.autoHide;
        }
        if (Ext.isDefined(me.slideInDelay)) {
            me.slideInDuration = me.slideInDelay;
        }
        if (Ext.isDefined(me.slideDownDelay)) {
            me.slideBackDuration = me.slideDownDelay;
        }
        if (Ext.isDefined(me.fadeDelay)) {
            me.hideDuration = me.fadeDelay;
        }

        // 'bc', lc', 'rc', 'tc' compatibility
        me.position = me.position.replace(/c/, '');

        me.updateAlignment(me.position);

        me.setManager(me.manager);

        me.callParent(arguments);
    },

    onRender: function() {
        var me = this;

        me.el.hover(
            function () {
                me.mouseIsOver = true;
            },
            function () {
                me.mouseIsOver = false;
                if (me.closeOnMouseOut) {
                    me.closeOnMouseOut = false;
                    me.close();
                }
            },
            me
        );

        this.callParent(arguments);

    },

    updateAlignment: function (position) {
        var me = this;

        switch (position) {
            case 'br':
                me.paddingFactorX = -1;
                me.paddingFactorY = -1;
                me.siblingAlignment = "br-br";
                if (me.useXAxis) {
                    me.managerAlignment = "bl-br";
                } else {
                    me.managerAlignment = "tr-br";
                }
                break;
            case 'bl':
                me.paddingFactorX = 1;
                me.paddingFactorY = -1;
                me.siblingAlignment = "bl-bl";
                if (me.useXAxis) {
                    me.managerAlignment = "br-bl";
                } else {
                    me.managerAlignment = "tl-bl";
                }
                break;
            case 'tr':
                me.paddingFactorX = -1;
                me.paddingFactorY = 1;
                me.siblingAlignment = "tr-tr";
                if (me.useXAxis) {
                    me.managerAlignment = "tl-tr";
                } else {
                    me.managerAlignment = "br-tr";
                }
                break;
            case 'tl':
                me.paddingFactorX = 1;
                me.paddingFactorY = 1;
                me.siblingAlignment = "tl-tl";
                if (me.useXAxis) {
                    me.managerAlignment = "tr-tl";
                } else {
                    me.managerAlignment = "bl-tl";
                }
                break;
            case 'b':
                me.paddingFactorX = 0;
                me.paddingFactorY = -1;
                me.siblingAlignment = "b-b";
                me.useXAxis = 0;
                me.managerAlignment = "t-b";
                break;
            case 't':
                me.paddingFactorX = 0;
                me.paddingFactorY = 1;
                me.siblingAlignment = "t-t";
                me.useXAxis = 0;
                me.managerAlignment = "b-t";
                break;
            case 'l':
                me.paddingFactorX = 1;
                me.paddingFactorY = 0;
                me.siblingAlignment = "l-l";
                me.useXAxis = 1;
                me.managerAlignment = "r-l";
                break;
            case 'r':
                me.paddingFactorX = -1;
                me.paddingFactorY = 0;
                me.siblingAlignment = "r-r";
                me.useXAxis = 1;
                me.managerAlignment = "l-r";
                break;
        }
    },

    getXposAlignedToManager: function () {
        var me = this;

        var xPos = 0;

        // Avoid error messages if the manager does not have a dom element
        if (me.manager && me.manager.el && me.manager.el.dom) {
            if (!me.useXAxis) {
                // Element should already be aligned verticaly
                return me.el.getLeft();
            } else {
                // Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
                // as the manager but is still 0 px high. Before rendering the viewport.
                if (me.position == 'br' || me.position == 'tr' || me.position == 'r') {
                    xPos += me.manager.el.getAnchorXY('r')[0];
                    xPos -= (me.el.getWidth() + me.paddingX);
                } else {
                    xPos += me.manager.el.getAnchorXY('l')[0];
                    xPos += me.paddingX;
                }
            }
        }

        return xPos;
    },

    getYposAlignedToManager: function () {
        var me = this;

        var yPos = 0;

        // Avoid error messages if the manager does not have a dom element
        if (me.manager && me.manager.el && me.manager.el.dom) {
            if (me.useXAxis) {
                // Element should already be aligned horizontaly
                return me.el.getTop();
            } else {
                // Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
                // as the manager but is still 0 px high. Before rendering the viewport.
                if (me.position == 'br' || me.position == 'bl' || me.position == 'b') {
                    yPos += me.manager.el.getAnchorXY('b')[1];
                    yPos -= (me.el.getHeight() + me.paddingY);
                } else {
                    yPos += me.manager.el.getAnchorXY('t')[1];
                    yPos += me.paddingY;
                }
            }
        }

        return yPos;
    },

    getXposAlignedToSibling: function (sibling) {
        var me = this;

        if (me.useXAxis) {
            if (me.position == 'tl' || me.position == 'bl' || me.position == 'l') {
                // Using sibling's width when adding
                return (sibling.xPos + sibling.el.getWidth() + sibling.spacing);
            } else {
                // Using own width when subtracting
                return (sibling.xPos - me.el.getWidth() - me.spacing);
            }
        } else {
            return me.el.getLeft();
        }

    },

    getYposAlignedToSibling: function (sibling) {
        var me = this;

        if (me.useXAxis) {
            return me.el.getTop();
        } else {
            if (me.position == 'tr' || me.position == 'tl' || me.position == 't') {
                // Using sibling's width when adding
                return (sibling.yPos + sibling.el.getHeight() + sibling.spacing);
            } else {
                // Using own width when subtracting
                return (sibling.yPos - me.el.getHeight() - sibling.spacing);
            }
        }
    },

    getNotifications: function (alignment) {
        var me = this;

        if (!me.manager.notifications[alignment]) {
            me.manager.notifications[alignment] = [];
        }

        return me.manager.notifications[alignment];
    },

    setManager: function (manager) {
        var me = this;

        me.manager = manager;

        if (typeof me.manager == 'string') {
            me.manager = Ext.getCmp(me.manager);
        }

        // If no manager is provided or found, then the static object is used and the el property pointed to the body document.
        if (!me.manager) {
            me.manager = me.statics().defaultManager;

            if (!me.manager.el) {
                me.manager.el = Ext.getBody();
            }
        }

        if (typeof me.manager.notifications == 'undefined') {
            me.manager.notifications = {};
        }
    },

    beforeShow: function () {
        var me = this;

        if (me.stickOnClick) {
            if (me.body && me.body.dom) {
                Ext.fly(me.body.dom).on('click', function () {
                    me.cancelAutoClose();
                    me.addCls('notification-fixed');
                }, me);
            }
        }

        if (me.autoClose) {
            me.task = new Ext.util.DelayedTask(me.doAutoClose, me);
            me.task.delay(me.autoCloseDelay);
        }

        // Shunting offscreen to avoid flicker
        me.el.setX(-10000);
        me.el.setOpacity(1);

    },

    afterShow: function () {
        var me = this;

        var notifications = me.getNotifications(me.managerAlignment);

        if (notifications.length) {
            me.el.alignTo(notifications[notifications.length - 1].el, me.siblingAlignment, [0, 0]);
            me.xPos = me.getXposAlignedToSibling(notifications[notifications.length - 1]);
            me.yPos = me.getYposAlignedToSibling(notifications[notifications.length - 1]);
        } else {
            me.el.alignTo(me.manager.el, me.managerAlignment, [(me.paddingX * me.paddingFactorX), (me.paddingY * me.paddingFactorY)], false);
            me.xPos = me.getXposAlignedToManager();
            me.yPos = me.getYposAlignedToManager();
        }

        Ext.Array.include(notifications, me);

        me.el.animate({
            to: {
                x: me.xPos,
                y: me.yPos,
                opacity: 1
            },
            easing: me.slideInAnimation,
            duration: me.slideInDuration,
            dynamic: true
        });

        this.callParent(arguments);
    },

    slideBack: function () {
        var me = this;

        var notifications = me.getNotifications(me.managerAlignment);
        var index = Ext.Array.indexOf(notifications, me)

        // Not animating the element if it already started to hide itself or if the manager is not present in the dom
        if (!me.isHiding && me.el && me.manager && me.manager.el && me.manager.el.dom && me.manager.el.isVisible()) {

            if (index) {
                me.xPos = me.getXposAlignedToSibling(notifications[index - 1]);
                me.yPos = me.getYposAlignedToSibling(notifications[index - 1]);
            } else {
                me.xPos = me.getXposAlignedToManager();
                me.yPos = me.getYposAlignedToManager();
            }

            me.stopAnimation();

            me.el.animate({
                to: {
                    x: me.xPos,
                    y: me.yPos
                },
                easing: me.slideBackAnimation,
                duration: me.slideBackDuration,
                dynamic: true
            });
        }
    },

    cancelAutoClose: function() {
        var me = this;

        if (me.autoClose) {
            me.task.cancel();
        }
    },

    doAutoClose: function () {
        var me = this;

        if (!(me.stickWhileHover && me.mouseIsOver)) {
            // Close immediately
            me.close();
        } else {
            // Delayed closing when mouse leaves the component.
            me.closeOnMouseOut = true;
        }
    },

    removeFromManager: function () {
        var me = this;

        if (me.manager) {
            var notifications = me.getNotifications(me.managerAlignment);
            var index = Ext.Array.indexOf(notifications, me);
            if (index != -1) {
                Ext.Array.erase(notifications, index, 1);

                // Slide "down" all notifications "above" the hidden one
                for (;index < notifications.length; index++) {
                    notifications[index].slideBack();
                }
            }
        }
    },

    hide: function () {
        var me = this;

        // Avoids restarting the last animation on an element already underway with its hide animation
        if (!me.isHiding && me.el) {

            me.isHiding = true;

            me.cancelAutoClose();
            me.stopAnimation();

            me.el.animate({
                to: {
                    opacity: 0
                },
                easing: 'easeIn',
                duration: me.hideDuration,
                dynamic: false,
                listeners: {
                    afteranimate: function () {
                        me.removeFromManager();
                        me.readyToHide = true;
                        me.hide(me.animateTarget, me.doClose, me);
                    }
                }
            });
        }

        // Calling parent's hide function to complete hiding
        if (me.readyToHide) {
            me.isHiding = false;
            me.readyToHide = false;
            me.removeCls('notification-fixed');
            me.callParent(arguments);
            if (me.destroyAfterHide) {
                me.destroy();
            }
        }
    },

    destroy: function () {
        var me = this;

        if (!me.hidden) {
            me.destroyAfterHide = true;
            me.hide(me.animateTarget, me.doClose, me);
        } else {
            me.callParent(arguments);
        }
    }

});

// @tag full-page
// @require E:\wamp\www\tms\app.js

