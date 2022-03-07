<template>
    <div id="user-data">
        <p>user: <span class="highlight">{{ user.id }}</span></p>
        <p>Created: <span class="highlight">{{ new Date(user.created*1000).toLocaleDateString("en-US")}}</span></p>
        <p>Karma: <span class="highlight">{{ user.karma }}</span></p>
        <p>About: <span class="highlight" v-html="user.about">{{ user.about }}</span></p>
    </div>
</template>

<script>
import HackerNewsAPI from '../api/HackerNewsAPI.js'
export default {
name: 'UserProfile',
data: () => {
    return {
        Hackernews: new HackerNewsAPI(),
        user: {}
    }
},

created() {
  this.Hackernews.getUser(this.$route.params.name).then((data)=> this.user = data)
}
}
</script>

<style scoped>
#user-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding:50px;
}

p {
    font-weight: bold;
    text-align: center
}

p>span {
    font-weight: 200;
}
</style>