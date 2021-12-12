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
    numberOfDockerPull();

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

        const download_format = numeral(count).format('0.0a');
        $('#downloads_number').text(download_format);
    });
}

function numberOfStars() {
    $.get("https://api.github.com/repos/schemaspy/schemaspy", function(data) 
    {
        const stargazers_count = data['stargazers_count'];
        const stargazers_count_format = numeral(stargazers_count).format('0.0a');
        $('#stars_number').text(stargazers_count_format);
    });
}

async function numberOfDockerPull() {
    $.get("https://schemaspy-docker-pull-count.herokuapp.com/pull-count", function(data)
    {
        const docker_pull_count = data;
        const docker_pull_count_format = numeral(docker_pull_count).format('0.0a');
        $('#docker_pull_number').text(docker_pull_count_format);
    });
}
