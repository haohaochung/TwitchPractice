var I18N = {
    en : require('./language/lang-en.js'),
    'zh-tw' : require('./language/lang-zh.js') 
};

var $ = require('jquery');

var client_id = "c6i04bjucdhwk66mzqa1exmh8kifdl";
var apiUrl = "https://api.twitch.tv/kraken/streams/?client_id="+ client_id + "&game=OverWatch&limit=10";
let offset = 0;
let isLoading = false;
let language = 'zh-tw';


function changeLang(lang) {

    $('div h1').text(I18N[lang].TITLE);
    language = lang;
    $('.row').empty();
    appendData(language);
}

//有名FUNCTION
function getData(language, cb) {
    isLoading = true;
    var apiUrl = "https://api.twitch.tv/kraken/streams/?client_id="+ client_id + "&game=OverWatch&limit=10&offset=" + offset + "&language="+ language;
    $.ajax({
        url: apiUrl,
        success: (response) => {
            console.log(response);
            // Use callback function 
            cb(null, response);
        },
        error: (err) => {
            cb(err, null);
        }
    });
    
}
function appendData(language) {
    getData(language,  (err, data) => {

        if(err) {
            console.log(err);
        }
        else {
            const streams = data.streams;
            const $row = $('.row');

            for(let stream of streams) {
                $row.append(getColumn(stream));
            } 
        }

        offset+=10;
        isLoading = false;
    });
}

$(document).ready(function() {
    appendData(language);

    $(window).scroll(function() {

        if( $(window).scrollTop() + $(window).height() >= $(document).height()-200 ) {
            if(!isLoading) {
                
                appendData(language);
            }
        }
    });

    $('.change_en').click( function() {
        changeLang('en');
    })

    $('.change_tw').click( function() {
        changeLang('zh-tw');
    })
});

function getColumn(data) {

    return `
    <div class = "col">
        <div class = "preview">
            <div class = "placeholder"></div>
            <img src = "${data.preview.medium}" onload="this.style.opacity=1">
        </div>
        <div class="bottom">
            <div class = "avatar">
                <img src = "${data.channel.logo}">
            </div>
            <div class = "intro">
                <div class ="channel_name">${data.channel.status}</div>
                <div class ="owner_name">${data.channel.display_name}</div>
            </div>
        </div>
    </div>
    `;
}



