if (typeof stylesheet == 'undefined') {
    eval( require('fs').readFileSync(process.argv[2], 'utf-8') );
}
if (typeof data == 'undefined') {
    eval( require('fs').readFileSync(process.argv[3], 'utf-8') );
}

var isBrowser = (typeof document != 'undefined');

if (isBrowser && typeof console == 'object' && typeof console.time == 'function') {
    console.time('a');
}
var r = stylesheet(data);
if (isBrowser && typeof console == 'object' && typeof console.timeEnd == 'function') {
    console.timeEnd('a');
}

if (isBrowser) { // В браузере вставляем результат в DOM.
    setTimeout(function() { // FIXME: Ну это типа domReady.
        var div = document.createElement('div');
        div.innerHTML = r;
        var page = div.getElementsByClassName('b-page')[0];
        document.body.appendChild(page);
    }, 200);
} else { // В node просто выводим.
    console.log(r);
}
