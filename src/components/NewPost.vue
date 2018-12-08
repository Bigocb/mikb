<template>
  <div class="container-fluid mt-4">
    <b-row>
      <b-col>
            <div v-if="showPlaces == false">


        <form @submit.prevent="savePost">
        test
                  <span v-if="!model.id">Not Saved</span>
          <span v-else>saved</span>
          <b-btn class="badge badge-pill badge-warning tags" @click="showPlaces = false" type="submit" variant="success"><img src="../../assets/png/check-2x.png"></b-btn>
            <b-form-group>
                <h4>Title: </h4>
                <b-form-textarea rows="1" v-model="model.title"></b-form-textarea>
                <h4>Summary: </h4>
                <b-form-textarea rows="1" v-model="model.summary"></b-form-textarea>
            </b-form-group>
            <markdown-editor v-model="model.task"></markdown-editor>
        </form>

            </div>
 
  
      </b-col>
    </b-row>
    <b-col>
  
    </b-col>
  </div>
</template>
<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
<style lang="css">
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
  @import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/a11y-dark.min.css';

  #app {
    width: 95%;
    margin: 0 auto;
  }
  
  .VuePagination {
    text-align: center;
  }
  
  .vue-title {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .vue-pagination-ad {
    text-align: center;
  }
  
  .glyphicon.glyphicon-eye-open {
    width: 16px;
    display: block;
    margin: 0 auto;
  }
  
  th:nth-child(3) {
    text-align: center;
  }
  
  .VueTables__child-row-toggler {
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
  }
  
  .VueTables__child-row-toggler--closed::before {
    content: "+";
  }
  
  .VueTables__child-row-toggler--open::before {
    content: "-";
  }
  
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg)
    }
  }
  
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg)
    }
  }
  
  .icon {
    position: relative;
    display: inline-block;
    width: 25px;
    height: 25px;
    overflow: hidden;
    fill: currentColor
  }
  
  .icon__cnt {
    width: 100%;
    height: 100%;
    background: inherit;
    fill: inherit;
    pointer-events: none;
    transform: translateX(0);
    -ms-transform: translate(.5px, -.3px)
  }
  
  .icon--m {
    width: 50px;
    height: 50px
  }
  
  .icon--l {
    width: 100px;
    height: 100px
  }
  
  .icon--xl {
    width: 150px;
    height: 150px
  }
  
  .icon--xxl {
    width: 200px;
    height: 200px
  }
  
  .icon__spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
  }
  
  .icon--ei-spinner .icon__spinner,
  .icon--ei-spinner-2 .icon__spinner {
    -webkit-animation: spin 1s steps(12)infinite;
    animation: spin 1s steps(12)infinite
  }
  
  .icon--ei-spinner-3 .icon__spinner {
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite
  }
  
  .icon--ei-sc-facebook {
    fill: #3b5998
  }
  
  .icon--ei-sc-github {
    fill: #333
  }
  
  .icon--ei-sc-google-plus {
    fill: #dd4b39
  }
  
  .icon--ei-sc-instagram {
    fill: #3f729b
  }
  
  .icon--ei-sc-linkedin {
    fill: #0976b4
  }
  
  .icon--ei-sc-odnoklassniki {
    fill: #ed812b
  }
  
  .icon--ei-sc-skype {
    fill: #00aff0
  }
  
  .icon--ei-sc-soundcloud {
    fill: #f80
  }
  
  .icon--ei-sc-tumblr {
    fill: #35465c
  }
  
  .icon--ei-sc-twitter {
    fill: #55acee
  }
  
  .icon--ei-sc-vimeo {
    fill: #1ab7ea
  }
  
  .icon--ei-sc-vk {
    fill: #45668e
  }
  
  .icon--ei-sc-youtube {
    fill: #e52d27
  }
  
  .icon--ei-sc-pinterest {
    fill: #bd081c
  }
  
  .icon--ei-sc-telegram {
    fill: #08c
  }
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/evil-icons/x.y.z/evil-icons.min.js">
  
</script>

<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js">
  
</script>

<script>
  hljs.initHighlightingOnLoad();
</script>

<script>
  import api from '@/api'
  import VueHighlightJS from 'vue-highlightjs'
  import { mapState, mapActions } from "vuex";
  import hljs from 'highlight.js'
  
  export default {
    data() {
  
      return {
        sortKey: '',
        columns: ['title','category','delete'],
        reverse: false,
        search: '',
                email: {},
        showPlaces: false,
        loading: false,
        posts: [],
        allTags: {},
        model: {},
        family: {},
        approved: {
          approved: "1"
        },
        selectedPlace: {}
      }
    },
          computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all
    })
  },
    async created() {
      this.refreshPosts()
      this.email = this.account.user.email
      this.family = await api.getFamily(this.email)
      this.model = Object.assign({}, this.family, this.approved)
      this.allTags = await api.getTags()
    },
    methods: {
      sortBy: function(key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      },
      async refreshPosts() {
      this.email = this.account.user.email
      this.family = await api.getFamily(this.email)
        this.posts = await api.getPosts(this.family.familyid)
      },
      updateSelected(selectedItem) {
        this.selectedPlace = selectedItem;
        this.showPlaces = true;
      },
      updateTags(tag) {
        this.model = Object.assign({}, tag);
      },
      async populatePostToEdit(props) {
        this.model = Object.assign({}, props)
        this.showPlaces = true;
      },
      async getAllTags() {
        this.tags = await api.getTags()
      },
      async savePost() {
        if (this.model.id) {
          console.log(this.model.tags);
          await api.updatePost(this.model.id, this.model)
          if (this.model.tags) {
            console.log(this.model.tags);
            if (this.model.tags < 100) {
              await api.updateTags(this.model.id, this.model)
            }
          }
        } else {
          //TODO: Fix tags for new posts
          await api.createPost(this.model)
          //   if (this.model.tags) {
          //   console.log(this.model.tags);
          //   if (this.model.tags < 100) {
          //     await api.updateTags(this.model.id, this.model)
          //   }
          // }
        }
        this.model = Object.assign({}, this.family, this.approved)
        await this.refreshPosts()
      },
      async deletePost(id) {
        if (confirm('Are you sure you want to delete this post?')) {
          // if we are editing a post we deleted, remove it from the form
          await api.deletePost(id)
          await this.refreshPosts()
          this.model = Object.assign({}, this.family, this.approved)
        }
      }
    }
  }
</script>