var callbackJsonp;

function request(uri, params, callback) {
    callbackJsonp = callback;
    var element = document.createElement('script');
    var queryParams = Object.keys(params)
        .map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        })
        .join('&');
    element.src = uri + '?' + queryParams + '&callback=callbackJsonp';
    document.head.appendChild(element);
}