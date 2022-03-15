import axios from 'axios'

export default class HackernewsAPI {
  constructor() {
    this.BaseUrl = `https://hacker-news.firebaseio.com/v0/`;
    this.item_url = `${this.BaseUrl}item/`;
    this.user_url = `${this.BaseUrl}user/`;
  }

  fetchStories = (storyType, pageNumber, sortBy) => {
    let stories = [];
     return axios.get(`${this.BaseUrl}${storyType}.json?orderBy="$key"&limitToFirst=100&print=pretty`)
      .then((data) => {
       let fetchedData = data.data.map((x) => axios.get(`${this.item_url}${x}.json`))
        return Promise.all(fetchedData).then((data) => data)
      })
          .then((data) => {
            data.map((story) => {
              stories.push(story.data)
            })
          })
          .then(() => stories =  this.sortByType(stories, sortBy))
          .then(() => stories = stories.slice(pageNumber * 10, pageNumber * 10 + 10))
          .then(() => stories)
          .catch((error) => {
            console.log(error);
      });
  }

  getUser = (user) => {
    return axios.get(`${this.user_url}${user}.json`).then(res => res.data);
  }

//Napraveno so drugo api - ALGOLIA API za search-anje samo nema za jobs (ima frontpage stories(topstories), showHN, askHN)
  userSearchInput = (value, storyType, pageNumber) => {
    let stories = [];
    return axios.get(`http://hn.algolia.com/api/v1/search?query=${value}&tags=${storyType}&page=${pageNumber}`)
      .then((response) => {
        let filteredStories = response.data.hits
        filteredStories.map((story) => {
          stories.push(
            {
              by: story.author,
                descendants: story.num_comments,
                id: story.objectID,
                kids: [],
                score: story.points,
                time: story.created_at_i,
                title: story.title,
                type: story._tags[0],
                url: story.url
            })
          })
      })
      .then(() => stories)
  }

  sortByType = (returnedData, sortType) => {
    if(sortType == 'popularity'){
      return returnedData.sort((a,b) => b.score - a.score)
    }else{
      return returnedData.sort((a,b) =>  b.time - a.time)
    }
  }
}

