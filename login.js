var login = new Vue({
    el: '#login',
    mixins: [fbMx, utilMx],
    data: {
        loading: false,
        mode:"login",
        email:"",
        password:"",
        confirmPassword:"",
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
          this.ref('usuarios/acesso/' + user.uid)
            .once("value").then((snapshot) => {
              if(snapshot.exists()){
                let u = {
                  email: user.email,
                  photo: user.photoURL,
                  uidfb: (user.providerData ? (user.providerData[0] ? user.providerData[0].uid : 0) : 0)
                }
                if(u.email != u.uidfb){
                  u.name = user.displayName;
                }

                this.ref('usuarios/acesso/' + user.uid).update(u);
                window.location.href = "index.html";
              }else{
                this.ref('usuarios/cadastro/' + user.uid).set({
                    email: user.email,
                    name: user.displayName,
                    photo: user.photoURL,
                    uidfb: (user.providerData ? (user.providerData[0] ? user.providerData[0].uid : 0) : 0)
                });
                this.logout();
                this.error = "Aguarde a liberação do acesso.";
              }
            });
        } else {
          this.password = "";
        }
    });
    },
    methods:{
      cadastrar: function(){        
        if(this.password != this.confirmPassword){
          this.error = "As senhas devem ser iguais.";
          return;
        }
        this.loading = true;
        this.auth.createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
          this.error = 'Erro desconhecido: ' + error.code;
        });
      },
      login: function(){
          this.logout();          
          this.loading = true;
          this.auth.signInWithEmailAndPassword(this.email, this.password).catch((error) => {
              if (this.erros[error.code]) {
                this.error = this.erros[error.code];
              } else {
                this.error = 'Erro desconhecido: ' + error.code;
              }
              this.password = "";
              this.loading = false;
          });
      },
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
            this.password = "";
            this.loading = false;
          });
      },
      logout: function(){
          if (this.auth.currentUser) {
            this.auth.signOut();
            this.mode="login";
          }
      }
    }
});