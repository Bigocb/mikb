<template>
      <b-container fluid class="container">
        <b-row class="row">
          <b-col cols="8">
             <div class="dash">
              <h3>Last Few Adds</h3>
              </div>
              <div v-for="post in postsnew"  v-bind:key="post.id">
                <div>
                  <b-card class="dash">
                  <router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
                  
                      <div>
                        <h4 v-html="post.title"></h4>
</div>
</router-link>
<div>
                        <p v-html="post.summary"></p>
                      </div>
                        
                      <div>
                      <h6>{{post.lastupdate}}</h6>
                      </div>
                    </b-card>
                
                </div>

              </div>
          </b-col>

          <b-col cols="4">
          <b-row>

            <div class="dash">
              <h3>Top Tags</h3>
</div>
          <wordcloud class="card dash"
      :data="toptags"
      nameKey="tag"
      valueKey="count"
      :color="myColors"
      :wordClick="wordClickHandler">
      </wordcloud>

          </b-row>
          <b-row>
                      <div class="dash">
              <h3>Placeholder</h3>
</div>
          </b-row>

          </b-col>
</b-row>
  </b-container>
</template>
<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
<style lang="css">
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
  @import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/a11y-dark.min.css';


img {
    vertical-align: middle;
}

.img-responsive {
    display: block;
    height: auto;
    max-width: 100%;
}

.img-rounded {
    border-radius: 3px;
}

.img-thumbnail {
    background-color: #fff;
    border: 1px solid #ededf0;
    border-radius: 3px;
    display: inline-block;
    height: auto;
    line-height: 1.428571429;
    max-width: 100%;
    moz-transition: all .2s ease-in-out;
    o-transition: all .2s ease-in-out;
    padding: 2px;
    transition: all .2s ease-in-out;
    webkit-transition: all .2s ease-in-out;
}

.img-circle {
    border-radius: 50%;
}

.timeline-centered {
    position: relative;
    margin-bottom: 30px;
}

    .timeline-centered:before, .timeline-centered:after {
        content: " ";
        display: table;
    }

    .timeline-centered:after {
        clear: both;
    }

    .timeline-centered:before, .timeline-centered:after {
        content: " ";
        display: table;
    }

    .timeline-centered:after {
        clear: both;
    }

    .timeline-centered:before {
        content: '';
        position: absolute;
        display: block;
        width: 4px;
        background: #f5f5f6;
        /*left: 50%;*/
        top: 20px;
        bottom: 20px;
        margin-left: 30px;
    }

    .timeline-centered .timeline-entry {
        position: relative;
        /*width: 50%;
        float: right;*/
        margin-top: 5px;
        margin-left: 30px;
        margin-bottom: 10px;
        clear: both;
    }

    .dash{
      margin-top: 20px;
      border-bottom: 1px solid;
    }

        .timeline-centered .timeline-entry:before, .timeline-centered .timeline-entry:after {
            content: " ";
            display: table;
        }

        .timeline-centered .timeline-entry:after {
            clear: both;
        }

        .timeline-centered .timeline-entry:before, .timeline-centered .timeline-entry:after {
            content: " ";
            display: table;
        }

        .timeline-centered .timeline-entry:after {
            clear: both;
        }

        .timeline-centered .timeline-entry.begin {
            margin-bottom: 0;
        }

        .timeline-centered .timeline-entry.left-aligned {
            float: left;
        }

            .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner {
                margin-left: 0;
                margin-right: -18px;
            }

                .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-time {
                    left: auto;
                    right: -100px;
                    text-align: left;
                }

                .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-icon {
                    float: right;
                }

                .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-label {
                    margin-left: 0;
                    margin-right: 70px;
                }

                    .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-label:after {
                        left: auto;
                        right: 0;
                        margin-left: 0;
                        margin-right: -9px;
                        -moz-transform: rotate(180deg);
                        -o-transform: rotate(180deg);
                        -webkit-transform: rotate(180deg);
                        -ms-transform: rotate(180deg);
                        transform: rotate(180deg);
                    }

        .timeline-centered .timeline-entry .timeline-entry-inner {
            position: relative;
            margin-left: -20px;
        }

            .timeline-centered .timeline-entry .timeline-entry-inner:before, .timeline-centered .timeline-entry .timeline-entry-inner:after {
                content: " ";
                display: table;
            }

            .timeline-centered .timeline-entry .timeline-entry-inner:after {
                clear: both;
            }

            .timeline-centered .timeline-entry .timeline-entry-inner:before, .timeline-centered .timeline-entry .timeline-entry-inner:after {
                content: " ";
                display: table;
            }

            .timeline-centered .timeline-entry .timeline-entry-inner:after {
                clear: both;
            }

            .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time {
                position: absolute;
                left: -100px;
                text-align: right;
                padding: 10px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time > span {
                    display: block;
                }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time > span:first-child {
                        font-size: 15px;
                        font-weight: bold;
                    }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time > span:last-child {
                        font-size: 12px;
                    }

            .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon {
                background: #fff;
                color: #737881;
                display: block;
                width: 40px;
                height: 40px;
                -webkit-background-clip: padding-box;
                -moz-background-clip: padding;
                background-clip: padding-box;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
                border-radius: 20px;
                text-align: center;
                -moz-box-shadow: 0 0 0 5px #f5f5f6;
                -webkit-box-shadow: 0 0 0 5px #f5f5f6;
                box-shadow: 0 0 0 5px #f5f5f6;
                line-height: 40px;
                font-size: 15px;
                float: left;
            }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-primary {
                    background-color: #303641;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-secondary {
                    background-color: #ee4749;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-success {
                    background-color: #00a651;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-info {
                    background-color: #21a9e1;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-warning {
                    background-color: #fad839;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-danger {
                    background-color: #cc2424;
                    color: #fff;
                }

            .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label {
                position: relative;
                background: #f5f5f6;
                padding: 1em;
                margin-left: 60px;
                -webkit-background-clip: padding-box;
                -moz-background-clip: padding;
                background-clip: padding-box;
                -webkit-border-radius: 3px;
                -moz-border-radius: 3px;
                border-radius: 3px;
            }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label:after {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 9px 9px 9px 0;
                    border-color: transparent #f5f5f6 transparent transparent;
                    left: 0;
                    top: 10px;
                    margin-left: -9px;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2, .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p {
                    color: #737881;
                    font-family: "Noto Sans",sans-serif;
                    font-size: 12px;
                    margin: 0;
                    line-height: 1.428571429;
                }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p + p {
                        margin-top: 15px;
                    }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 {
                    font-size: 16px;
                    margin-bottom: 10px;
                }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 a {
                        color: #303641;
                    }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 span {
                        -webkit-opacity: .6;
                        -moz-opacity: .6;
                        opacity: .6;
                        -ms-filter: alpha(opacity=60);
                        filter: alpha(opacity=60);
                    }

  #app {
    width: 95%;
    margin: 0 auto;
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
.short {
  width: 65%;
  float: right;
}

  .VuePagination {
    text-align: center;
  }

  .list-group-item {
    color:black
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
  .wordc{
    min-width: 300px;
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
  import app from '@/app'
  import wordcloud from 'vue-wordcloud'
  import VueHighlightJS from 'vue-highlightjs'
  import store from '../_store'
  import hljs from 'highlight.js'
  import draggable from 'vuedraggable'
  import { mapState, mapActions } from "vuex";
  export default {
     components: {
            draggable,
            wordcloud
        },
    data() {
  
      return {
        sortKey: '',
        columns: ['more','title','category','delete'],
        reverse: false,
        search: '',
        myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
        showPlaces: false,
        email: {},
        user:{},
        loading: false,
        postsjava: [],
        toptags: [],
        postsapproved: [],
        postsnew: [],
        poststoread: [],
        poststodo: [],
        fontSize: [10, 80],
        postsarchive: [],
        allTags: {},
        userPrefs: {},
      options: [
         {text: 'None', value: 'None'},
        {text: 'Frequemt Reads', value: 'frequent'},
        {text: 'Recent Posts', value: 'recent'},
        {text: 'Approvals', value: 'approvals'},
        {text: 'To Dos', value: 'todo'},
        {text: 'To Read', value: 'toread'},
        {text: 'Archive', value: 'archive'}
      ],
      optionsRightTop: [
         {text: 'None', value: 'None'},
        {text: 'Frequemt Reads', value: 'frequent'},
        {text: 'Recent Posts', value: 'recent'},
              {text: 'Approvals', value: 'approvals'},
        {text: 'To Dos', value: 'todo'},
        {text: 'To Read', value: 'toread'},
        {text: 'Archive', value: 'archive'}
      ],
      optionsRightBotton: [
         {text: 'None', value: 'None'},
        {text: 'Frequemt Reads', value: 'frequent'},
        {text: 'Recent Posts', value: 'recent'},
                {text: 'Approvals', value: 'approvals'},
        {text: 'To Dos', value: 'todo'},
        {text: 'To Read', value: 'toread'},
        {text: 'Archive', value: 'archive'}
      ],
      optionsRightBotton: [
         {text: 'None', value: 'None'},
        {text: 'Frequemt Reads', value: 'frequent'},
        {text: 'Recent Posts', value: 'recent'},
            {text: 'Approvals', value: 'approvals'},
        {text: 'To Dos', value: 'todo'},
        {text: 'To Read', value: 'toread'},
        {text: 'Archive', value: 'archive'}
      ],
        model: {},
        family: {},
        approved: {
          approved: "1"
        },
        tagcat: {
          tagid: "2"
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
      console.log(this.account.user.email)
      console.log(this.email)
      this.family = await api.getFamily(this.email)
      this.model = Object.assign({}, this.family, this.approved)
      this.allTags = await api.getTags()
    },
    methods: {
      sortBy: function(key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      },
          wordClickHandler(tag, count, vm) {
      console.log('wordClickHandler', tag, count, vm);
    },
      async refreshPosts() {
        this.email = this.account.user.email
        this.family = await api.getFamily(this.email)
        this.postsjava = await api.getMostReadPosts(this.family.familyid)
        this.postsapproved = await api.getApprovalPosts(this.family.familyid)
        this.postsnew = await api.getRecentPosts(this.family.familyid)
        this.userPrefs = await api.getPrefs(this.family.familyid)
        this.poststodo = await api.getToDos(this.family.familyid)
        this.poststoread = await api.getToRead(this.family.familyid)
        this.toptags = await api.getTopTags()
        console.log(this.poststoread)
        this.postsarchive = await api.getArchived(this.family.familyid)
      },
      updateSelected(selectedItem) {
        this.selectedPlace = selectedItem;
        this.showPlaces = true;
      },
        async updateReadCount(id) {
        await api.updateReadCount(id)
        console.log(id)
      },
          splitJoin(theText){
        if(theText) {
          return theText.split(',');
        } else {
          return null;
        }
      	
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
      async setPrefs() {
        console.log(this.userPrefs)
        console.log(this.family.familyid)
        await api.setPrefs(this.family.familyid, this.userPrefs)
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
  }
</script>