Ext.define('tms.view.rooms.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.rooms.Form'],
    alias:'widget.roomsUpdate',
    title: i18n.t('rooms'),
    items: [{
        xtype: 'roomsForm'
    }]
});