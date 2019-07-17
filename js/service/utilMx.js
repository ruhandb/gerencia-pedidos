var utilMx = {
    created: function () {
        console.log('utilMx Loaded.');
    },
    methods: {
        getAnchor: function (){
            var urlParts   = document.URL.split('#');
            return (urlParts.length > 1) ? urlParts[1] : null;
        },
        fullScreen: function(){
            var doc = window.document;
            var docEl = doc.documentElement;

            var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

            if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            }
            else {
                cancelFullScreen.call(doc);
            }
        }
    },
    filters: {
        formatDate: function (date) {
            return date ? moment(date, "YYYY-MM-DD HH:mm:ss").format("DD/MM HH:mm") : "";
        },
        formatTime: function (date) {
            return date ? moment(date, "YYYY-MM-DD HH:mm:ss").format("HH:mm") : "";
        },
        miliToMin: function (ms) {
            return Math.round(moment.duration(ms, 'ms').asMinutes()) + " min";
        },
        formatDuration: function (ms) {
            return moment.duration(ms, 'ms').humanize();
        },
        upper: function (str) {
            return str ? str.toUpperCase() : "";
        },
        moeda: function (val) {
            return val ? val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "";
        }
    }
}