ips.templates.set('gallery.patchwork.indexItem',"  {{#showThumb}}  <span class='cGalleryPatchwork_item' style='width: {{dims.width}}px; height: {{dims.height}}px; margin: {{dims.margin}}px {{dims.marginRight}}px {{dims.margin}}px {{dims.marginLeft}}px'> {{/showThumb}} {{^showThumb}}  <span class='cGalleryPatchwork_item ipsNoThumb ipsNoThumb_video' style='width: {{dims.width}}px; height: {{dims.height}}px; margin: {{dims.margin}}px {{dims.marginRight}}px {{dims.margin}}px {{dims.marginLeft}}px'> {{/showThumb}}   <a data-imageLightbox title='{{image.caption}}' href='{{image.url}}'>    {{#showThumb}}<img src='{{image.src}}' alt='{{image.caption}}' class='cGalleryPatchwork_image'>{{/showThumb}}    <div class='ipsPhotoPanel ipsPhotoPanel_mini'>     <img src='{{image.author.photo}}' class='ipsUserPhoto ipsUserPhoto_mini'>     <div>      <span class='ipsType_normal ipsTruncate ipsTruncate_line'>{{#lang}}by{{/lang}} {{image.author.name}}</span>      <span class='ipsType_small ipsTruncate ipsTruncate_line'>{{#lang}}in{{/lang}} {{image.container}}</span>     </div>    </div>    {{#image.allowComments}}     <span class='cGalleryPatchwork_comments' data-commentCount='{{image.comments}}'><i class='fa fa-comment'></i> {{image.comments}}</span>    {{/image.allowComments}}   </a>  </span>");ips.templates.set('gallery.patchwork.tableItem',"  {{#showThumb}}  <div data-imageID='{{image.id}}' class='cGalleryPatchwork_item' style='width: {{dims.width}}px; height: {{dims.height}}px; margin: {{dims.margin}}px {{dims.marginRight}}px {{dims.margin}}px {{dims.marginLeft}}px'> {{/showThumb}} {{^showThumb}}  <div data-imageID='{{image.id}}' class='cGalleryPatchwork_item ipsNoThumb ipsNoThumb_video' style='width: {{dims.width}}px; height: {{dims.height}}px; margin: {{dims.margin}}px {{dims.marginRight}}px {{dims.margin}}px {{dims.marginLeft}}px'> {{/showThumb}}  <a data-imageLightbox title='{{image.caption}}' href='{{image.url}}'>   {{#showThumb}}<img src='{{image.src}}' alt='{{image.caption}}' class='cGalleryPatchwork_image'>{{/showThumb}}   <div class='ipsPhotoPanel ipsPhotoPanel_mini'>    <img src='{{image.author.photo}}' class='ipsUserPhoto ipsUserPhoto_mini'>    <div>     <span class='ipsType_normal ipsTruncate ipsTruncate_line'>{{image.caption}}</span>     <span class='ipsType_small ipsTruncate ipsTruncate_line'>{{#lang}}by{{/lang}} {{image.author.name}}</span>    </div>   </div>   <ul class='ipsList_inline cGalleryPatchwork_stats'>    {{#image.unread}}     <li class='ipsPos_left'>      <span class='ipsItemStatus ipsItemStatus_small' data-ipsTooltip title='{{image.unread}}'><i class='fa fa-circle'></i></span>     </li>    {{/image.unread}}    {{#image.hasState}}     <li class='ipsPos_left'>      {{#image.state.hidden}}       <span class='ipsBadge ipsBadge_icon ipsBadge_small ipsBadge_warning' data-ipsTooltip title='{{#lang}}hidden{{/lang}}'><i class='fa fa-eye-slash'></i></span>      {{/image.state.hidden}}      {{#image.state.pending}}       <span class='ipsBadge ipsBadge_icon ipsBadge_small ipsBadge_warning' data-ipsTooltip title='{{#lang}}pending{{/lang}}'><i class='fa fa-warning'></i></span>      {{/image.state.pending}}      {{#image.state.pinned}}       <span class='ipsBadge ipsBadge_icon ipsBadge_small ipsBadge_positive' data-ipsTooltip title='{{#lang}}pinned{{/lang}}'><i class='fa fa-thumb-tack'></i></span>      {{/image.state.pinned}}      {{#image.state.featured}}       <span class='ipsBadge ipsBadge_icon ipsBadge_small ipsBadge_positive' data-ipsTooltip title='{{#lang}}featured{{/lang}}'><i class='fa fa-star'></i></span>      {{/image.state.featured}}     </li>    {{/image.hasState}}    {{#image.allowComments}}     <li class='ipsPos_right' data-commentCount='{{image.comments}}'><i class='fa fa-comment'></i> {{image.comments}}</li>    {{/image.allowComments}}   </ul>  </a>  {{#image.modActions}}   <input type='checkbox' data-role='moderation' name='moderate[{{image.id}}]' data-actions='{{image.modActions}}' data-state='{{image.modStates}}'>  {{/image.modActions}} </div>");ips.templates.set('gallery.lightbox.wrapper',"  <div id='cLightbox' class='ipsModal' data-originalUrl='{{originalUrl}}' data-originalTitle='{{originalTitle}}'>  <span class='cLightboxClose'>&times;</span>  <div class='cLightboxBack'></div> </div>");;
;(function($,_,undefined){"use strict";ips.controller.register('gallery.front.browse.imageLightbox',{initialize:function(){this.on('click','[data-imageLightbox]',this.launchLightbox);this.on(document,'keydown',this.keyDown);History.Adapter.bind(window,'statechange',_.bind(this.stateChange,this));this.setup();},setup:function(){if(!_.isUndefined(this.scope.attr('data-launchLightbox'))){this._launch(this.scope.attr('data-lightboxURL'),document.title);}},closeLightboxNextStateChange:false,stateChange:function(){var state=History.getState();if(state.data.controller=='gallery.front.browse.imageLightbox'&&(!_.isUndefined(state.data.initialLaunch)&&state.data.initialLaunch==true)){this.closeLightboxNextStateChange=true;}
if(state.data.controller!='gallery.front.view.image'){if(state.data.controller=='gallery.front.browse.imageLightbox'&&(_.isUndefined(state.data.initialLaunch)||state.data.initialLaunch!=true)){this.closeLightboxNextStateChange=false;Debug.log(state.data);this.closeLightbox();}
return;}
this.closeLightboxNextStateChange=false;if(_.isUndefined(state.data.direction)){return;}
if($('[data-role="tableRows"] div[data-imageId="'+state.data.imageID+'"]').length){return;}
if(state.data.direction=='next'){$('#cLightbox').attr('data-originalUrl',$('[data-role="tablePagination"]').find('.ipsPagination_next:not(.ipsPagination_inactive) a').first().attr('href'));$('[data-role="tablePagination"]').find('.ipsPagination_next:not(.ipsPagination_inactive) a').first().click();}
if(state.data.direction=='prev'){$('#cLightbox').attr('data-originalUrl',$('[data-role="tablePagination"]').find('.ipsPagination_prev:not(.ipsPagination_inactive) a').first().attr('href'));$('[data-role="tablePagination"]').find('.ipsPagination_prev:not(.ipsPagination_inactive) a').first().click();}},launchLightbox:function(e){e.preventDefault();var url=$(e.currentTarget).attr('href');var title=$(e.currentTarget).attr('title');this._launch(url,title);},_launch:function(url,title){if(url.indexOf('?')==-1){var logUrl=ips.utils.url.removeParams(['lightbox','browse'],url)+'?browse=1&lightbox=1';url=url+'?lightbox=1';}else{var logUrl=ips.utils.url.removeParams(['lightbox','browse'],url)+'&browse=1&lightbox=1';url=url+'&lightbox=1';}
if(!$('#cLightbox').length){var newWidget=ips.templates.render('gallery.lightbox.wrapper',{originalUrl:window.location.href,originaltitle:document.title});$('body').append(newWidget);$('#cLightbox').css({zIndex:ips.ui.zIndex()});$('.cLightboxClose').on('click',this.closeLightbox);}else if(!$('#cLightbox').is(':visible')){$('#cLightbox').show();}
if(ips.utils.responsive.currentIs('phone')){$(window).scrollTop(0);}
History.pushState({controller:'gallery.front.browse.imageLightbox',initialLaunch:true,lightbox:true,realUrl:logUrl},title,ips.utils.url.removeParams(['lightbox','browse'],url));ips.getAjax()(url,{type:'get',showLoading:true}).done(function(response){$('#cLightbox > .cLightboxBack').html(response);$(document).trigger('contentChange',[$('#cLightbox')]);}).fail(function(){window.location=url;});$('body').addClass('ipsNoScroll');},keyDown:function(e){if($(e.target).closest('input, textarea, .ipsComposeArea, .ipsComposeArea_editor').length){return;}
switch(e.keyCode){case ips.ui.key.ESCAPE:this.closeLightbox();break;}},closeLightbox:function(e){$('#cLightbox').fadeOut(400,function(){$('#cLightbox > .cLightboxBack').html('');});$('body').removeClass('ipsNoScroll');History.pushState({controller:'gallery.front.browse.imageLightbox',bypassStateAdjustment:true},$('#cLightbox').attr('data-originalTitle'),$('#cLightbox').attr('data-originalUrl'));}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('gallery.front.browse.list',{initialize:function(){this.on('change','[data-role="moderation"]',this.selectImage);this.on('tableRowsUpdated',this.rowsUpdated);},rowsUpdated:function(){var patchwork=ips.ui.photoLayout.getObj(this.scope);if(patchwork){patchwork.refresh();}},selectImage:function(e){var row=$(e.currentTarget).closest('.cGalleryImageItem');row.toggleClass('cGalleryImageItem_selected',$(e.currentTarget).is(':checked'));}});}(jQuery,_));;