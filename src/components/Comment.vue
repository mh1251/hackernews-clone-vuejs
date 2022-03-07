<template>
  <div id="container">
    <div id="user-comment-info">
      <div>by 
        <router-link :to="'/user/' + comment.by">{{ comment.by }}</router-link>
        <span> {{ comment.time }} ago </span>
      </div>
      <div id="comment-text" v-html="comment.text">{{comment.text}}</div>
      <div> comments: {{comment.kids}}</div>
    </div>

<div v-if="comment.kids !== []">
  <ul class="comment-replies">
      <comment v-for="kid in comment.kids" :key="kid.id" :comment="kid"></comment>
  </ul>
</div>
    
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["comment"],
};
</script>

<style scoped>
#user-comment-info {
  border: 1px solid black;
}

.comment-replies {
  margin: 10px;
}
</style>