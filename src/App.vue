<template>
<div id="app">
    <b-navbar class="navbar navbar-expand-lg navbar-dark bg-primary" toggleable="no">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">KB</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <!-- <b-nav-item to="/dashboard">Dashboard</b-nav-item> -->
                <!-- <b-nav-item to="/posts-manager">Feed</b-nav-item> -->
                <b-nav-item href="#" v-b-modal.modal4><img src="../assets/png/plus-2x.png"></b-nav-item>
                <!-- <b-nav-item  href="#" @click.prevent="login" v-if="!activeUser">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item> -->
                <b-nav-item href="#" v-b-modal.modal2><img src="../assets/png/magnifying-glass-2x.png"></b-nav-item>
                <b-nav-item href="#" v-b-modal.modal3><img src="../assets/png/tags-2x.png"></b-nav-item>
                <b-nav-item to="/user"><img src="../assets/png/person-2x.png"></b-nav-item>
                <b-nav-item to="/list"><img src="../assets/png/list-2x.png"></b-nav-item>
                <h5></h5><b-nav-item  class="badge badge-pill badge-danger bsize" v-b-modal.modal5>{{postsapproved.length}}</b-nav-item></h5>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />

    <b-modal class="navbar navbar-expand-lg  navbar-dark bg-primary" ref="modal2" id="modal2" title="Search Knowledge">
        <div>
            <input type="text" v-model="search" placeholder="Search.."/>
        </div>
            <div v-for="post in filteredList" v-bind:key="post.id">
                <p>
                    <router-link v-on:click.native="hideModal()" :to="'/detail/' + post.id">
                        <b-card class="dash">
                            <div>
                                {{post.title}}
                            </div>
                        </b-card>
                    </router-link>
                </p>
            </div>
    </b-modal>
    <b-modal class="navbar navbar-expand-lg navbar-dark bg-primary" ref="modal5" id="modal5" title="Queue">
            <div v-for="post in postsapproved" v-bind:key="post.id">
                <p>
                        <b-card class="dash">
                            <div>
                                {{post.title}}
                            </div>
                             <a href="#" @click.prevent="approve(post.id)"> <img src="../assets/png/check-2x.png"></a>
                        </b-card>
            
                </p>
            </div>
    </b-modal>
    <b-modal class="navbar navbar-expand-lg navbar-dark bg-primary" ref="modal4" id="modal4" title="New Post">
    <span v-if="!model.id">Not Saved</span>
          <span v-else>
          <div>saved</div>
          <a id="popoverButton-sync" variant="primary" class="badge badge-pill badge-warning tags">add</a>
          </span>
        
     <b-popover triggers="click" :show.sync="show" target="popoverButton-sync" title="Add Tags">
                <div>
     <select v-model="model.tags">
      <option v-for="tag in allTags"  :value="tag.id" v-bind:key="tag.id">
      {{ tag.tag }}
      </option>
    </select>
      <b-form-textarea rows="1" v-model="newTag.tag"></b-form-textarea>
     <a href="#" @click.prevent="addTags(newTag.tag)"> <img src="../assets/png/check-2x.png"></a>
    <a class="tagright" href="#" @click.prevent="savetag()">save</a>
     <a class="tagright" href="#" @click="showAddTags = false">close</a>
                </div>
                  </b-popover>
        <form @submit.prevent="savePost">

          <b-btn class="badge badge-pill badge-warning tags" type="submit" variant="success"><img src="../assets/png/check-2x.png"></b-btn>
           <b-form-group>

                <h4>Title: </h4>
                <div class="bg-light titles">
                        <quill-editor class="editor-example bubble"
                      ref="myTextEditor"
                      v-model="model.title"
                      :options="editorOption2"
                            @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        
                </div>
                <h4>Summary: </h4>
                         <div class="bg-light titles">  
                                                <quill-editor class="editor-example bubble"
                      ref="myTextEditor"
                      v-model="model.summary"
                      :options="editorOption2"
                            @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
                </div>
            </b-form-group>
            <div class="quill-editor alert-light">
                    <quill-editor ref="myTextEditor"
                      v-model="model.task"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
          </div>
        </form>
    </b-modal>
    <b-modal class="navbar navbar-expand-lg navbar-dark bg-primary" ref="modal3" id="modal3" title="Tags">
            <div class="long" v-for="tag in allTags" v-bind:key="tag.id">
                    <router-link v-on:click.native="hideModalTags()" :to="'/tags/' + tag.tag">
                        <b-card class="badge badge-success label">
                            <div>
                                {{tag.tag}}
                            </div>
                        </b-card>
                    </router-link>
            </div>
    </b-modal>
</div>
</template>
<style>
    .h-tooltip {
   z-index: 99999!important;
}
.popover{
    z-index:100000000;
}
 .quill-editor,
  .quill-code {
min-height:300px;
  }

  .titles {
  height: 100px;
}
.label {

  white-space: nowrap;
      margin-right:5px;
           margin-left:5px;
           margin-top:3px;
    width: 100px;
}
.bsize {
    margin-top: 10px;
    padding-bottom: 10px;
    height: 30px;
}
.long {
    column-count: 3;
     -webkit-column-count: 3; /* Chrome, Safari, Opera */
    -moz-column-count: 3; /* Firefox */
    column-count: 3;
    column-rule: 5px;
    column-gap: 40px;
    column-width: 300px;
}
</style>
<script>
import { mapState, mapActions } from "vuex";
import api from '@/api'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
    name: 'app',
    data() {
        return {
                    editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
            },
                         editorOption2: {
          theme: 'bubble',
          placeholder: "输入任何内容，支持html",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean']
            ]
          }
             },
            activeUser: null,
            email: {},
                        allTags: {},
                                    showAddTags: false,
            showTags: false,
             show: false,
                        removeTags: {},
            newTag: {},
            model: {},
            summary: {
                summary: "None"

                
            },
            posts: [],
            postsapproved: [],
            search: '',
                    approved: {
          approved: "1"
        },
            allTags: {},
        }
    },
    mounted () {
  window.addEventListener('click', event => {
    const { target } = event
    // handle only links that do not reference external resources
    if (target && target.matches("a:not([href*='://'])") && target.href) {
      // some sanity checks taken from vue-router:
      // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
      const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = event
      // don't handle with control keys
      if (metaKey || altKey || ctrlKey || shiftKey) return
      // don't handle when preventDefault called
      if (defaultPrevented) return
      // don't handle right clicks
      if (button !== undefined && button !== 0) return
      // don't handle if `target="_blank"`
      if (target && target.getAttribute) {
        const linkTarget = target.getAttribute('target')
        if (/\b_blank\b/i.test(linkTarget)) return
      }
      // don't handle same page links/anchors
      const url = new URL(target.href)
      const to = url.pathname
      if (window.location.pathname !== to && event.preventDefault) {
        event.preventDefault()
        this.$router.push(to)
      }
    }
  })
},
    computed: {
        filteredList() {
            return this.posts.filter(post => {
                return post.title.toLowerCase().includes(this.search.toLowerCase())
            })
        },
         ...mapState({
      account: state => state.account,
      users: state => state.users.all
    })
    },
    async created() {
            this.refreshPosts()
    },
    methods: {
        editor() {
        return this.$refs.myTextEditor.quill
      },
            onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
        async refreshPosts() {
      this.email = this.account.user.email
      this.family = await api.getFamily(this.email)
      this.postsapproved = await api.getApprovalPosts(this.family.familyid)
            this.posts = await api.getPosts(this.family.familyid)
            this.allTags = await api.getTags()
            this.model = Object.assign({}, this.family, this.approved,this.summary)
        },
        async updateReadCount(id) {
            await api.updateReadCount(id)
            console.log(id)
        },
                async savetag() {
          await api.updateTags(this.model.id, this.model)
          this.show = false
        },
                async approve(id) {
            await api.approvePost(id)
            this.refreshPosts()
            this.hideModal4()

        },
                splitJoin(theText) {
                    console.log(theText)
            if (theText) {
              if (isNaN(theText))  {
                return theText.split(',');
              }
            } else {
                return null;
            }

        },
        hideModal() {
            this.$refs.modal2.hide()
              this.refreshPosts()
        },
                    hideModalTags() {
            this.$refs.modal3.hide()
              this.refreshPosts()
        },
                            hideModal3() {
            this.$refs.modal4.hide()
              this.refreshPosts()
        },
        hideModal4() {
            this.$refs.modal5.hide()
              this.refreshPosts()
        },
      async savePost() {
        if (this.model.id) {
          console.log(this.model.tags);
          await api.updatePost(this.model.id, this.model).then(response => (this.model = response[0]))
          console.log(this.model)
        this.email = this.account.user.email
      this.family = await api.getFamily(this.email)
      this.postsapproved = await api.getApprovalPosts(this.family.familyid)
            this.posts = await api.getPosts(this.family.familyid)
          if (this.model.tags) {
            console.log(this.model.tags);
            if (this.model.tags < 100) {
              await api.updateTags(this.model.id, this.model)
            }
          }
        } else {
          await api.createPost(this.model).then(response => (this.model = response[0]))
this.email = this.account.user.email
      this.family = await api.getFamily(this.email)
      this.postsapproved = await api.getApprovalPosts(this.family.familyid)
            this.posts = await api.getPosts(this.family.familyid)
          
        }
      }
       
    }
}
</script>
