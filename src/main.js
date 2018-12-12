// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSimplemde from 'vue-simplemde'
import wordcloud from 'vue-wordcloud'
import 'simplemde/dist/simplemde.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'
import VuePaginate from 'vue-paginate'
import VueRouter from 'vue-router'

import VueHighlightJS from 'vue-highlightjs'
import {
  ClientTable
} from 'vue-tables-2';
var marked = require('marked');
import wysiwyg from "vue-wysiwyg";
import VeeValidate from 'vee-validate';

import {
  store
} from './_store';
import draggable from 'vuedraggable'
Vue.use(wysiwyg, {}); // config is 


// ENABLE USE 3RD PARTY PLUGINS
Vue.use(VueResource);
Vue.use(VuePaginate);
Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(VueSimplemde)
Vue.config.productionTip = false
import vueKanban from 'vue-kanban'

Vue.use(vueKanban)
Vue.use(VueHighlightJS);
Vue.use(ClientTable, {}, false, 'bootstrap4', 'footerPagination');
//Vue.use(ClientTable);
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  pedantic: true,
  gfm: true,
  tables: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  xhtml: true
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  render: h => h(App),
  components: {
    App,
    draggable,
    Multiselect
  }
}).$mount('#app')

Vue.mixin({
  methods: {
    marked: function (input) {
      return marked(input);
    }
  }
});