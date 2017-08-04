var client_id = "c6i04bjucdhwk66mzqa1exmh8kifdl";
var apiUrl = "https://api.twitch.tv/kraken/streams/?client_id="+ client_id + "&game=OverWatch&limit=20";
var apiUrlWithRequestHeader = "https://api.twitch.tv/kraken/streams/?game=OverWatch&limit=2";

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
function getData(cb) {

    /*
    $.ajax({
        url: apiUrl,
        success: function(response){

        },
        error: function(err){

        }
    });
    */
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

getData( (err, data) => {

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
            <img src = "${data.preview.medium}">
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



