(function main(p) {
    var flky = null;
    var opts = {};
    opts.accessibility = true;
    opts.autoPlay = false;
    opts.cellAlign = 'center';
    opts.contain = true;
    opts.draggable = true;
    opts.freeScroll = false;
    opts.friction = 0.2;
    opts.initialIndex = 1;
    opts.lazyLoad = true;
    opts.percentPosition = true;
    opts.prevNextButtons = true;
    opts.pageDots = true;
    opts.resize = true;
    opts.setGallerySize = false;
    opts.watchCSS = false;
    opts.wrapAround = false;

    // Dark purple:  rgb(51,18,39)  #331227;
    // green:        rgb(124,151,144)  #7c9790;
    // peach:        rgb(204,161,145)  #cca191;
    // yellow:       rgb(232,215,208)  #e8d7d0
    // light pink:   rgb(247,223,199)  #f7dfc7;
    // other pink:                      #FCE4EC;

    // dark green:    rgb(79,105,80) #4f6950;
    // olive:         rgb(213,213,205)  #d5d5cd;

    var colors = [{
        "background": "rgb(51,18,39)",
        "color": "white"
    }, {
        "background": "rgb(124,151,144)",
        "color": "white"
    }, {
        "background": "rgb(232,215,208)",
        "color": "white"
    }, {
        "background": "#FCE4EC",
        "color": "#fff"
    }, {
        "background": "rgb(79,105,80)",
        "color": "white"
    }]



    var main = $(".main-carousel"),
        cell = $(".carousel-cell"),
        wrapper = $(".mid-wrapper"),
        personInfo = $(".person-info");

    $(window).on("load", handleLoad);
    $(window).on("resize", handelResize);

    function buildSlider(data) {
        var colorCounter = 0;
        var html = [];
        html.push('<div class="carousel-cell filler"></div>');
        for (var i = 0, len = data.length; i < len; i++) {
            html.push('<div class="carousel-cell" style="background:' + colors[colorCounter].background + ';color:' + colors[colorCounter].color + ';">');
            html.push('<div class="imageWrapper">');
            html.push('<img src="images/' + data[i].image + '" alt="' + data[i].name + '" />');
            html.push('</div>');
            html.push('<div class="mid-wrapper">');
            html.push('<h2 class="person-name">');
            html.push(data[i].name);
            html.push('</h2>');
            html.push('<div class="person-position">');
            html.push(data[i].title + " / " + data[i].relation);
            html.push('</div>');
            html.push('</div>');
            html.push('<div class="person-info">');
            html.push(data[i].body);
            html.push('</div>');
            html.push('</div>');
            colorCounter++;
            colorCounter = colorCounter >= colors.length? 0: colorCounter;
        }
        html.push('<div class="carousel-cell filler"></div>');
        return html.join("");
    }

    function handleLoad() {
        main.append(buildSlider(p))
        applyFlickity();
        setInfoMaxSize();
    }

    function handelResize() {
        setInfoMaxSize();

    }

    function setInfoMaxSize() {
        var h = cell.height();
        var wh = wrapper.height();
        personInfo.css({
            "max-height": ((h - wh) - 60) + "px"
        });
    }

    function applyFlickity() {
        flky = new Flickity('.main-carousel', opts);
    }
})(party);