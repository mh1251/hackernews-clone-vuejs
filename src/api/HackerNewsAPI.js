import axios from 'axios'

export default class HackernewsAPI {
  constructor() {
    this.BaseUrl = `https://hacker-news.firebaseio.com/v0/`;
    this.item_url = `${this.BaseUrl}item/`;
    this.user_url = `${this.BaseUrl}user/`;
  }

  fetchStories = (popularityFilter, pageNumber, sortBy) => {
    console.log(sortBy)
    return fetch(`${this.BaseUrl}${popularityFilter}.json?orderBy="$key"&limitToFirst=200&print=pretty`)
      .then((data) => data.json())
      .then((data) => {
        let stories = data
          .map(x => fetch(`${this.item_url}${x}.json`))         

        return Promise.all(stories)
          .then((responses) => {
            return Promise.all(responses.map((response) => {
              return response.json();
            }));
          })
          .then(data => this.sortByType(data, sortBy))
          .then(data => data.slice(pageNumber * 10, pageNumber * 10 + 10))
          .catch((error) => {
            console.log(error);
          });
      });
  }

  sortByType = (returnedData, sortType) => {
    if(sortType == 'popularity'){
      return returnedData.sort((a,b) => b.score - a.score)
    }else{
      return returnedData.sort((a,b) =>  b.time - a.time)
    }
  }
 

  getUser = (user) => {
    return fetch(`${this.user_url}${user}.json`).then(res => res.json());
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
}

