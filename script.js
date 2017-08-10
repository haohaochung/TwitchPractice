var client_id = "c6i04bjucdhwk66mzqa1exmh8kifdl";
var apiUrl = "https://api.twitch.tv/kraken/streams/?client_id="+ client_id + "&game=OverWatch&limit=10";
var apiUrlWithRequestHeader = "https://api.twitch.tv/kraken/streams/?game=OverWatch&limit=2";
let offset = 0;
let isLoading = false;
let language = 'zh-tw';

// Use XMLHttpRequest
var xhr = new XMLHttpRequest();
xhr.open("GET", apiUrlWithRequestHeader, true);
xhr.setRequestHeader('client-id', client_id);
//xhr.send(); 

// request send 後 發生變化會呼叫下列
xhr.onreadystatechange = function() {
    if(this.readyState === 4 && this.State === 200) {
        var data =JSON.parse(this.reponseText);
        console.log(data);
    }
}

/* Use JQuery
$.ajax({
    url:  apiUrl,
    success: (response) => {
        console.log(response);
    }
})

*/
//有名FUNCTION
function getData(language, cb) {

    /*
    $.ajax({
        url: apiUrl,
        success: function(response){

        },
        error: function(err){

        }
    });
    */
    isLoading = true;
    var apiUrl = "https://api.twitch.tv/kraken/streams/?client_id="+ client_id + "&game=OverWatch&limit=10&offset=" + offset + "&language="+ language;
    $.ajax({
        url: apiUrl,
        success: (response) => {
            console.log(response);
            // Use callback function 
            cb(null, response);

            // const streams = response.streams;
            // const $row = $('.row');

            // for(let stream of streams) {
            //     $row.append(getColumn(stream));
            // }
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

function changeLang(lang) {

    $('div h1').text(window.I18N[lang].TITLE);
    language = lang;
    $('.row').empty();
    appendData(language);
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
});

/* CallBack Function 
    匿名FUNCTION
getApi( function(response) {

});

getApi( {response} => {

});

*/

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



