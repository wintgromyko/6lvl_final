var form = document.getElementById('searchForm');

var pagination;
var items = [];

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var country = document.getElementById('countries').value;
    var type = document.querySelector('input[name="type"]:checked').value;

    var city = document.getElementById('city').value;
    var roomMax = document.getElementById('roomMax').value;
    var roomMin = document.getElementById('roomMin').value;
    var bathroomMin = document.getElementById('bathroomMin').value;
    var bathroomMax = document.getElementById('bathroomMax').value;
    var priceMin = document.getElementById('priceMin').value;
    var priceMax = document.getElementById('priceMax').value;

    var uri = 'https://api.nestoria.' + country + '/api';
    var params = {
        encoding: 'json',
        pretty: 1,
        action: 'search_listings',
        listing_type: type,
        place_name: city,
    };

    if(priceMin) {
        params.price_min = priceMin
    }

    if(priceMax) {
        params.price_max = priceMax
    }

    if(roomMin) {
        params.bedroom_min = roomMin
    }

    if(roomMax) {
        params.bedroom_max = roomMax
    }

    if(bathroomMin) {
        params.bathroom_min = bathroomMin
    }

    if(bathroomMax) {
        params.bathroom_max = bathroomMax
    }


    request(uri, params, function(response) {
        items = response.response.listings;
        renderItems(items.slice(0, 5));

        pagination = new paginator(response.response.listings.length, 5);

        var paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';

        var buttonPrev = document.createElement('button');
        buttonPrev.className = "btn btn-primary";
        buttonPrev.innerText = '<<';
        buttonPrev.addEventListener('click', function() {
            pagination.prevPage();
            var startIndex = (pagination.getCurrentPage() - 1) * pagination.getPerPage();
            renderItems(items.slice(startIndex, startIndex + pagination.getPerPage()))
        })

        var buttonNext = document.createElement('button');
        buttonNext.className = "btn btn-primary";
        buttonNext.innerText = '>>';
        buttonNext.addEventListener('click', function() {
            pagination.nextPage();
            var startIndex = (pagination.getCurrentPage() - 1) * pagination.getPerPage();
            renderItems(items.slice(startIndex, startIndex + pagination.getPerPage()))
        })
        paginationDiv.append(buttonPrev);

        for (var i = 1; i <= pagination.getCountPages(); i++) {
            var buttonNumber = document.createElement('button');
            buttonNumber.className = "btn btn-light";
            buttonNumber.innerText = '' + i;
            buttonNumber.addEventListener('click', (function(page) {return function() {
                pagination.setCurrentPage(page);
                var startIndex = (pagination.getCurrentPage() - 1) * pagination.getPerPage();
                renderItems(items.slice(startIndex, startIndex + pagination.getPerPage()))
            }})(i))

            paginationDiv.append(buttonNumber);
        }

        paginationDiv.append(buttonNext);
    })

});

function renderItems(items) {
    var content = document.getElementById('content');
    content.innerHTML = '';
    items.forEach(function (item, index) {
        var onclick = function(item) {
            return function() {renderModal(item)}
        }

        var tr = document.createElement('tr');

        var inc = document.createElement('td');
        inc.innerHTML = index + 1;

        var name = document.createElement('td');
        name.innerHTML = item.lister_name;

        var bathroom = document.createElement('td');
        bathroom.innerHTML = item.bathroom_number;

        var bedroom = document.createElement('td');
        bedroom.innerHTML = item.bedroom_number;

        var price = document.createElement('td');
        price.innerHTML = item.price_formatted;

        var image = document.createElement('td');
        image.innerHTML = '<img src="' + item.thumb_url + '" alt="' + item.thumb_url + '">';

        var buttonMore = document.createElement('button');
        buttonMore.className = "btn btn-secondary";
        buttonMore.innerHTML = "Подробнее";
        buttonMore.addEventListener('click', onclick(item));

        var button =  document.createElement('td');
        button.append(buttonMore);

        tr.append(inc)
        tr.append(name)
        tr.append(bathroom)
        tr.append(bedroom)
        tr.append(price)
        tr.append(image)
        tr.append(button)
        content.append(tr)

    })

}

function renderModal(item) {
    console.log(item);
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
    var body = document.getElementById('modal-body');
    var center = item.latitude + ',' + item.longitude;

    body.innerHTML = '<p><b>Name:</b>' + item.lister_name + '</p>';
    body.innerHTML += '<p><b>Bathroom: </b>' + item.bathroom_number + '</p>';
    body.innerHTML += '<p><b>Bedroom: </b>' + item.bedroom_number + '</p>';
    body.innerHTML += '<p>TODO: нужен валидный api key для google maps</p>';
    // TODO: нужен валидный api key для google maps
    body.innerHTML += '<iframe' +
        '  width="600"' +
        '  height="450"' +
        '  frameborder="0" style="border:0"' +
        '  src="https://www.google.com/maps/embed/v1/place?q=1&key=YOUR_API_KEY&center=' + center + '"' +
        ' allowfullscreen>' +
        '</iframe>'
}
