<template>
  <div id="header">
    <div id="logo">
      <div style="min-height: 60px; min-width: 60px">
        <img
          style="height: 100%; width: 100%"
          src="../assets/hackernews-logo.png"
        />
      </div>
      <p>Search<br />Hacker News</p>
    </div>

    <div id="search-box">
      <select name="stories" id="select-stories" v-model="selected">
        <option value="" disabled selected>Search</option>
        <option value="story">Top Stories</option>
        <option value="show_hn">Show Stories</option>
        <option value="ask_hn">Ask Stories</option>
      </select>

    <input type="search" v-model="search_input" @keyup.enter = "getSearchInputStories()">
    </div>
    <button id="log-in-btn"><router-link :to="{ path: '/login' }">Log in</router-link></button>
  </div>
</template>

<script>
import HackernewsApi from '../api/HackerNewsAPI'
import { eventBus } from '../main'

export default {
   name: 'HeaderComponent',
   data: () => {
     return {
       selected: '',
       search_input: '',
       pageNum: 0,
       searchInputStories: null,
       HackernewsApi: new HackernewsApi()
     }
  },

  created() {
    eventBus.$on('changedPageNum', (data) => {
      this.pageNum = data
    })
  },

  methods: {
      getSearchInputStories: function() {
        this.HackernewsApi.userSearchInput(this.search_input, this.selected, this.pageNum)
        .then((data) => this.searchInputStories = data)
        .then((data) => data)
        .then(() => eventBus.$emit('changedStoriesData', this.searchInputStories)) 
      },
    }
  }
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
}

#logo {
    display: flex;
    align-items: flex-end;
}

#logo > p {
    color: gray;
    margin: 0px;
    margin-left: 10px;
    font-size: 17px;
}

input {
  border: 1px solid gray;
  border-left: 1px solid rgb(189, 189, 189);
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  height: 35px;
  width: 25vw
}


#select-stories {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  height: 35px;
  border-right: none;
  width: 120px;
}

#log-in-btn {
    border: none;
    box-shadow: 0 4px 14px -4px rgb(206, 199, 199);
    border-radius: 25px;
    padding: 5px 20px;
    background-color: rgb(255, 116, 24);
    color: white;
    height: 40px;
}

a {
   text-decoration: none;
   width: 100%;
   color: white;
}

.btn-info:hover {
  background-color: white;
}

@media only screen and (max-width:576px) {
  #search-box {
    display: none;
  }

}
</style>



