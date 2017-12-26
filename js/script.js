var $cat = $('.cat');
var $catBox = $('.cat-box');
var $catName = $('.cat-name');
var $numClicks = $('.numClicks');
var $preloader = $('.preload');
var $catAlert = $('.cat-alert');
var catApiUrl = 'http://thecatapi.com/api/images/get?apikey=MjU5NDgz&format=xml&type=gif';

function Kitty(name, img, clicks, id) {
    this.name = name;
    this.img = img;
    this.clicks = clicks;
    this.id = id;
}

Kitty.prototype.showImage = function() {
    $(this.id).find($preloader).fadeOut(1000);
    $(this.id).find($catBox).fadeIn(1000);
};

Kitty.prototype.hideImage =function() {
    $(this.id).find($preloader).fadeIn(1000);
    $(this.id).find($catBox).fadeOut(1000);
};

Kitty.prototype.getName = function() {
    $(this.id).find($catName).text(this.name.toUpperCase());
};

Kitty.prototype.getClicks = function() {
    this.clicks++;
    $(this.id).find($numClicks).text(this.clicks);
};

Kitty.prototype.getCatAlert = function(message) {
    $(this.id).find($catAlert).text(message);
    $(this.id).find($catAlert).show();
};

Kitty.prototype.changeImage = function() {
    var newCatUrl = "";

    var self = this;

    var catApiFail = setTimeout(function(){
        self.getCatAlert("Failed to load image");
    }, 8000);

    this.hideImage();

    $.ajax({
            type: "GET",
            url: this.img,
            cache: false,
            dataType: "xml",
            success: function(xml) {
                newCatUrl = $(xml).find('url').text();
                $(self.id).find($cat).attr('src', newCatUrl);
                clearTimeout(catApiFail);
                $(self.id).find($cat).error(function(){
                    $(this).attr('src', 'img/missing.jpg');
                });
                $(self.id).find($cat).ready(function() {
                    clearTimeout(catApiFail);
                    self.showImage();
                });
            },
            error: function() {
                $(self.id).find($cat).error(function(){
                    $(this).attr('src', 'img/missing.jpg');
                });
            }
        });

};

var cat1 = new Kitty("Peaches", catApiUrl, 0, "#cat1");
var cat2 = new Kitty("Golden", catApiUrl, 0, "#cat2");

cat1.getName();
cat2.getName();

cat1.hideImage();
cat2.hideImage();

$(window).on('load',function() {
    cat1.showImage();
    cat2.showImage();
});

$(cat1.id).find($cat).click(function() {
    cat1.getClicks();
    cat1.changeImage();
});

$(cat2.id).find($cat).click(function() {
    cat2.getClicks();
    cat2.changeImage();
});

