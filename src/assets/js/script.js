// Auto update layout
(function() {
    window.layoutHelpers.setAutoUpdate(true);
    window.attachMaterialRippleOnLoad();
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('inserted.bs.tooltip', function() {
        $('.tooltip').addClass('tooltip-' + $(this).attr('data-state'));
    })
    $('[data-toggle="popover"]').on('inserted.bs.popover', function() {
        $('.popover').addClass('popover-' + $(this).attr('data-state'));
    })

    // active menu item list start
    $("#layout-sidenav .sidenav-inner a").each(function() {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href == pageUrl && $(this).attr('href') != "") {
            console.log(pageUrl);
            $(this).parent('li').addClass("active");
            $(this).parent('li').parent().parent('.sidenav-item').addClass("active");
            $(this).parent('li').parent().parent('.sidenav-item').addClass("open");
            $(this).parent('li').parent().parent().parent().parent('.sidenav-item').addClass("active");
            $(this).parent('li').parent().parent().parent().parent('.sidenav-item').addClass("open");
            $(this).parent('li').parent().parent().parent().parent().parent().parent('.sidenav-item').addClass("active");
            $(this).parent('li').parent().parent().parent().parent().parent().parent('.sidenav-item').addClass("open");
        }
    });
})();

// Collapse menu
(function() {
    if ($('#layout-sidenav').hasClass('sidenav-horizontal') || window.layoutHelpers.isSmallScreen()) {
        return;
    }

    try {
        window.layoutHelpers.setCollapsed(
            localStorage.getItem('layoutCollapsed') === 'true',
            false
        );
    } catch (e) {}
})();

$(function() {
    // Initialize sidenav
    $('#layout-sidenav').each(function() {
        new SideNav(this, {
            orientation: $(this).hasClass('sidenav-horizontal') ? 'horizontal' : 'vertical'
        });
    });

    // Initialize sidenav togglers
    $('body').on('click', '.layout-sidenav-toggle', function(e) {
        e.preventDefault();
        window.layoutHelpers.toggleCollapsed();
        if (!window.layoutHelpers.isSmallScreen()) {
            try {
                localStorage.setItem('layoutCollapsed', String(window.layoutHelpers.isCollapsed()));
            } catch (e) {}
        }
    });
});

$(function() {
    // ***********************************************************
    // Menu Customizer Start

    // open Menu Styler
    $('#ui-builder > .style-toggler').on('click', function() {
        $('#ui-builder').toggleClass('open');
    });
    
    $('.layout-reset').on('click', function() {
        location.reload();
    });

    // nav-fixed Fixed
    $('#nav-fixed').change(function() {
        if ($(this).is(":checked")) {
            $('html').addClass('layout-fixed');
        } else {
            $('html').removeClass('layout-fixed');
        }
    });

    // header Fixed
    $('#header-fixed').change(function() {
        if ($(this).is(":checked")) {
            $('html').addClass('layout-header-fixed');
        } else {
            $('html').removeClass('layout-header-fixed');
        }
    });

    // Dark Layout
    $('#dark-layout').change(function() {
        if ($(this).is(":checked")) {
            $('head .style-link').attr("href","assets/css/style-dark.css");
            $('#layout-navbar').removeClassPrefix('bg-');
            $('#layout-navbar').addClass("bg-dark");
            $('.layout-footer').removeClassPrefix('bg-');
            $('.layout-footer').addClass("bg-dark");
        } else {
            $('head .style-link').attr("href","assets/css/style.css");
            $('#layout-navbar').removeClassPrefix('bg-');
            $('#layout-navbar').addClass("bg-white");
            $('.layout-footer').removeClassPrefix('bg-');
            $('.layout-footer').addClass("bg-white");
        }
    });

    // Header Color
    $('.header-color > a').on('click', function() {
        var temp = $(this).attr('data-val');
        $('#layout-navbar').removeClassPrefix('bg-');
        $('#layout-navbar').addClass(temp);
    });
    // sidenav Color
    $('.sidenav-color > a').on('click', function() {
        var temp = $(this).attr('data-val');
        if (temp == "bg-white") {
            $('#layout-sidenav').addClass('sidenav-light');
            $('#layout-sidenav').removeClass('sidenav-dark');
        } else {
            $('#layout-sidenav').removeClass('sidenav-light');
            $('#layout-sidenav').addClass('sidenav-dark');
        }
        $('#layout-sidenav').removeClassPrefix('bg-');
        $('#layout-sidenav').addClass(temp);
        $('.sidenav').removeClassPrefix('bg-');
        $('.sidenav').addClass(temp);
    });
    // Footer Color
    $('.footer-color > a').on('click', function() {
        var temp = $(this).attr('data-val');
        $('.layout-footer').removeClassPrefix('bg-');
        $('.layout-footer').addClass(temp);
    });

    $.fn.removeClassPrefix = function(prefix) {
        this.each(function(i, it) {
            var classes = it.className.split(" ").map(function(item) {
                return item.indexOf(prefix) === 0 ? "" : item;
            });
            it.className = classes.join(" ");
        });
        return this;
    };
    // Menu Customizer End
    // ***************************************************
});
