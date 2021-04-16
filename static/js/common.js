// function getFileUrl(obj) {
//     let url;
//     url = window.URL.createObjectURL(obj.files.item(0));
//     return url;
// }
const functions = {}
functions.setUserToken = function(token) {
    sessionStorage.setItem('userToken', token)
}

functions.getUserToken = function() {
    return sessionStorage.getItem('userToken')
}

functions.isNull = function(obj) {
    return obj == null || obj == 'undefined' || obj.length == 0
}

export default functions