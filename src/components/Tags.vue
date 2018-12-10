<template>
<div class="dash">
    <h4> Posts for tag: {{tag}} </h4>
    <div v-for="post in posts" v-bind:key="post.id">
        <p>
            <router-link v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
                <b-card class="dash">
                    <div v-html="post.title">
                    </div>
                </b-card>
            </router-link>
        </p>
    </div>
</div>
</template>

<style>
@import '~simplemde/dist/simplemde.min.css';
</style>
<style lang="css">
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
@import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/a11y-dark.min.css';

.long {
    column-count: 3;
     -webkit-column-count: 3; /* Chrome, Safari, Opera */
    -moz-column-count: 3; /* Firefox */
    column-count: 3;
    column-gap: 40px;
    column-width: 300px;
}
/* h2 {
    column-span: all;
} */

#app {
    width: 95%;
    margin: 0 auto;
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

.dash {
    margin-top: 20px;
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

export default {
    data() {

        return {
            sortKey: '',
            columns: ['more', 'title', 'category', 'delete'],
            reverse: false,
            search: '',
            showPlaces: false,
            showTags: false,
            loading: false,
            posts: [],
            allTags: {},
            newTag: {},
            tag: {},
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
    methods: {
        sortBy: function (key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        },
        async refreshPosts() {
            console.log(this.$route.params.id)
            this.posts = await api.getTagPosts(this.$route.params.id)
            this.tag = this.$route.params.id
            this.allTags = await api.getTags()

        },
                async updatePost(id) {
            console.log(id)
            this.posts = await api.getTagPosts(id)
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
            this.showTags = false;
            this.hideModal()
        },
        async deleteTags() {
            console.log(this.model.id)
            await api.deleteTags(this.model.id)
            this.hideModal()
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
