var COMANDA_ATENDENDO = "comandas/aberto/atendendo/";
var ABERTO = 'pedidos/aberto/';
var PEDIDOS = 'pedidos/';

var app = new Vue({
    el: '#conteudo',
    mixins: [fbMx, utilMx],
    data: {
        config:{
            comanda: 'S'
        },
        user: {},
        page: {
            showMenuMobile:false,
            selected: 'atendimento',
            menus: {
                atendimento: {
                    desc: 'Atendimento',
                    icon: 'fas fa-cash-register'
                },
                disponiveis: {
                    desc: 'Disponíveis',
                    icon: 'fas fa-concierge-bell'
                },
                fecharComanda: {
                    desc: 'Fechar Comanda',
                    icon: 'fas fa-dollar-sign'
                },
                resumo: {
                    desc: 'Resumo',
                    icon: 'fas fa-file-invoice-dollar',
                    admin: true
                },
                historico: {
                    desc: 'Histórico',
                    icon: 'fas fa-history',
                    admin: true
                },
                produtos: {
                    desc: 'Produtos',
                    icon: 'fas fa-hamburger',
                    admin: true
                },
                usuarios: {
                    desc: 'Usuários',
                    icon: 'fas fa-user-friends',
                    admin: true
                },
                config:{
                    desc: 'Configurações',
                    icon: 'fas fa-cog',
                    admin: true
                }
            }
        },
        filter: {
            dtIni: moment(new Date()).format("DD/MM/YYYY"),
            dtFim: moment(new Date()).format("DD/MM/YYYY"),
            dtPickerOptions: {
                format: 'DD/MM/YYYY',
                useCurrent: false,
                locale: 'pt-br'
            },
            descProduto: "",
            comanda:"",
            confirmNovoUsuario: false
        },
        message:{
            text: "",
            class: "alert-warning",
            show: false
        },
        novoPedido: {
            key: "",
            id: "",
            mesa: "",
            error: "",
            comanda: "",
            items: {}
        },
        itemPedido: {
            prod: {},
            qtd: 1
        },
        pedidosAtendimento: {},
        pedidosDisponiveis: {},
        pedidosFinalizados: {},
        comandasAbertas: {},
        comandasFinalizadas: {},
        comandasHistorico: {},
        editComandaKey:"",
        resumoFinalizados: {},
        lastFechamento: {},
        historico: {},
        resumoHistorico: {},
        produtos: {},
        produto: {
            error: "",
            desc: "",
            categoria: "",
            valor: null,
            disponivel: "S",
            preparo: "N"
        },
        novosUsuarios: {},
        acessoUsuarios: {},
        editUsuarioAcesso: {
            uid: "",
            email: "",
            admin: 'N',
            editName: false,
            name: ""
        }
    },
    mounted: function(){
        $('[data-toggle="tooltip"]').tooltip();
        moment.locale("pt-br");
        moment.updateLocale('pt-br', {
            relativeTime : {
                future: "em %s",
                past:   "%s",
                s  : 'poucos segundos',
                ss : '%d seg',
                m:  "1 min",
                mm: "%d min",
                h:  "1 hora",
                hh: "%d hrs",
                d:  "1 dia",
                dd: "%d dias",
                M:  "1 mês",
                MM: "%d meses",
                y:  "1 ano",
                yy: "%d anos"
            }
        });

        Vue.component('date-picker', VueBootstrapDatetimePicker);

        this.auth.onAuthStateChanged((user) => {
            this.user = user;
            if (!user) {
                //window.location.href = "login.html";
            }
        });

        Mousetrap.bind('alt+p', (e) => {
            this.clearPedido();
        });

        Mousetrap.bind('alt+l', (e) => {
            this.logout();
        });

        this.goToView(this.getAnchor());        
        this.updateFromNow();
        this.onTimeDB(ABERTO + 'atendendo', this.pedidosAtendimento);
        this.onTimeDB(ABERTO + 'disponiveis', this.pedidosDisponiveis);
        this.onTimeDB(ABERTO + 'finalizados', this.pedidosFinalizados, null, this.calcularResumo);
        this.onTimeDB(COMANDA_ATENDENDO, this.comandasAbertas);
        this.onTimeDB('comandas/aberto/finalizadas', this.comandasFinalizadas);
        this.onTimeDB('produtos', this.produtos);
        this.onTimeDB('usuarios/cadastro', this.novosUsuarios);
        this.onTimeDB('usuarios/acesso', this.acessoUsuarios);
        this.onTimeDB('config', this.config);

        this.ref(PEDIDOS + "historico").limitToLast(1).on('child_added', (data) => {
            this.lastFechamento = data.val();
        });        
    },
    methods: {
        donePedido: function (key) {
            let pedido = this.pedidosAtendimento[key];
            pedido.dhDisponivel = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            pedido.uidDisponivel = this.user.uid;
            delete (pedido.fromNow);
            let proximaEtapa = 'disponiveis/';
            
            if(!this.temEtapaDisponivel()){
                proximaEtapa = 'finalizados/';
                pedido.dhFinalizado = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                pedido.uidFinalizado = this.user.uid;
            }

            this.ref(ABERTO + proximaEtapa + key).set(pedido, (error) => {
                if (!error) { this.ref(ABERTO + 'atendendo/' + key).remove(); }
                else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
            });
           
        },
        notDonePedido: function (key) {
            let pedido = this.pedidosDisponiveis[key];
            pedido.dhDisponivel = null;
            delete (pedido.fromNow);

            this.ref(ABERTO + 'atendendo/' + key).set(pedido, (error) => {
                if (!error) { this.ref(ABERTO + 'disponiveis/' + key).remove(); }
                else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
            });
        },
        cancelPedido: function (pedidosFrom, from, key) {
            let pedido = pedidosFrom[key];
            pedido.dhCancelado = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            pedido.uidCancel = this.user.uid;
            delete (pedido.fromNow);

            this.ref(ABERTO + 'cancelados/' + key).set(pedido, (error) => {
                if (!error) {
                    this.ref(ABERTO + from + '/' + key).remove();
                    if(this.sim(this.config.comanda)){
                        this.ref(COMANDA_ATENDENDO + pedido.comanda + "/pedidos/" + key).remove();
                    }
                }
                else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
            });
        },
        finishedPedido: function (key) {
            let pedido = this.pedidosDisponiveis[key];
            pedido.dhFinalizado = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            pedido.uidFinalizado = this.user.uid;
            delete (pedido.fromNow);

            this.ref(ABERTO + 'finalizados/' + key).set(pedido, (error) => {
                if (!error) { this.ref(ABERTO + 'disponiveis/' + key).remove(); }
                else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
            });
        },
        fechamentoNoite: function () {
            this.ref(COMANDA_ATENDENDO).once('value', (snapshot) => {
                if(!snapshot.exists()){
                    var resumo = Object.assign({}, this.resumoFinalizados);
                    var date = moment(new Date());
                    var dhFechamento = date.format("YYYYMMDD-HHmmssSSS");
                    exportCSV(this.resumoFinalizados, dhFechamento);
                    this.moveRecord(this.ref(ABERTO), this.ref(PEDIDOS + "fechados/f" + dhFechamento), null,
                        (val) => {
                            resumo.dhFechamento = date.format("YYYY-MM-DD HH:mm:ss");
                            resumo.uid = this.user.uid;
                            this.ref(PEDIDOS + "historico/h" + dhFechamento).set(resumo);
                        }
                    );
                    this.moveRecord(this.ref("comandas/aberto/finalizadas"), this.ref("comandas/fechados"));
                }else{
                    this.alert("Finaliza as Comandas!");
                }
            });            
        },
        filtrarHistorico: function () {
            this.ref("comandas/fechados").orderByKey()
                .startAt("c" + moment(this.filter.dtIni, "DD/MM/YYYY").format("YYYYMMDD"))
                .endAt("c" + moment(this.filter.dtFim, "DD/MM/YYYY").format("YYYYMMDD") + "\uf8ff")
                .once('value', (snapshot) => {
                    if(snapshot.exists()){
                        Vue.set(this, "comandasHistorico", snapshot.val());
                    }
                });

            this.ref(PEDIDOS + "historico").orderByKey()
                .startAt("h" + moment(this.filter.dtIni, "DD/MM/YYYY").format("YYYYMMDD"))
                .endAt("h" + moment(this.filter.dtFim, "DD/MM/YYYY").format("YYYYMMDD") + "\uf8ff")
                .once('value', (snapshot) => {
                    if(snapshot.exists()){
                        Vue.set(this, "historico", snapshot.val());

                        this.resumoHistorico = {
                            qtdPedidos: 0,
                            total: 0,
                            mediaTempoAtendimento: 0,
                            produtos: {}
                        };

                        let totalTempoAtendimento = 0;
                        for (key in this.historico) {
                            for (pk in this.historico[key].produtos) {
                                let prod = this.historico[key].produtos[pk];
                                if (!this.resumoHistorico.produtos[prod.desc]) {
                                    this.resumoHistorico.produtos[prod.desc] = {
                                        desc: prod.desc,
                                        qtd: 0,
                                        valor: 0
                                    };
                                }
                                this.resumoHistorico.produtos[prod.desc].qtd += (prod.qtd * 1);
                                this.resumoHistorico.produtos[prod.desc].valor += (prod.valor) * 1;
                                this.resumoHistorico.total += (prod.valor);
                            }
                            this.resumoHistorico.qtdPedidos += this.historico[key].qtdPedidos;
                            totalTempoAtendimento += (this.historico[key].mediaTempoAtendimento * this.historico[key].qtdPedidos);
                        }
                        this.resumoHistorico.mediaTempoAtendimento = totalTempoAtendimento / this.resumoHistorico.qtdPedidos;
                    }
                });
        },
        reportResumoHistorico: function () {
            let fileName = moment(this.filter.dtIni, "DD/MM/YYYY").format("YYYYMMDD")
                + "-" + moment(this.filter.dtFim, "DD/MM/YYYY").format("YYYYMMDD");
            exportCSV(this.resumoHistorico, fileName);
        },
        calcularResumo: function() {
            this.resumoFinalizados = {
                qtdPedidos: 0,
                total: 0,
                mediaTempoAtendimento: 0,
                produtos: {}
            };
            let totalTempoAtendimento = 0;
            for (key in this.pedidosFinalizados) {
                totalTempoAtendimento += moment.duration(moment(this.pedidosFinalizados[key].dhDisponivel, "YYYY-MM-DD HH:mm:ss")
                    .diff(moment(this.pedidosFinalizados[key].dhPedido, "YYYY-MM-DD HH:mm:ss"))).asMilliseconds() * 1;
                for (pk in this.pedidosFinalizados[key].items) {
                    var ped = this.pedidosFinalizados[key].items[pk];
                    if (!this.resumoFinalizados.produtos[ped.desc]) {
                        this.resumoFinalizados.produtos[ped.desc] = {
                            desc: ped.desc,
                            qtd: 0,
                            valor: 0
                        };
                    }
                    this.resumoFinalizados.produtos[ped.desc].qtd += (ped.qtd * 1);
                    this.resumoFinalizados.produtos[ped.desc].valor += (ped.valor * ped.qtd);
                    this.resumoFinalizados.total += (ped.valor * ped.qtd);
                }
            }
        
            this.resumoFinalizados.qtdPedidos = Object.keys(this.pedidosFinalizados).length;
            this.resumoFinalizados.mediaTempoAtendimento = totalTempoAtendimento / this.resumoFinalizados.qtdPedidos;
        },
        reportResumo: function (key) {
            exportCSV(this.historico[key], key.substring(1));
        },
        loadComanda: function(){
            this.ref(COMANDA_ATENDENDO + this.novoPedido.comanda).once('value', (snapshot) => {
                let comanda = snapshot.val()
                if(comanda){
                    this.novoPedido.id = comanda.id;
                    this.novoPedido.mesa = comanda.mesa;
                }
            });
        },
        encerrarComanda: function(key){
            this.ref(ABERTO + 'atendendo')
                .orderByChild('comanda')
                .equalTo(key)
                .once('value', (ssAtendendo) => {
                if(ssAtendendo.exists()){
                    this.alert("Finalize os Pedidos!");
                }else{
                    this.ref(ABERTO + 'disponiveis')
                        .orderByChild('comanda')
                        .equalTo(key)
                        .once('value', (ssdisponiveis) => {
                        if(ssdisponiveis.exists()){
                            this.alert("Finalize os Pedidos!");
                        }else{
                            let comanda = this.comandasAbertas[key];
                            let mdate = moment(new Date());
                            comanda.dhFinalizada = mdate.format("YYYY-MM-DD HH:mm:ss");
                            comanda.uidFinalizada = this.user.uid;
                            comanda.comanda = key;
                            this.goToView("fecharComanda");
                            
                            this.ref('comandas/aberto/finalizadas/c' + mdate.format("YYYYMMDD-HHmmssSSS")).set(comanda, (error) => {
                                if (!error) { this.ref(COMANDA_ATENDENDO + key).remove(); }
                                else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
                            });
                        }
                    });
                }
            });
        },
        addPedido: function () {
            if (!this.novoPedido.id || this.novoPedido.id == ""
                || !this.novoPedido.mesa || this.novoPedido.mesa == ""
                || Object.keys(this.novoPedido.items).length == 0) {
                this.novoPedido.error = "Informe todos os dados do pedido!";
                return;
            }
            let mdate = moment(new Date());
            let keyPedido = "p" + mdate.format("YYYYMMDD-HHmmssSSS");
            if(this.novoPedido.key != ""){
                keyPedido = this.novoPedido.key;
            }
            
            if(this.sim(this.config.comanda)){
                this.ref(COMANDA_ATENDENDO + this.novoPedido.comanda).once('value', (snapshot) => {
                    let comanda = snapshot.val()
                    let totalPedido = this.totalPedido(this.novoPedido.items);
                    if(!comanda){
                        let pedidos = {}
                        pedidos[keyPedido] = totalPedido;
                        this.ref(COMANDA_ATENDENDO + this.novoPedido.comanda).set({
                            id: this.novoPedido.id,
                            mesa: this.novoPedido.mesa,
                            dhAberto: mdate.format("YYYY-MM-DD HH:mm:ss"),
                            pedidos: pedidos,
                            uid: this.user.uid
                        });
                    }else{
                        this.ref(COMANDA_ATENDENDO + this.novoPedido.comanda + "/pedidos/" + keyPedido)
                            .set(totalPedido);
                    }
                });
            }

            let pedido = {                        
                id: this.novoPedido.id,
                mesa: this.novoPedido.mesa,
                dhPedido: mdate.format("YYYY-MM-DD HH:mm:ss"),
                items: this.novoPedido.items,
                uidAtendimento: this.user.uid
            };
            if(this.sim(this.config.comanda)){
                pedido.comanda= this.novoPedido.comanda;
            }
            this.ref(ABERTO + 'atendendo/' + keyPedido).set(pedido);
            this.goToView("atendimento");
        },
        editPedido: function (key) {
            let pedido = this.pedidosAtendimento[key];
            this.novoPedido ={
                key: key,
                id: pedido.id,
                mesa: pedido.mesa,
                comanda: pedido.comanda,
                items: {},
                error:''
            };
            for(keyItemPedido in pedido.items){
                Vue.set(this.novoPedido.items, keyItemPedido,
                    {
                        desc: pedido.items[keyItemPedido].desc,
                        qtd: pedido.items[keyItemPedido].qtd,
                        valor: pedido.items[keyItemPedido].valor,
                        preparo: pedido.items[keyItemPedido].preparo
                    }
                );
            }
            this.goToView("editarPedido");
        },
        addItemPedido: function () {
            if (!this.itemPedido.prod.desc) {
                return;
            }

            let keyItemPedido = "p" + moment(new Date()).format("YYYYMMDD-HHmmssSSS");
            let qtd = this.itemPedido.qtd * 1;
            for (key in this.novoPedido.items) {
                if (this.novoPedido.items[key].desc == this.itemPedido.prod.desc) {
                    qtd += (this.novoPedido.items[key].qtd * 1);
                    keyItemPedido = key;
                }
            }

            Vue.set(this.novoPedido.items, keyItemPedido,
                {
                    desc: this.itemPedido.prod.desc,
                    qtd: qtd,
                    valor: this.itemPedido.prod.valor,
                    preparo: this.itemPedido.prod.preparo
                }
            );
            Vue.set(this.itemPedido, "qtd", 1);
        },
        removeItemPedido: function (k) {
            Vue.delete(this.novoPedido.items, k);
        },
        clearPedido: function () {
            this.goToView("novoPedido");
            if(this.sim(this.config.comanda)){
                this.$nextTick(function() { this.$refs.comanda.focus() });
            }else{
                this.$nextTick(function() { this.$refs.mesa.focus() });
            }
            
            this.novoPedido = {
                key: "",
                id: "",
                error: "",
                messa: "",
                comanda: "",
                items: {}
            };
            this.itemPedido = {
                prod: {},
                qtd: 1
            };
        },
        editProduto: function (categoria, produto) {
            this.produto = {
                error: "",
                desc: produto.desc,
                categoria: categoria,
                valor: produto.valor,
                disponivel: produto.disponivel,
                preparo: produto.preparo
            };
        },
        saveProduto: function () {
            let prod = {
                desc: this.produto.desc,
                valor: this.produto.valor * 1,
                disponivel: this.produto.disponivel,
                preparo: this.produto.preparo
            }
            this.ref('produtos/' + this.produto.categoria + "/" + this.produto.desc).set(prod);
            this.clearProduto();
        },
        deleteProduto: function (keyC, keyP) {
            if (keyC && keyC != "" && keyP && keyP != "") {
                this.ref('produtos/' + keyC + "/" + keyP).remove();
                this.clearProduto();
            }
        },
        clearProduto: function () {
            this.produto = {
                error: "",
                desc: "",
                categoria: "",
                valor: 0,
                disponivel: "S",
                preparo: "N"
            };
        },
        updateFromNow: function () {
            var self = this;

            for (key in this.pedidosAtendimento) {
                Vue.set(this.pedidosAtendimento[key], "fromNow", this.fromNow(this.pedidosAtendimento[key].dhPedido));
            }

            for (key in this.pedidosDisponiveis) {
                Vue.set(this.pedidosDisponiveis[key], "fromNow", this.fromNow(this.pedidosDisponiveis[key].dhDisponivel));
            }

            setTimeout(self.updateFromNow, 1000);
        },
        fromNow: function (date) {
            return date ? moment(date, "YYYY-MM-DD HH:mm:ss").fromNow() : "";
        },
        totalPedido: function (items) {
            var total = 0;
            for (item in items) {
                total += items[item].qtd * items[item].valor;
            }
            return total;
        },
        totalFinalizados: function () {
            let total = 0;
            for (key in this.pedidosFinalizados) {
                total += this.totalPedido(this.pedidosFinalizados[key].items);
            }
            return total;
        },
        totalComanda: function(pedidos){
            let total = 0;
            for (key in pedidos) {
                total += pedidos[key];
            }
            return total;
        },
        totalComandasResumo: function(){
            let total = 0;
            for (comanda in this.comandasFinalizadas) {
                total += this.totalComanda(this.comandasFinalizadas[comanda].pedidos);
            }
            return total;
        },
        tempoEspera: function (dhPedido, dhDisponivel) {
            return moment.duration(moment(dhPedido, "YYYY-MM-DD HH:mm:ss")
                .diff(moment(dhDisponivel, "YYYY-MM-DD HH:mm:ss"))).humanize();
        },
        logout: function () {
            if (this.auth.currentUser) {
                this.auth.signOut();
            }
        },
        darAcessoUsuario: function (uid, user) {
            this.ref('usuarios/acesso/' + uid).set(user, 
                (error) => {
                    if (!error) { this.ref('usuarios/cadastro/' + uid).remove(); }
                    else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
                }
            );
        },
        revogarAcessoUsuario: function () {
            this.ref('usuarios/acesso/' + this.editUsuarioAcesso.uid).remove();
            this.goToView("usuarios");
        },
        atualizarAcessoUsuario: function () {
            let user = {admin: this.editUsuarioAcesso.admin == 'S' ? true : null}
            if(this.editUsuarioAcesso.editName){
                user.name = this.editUsuarioAcesso.name;
            }
            this.ref('usuarios/acesso/' + this.editUsuarioAcesso.uid).update(user);
            this.goToView("usuarios");
        },
        editAcessoUsuario: function (uid, user) {
            this.editUsuarioAcesso = {
                uid: uid,
                email: user.email,
                name: user.name,
                photo: user.photo,
                admin: user.admin ? 'S' : 'N',
                editName: user.uidfb == user.email
            };
            this.goToView("editUsuario");
        },
        atualizarConfig: function(){
            this.ref('config').set(this.config);
        },
        isAdm: function () {
            return this.user.uid && this.acessoUsuarios[this.user.uid] &&
                this.acessoUsuarios[this.user.uid].admin;
        },
        openDashCliente: function(){
            window.open('dash-cliente.html','winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=1200,height=650');
        },
        openDashPreparo: function(){
            window.open('dash-preparo.html','winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=1200,height=650');
        },
        pedidoNecessitaPreparo: function(pedido){
            for (key in pedido.items) {
                if(pedido.items[key].preparo == 'S'){
                    return true;
                }
            }
            return false;
        },
        sim: function(s){
            return s == 'S';
        },
        temEtapaDisponivel: function(){
            return this.config.etapas == '3';
        },
        showMenu: function (menu, key){
            return (!menu.admin || this.isAdm()) && 
                   (key != 'fecharComanda' || this.sim(this.config.comanda)) &&
                   (key != 'disponiveis' || this.temEtapaDisponivel());
        },
        goToView(view){
            if(view){
                Vue.set(this.message, "show", false);
                Vue.set(this.page, "selected", view);
                window.location.href = "#"+view;
            }
        },
        getUserName: function(uid){
            if(this.acessoUsuarios && this.acessoUsuarios[uid]){
                if(this.acessoUsuarios[uid].name && this.acessoUsuarios[uid].name != ""){
                    return this.acessoUsuarios[uid].name;
                }else if(this.acessoUsuarios[uid].email && this.acessoUsuarios[uid].email != ""){
                    return this.acessoUsuarios[uid].email;
                }else{
                    return ""
                }
            }else{
                return "";
            }
        },
        getProfilePicture: function(user, size){
            return (user && user.photo ? user.photo : ("images/silhueta.jpg")) + (size ? '?width=' + size + '&height=' + size : "");
        },
        alert: function(msg){
            this.message = {
                text: msg,
                class: "alert-danger",
                show: true
            };
        }
    }
});

function exportCSV(resumo, name) {
    let array = Object.keys(resumo.produtos).map(function(k){ return resumo.produtos[k]});

    var universalBOM = "\uFEFF";
    let csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(universalBOM + "Produto;Quantidade;Valor\n"
        + array.map(function(item){
            return item.desc + ";" +
            item.qtd + ";" +
            item.valor.toLocaleString('pt-BR')}).join("\n"));

    var link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", name + ".csv");
    document.body.appendChild(link);
    link.click();
}