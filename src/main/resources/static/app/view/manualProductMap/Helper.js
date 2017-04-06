Ext.define('tms.view.manualProductMap.Helper', {
    extend: 'Ext.view.View',
    alias:'widget.manualProductMapHelper',
    tpl: [
        '<tpl for=".">',
            '<div class="card  light-blue">',
            	'<div class="card-content white-text">',
            		'<span class="card-title">{title:htmlEncode}</span>',
            		'<p>{content:htmlEncode}</p>',
            	'</div>',
            	'<div class="card-action">',
            		'<a href={url} class="lime-text text-accent-1">{linkText:htmlEncode}</a>',
            	'</div>',
            '</div>',
        '</tpl>'
    ]    
});