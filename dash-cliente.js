moment.locale("pt-br");
Vue.component('date-picker', VueBootstrapDatetimePicker);

var ABERTO = 'pedidos/aberto/';

var app = new Vue({
    el: '#conteudo',
    data: {
        pedidosDisponiveis: {}
    },
    methods: {           
        updateFromNow: function updateFromNow() {
            var self = this;

            for(key in this.pedidosAtendimento){
                Vue.set(this.pedidosAtendimento[key], "fromNow", self.fromNow(this.pedidosAtendimento[key].dhPedido));
            }

            for(key in this.pedidosDisponiveis){
                Vue.set(this.pedidosDisponiveis[key], "fromNow", self.fromNow(this.pedidosDisponiveis[key].dhDisponivel));
            }
            
            setTimeout(self.updateFromNow, 1000);
        },
        fromNow: function(date){
            return date ? moment(date, "YYYY-MM-DD HH:mm:ss").fromNow() : "";
        }
    },
    filters: {
        formatDate: function(date){
            return date ? moment(date, "YYYY-MM-DD HH:mm:ss").format("DD/MM HH:mm") : "";
        },
        formatTime: function(date){
            return date ? moment(date, "YYYY-MM-DD HH:mm:ss").format("HH:mm") : "";
        },
        formatDuration: function(ms){
            return moment.duration(ms, 'ms').humanize();
        }
    }
})

app.updateFromNow();

var pedidosDisponiveisRef = ref(ABERTO + 'disponiveis');
pedidosDisponiveisRef.on('child_added', function(data) {
    Vue.set(app.pedidosDisponiveis, data.key, data.val());
});

pedidosDisponiveisRef.on('child_changed', function(data) {
    Vue.set(app.pedidosDisponiveis, data.key, data.val());
});

pedidosDisponiveisRef.on('child_removed', function(data) {
    Vue.delete(app.pedidosDisponiveis, data.key);
});

AUTH.onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = "login.html";
    }
});