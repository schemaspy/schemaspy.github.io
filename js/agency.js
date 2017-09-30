// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    downloadCount();
    numberOfStars();

})(jQuery); // End of use strict

function downloadCount() {
    $.get("https://api.github.com/repos/schemaspy/schemaspy/releases", function(releases) 
    {
        var count = 0;
        for (var prop in releases) {
            var data = releases[prop];
            assets = data['assets'];
            if (assets != undefined) {
                asset = assets[0];
                if (asset != undefined) {
                    count += asset['download_count'];
                }
            }
        }

        $('#downloads_number').text(count);
    });
}

function numberOfStars() {
    $.get("https://api.github.com/repos/schemaspy/schemaspy", function(data) 
    {
        stargazers_count = data['stargazers_count'];
        $('#stars_number').text(stargazers_count);
    });
}
