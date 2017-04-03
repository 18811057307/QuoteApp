/**
 * Created by JetBrains PhpStorm.
 * User: qingt
 * Date: 13-3-18
 * Time: 下午2:01
 * To change this template use File | Settings | File Templates.
 */
Ext.define('tms.base.Store', {
    extend: 'Ext.data.Store',
    requires: ['tms'],
    autoLoad: false,
    sorters: [{
        property: 'id',
        direction: 'DESC'
    }]
});