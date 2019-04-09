$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'bottom',
        html: true
    });
})


// Hide and Display content when pressing the navigation links
$(function(){
    $('ul.navbar-nav a').on('click', function () {
        $navlinkclass = $(this).attr('class');
        $content = $navlinkclass.split(" ")[1]; // This is a poor way to get the class name, but it works for now
        $('.content-'+$content).siblings().addClass('hidden');
        $('.content-'+$content).removeClass('hidden');
    });
});
