<template>
<article>
    <div class="dash" v-if="showPlaces == false">
        <div v-for="post in posts" v-bind:key="post.id">
            <span class="badge badge-pill badge-warning tags"><a href="#" @click.prevent="populatePostToEdit(post)"> <img src="../../assets/png/pencil-2x.png"></a></span>
            <span class="badge badge-pill badge-warning tags"> <a v-if="post.approved === null"  href="#" @click.prevent="approvePost(post.id)"><img src="../../assets/png/check-2x.png"></a></span><span class="badge badge-pill badge-warning tags"><a href="#" @click.prevent="deletePost(post.id)"> <img src="../../assets/png/delete-2x.png"></a> </span>
            <h2 class="post-title">{{ post.title }}</h2> 
            <span v-for="list in listMemberships">
            <router-link  :to="'/tags/' + list">
                <span class="badge badge-pill badge-success tags"  v-text="list.listname"></span></router-link>
                <a href="#" class="tagright" @click.prevent="deleteListPost(post.id, list.listname)">x</a>
            </span>
            <a id="popoverButton-sync2" variant="primary"  class="badge badge-pill badge-warning tags" href="#">Add to List</a>
            <b-popover triggers="click" :show.sync="showList" target="popoverButton-sync2" title="Add To List">
 <select v-model="addList.listid">
      <option v-for="stage in splitJoin(stages.name)"  :value="stage" v-bind:key="stage">
      {{ stage}}
      </option>
    </select>
<a href="#" @click.prevent="addToList(addList.listid,post.id,post.title)"> <img src="../../assets/png/check-2x.png"></a>
           </b-popover>
           
            <span v-for="tag in splitJoin(post.tags)">
                
            <router-link  :to="'/tags/' + tag">
                <span class="badge badge-pill badge-success tags"  v-text="tag"></span></router-link>
                <a class="tagright" href="#" @click.prevent="deleteTags(tag)">x</a>
                </span><a id="popoverButton-sync" variant="primary" @click="showAddTags = true"  class="badge badge-pill badge-warning tags" href="#">add</a>

     <b-popover triggers="click blur" :show.sync="show" target="popoverButton-sync" title="Add Tags">

                <div>
     <select v-model="model.tags">
      <option v-for="tag in allTags"  :value="tag.id" v-bind:key="tag.id">
      {{ tag.tag }}
      </option>
    </select>
      <b-form-textarea rows="1" v-model="newTag.tag"></b-form-textarea>
     <a href="#" @click.prevent="addTags(newTag.tag)"> <img src="../../assets/png/check-2x.png"></a>
    <a class="tagright" href="#" @click.prevent="savetag()">save</a>
     <a class="tagright" href="#" @click="showAddTags = false">close</a>
                </div>
                  </b-popover>
            <p class="text-success">{{post.lastupdate}} </p>
            <div class="alert alert-dismissible alert-secondary">
                <p class="summary">{{post.summary}}</p>
            </div>
            <div class="alert alert-dismissible alert-secondary">
                <p @dblclick="showPlaces = true"v-highlightjs class="post-content" v-html="marked(post.task)"></p>
            </div>
                
        </div>
    </div>
    <div class="dash" v-if="showPlaces == true">
        <div>

    
        </div>
        <!-- Modal Component -->

        <form @submit.prevent="savePost">
          <b-btn class="badge badge-pill badge-warning tags" @click="showPlaces = false" type="submit" variant="success"><img src="../../assets/png/check-2x.png"></b-btn>
            <h4>Tags:</h4><span class="badge badge-pill badge-success tags" v-for="tag in splitJoin(model.tags)" v-text="tag"></span>
            <b-form-group>

                <h4>Title: </h4>
                <b-form-textarea rows="1" v-model="model.title"></b-form-textarea>
                <h4>Summary: </h4>
                <b-form-textarea rows="1" v-model="model.summary"></b-form-textarea>
            </b-form-group>

            <markdown-editor v-model="model.task"></markdown-editor>
        </form>
        
    </div>
    </div>
</article>
</template>

<style>
@import 'https://cdn.rawgit.com/xcatliu/simplemde-theme-dark/master/dist/simplemde-theme-dark.min.css';
</style>
<style lang="css">
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
@import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/a11y-dark.min.css';

#app {
    width: 95%;
    margin: 0 auto;
}

.tags {
    margin-right: 8px;
}

.tagright {
  margin-right:4px;
}

.byline,
.social {
    flex: 0 0 calc(50% - 3rem);

    @include bp('large') {
        @supports (display: flex) {
            flex: 0 0 calc(25% - 3rem);
        }
    }
}

.post-content {
    @supports (display: grid) {
        grid-column: 1 / span 2;

        @include bp('large') {
            grid-column: 2;
        }
    }

    @include bp('large') {
        flex: 0 0 calc(50% - 3rem);

        @supports (display: grid) {
            grid-column: 2 / span 2;
        }
    }
}

.summary {
    @include bp('large') {
        order: 1;
    }

    @supports (display: grid) {
        grid-column: 1 / span 2;

        @include bp('large') {
            grid-column: 4 / span 1;
        }
    }
}

.post-title {
    font-weight: 300;
    line-height: 1.3;
    margin-bottom: 0;
    margin-top: 0;

    @supports (initial-letter: 2) or (-webkit-initial-letter: 2) {
        &:first-letter {
            color: hsl(320, 60%, 30%);
            font-weight: 700;
            initial-letter: 2;
            -webkit-initial-letter: 2;
        }
    }
}

.VuePagination {
    text-align: center;
}

.main {
    margin-top: 15px;
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

.dash {
    margin-top: 20px;
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

.tag {
    border-style: solid;
    border-width: 1px;
    margin: 2px;
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 4px;
    padding-right: 4px;
    background-color: #C0C0C0;
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
import hljs from 'highlight.js'
  import { mapState, mapActions } from "vuex";
export default {
    data() {

        return {
            sortKey: '',
            columns: ['more', 'title', 'category', 'delete'],
            reverse: false,
            search: '',
            show: false,
            listMemberships: {},
            showList: false,
            deleteFromList: {},
            showPlaces: false,
            stages: {},
            addList:{},
            addLToist:{},
            showAddTags: false,
            showTags: false,
            loading: false,
            deleteTag: {},
            posts: [],
                    email: {},
            allTags: {},
            newTag: {},
            model: {},
            removeTags: {},
            family: {},
            approved: {
                approved: "1"
            },
            selectedPlace: {}
        }
    },
    async created() {
        this.refreshPosts()
    },

     beforeRouteUpdate (to, from, next) {
    this.posts = api.getSinglePost(to.params.id)
    next();
  },
        computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all
    })
  },
    methods: {
        sortBy: function (key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        },
        async refreshPosts() {
            this.posts = await api.getSinglePost(this.$route.params.id)
            this.email = this.account.user.email
            this.family = await api.getFamily(this.email)
            this.allTags = await api.getTags()
            this.listMemberships = await api.getPostList(this.$route.params.id)
             this.stages = await api.getUserLists(this.family.familyid)
        },
        async updatePost(id) {
            console.log(id)
            this.posts = await api.getSinglePost(id)
            console.log(this.posts)
            this.allTags = await api.getTags()
        },
        updateSelected(selectedItem) {
            this.selectedPlace = selectedItem;
            this.showPlaces = true;
        },
        async addTags() {
            console.log(this.newTag)
            await api.addTags(this.newTag)
               this.posts = await api.getSinglePost(this.$route.params.id)
               this.allTags = await api.getTags()
        },
            async deleteListPost(postid,listid) {
        this.deleteFromList.postid = Object.assign(postid)
        this.deleteFromList.listid = Object.assign(listid)
        await api.deleteUserListPosts(this.family.familyid, this.deleteFromList)
               this.refreshPosts()
      },
        async addToList(listid,postid,title) {
            console.log(this.addList)
            this.addList.listid = listid
            this.addList.postid = '' + postid + ''
            this.addList.name = title
            console.log(this.addList)
            await api.createUserListPosts(this.family.familyid,this.addList)
               this.posts = await api.getSinglePost(this.$route.params.id)
               this.allTags = await api.getTags()
               this.refreshPosts()
        },
        async deleteTags(tag) {
          this.deleteTag.tag = Object.assign(tag)
            console.log(this.deleteTag)
            console.log(this.$route.params.id)
            await api.deleteTags(this.$route.params.id, this.deleteTag)
             this.posts = await api.getSinglePost(this.$route.params.id)
        },
        async populatePostToEdit(props) {
            this.model = Object.assign({}, props)
            this.showPlaces = true;
        },
        async getAllTags() {
            this.tags = await api.getTags()
        },
        async savetag() {
          await api.updateTags(this.$route.params.id, this.model)
          this.posts = await api.getSinglePost(this.$route.params.id)
          this.show = false
        },
        async savePost() {
            if (this.model.id) {
                await api.updatePost(this.model.id, this.model)
                if (this.model.tags) {
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
        async approvePost(id) {
            await api.approvePost(id)
            await this.refreshPosts()
        },
        splitJoin(theText) {
            if (theText) {
                return theText.split(',');
            } else {
                return null;
            }

        },
        hideModal() {
            this.$refs.modal1.hide()
        },
        async deletePost(id) {
            if (confirm('Are you sure you want to delete this post?')) {
                // if we are editing a post we deleted, remove it from the form
                await api.deletePost(id)
                await this.refreshPosts()
                this.model = Object.assign({}, this.family, this.approved)
            }
        }
    },
         watch: {
    '$route' (to, from) {
     this.updatePost(this.$route.params.id)
  }
   }
}
</script>
