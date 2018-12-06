<template>
<div>

 
<div v-if="showPlaces == true" class="dash">
<b-form-textarea rows="1" v-model="newList.name"></b-form-textarea>
<a href="#" @click.prevent="addList(newList.newList)"> <img src="../../assets/png/x.png"></a>
</div>
<kanban-board :stages="splitJoin(stages.name)" :blocks="blocks" @update-block="updateBlock" >
 <div v-for="stagey in splitJoin(stages.name)" :slot="stagey">
  <a href="#" @click.prevent="deleteList(splitJoin(stagey))"><img src="../../assets/png/x.png"></a>
  {{stagey}}
  </div>
 
  
   <div  v-for="block in blocks" :slot="block.id">
   
    <p ><router-link  v-on:click.native="updateReadCount(block.id)" :to="'/detail/' + block.id">
                <div class="fo"> 
              {{block.title}}
            </div>
           </router-link>          <a href="#" @click.prevent="deleteListPost(block.id, block.status)"><img src="../../assets/png/x.png"></a>
 </p>
           </div>

</kanban-board>
        <div >
      <a class="tagright" href="#" @click="showPlaces = true"><img src="../../assets/png/plus.png"></a>
      </div>
</div>
</template>
<style>
* {
  font-family: 'Lato', 'Avenir', sans-serif;
}

.fo{
    font-size: 3vh;
}

.resources-list {
  margin-top: 15px;
  padding: 0;
  list-style: none;
}

.resources-list li {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 10px 40px 10px 0;
  border-bottom: 1px solid rgba(51, 51, 51, 0.1);
  position: relative;
}

.resources-list li:last-child {
  border-bottom: none;
}

.resources-list li .resource-title {
  font-size: 1em;
  color: #333;
}

.resources-list li .version {
  opacity: 0.7;
  margin-left: 5px;
  font-size: 75%;
}

.resources-list li .resource-description,
.resources-list li .resource-url {
  font-size: 0.8em;
  color: #999;
  margin-top: 5px;
}

.resources-list li .resource-url {
  margin-top: 0;
}

.resources-list li .resource-description:empty {
  display: none;
}

.resources-list li .delete-controls {
  position: absolute;
  right: 0;
  width: 40px;
  text-align: center;
  color: #999;
  cursor: pointer;
}

.resources-list li .delete-controls:hover,
.resources-list li .delete-controls:focus {
  color: red;
}

</style>
<style lang="scss">
@import 'node_modules/vue-kanban/src/assets/kanban.scss';
</style>
<script src="https://unpkg.com/vue-multiselect@2.1.0"></script>
<style>
  @import 'https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css';
</style>
<script>
  import api from '@/api'
  import Multiselect from 'vue-multiselect'
  import VueHighlightJS from 'vue-highlightjs'
  import store from '../_store'
  import hljs from 'highlight.js'
  import draggable from 'vuedraggable'
  import { mapState, mapActions } from "vuex";
  export default {
     components: {
            draggable,
            Multiselect
        },
    data() {
  
      return {
          stages: null,
  blocks: [
            {
                id: 1,
                status: 'on-hold',
                title: 'Welcome'
            },
            {
                id: 2,
                status: 'on-hold',
                title: 'to'
            },
            {
                id: 3,
                status: 'in-progress',
                title: 'the'
            },
            {
                id: 4,
                status: 'in-progress',
                title: 'danger'
            },
            {
                id: 5,
                status: 'in-progress',
                title: 'zone'
            }
  ],
        sortKey: '',
        columns: ['more','title','category','delete'],
        reverse: false,
        search: '',
        showPlaces: false,
        email: {},
        user:{},
        loading: false,
        postsjava: [],
        postsapproved: [],
        updateData: {},
        postsnew: [],
        poststoread: [],
        poststodo: [],
        postsarchive: [],
  	options: [
    	
    ],
    optionsProxy: [],
    selectedResources: [],
    showLoadingSpinner: false,
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
        id: {},
        newList:{},
        deletingList: {},
        deleteFromList: {},
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
        	const value = ''
  	this.cdnRequest(value)
      this.family = await api.getFamily(this.email)
      this.model = Object.assign({}, this.family, this.approved)
      this.allTags = await api.getTags()
    },
    methods: {
      sortBy: function(key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      },
              async addList() {
            console.log(this.newList)
            await api.createUserLists(this.family.familyid,this.newList)
               this.posts = await api.getSinglePost(this.$route.params.id)
               this.allTags = await api.getTags()
               this.newList = ''
               this.showPlaces = false
               this.refreshPosts()
        },
      customLabel (option) {
      return `${option.name} - ${option.version}`
    },
    updateSelected(value) {
      value.forEach((resource) => {
      	// Adds selected resources to array
        this.selectedResources.push(resource)
      })
      // Clears selected array
      // This prevents the tags from being displayed
      this.optionsProxy = []
    },
    cdnRequest(value) {
    	this.$http.get(`https://api.cdnjs.com/libraries?search=${value}&fields=version,description`).then((response) => {
        // get body data
        this.options = []
        response.body.results.forEach((object) => {
          this.options.push(object)
        });
				this.showLoadingSpinner = false
      }, (response) => {
        // error callback
      })
    },
      updateBlock(id, status) {
      this.blocks.find(b => b.id === Number(id)).status = status;
      this.updateData = this.blocks.find(b => b.id === Number(id))
      console.log(this.updateData)
      api.updateUserListPosts(this.family.familyid,this.updateData)
    },
    searchQuery(value) {
    	this.showLoadingSpinner = true
    	// GET
      this.cdnRequest(value)
    },
    removeDependency(index) {
      this.selectedResources.splice(index, 1)
    },
      async refreshPosts() {
        this.email = this.account.user.email
        this.family = await api.getFamily(this.email)
        this.postsjava = await api.getMostReadPosts(this.family.familyid)
         this.stages = await api.getUserLists(this.family.familyid)
        this.blocks = await api.getUserListPosts(this.family.familyid)
        this.postsapproved = await api.getApprovalPosts(this.family.familyid)
        this.postsnew = await api.getRecentPosts(this.family.familyid)
        this.userPrefs = await api.getPrefs(this.family.familyid)
        this.poststodo = await api.getToDos(this.family.familyid)
        this.poststoread = await api.getToRead(this.family.familyid)
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
    async deleteList(name) {
        this.deletingList.name = Object.assign(name[0])
        console.log(this.deletingList)
        this.tags = await api.deleteUserLists(this.family.familyid, this.deletingList)
        console.log(this.deletingList)
               this.refreshPosts()
      },
    async deleteListPost(postid,listid) {
        this.deleteFromList.postid = Object.assign(postid)
        this.deleteFromList.listid = Object.assign(listid)
        await api.deleteUserListPosts(this.family.familyid, this.deleteFromList)
               this.refreshPosts()
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