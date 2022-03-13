import Vue from "vue";
import Router from "vue-router";
import ListStories from "../views/ListStories.vue";
import UserProfile from "../views/UserProfile.vue";
import LogIn from "../views/LogIn.vue"
import Comments from "../views/Comments.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/stories/:storyType",
      name: "ListStories",
      component: ListStories
    },
    {
      path: "/user/:name",
      name: "UserProfile",
      component: UserProfile
    },
    {
      path: "/login",
      name:"LogIn",
      component: LogIn
    },

    {
      path: '/comments/:storyId',
      name: 'Comment',
      component: Comments
    }
  ]
});