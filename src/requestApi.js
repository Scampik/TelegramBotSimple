import axios from 'axios';

const  request = async (input = 'cat') => {
    // const input = document.querySelector('input').value;
    // console.log('kek',input)
    
    const gifApi = 'HvnTVXXC8uv8fy4iA9WVjl2tUd1MAldb';
    const gifUrl = `https://api.giphy.com/v1/gifs/search?q=${input}&rating=g&api_key=${gifApi}`;
    
    const result = await fetch(gifUrl)
    .then(function(data) {
      return data.json()
    })
    .then(function(json){
    //   console.log(json.data[0].images.fixed_height.url)
      const imgPath = json.data[0].images.fixed_height.url
      return imgPath;
    })  
    return result;
    // console.log(result)
  }

//   request()
export default request;
