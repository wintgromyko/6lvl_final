var paginator = function(countItems, perPage) {
    this.perPage = perPage;
    this.countPages = Math.ceil(countItems / perPage);
    this.currentPage = 1;
}

paginator.prototype.prevPage = function() {
    if (this.currentPage > 1) {
        this.currentPage--;
    }
}

paginator.prototype.nextPage = function() {
    if (this.countPages > this.currentPage) {
        this.currentPage++;
    }
}

paginator.prototype.setCurrentPage = function(page) {
    this.currentPage = page;
}

paginator.prototype.getCurrentPage = function() {
    return this.currentPage;
}

paginator.prototype.getPerPage = function() {
    return this.perPage;
}

paginator.prototype.getCountPages = function() {
    return this.countPages;
}

