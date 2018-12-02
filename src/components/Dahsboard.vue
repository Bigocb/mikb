<template>
  <div class="container-fluid mt-4">
    <b-row>
      <b-col>
  
        <div class="list-group">
          <v-client-table :data="posts-java" :columns="columns">
            <div slot="more" slot-scope="props">
            <router-link :to="'/detail/' + props.row.id" class="btn btn-primary">read more</router-link>
            </div>
            <div slot="title" slot-scope="props">
             <b> <p v-html="props.row.title"></p></b>
            </div>
            <div slot="category" slot-scope="props">
              <p v-html="props.row.tags"></p>
            </div>
           
            <a slot="delete" slot-scope="props" href="#" @click.prevent="deletePost(props.row.id)"><img src="https://www.freeiconspng.com/uploads/remove-icon-png-24.png" height="42" width="42"></a>
            <div slot="child_row" slot-scope="props">
         <div v-if="showPlaces == false">
              <p>{{props.row.summary}}</p>        
              </div>
              <div v-if="showPlaces == true">
              <form @submit.prevent="savePost">
              <b-form-group>
               <select v-model="model.tags">
  <option :selected="model.tags">{{model.tags}}</option>
  <option v-for="tag in allTags"  :value="tag.name" v-bind:key="tag.id">
    {{ tag.tag }}
  </option>
</select>
     <b-form-textarea rows="1" v-model="model.title"></b-form-textarea>
                  </b-form-group>
             <markdown-editor v-model="model.task"></markdown-editor>               
   <!--            <b-form-textarea rows="4" v-model="model.task"></b-form-textarea> -->
                <div>
                  <b-btn @click="showPlaces = false" type="submit" variant="success">Save Post</b-btn>
                </div>
  
              </form>
              </div>
            </div>
          </v-client-table>
  
          <b-col>
          
            <div v-if="showPlaces == false">

            </div>
          </b-col>
        </div>
  
      </b-col>
    </b-row>
    <b-row>
      <b-col>
  
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

<!-- TODO: Allow removal of existing tags, parse tags to individual objects -->
<!-- TODO: Close edit on clicking of minus button or when switching to another note-->
<!-- FIXME: Okta works in dev but not prod, if i REMOVE IT DEV doesn't work-->
<script>
  import api from '@/api'
  import VueHighlightJS from 'vue-highlightjs'
  import hljs from 'highlight.js'
  
  import apiOkta from '@/apiOkta'
  export default {
    data() {
  
      return {
        sortKey: '',
        columns: ['more','title','category','delete'],
        reverse: false,
        search: '',
        showPlaces: false,
        loading: false,
        posts-java: [],
        allTags: {},
        model: {},
        family: {},
        approved: {
          approved: "1"
        },
        tagcat {
          tagid: "2"
        }
        selectedPlace: {}
      }
    },
    async created() {
      this.refreshPosts()
      this.temp = await apiOkta.getUser()
      this.family = await api.getFamily(this.temp.profile.email)
      this.model = Object.assign({}, this.family, this.approved)
      this.allTags = await api.getTags()
    },
    methods: {
      sortBy: function(key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      },
      async refreshPosts() {
        this.temp = await apiOkta.getUser()
        this.family = await api.getFamily(this.temp.profile.email)
        this.posts-java = await api.getCatPosts(this.family.familyid, this.tagcat)
        console.log(this.tagcat)
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