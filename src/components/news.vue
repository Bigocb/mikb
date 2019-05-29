<template>
    <b-container fluid class="container">

        <b-row class="row">
            <b-col>
                <b-row>
                    <h4>News Feed</h4>
                </b-row>
                <b-row>
            <div v-for="article in articles"  v-bind:key="article.url">
             <div>
            <b-card class="dash">
                <!--<router-link  v-on:click.native="updateReadCount(article.id)" :to="'/detail/' + post.id">-->

                    <div>
                        <h4 v-html="article.title"></h4>
                    </div>
                <!--</router-link>-->
                <div>
                    <p v-html="article.description"></p>
                </div>
            </b-card>
        </div>
    </div>
                </b-row>
            </b-col>
        <b-col>
            <b-row>
                <h4>Available Sources</h4>
            </b-row>
            <b-row>
                    <multiselect v-model="value" label="name" :options="sources"></multiselect>
                    <button v-on:click="addNewsSource(value)">Add Source</button>
            </b-row>
            <b-row>
                     <h4>Selected Sources</h4>
            </b-row>
            <b-row>
                <div v-for="source in usersources"  v-bind:key="source.prefvalue">

                    <p> <b-badge pill variant="primary">{{source.prefvalue}}</b-badge></p>
                </div>

            </b-row>
            <b-row>
            </b-row>
        </b-col>
        </b-row>
    </b-container>
</template>
<style>
    .col {
        margin-right: 15px;
    }
</style>
<script>

    import {mapState, mapActions} from "vuex";
    import api from '@/api'
    export default {
        name: "news",
        components: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },
        data() {
            return {
                value: {
                    familyid : {}
                },
                data: {
                    sourcedata: {},
                    family : {}
                },
                options: ['list', 'of', 'options'],
                articles: [],
                sources:[],
                usersources: [],
                names: []
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
        },
        methods: {
            async refreshPosts(){
                this.sources = await api.getNewsSources();
                this.usersources = await api.getUsersSources(this.account.user.familyid);
                this.data.family = Object.assign({}, this.account.user);
                if(this.usersources) {
                    this.articles = await api.getUsersNews(this.account.user.familyid);
                }
            },
            async addNewsSource() {
                console.log('pre',this.data);
                this.data.sourcedata = Object.assign({}, this.value);
                console.log('post',this.data);
                await api.addNewsSource(this.data);
                this.refreshPosts();
            }
        }
    }
</script>

<style scoped>

</style>