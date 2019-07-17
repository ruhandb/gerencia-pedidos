Vue.component('percent-gain-text', {
    data: function () {
        return {
            className: ""
        }
    },
    props: ['current', 'last', 'inverse'],
    methods: {
        toPercent: function (current, last, inverse) {
            if(!last || last <=0) return "";
            let percent = Math.round(((current / last * 100) -100)*100)/100;
            if(percent > 0){
                this.className = !inverse ? "text-success" : "text-danger";
            }else{
                this.className = !inverse ? "text-danger" : "text-success";
                percent*= -1;
            }
            return percent.toLocaleString() + '%';
        }
    },
    template: '<p class="mb-0 mt-2" :class="className">' +
              '     {{ toPercent(current, last, inverse) }}'+
              '     <span class="text-black ml-1"><small>(último fechamento)</small></span>' +
              '</p>'
});

Vue.component('card-indicator', {
    props: ['current', 'last', 'inverse', 'icon', 'title', 'col'],
    template: "<div :class='col' class='grid-margin stretch-card'> " +
              "          <div class='card'> " +
              "              <div class='card-body'> " +
              "                  <p class='card-title text-md-center text-xl-left'>{{ title }}</p> " +
              "                  <div  " +
              "                      class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center'> " +
              "                      <h3 class='mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0'> " +
              "                          <slot></slot></h3> " +
              "                      <span :class='icon' class='icon-md text-muted mb-0 mb-md-3 mb-xl-0'></span> " +
              "                  </div>                                     " +
              "                  <percent-gain-text v-if='current' :current='current'  " +
              "                                      :last='last' :inverse='inverse'> " +
              "                  </percent-gain-text> " +
              "              </div> " +
              "          </div> " +
              "      </div>"
});