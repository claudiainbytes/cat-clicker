var $cat = $('#cat');
var $catBox = $('#cat-box');
var $numClicks = $('#numClicks');
var $preloader = $('.preload');
var $catAlert = $('.cat-alert');
var catApiUrl = 'https://thecatapi.com/api/images/get?apikey=MjU5NDgz&format=xml&type=gif';

var getClicks = function(c) {
    c++;
    $numClicks.val(c);
    $numClicks.html(c);
};

var getCatAlert = function(message) {
    $catAlert.text(message);
    $catAlert.show();
};

var changeImage = function() {
    var newCatUrl = "";

    var catApiFail = setTimeout(function(){
        getCatAlert("Failed to load image");
    }, 8000);

    $preloader.fadeIn(1000);
    $catBox.fadeOut(1000);

    $.ajax({
            type: "GET",
            url: catApiUrl,
            cache: false,
            dataType: "xml",
            success: function(xml) {
                newCatUrl = $(xml).find('url').text();
                $cat.attr('src', newCatUrl);
                clearTimeout(catApiFail);
                $cat.error(function(){
                    $(this).attr('src', 'img/missing.jpg');
                });
                $cat.ready(function() {
                    clearTimeout(catApiFail);
                    $preloader.fadeOut(1000);
                    $catBox.fadeIn(1000);
                });
            },
            error: function() {
                $cat.error(function(){
                    $(this).attr('src', 'img/missing.jpg');
                });
            }
        });

};

$preloader.fadeIn(1000);
$catBox.fadeOut(1000);

$(window).on('load',function() {
    $preloader.fadeOut(1000);
    $catBox.fadeIn(1000);
});

$cat.click(function() {
    getClicks($numClicks.val());
    changeImage();
});