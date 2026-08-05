//function removeSlashUrl(url = "") {
function removeSlashUrl(url) {
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

/*
    Playwright เราสามารถเลือกใช้ระบบ import/export หรือ 
    require/module.exports ก็ได้ ขึ้นอยู่กับการตั้งค่า "type": "module" 
    ในไฟล์ package.json ของโปรเจกต์ 
*/