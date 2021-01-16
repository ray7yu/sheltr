import axios from 'axios'


const getPublicHousingDevelopments (latmin, latmax, longmin, longmax) => (
    axios.get('https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Public_Housing_Developments/FeatureServer/0/query?where=LAT%20%3E%3D%20'+ 
    latmin.toString() + 
    '%20AND%20LAT%20%3C%3D%20' + 
    latmax.toString() +
    '%20AND%20LON%20%3E%3D%20'+
    longmin.toString() +
    '%20AND%20LON%20%3C%3D%20'+
    longmax.toString() +
    '&outFields=STD_ADDR,STD_CITY,STD_ST,STD_ZIP5&outSR=4326&f=json').then(res=>{
        console.log(res.data)
        return res.data
    })
)