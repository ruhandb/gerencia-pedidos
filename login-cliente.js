var login = new Vue({
    el: '#login',
    mixins: [fbMx, utilMx],
    data: {
        loading: false,
        error:"",
        erros:{
          "auth/wrong-password": "Senha inválida.",
          "auth/user-not-found": "Usuário não encontrado.",
          "auth/user-disabled": "Usuário desabilitado.",
          "auth/invalid-email": "Email inválido.",
        }
    },
    mounted: function(){
      this.auth.onAuthStateChanged((user) => {
        this.loading = false;
        if (user) {
          this.ref('clientes/' + user.uid)
            .once("value").then((snapshot) => {
                this.ref('clientes/' + user.uid).update({
                  email: user.email,
                  photo: user.photoURL,
                  name: user.displayName,
                  uidfb: (user.providerData ? (user.providerData[0] ? user.providerData[0].uid : 0) : 0)
                });
                //window.location.href = "index.html";
                this.error = "Sucesso no Login.";
            });
        } else {
          this.error = "Falha no Login.";
        }
    });
    },
    methods:{
      loginFacebook: function(){
          this.logout();          
          this.loading = true;
          var provider = new firebase.auth.FacebookAuthProvider();
          this.auth.signInWithPopup(provider).then((result) => {
            this.user = result.user;
          }).catch((error) => {
            if (this.erros[error.code]) {
              this.error = this.erros[error.code];
            } else {
              this.error = 'Erro desconhecido: ' + error.code;
            }
            this.loading = false;
          });
      },
      logout: function(){
          if (this.auth.currentUser) {
            this.auth.signOut();
          }
      }
    }
});