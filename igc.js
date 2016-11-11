// ==UserScript==
// @name         Imgur Gallery Scroll
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Lets you use the numpad to navigate imgur galleries. 5 moves down to next image, 8 moves up.
// @author       Jason Steck
// @match        *://imgur.com/*
// @grant        none
// ==/UserScript==

// setup the Imgur Gallery Controls
window.igc = window.imgurGalleryControls =
(function(){
    'use strict';
    var transitionMargin = 50;

    var pub = {};
    pub.speed = 250;
    var $body = $('body');

    var UP = -1;
    var DOWN = 1;
    var list = [];
    var headerHeight = $('.post-header').outerHeight();

    // if this script already ran, tell the previous one to shut down
    if(window.imgurGalleryControls){
        console.log("Stopping previous Imgur Gallery Controls");
        window.imgurGalleryControls.stop();
    }

    /* Disables everything that this code enabled */
    function stop(){
        $body.off('keypress', keyBindings);
    }

    function keyBindings(e){
        // Consider locations of images, descriptions, action bar, and top of comments
        // We have to reload the points of interest everytime since imgur dynamically displays things.
        list = loadPOI('.post-image-container, .post-image-meta, .post-action, .comments-info');
        switch(e.which){
            case 50: // 2 -> load more images
                tryLoadingMore();
                break;
            case 53: // 5 -> next image
                scroll(DOWN);
                break;
            case 56: // 8 -> previous image
                scroll(UP);
                break;
            case 54: // 6 -> next post
                $('.navNext').click();
                break;
            case 52: // 4 -> previous post
                $('.navPrev').click();
                break;
        }
    }
    $body.keypress(keyBindings);

    function loadPOI(selector){
        var pointsOfInterest = $(selector);
        return $.map(pointsOfInterest, positionOf);
    }

    function positionOf(selector){
        return $(selector).offset().top;
    }

    function tryLoadingMore(){
        var loadButton =  $('.post-loadall');
        // if there is more to load
        if(loadButton.length>0){
            loadButton[0].click();
        }
    }

    function scroll(direction){
        var res = getIndexes();
        // Note the indexes may not actually be valid. This is intended.
        if(direction==UP){
            scrollTo(list[res.up]);
        }
        else{
            scrollTo(list[res.down]);
        }
    }

    function getIndexes(){
        // target indexes if you want to go up or down
        var res = {up: 0, down: 0};

        // get current location
        var currentTop = $(window).scrollTop() + headerHeight;
        // find where we sit
        var index = 0;
        for(;index<list.length;index++){
            if(currentTop<=list[index])
            {
                // just above an image, just below, or in the middle?
                if(list[index]-currentTop < transitionMargin){
                    res.up = index-1;
                    res.down = index+1;
                }else if(currentTop-list[index-1] < transitionMargin){
                    res.up = index-2;
                    res.down = index;
                }else{
                    res.up = index-1;
                    res.down = index;
                }
                return res;
            }
        }
        // we're below the last point of interest
        res.up = index-1;
        res.down = index; // a bad index will have an undefined height, which gets ignored
        return res;
    }

    function scrollTo(height){
        if(!height)
            return;
        $('html, body').animate({
            scrollTop: height - headerHeight
        }, pub.speed);
    }

    // Make these functions available
    pub.stop = stop;
    pub.keyBindings = keyBindings;
    pub.loadPOI = loadPOI;
    pub.positionOf = positionOf;
    pub.tryLoadingMore = tryLoadingMore;
    pub.scroll = scroll;
    pub.getIndexes = getIndexes;
    pub.scrollTo = scrollTo;

    return pub;
})();
