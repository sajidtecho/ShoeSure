function showPopup() {
    document.getElementById("offerPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("offerPopup").style.display = "none";
}
function toggleLogin() {
    var popup = document.getElementById("loginPopup");
    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
    }
}
