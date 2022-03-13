<template>
  <div id="news-feed">
    <div id="news-feed-nav">
      <div id="pagination-btns">
        <button id="prev-btn" @click="changePageNumber(-1)">Previous</button>
        <button id="next-btn" @click="changePageNumber(1)">Next</button>
        <span style="color: gray; font-size: small">page: 
          <span id="page-number">{{ pageNum }}</span>
        </span>
      </div>

      <div id="sort-by">
        <span style="color: gray">SORT BY:  </span>
        <label for="popularity">POPULARITY</label>
        <input type="radio" id="popularity" name="story-sort" checked @click="changeSortingValue('popularity')"/>
        <label for="date" >DATE</label>
        <input type="radio" id="popularity" name="story-sort" @click="changeSortingValue('date')"/>
      </div>

      <!-- <div id="time-filters">
        <label for="24h">Last 24h</label>
        <input type="radio" id="24h" name="time" checked />
        <label for="past-week">Past Week</label>
        <input type="radio" id="past-week" name="time" />
        <label for="past-month">Past Month</label>
        <input type="radio" id="past-month" name="time" />
      </div> -->
    </div>
    <SpinnerComponent v-show="!isLoaded"></SpinnerComponent>
    <StoryItem
      v-show="isLoaded"
      v-for="story in stories"
      :story="story"
      :key="story.id"
    ></StoryItem>
  </div>
</template>

<script>
import StoryItem from "../components/StoryItem.vue";
import HackernewsAPI from "../api/HackerNewsAPI.js";
import SpinnerComponent from "../components/Spinner.vue";
import { eventBus } from "../main";

export default {
  name: "ListStories",
  data: function () {
    return {
      stories: [],
      comments: [],
      pageNum: 0,
      sortBy: 'popularity',
      isLoaded: true,
      Hackernews: new HackernewsAPI(),
    };
  },
  components: {
    StoryItem,
    SpinnerComponent,
  },

  created() {
    eventBus.$on("changedStoriesData", (data) => {
      this.stories = data;
      this.pageNum = 0;
    });

    this.render(this.pageNum)
  },

mounted() {
      eventBus.$on("changedStoriesData", (data) => {
      this.stories = data;
      this.pageNum = 0;
    })
},

  watch: {
    "$route.params.storyType": {
      handler() {
        this.pageNum = 0;
        this.render(0)
      },
    },

    pageNum: {
      handler() {
        this.render(this.pageNum)
      },
    },
  },

  methods: {
    changePageNumber: function (x) {
      if (x == -1 && this.pageNum == 0) {
        return;
      } else {
        this.pageNum += x;
      }
    },

    render:  function(pageNumber) {
      this.isLoaded = false;
      this.Hackernews.fetchStories(this.$route.params.storyType, pageNumber, this.sortBy)
          .then((data) => (this.stories = data))
          .then(() => (this.isLoaded = true));
    },

    changeSortingValue:  function(x) {
      this.sortBy = x;
      this.pageNumber = 0;
      this.render(0)
    },
  },
};
</script>

<style scoped>
#news-feed {
  width: 100%;
  background-color: white;
}

#news-feed-nav {
  width: 100%;
  border-top: 1px solid rgb(221, 221, 221);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  color: rgb(59, 59, 59);
}

#sort-by {
  display: flex;
  align-items: center;
}
#sort-by,
#pagination-btns {
  display: flex;
  color: black;
  gap: 15px;
}
</style>