function initFirebase(e,a,o){return firebase.initializeApp({apiKey:a,authDomain:e+".firebaseapp.com",databaseURL:"https://"+e+".firebaseio.com",projectId:e,storageBucket:e+".appspot.com",messagingSenderId:o}),firebase}function ref(e){return DB.ref(CLIENTE+"/"+e)}function onTimeDB(e,a,o,n){var r=ref(e);r.on("child_added",function(e){var r={key:e.key,value:e.val()};o&&o(r),Vue.set(a,r.key,r.value),n&&n(r)}),r.on("child_changed",function(e){var r={key:e.key,value:e.val()};o&&o(r),Vue.set(a,r.key,r.value),n&&n(r)}),r.on("child_removed",function(e){var r={key:e.key,value:e.val()};o&&o(r),Vue.delete(a,r.key),n&&n(r)})}function moveRecord(e,a,o,n){e.once("value",function(r){o&&o(r.val()),a.update(r.val(),function(a){a?"undefined"!=typeof console&&console.error&&console.error(a):e.remove(),n&&n(r.val())})})}var fb=initFirebase("gerencia-pedidos","AIzaSyAtwfzcmzo4NvoLl61SALRaRv5LNEzvMFs","911417125547"),AUTH=fb.auth(),DB=fb.database(),CLIENTE="retro-sports-bar-dev";