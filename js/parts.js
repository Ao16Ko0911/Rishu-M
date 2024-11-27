function loadHTML(elementId, file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById(elementId).innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

window.onload = function() {
    loadHTML('header', "header.html");
    loadHTML('footer', "footer.html");
};
