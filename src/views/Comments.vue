<template>
  <div style="margin: 5px; background-color: white">
    <SpinnerComponent v-show="!isLoaded"></SpinnerComponent>
    <div v-show="storyItem">
      <div id="main-story-info">
        <div id="title">
          <span class="highlight">{{ storyItem.title }}</span>
        </div>
        <div id="story-info">
          <span
            ><span class="highlight">{{ storyItem.score }}</span> points</span
          >
          <span
            >by
            <span class="highlight"
              ><router-link :to="'/user/' + storyItem.by">{{
                storyItem.by
              }}</router-link></span
            ></span
          >
          <span
            >submited on:<span class="highlight">{{
              storyItem.time
            }}</span></span
          >
          <span
            ><span class="highlight">{{ storyItem.descendants }}</span>
            comments</span
          >
        </div>
      </div>

      <comment v-for="kid in storyItem.kids" :key="kid.id" :comment="kid"></comment>
    </div>
  </div>
</template>

<script>
import comment from "../components/Comment.vue";
import SpinnerComponent from "../components/Spinner.vue";

export default {
  name: "Comments",
  data: function () {
    return {
      storyItem: {},
      id: this.$route.params.storyId,
      isLoaded: false
    };
  },
  components: {
    comment,
    SpinnerComponent,
  },

  methods: {
    getKids: function () {
      this.storyItem = {}
      fetch(`https://hacker-news.firebaseio.com/v0/item/${this.id}.json`)
        .then((response) => response.json())
        .then((response) => (this.storyItem = response))
        .then(() => {
          return this.populateComments(this.storyItem).then(() => this.isLoaded = true)

         
          // this.storyItem.kids.forEach((x) => {
          //   fetch(`https://hacker-news.firebaseio.com/v0/item/${x}.json`)
          //     .then((data) => data.json())
          //     .then((data) => {
          //       this.kids.push(data);
          //     })
          //     .then(() => this.getReplies(this.kids))
          // })
        })
    },

    populateComments: async function (object) {
      if (object.kids) {
        for (let i = 0; i < object.kids.length; i++) {
          let item = await fetch(`https://hacker-news.firebaseio.com/v0/item/${object.kids[i]}.json`).then((data) => data.json());
          object.kids[i] = await item;
          this.populateComments(object.kids[i]);
        }
      }
    },
  },

  created() {
    this.getKids();
  }
};
</script>


<style scoped>
#main-story-info {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.1em;
}

#story-info,
#title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.highlight {
  color: #0d6efd;
}
</style>

           