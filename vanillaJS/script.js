// Use vanilla.js instead of JQuery

var client_id = "c6i04bjucdhwk66mzqa1exmh8kifdl";
let offset = 0;
let isLoading = false;

//有名FUNCTION
function getData(cb) {

    isLoading = true;
    var apiUrl = "https://api.twitch.tv/kraken/streams/?client_id="+ client_id + "&limit=10&offset=" + offset;
    var request = new XMLHttpRequest();

    request.open("GET", apiUrl, true);

    request.onload = function() {
        if(request.status >= 200 && request.status < 400) {
            var data = request.responseText;
            cb(null, JSON.parse(data));
        }
    };
    request.send(); 
}

function appendData() {
    getData( (err, data) => {

        if(err) {
            console.log(err);
        }
        else {
            const streams = data.streams;
            const $row = document.querySelector('.row');

            for(let stream of streams) {
                const div = document.createElement('div');
                $row.appendChild(div);
                div.outerHTML = getColumn(stream);
            } 
        }

        offset+=10;
        isLoading = false;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    appendData();
    window.addEventListener('scroll', function() {
       
       if(window.innerHeight + window.scrollY >= getDocHeight()-50) {
            if(!isLoading) {
                appendData();
            }
       }
    });

});

function getDocHeight() {
    var body = document.body;
    var html = document.documentElement;

    var height  = Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight, 
        html.scrollHeight, html.offsetHeight, html.clientHeight);
    
    return height;
}

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