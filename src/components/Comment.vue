<template>
  <div id="container" :style="nodeMargin">
    <div id="user-comment-info" v-show="comment.by">
      <div>
        by
        <router-link :to="'/user/' + comment.by">{{ comment.by }}</router-link>
        <span> {{ comment.time }} ago </span>
      </div>
      <div id="comment-text" v-html="comment.text">{{ comment.text }}</div>

      <div v-if="comment.kids" style="font-weight: 500">replies: {{ comment.kids.length }}</div>
      <button
        v-show="comment.kids"
        v-if="!toogleChildren"
        id="toggle"
        @click="toggleChildren"
      >
      {{button.text}}
      </button>
    </div>

    <div v-if="comment.kids" v-show="showChildren">
      <ul class="comment-replies">
        <comment
          v-for="kid in comment.kids"
          :key="kid.id"
          :comment="kid"
          :spacing="spacing + 10"
        ></comment>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  data: function () {
    return {
      showChildren: false,
      button: {
      text: 'Show replies +'
    }
    };
  },
  props: {
    comment: {
      type: Object || Number
    },
    spacing: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
      this.button.text = this.showChildren ? 'Hide replies -' : 'Show replies +';
    },
  },

  computed: {
    nodeMargin() {
      return {
        "margin-left": `${this.spacing}px`,
      };
    },
  },
};
</script>

<style scoped>
#user-comment-info {
  border: 1px solid rgb(201, 197, 197);
  padding: 10px 15px;
}

#container {
  margin-bottom: 5px;
}

.comment-replies {
  margin: 10px;
}
</style>