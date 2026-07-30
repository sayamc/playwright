function removeSlashUrl(url = "") {
    let newUrl = url;

    if (url[url.length - 1 ] === '/') {          // check lastUrl string === '/'
        newUrl = url.substring(0, url.length - 1)    // remove lastUrl
        //console.log("new url = ", newUrl)
    }

    return newUrl;
}

module.exports = {      // define export this function to other calls.
    removeSlashUrl,
}