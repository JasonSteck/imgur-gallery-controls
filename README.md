# Imgur Gallery Controls
Adds keyboard shortcuts for jumping between images on Imgur.

## Controls
4 - Previous post

6 - Next post

5 - Next image in post

8 - Previous image in post

2 - load more images (if there are more than 10 in the post)

## To Setup:
### Option 1 (best): Tampermonkey

Copy and Paste the [script](https://github.com/JasonSteck/imgur-gallery-controls/blob/master/igc.js) into Tampermonkey (or Greasemonkey)

### Option 2: Bookmarklet

Save the javascript below as a bookmark then click it whenever you want to use it on a page (must click it again for each new page)

javascript: window.igc=window.imgurGalleryControls=function(){"use strict";function h(){c.off("keypress",i)}function i(a){switch(f=j(".post-image-container, .post-image-meta, .post-action, .comments-info"),a.which){case 50:l();break;case 53:m(e);break;case 56:m(d);break;case 54:$(".navNext").click();break;case 52:$(".navPrev").click()}}function j(a){var b=$(a);return $.map(b,k)}function k(a){return $(a).offset().top}function l(){var a=$(".post-loadall");a.length>0&&a[0].click()}function m(a){var b=n();o(a==d?f[b.up]:f[b.down])}function n(){for(var b={up:0,down:0},c=$(window).scrollTop()+g,d=0;d<f.length;d++)if(c<=f[d])return f[d]-c<a?(b.up=d-1,b.down=d+1):c-f[d-1]<a?(b.up=d-2,b.down=d):(b.up=d-1,b.down=d),b;return b.up=d-1,b.down=d,b}function o(a){a&&$("html, body").animate({scrollTop:a-g},b.speed)}var a=50,b={};b.speed=250;var c=$("body"),d=-1,e=1,f=[],g=$(".post-header").outerHeight();return window.imgurGalleryControls&&(console.log("Stopping previous Imgur Gallery Controls"),window.imgurGalleryControls.stop()),c.keypress(i),b.stop=h,b.keyBindings=i,b.loadPOI=j,b.positionOf=k,b.tryLoadingMore=l,b.scroll=m,b.getIndexes=n,b.scrollTo=o,b}();

## Current bugs
(Minaly due to the way Imgur dynamically shows images after you load more than 10 images)

1. Image alignment is sometimes slightly off

2. Extremely long images causes the script to assume it's the last image.
