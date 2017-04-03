Ext.define('tms.view.tripSchedule.Update', {
    extend: 'tms.base.Window',
    requires : ['tms.view.tripSchedule.Form'],
    alias:'widget.tripScheduleUpdate',
    title: i18n.t('tripSchedule'),
    items: [{
        xtype: 'tripScheduleForm'
    }]
});