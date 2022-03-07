import axios from 'axios'

export default class HackernewsAPI {
  constructor() {
    this.BaseUrl = `https://hacker-news.firebaseio.com/v0/`;
    this.item_url = `${this.BaseUrl}item/`;
    this.user_url = `${this.BaseUrl}user/`;
  }

  fetchStories = (popularityFilter, pageNumber) => {
    return fetch(`${this.BaseUrl}${popularityFilter}.json/`)
      .then((data) => data.json())
      .then((data) => {
        let stories = data
          .slice(pageNumber * 10, pageNumber * 10 + 10)
          .map(x => fetch(`${this.item_url}${x}.json`))


        return Promise.all(stories)
          .then((responses) => {
            return Promise.all(responses.map((response) => {
              return response.json();
            }));
          })
          .then(data => data)
          .catch((error) => {
            console.log(error);
          });
      });
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


/**
 * 
 * 
 * function searchSubmit() {
    let hitsMapped = [];
    axios.get(`http://hn.algolia.com/api/v1/search_by_date?query=${state.searchQuery}`).then((response) => {
        const hits = response.data.hits;
        // Mora da se mapira za da se koristi vo istite templejti (razlicno api).
        hits.forEach((hit) => {
            if (hit.title)
                hitsMapped.push({
                    data: {
                        by: hit.author,
                        descendants: hit.num_comments,
                        id: hit.objectID,
                        kids: [],
                        score: hit.points,
                        time: hit.created_at_i,
                        title: hit.title,
                        type: hit._tags[0],
                        url: hit.url
                    }
                })
        });
        setIsSearched(true);
        setDisplayedResults(hitsMapped);
    });
}




 *     switch (time) {
        case '24':
            setDisplayedResults(getDisplayedResults().filter(item => {
                return item.data.time > yesterday;
            }))
            break;
        case 'week':
            setDisplayedResults(getDisplayedResults().filter(item => {
                return item.data.time > oneWeekAgo;
            }))
            break;
        case 'month':
            setDisplayedResults(getDisplayedResults().filter(item => {
                return item.data.time > oneMonthAgo;
            }))
            break;
        case 'year':
            setDisplayedResults(getDisplayedResults().filter(item => {
                return item.data.time > oneYearAgo;
            }))
            break;
        default:
            console.log('Problem in filterByTime');
    }
}


&tags=${storyType}

 */