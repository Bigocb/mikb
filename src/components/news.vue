<template>
    <b-container fluid class="container">

        <b-row class="row">
            <b-col>
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
            </b-col>
        </b-row>
    </b-container>
</template>

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
                articles: []
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
                this.articles = await api.getUsersNews(this.account.user.familyid)
            }
        }
    }
</script>

<style scoped>

</style>