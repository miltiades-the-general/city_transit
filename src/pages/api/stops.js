const axios = require("axios");

const fetchStops = (bounds, agencies) => {
    const geo_area = `${bounds._ne.lat},${bounds._ne.lng}|${bounds._sw.lat},${bounds._sw.lng}`
    const options = {
      method: 'GET',
      url: 'https://transloc-api-1-2.p.rapidapi.com/stops.json',
      params: {
        geo_area: geo_area,
        callback: 'call',
        agencies: agencies
      },
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
        'X-RapidAPI-Host': 'transloc-api-1-2.p.rapidapi.com'
      }
    };
    
    return axios.request(options).then(function (response) {
      console.log(response.data);
      return response.data;
    }).catch(function (error) {
      console.error(error);
    });
}

export default fetchStops;