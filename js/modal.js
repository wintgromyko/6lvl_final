
var modal = document.querySelector("#modal"),
    modalOverlay = document.querySelector("#modal-overlay"),
    closeButton = document.querySelector("#close-button");

closeButton.addEventListener("click", function() {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
});
