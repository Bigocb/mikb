<template>
  <div>
    <h1>Hi {{account.user.firstname}}!</h1>
    <p>You're logged in with Vue + Vuex & JWT!!</p>
    <h3> from secure api end point:</h3>
    <em v-if="users.loading">Loading users...</em>
    <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
    <ul v-if="users.items">
      <li v-for="user in users.items" :key="user.id">
        {{user.firstname + ' ' + user.lastname}}
        <span v-if="user.deleting">
          <em>- Deleting...</em>
        </span>
        <span v-else-if="user.deleteError" class="text-danger">- ERROR: {{user.deleteError}}</span>
        <span v-else>
          -
          <a @click="deleteUser(user.id)" class="text-danger">Delete</a>
        </span>
      </li>
    </ul>
    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>

<style>
.hero {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero .lead {
  font-weight: 200;
  font-size: 1.5rem;
}
</style>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all
    })
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll"
    })
  }
};
</script>
