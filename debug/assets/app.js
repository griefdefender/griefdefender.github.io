// try to load the page from the url parameters when the page loads
function loadContent() {
    let params = document.location.search;
    if (params) {
        console.log("Found location parameters to load from");

        if (params.startsWith("?")) {
            params = params.substring(1);
        }

        $("#content").html("<h1>Loading...</h1>");

        console.log("Got params: " + params);

        // get data
        const url = "https://bytebin.lucko.me/" + params;
        console.log("Loading from URL: " + url);

        $.ajax({
            url: url,
            success: loadData,
            dataType: "text"
        }).fail(showLoadingError);
    }
}

function showLoadingError() {
    $("#content").html("<h1>An error occurred whilst loading.</h1>");
}

function loadData(markdownContent) {
    const converter = new showdown.Converter();
    converter.setFlavor("github");
    const content = converter.makeHtml(markdownContent);
    $("#content").html(content);

    // apply bootstrap style to all tables
    $("table").addClass("table");

}

// Do things when page has loaded
$(loadContent);
