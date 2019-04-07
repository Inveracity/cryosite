$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'bottom',
        html: true
    });
})

$('#home').click(function () {
    var val = $(this).val();
    $('#home-content').slideToggle();
});

$('#shows').click(function () {
    var val = $(this).val();
    $('#shows-content').slideToggle();
});
