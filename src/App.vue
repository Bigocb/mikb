<template>
<div id="app">
    <b-navbar class="navbar navbar-expand-lg navbar-dark bg-primary" toggleable="no">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">KB</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <!-- <b-nav-item to="/dashboard">Dashboard</b-nav-item> -->
                <!-- <b-nav-item to="/posts-manager">Feed</b-nav-item> -->
                <b-nav-item to="/new-post"><img src="../assets/png/plus-2x.png"></b-nav-item>
                <!-- <b-nav-item href="#" @click.prevent="login" v-if="!activeUser">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item> -->
                <b-nav-item href="#" v-b-modal.modal2><img src="../assets/png/magnifying-glass-2x.png"></b-nav-item>
                <b-nav-item href="#" v-b-modal.modal3><img src="../assets/png/tags-2x.png"></b-nav-item>
                <b-nav-item to="/user"><img src="../assets/png/person-2x.png"></b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />

    <b-modal class="navbar navbar-expand-lg navbar-dark bg-primary" ref="modal2" id="modal2" title="Search Knowledge">
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
.label {
  white-space: nowrap;
      margin-right:5px;
           margin-left:5px;
           margin-top:3px;
    width: 100px;
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
export default {

    name: 'app',
    data() {
        return {
            activeUser: null,
            email: {},
            posts: [],
            search: '',
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

        async refreshPosts() {
      this.email = this.account.user.email
      this.family = await api.getFamily(this.email)
            this.posts = await api.getPosts(this.family.familyid)
            this.allTags = await api.getTags()
        },
        async updateReadCount(id) {
            await api.updateReadCount(id)
            console.log(id)
        },
        hideModal() {
            this.$refs.modal2.hide()
        },
                    hideModal() {
            this.$refs.modal3.hide()
        }
    }
}
</script>
