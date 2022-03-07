<template>
    <li>
        <p id="story-title">
          <a id="story-headline" :href="story.url">{{story.title}}</a> 
        </p>
        <p id="story-info">
          <span><span class="highlight" id="score">{{story.score}}</span> points</span>

          <span>by </span><span class="highlight" id="user">
            <router-link :to="{ path: '/user/' + story.by }">{{story.by}}</router-link></span>

          <span>from <span class="highlight" id="time-stamp">{{ getFormatedTime(story.time) }} ago</span> </span>

            <span id="comments">
              <router-link :to="{ path: '/comments/' + story.id }">{{story.descendants}}</router-link> 
              comments 
              </span>
        </p>
      </li>
</template>


<script>
import { getTime } from '../utils/getTime.js'
export default {
 name: 'StoryItem',
 props: ['story'],
 methods: {
  getFormatedTime: getTime
  }
}
</script>

<style scoped>
li {
    list-style: none;
    border-top: 1px solid rgb(221, 221, 221);
    padding-left: 15px;
    text-align: left
}

#story-headline {
    color: #0d6efd;
    font-weight: 600;
    text-decoration: none;
}

#story-info {
    display: flex;
    gap: 10px;
}

.highlight {
    color: #0d6efd;
}
</style>