$(document).ready(function() {
    // Initialize sidebar menu
    $('.nav-second-level').each(function() {
        $(this).hide();
    });

    // Handle menu clicks
    $('.metismenu > li > a').on('click', function(e) {
        if ($(this).attr('href') === '#') {
            e.preventDefault();
            
            // Close all other menus
            $('.nav-second-level').not($(this).siblings('.nav-second-level')).slideUp();
            $('.metismenu > li > a').not($(this)).parent('li').removeClass('mm-active');
            
            // Toggle current menu
            $(this).siblings('.nav-second-level').slideToggle();
            $(this).parent('li').toggleClass('mm-active');
        }
    });

    // Auto-open menu based on current path
    const currentPath = window.location.pathname;
    $('.nav-second-level a').each(function() {
        if ($(this).attr('href') === currentPath) {
            $(this).addClass('active');
            $(this).closest('.nav-second-level').show();
            $(this).closest('li.mm-active').addClass('mm-active');
        }
    });
});
