/**
 * Created by JetBrains PhpStorm.
 * User: qingt
 * Date: 13-3-18
 * Time: 下午9:55
 * To change this template use File | Settings | File Templates.
 */
Ext.define('tms.base.Window', {
    extend: 'Ext.window.Window',
    requires: ['tms'],
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