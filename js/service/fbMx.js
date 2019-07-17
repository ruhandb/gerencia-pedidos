var fbMx = {
    data: function () {
        return {
            cliente: CLIENTE,
            db: null,
            auth: null
        }
    },
    created: function () {
        let fb = this.initFirebase("gerencia-pedidos", "AIzaSyAtwfzcmzo4NvoLl61SALRaRv5LNEzvMFs", "911417125547");
        this.auth = fb.auth();
        this.db = fb.database();
        console.log('fbMx Loaded.');
    },
    methods: {
        ref: function (path) {
            return this.db.ref(this.cliente + "/" + path);
        },
        initFirebase: function(projectId, apiKey, messagingSenderId){
            firebase.initializeApp({
                apiKey: apiKey,
                authDomain: projectId + ".firebaseapp.com",
                databaseURL: "https://" + projectId + ".firebaseio.com",
                projectId: projectId,
                storageBucket: projectId + ".appspot.com",
                messagingSenderId: messagingSenderId
            });
            return firebase;
        },
        onTimeDB: function(path, obj, beforeEvent, afterEvent){
            var r = this.ref(path);
            r.on('child_added', function (d) {
                var keyValue = { key: d.key, value: d.val()};
                if(beforeEvent) beforeEvent(keyValue, 'A');
                Vue.set(obj, keyValue.key, keyValue.value);
                if(afterEvent) afterEvent(keyValue, 'A');
            });
        
            r.on('child_changed', function (d) {
                var keyValue = { key: d.key, value: d.val()};
                if(beforeEvent) beforeEvent(keyValue, 'C');
                Vue.set(obj, keyValue.key, keyValue.value);
                if(afterEvent) afterEvent(keyValue, 'C');
            });
        
            r.on('child_removed', function (d) {
                var keyValue = { key: d.key, value: d.val()};
                if(beforeEvent) beforeEvent(keyValue, 'R');
                Vue.delete(obj, keyValue.key);
                if(afterEvent) afterEvent(keyValue, 'R');
            });
        },
        moveRecord: function(oldRef, newRef, beforeMove, afterMove) {
            oldRef.once('value', function (snap) {
                if (beforeMove) beforeMove(snap.val());
                newRef.update(snap.val(), function (error) {
                    if (!error) { oldRef.remove(); }
                    else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
                    if (afterMove) afterMove(snap.val());
                });
            });
        }
    }
}