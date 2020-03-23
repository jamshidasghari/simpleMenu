/**
 * Created by Jamshid on 11/11/2016.
 */

(function($){
    $.fn.simpleMenu = function(options){
        /* develop */
        /*
            menuTheme: {
                theme: 'customTheme',
                menuContainerColor: '',
                liColor: '',
                ...
            }

        */
        var setting = {
            data: [],
            menuSign: {
                sign: 'custom',
                itemSignClass : {
                    mainMenuSign: 'fa fa-caret-down',
                    ltrSubMenuSign: '',
                    rtlSubMenuSign: ''
                }
            },
            showingMethod : 'none',
            theme : 'light',
            menuType: 'click',
            direction: 'rtl',
            separator: 'yes'
        };
        var defaults = $.extend(setting, options);
        var result = '';
        if ($(this).length){
            var sign, mainMenuSign, rtlSign, ltrSign;
            // get classes and add to navigation element according to parameters
            var navClasses = 'simple-menu ';
            navClasses += defaults.menuSign.sign + ' ' + defaults.theme + ' '
                + defaults.direction + ' ' + (defaults.separator == 'yes' ? 'separator' : '');
            // add navigation class
            $(this).addClass(navClasses);
            // create menu toggle button elements and append to navigation
            var menuToggle = "<div class='menu-toggle' onclick='toggleMenu(this)'><div class='bar1'></div><div class='bar2'></div><div class='bar3'></div></div>";
            $(this).append(menuToggle);
            //create menu container (ul) element and append to navigation
            var menuContainer = "<ul id='menu_container' class='menu-container '></ul>";
            $(this).append(menuContainer);
            // get classes and add to menu container
            var ulClasses;
            ulClasses = defaults.menuType + ' ' + defaults.showingMethod;
            // add menu container class
            $('#menu_container').addClass(ulClasses);
            // define selected sign for menu items
            if (defaults.menuSign.sign == 'arrow'){
                sign = "<span class='ar ar-down'>^</span><span class='ar ar-right'>^</span><span class='ar ar-left'>^</span>";
            } else if (defaults.menuSign.sign == 'border'){
                sign = '';
            } else if (defaults.menuSign.sign == 'custom'){
                mainMenuSign = "<span class='cs cs-main-sign " + defaults.menuSign.itemSignClass.mainMenuSign + "'></span>";
                rtlSign = "<span class='cs cs-rtl-submenu-sign " + defaults.menuSign.itemSignClass.rtlSubMenuSign + "'></span>";
                ltrSign = "<span class='cs cs-ltr-submenu-sign " + defaults.menuSign.itemSignClass.ltrSubMenuSign + "'></span>";

            }
            //
            // Create Menu Items
            iterateData(defaults.data);
            $('#menu_container').append(result);
            // append sign to menu items
            if (defaults.menuSign.sign == 'arrow' || defaults.menuSign.sign == 'border'){
                $('#menu_container').find("li.parent > a.link").append(sign);
            } else if (defaults.menuSign.sign == 'custom'){
                var custom = mainMenuSign.concat(rtlSign, ltrSign);
                $('#menu_container').find("li.parent > a.link").append(custom);
                console.log(mainMenuSign.concat(rtlSign, ltrSign));
            }
        } else{
            return false;
        }

        function iterateData(data) {
            var anchorLink, menuTitle;
            $.each(data, function (index, value) {
                if (typeof value == 'object' && index != 'children') {
                    iterateData(value);
                    result += "</li>";
                } else if (typeof value == 'object' && index == 'children' && value[0]) {
                    result += "<li class='inactive parent'><a class='link' href='" + anchorLink + "'>" + menuTitle + " </a>";
                    result += "<div class='sub-menu'><ul class='menu-item'>";
                    iterateData(value);
                    result += "</ul></div>";
                } else if (typeof value != 'object') {
                    if (index == 'link') {
                        anchorLink = value;
                    }
                    if (index == 'title') {
                        menuTitle = value;
                    }
                } else if (typeof value == 'object' && index == 'children' && !value[0]) {
                    result += "<li class='inactive'><a class='link' href='" + anchorLink + "'>" + menuTitle + " </a>";
                }
            });
        }
    };

}(jQuery));

$(window).resize(function () {
        if ($(window).width() <= 640){
            /* menu dar size mobile hover nadarad, dar natije bayad .hover hazf shavad */
            $('#menu_container').addClass('click').removeClass('hover');
            /* dar ebteda menu container makhfi bashad */
            // do change color nested menu item elements (in mobile and tablet sizes)
            //$(".dark .sub-menu2").each(function(index, value){
            $(".dark ul.menu-container> li .sub-menu .sub-menu").each(function(index, value){
                if (index % 2 == 0){
                    //$(this).find('.menu-item2').css({"cssText" : "background-color : #888 !important"});
                    $(this).find('.menu-item').css({"cssText" : "background-color : #888 !important"});
                } else {
                    //$(this).find('.menu-item2').css({"cssText" : "background-color : #666 !important"});
                    $(this).find('.menu-item').css({"cssText" : "background-color : #666 !important"});
                }
            });

            //$(".light .sub-menu2").each(function(index, value){
            $(".light ul.menu-container > li .sub-menu .sub-menu").each(function(index, value){
                if (index % 2 == 0){
                    //$(this).find('.menu-item2').css({"cssText" : "background-color : #ccc !important"});
                    $(this).find('.menu-item').css({"cssText" : "background-color : #ccc !important"});
                } else {
                    //$(this).find('.menu-item2').css({"cssText" : "background-color : #aaa !important"});
                    $(this).find('.menu-item').css({"cssText" : "background-color : #aaa !important"});
                }
            });
        }else{
            /* menu dar size desktop hover darad, dar natije bayad .hover ezafe shavad */
            // $('#menu_container').addClass('hover').removeClass('click');
            /* dar halati ke dar size desktop bashim, menu container namayesh dade shavad */
            $('#menu_container').show();
            /* dar halati ke dar size desktop bashim, range menu item be #333 taghir konad */
            //$('.dark .menu-item2').css({"cssText" : "background-color : #333 !important"});
            $('.dark ul.menu-container .menu-item .menu-item').css({"cssText" : "background-color : #333 !important"});
            //$('.light .menu-item2').css({"cssText" : "background-color : #bbb !important"});
            $('.light ul.menu-container .menu-item .menu-item').css({"cssText" : "background-color : #bbb !important"});
        }
    });


    /* dokmeye menu toggle dar size mobile */
function toggleMenu(x) {
    x.classList.toggle("change");
    $('#menu_container').slideToggle();

    /* agar menu toggle click shod, menuhaye baz shode bayad baste shavad */
    //$('.parent-item, .parent').removeClass('active').addClass('inactive');
    $('.parent').removeClass('active').addClass('inactive');
}


        //return result;
    // End iterateData1 function

$(document).ready(function(){

    $(window).resize();

    //$('.hover .parent>a.link,.hover .parent-item>a.link, .click .parent>a.link, .click .parent-item>a.link').click(function(e){
    $('.hover .parent>a.link, .click .parent>a.link').click(function(e){
        // zamani ke dar size mobile hastim, menuha ba click kar mikonand, pas behtar bud dar ruydade click bala az hover estefade nashavad.
        // ama az anjaei ke dar resize safhe, class hover hazf mishavad va jaye khod ra be class click midahad, dar click menu be moshkel
        // bar mikhorim, chera ke code js ma ghabl az in menuye click shode ra bad az class click load karde ast, dar hali ke ma dar safhe
        // class click nadashtim va bad az load shodane js class click ezafe shode ast, dar natije code js ruydade click amal nakhahad kard.
        // jahate rafe moshkel, dar ruydade bala hover ra ham ezafe mikonim ta js element ra tashkhis dahad, ama bayad size safhe control
        // shavad ta dar halate hover agar click shod, dasturate ruydade click ejra nashavad.
        if ($(window).width() > 640) {
            if (!$(this).parents().hasClass('hover')){
                if ($(this).parents('li').length == 1){
                    e.preventDefault();
                }
            }
            /* bad az click ruye menu, pedar menu (parent ya parent-item) active ya inactive shavad */
            //$(this).parent('.parent, .parent-item').toggleClass('active inactive');
            $(this).parent('.parent').toggleClass('active inactive');
            // dar halate click, zamani ke ruye menuye asli click shod, zir menuhaye az ghabl baz shode, baste shavand.
            //var parent = $(this).parent('.parent-item');
            var parent = $(this).parent('ul.menu-container>li.parent');
            if (parent.hasClass('active')){
                //$('.parent-item').removeClass('active').addClass('inactive');
                $('ul.menu-container>li.parent').removeClass('active').addClass('inactive');
                parent.addClass('active');
            }
        } else {
            if ($(this).parent('li').hasClass('parent')){
                e.preventDefault();
            }
            /* bad az click ruye menu, pedar menu (parent ya parent-item) active ya inactive shavad */
            //$(this).parent('.parent, .parent-item').toggleClass('active inactive');
            $(this).parent('.parent').toggleClass('active inactive');
            /* agar layeye balaei menu click shod, menuye dakheli ham baste shavad */
            //if ($(this).parent('.parent, .parent-item').hasClass('inactive')){
            if ($(this).parent('.parent').hasClass('inactive')){
                $(this).nextAll().find('.parent').addClass('inactive').removeClass('active');
            }
        }
    });

    // agar ba ruye ul#menu_container click shod, menuhaye baz baste shavand.
    $('ul#menu_container').click(function(e){
        if ($(window).width() > 640){
            if(e.target.id == 'menu_container')
                //$('.parent-item').removeClass('active').addClass('inactive');
                $('ul.menu-container>li.parent').removeClass('active').addClass('inactive');
        }
    })
});



if ($(window).width() > 640) {
    if (!$(this).parents().hasClass('hover')){
// zamani ke dar size mobile hastim, menuha ba click kar mikonand, pas behtar bud dar ruydade click bala az hover estefade nashavad.
// ama az anjaei ke dar resize safhe, class hover hazf mishavad va jaye khod ra be class click midahad, dar click menu be moshkel
// bar mikhorim, chera ke code js ma ghabl az in menuye click shode ra bad az class click load karde ast, dar hali ke ma dar safhe
// class click nadashtim va bad az load shodane js class click ezafe shode ast, dar natije code js ruydade click amal nakhahad kard.
// jahate rafe moshkel, dar ruydade bala hover ra ham ezafe mikonim ta js element ra tashkhis dahad, ama bayad size safhe control
// shavad ta dar halate hover agar click shod, dasturate ruydade click ejra nashavad.

// agar menuye sathe aval click shod, link amal nakonad, vali dar sotuhe paein tar link amal konad.
        if ($(this).parents('li').length == 1){
            e.preventDefault();
        }
        /* bad az click ruye menu, pedar menu (parent ya parent-item) active ya inactive shavad */
//$(this).parent('.parent, .parent-item').toggleClass('active inactive');
        $(this).parent('.parent').toggleClass('active inactive');
        if ($(window).width() < 640){
            /* agar layeye balaei menu click shod, menuye dakheli ham baste shavad */
//if ($(this).parent('.parent, .parent-item').hasClass('inactive')){
            if ($(this).parent('.parent').hasClass('inactive')){
                $(this).nextAll().find('.parent').addClass('inactive').removeClass('active');
            }
        } else {
// dar halate click, zamani ke ruye menuye asli click shod, zir menuhaye az ghabl baz shode, baste shavand.
//var parent = $(this).parent('.parent-item');
            var parent = $(this).parent('ul.menu-container>li.parent');
            if (parent.hasClass('active')){
//$('.parent-item').removeClass('active').addClass('inactive');
                $('ul.menu-container>li.parent').removeClass('active').addClass('inactive');
                parent.addClass('active');
            }
        }
    }
} else if ($(window).width() < 640){
    if ($(this).parents('li').length == 1){
        e.preventDefault();
    }
}