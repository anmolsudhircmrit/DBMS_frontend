import React, {useState} from 'react'
import { AutoComplete } from "antd";
import axios from "axios";
import { MAP_MY_INDIA_ID, MAP_MY_INDIA_SECRET, MAP_MY_INDIA_GRANT } from "../constants";

function SourcePlacesSearch({changeSourceSelected}) {

    const opts = [
        { label: "New Delhi, Delhi", value: "New Delhi, Delhi" },
        {
        label:
        "Delhi Cantt Residential Township, Delhi Cantonment, New Delhi District, New Delhi, Delhi, 110010",
        value:
        "Delhi Cantt Residential Township, Delhi Cantonment, New Delhi District, New Delhi, Delhi, 110010",
        },
        {
        label:
        "Delhi Secretariat, Indraprastha Estate, Darya Ganj, Central District, New Delhi, Delhi, 110002",
      value:
        "Delhi Secretariat, Indraprastha Estate, Darya Ganj, Central District, New Delhi, Delhi, 110002",
    },
    {
      label:
        "Delhi Store, Block C, Nehru Vihar, Civil Lines, Central District, New Delhi, Delhi, 110054",
      value:
        "Delhi Store, Block C, Nehru Vihar, Civil Lines, Central District, New Delhi, Delhi, 110054",
    },
    {
      label:
        "Vasundhara Delhi, Block I, Maharani Bagh, Defence Colony, South East District, New Delhi, Delhi, 110065",
      value:
        "Vasundhara Delhi, Block I, Maharani Bagh, Defence Colony, South East District, New Delhi, Delhi, 110065",
    },
  ];
    console.log(MAP_MY_INDIA_GRANT, MAP_MY_INDIA_ID)
  const [searchResults, setsearchResults] = useState([]);
  const [eLoc, setELoc] = useState([])

  const handleOnChange = async (value) => {
    const access_token = localStorage.getItem("placeKey");
    console.log('\n\n\n' + access_token)
    let placeSearchResponse = await axios.get(
      `api/places/geocode?region=ind&itemCount=5&address=${value}`,
      {
        headers: {
          Authorization: access_token,
          Accept: "application/json",
        },
      }
    );
    if(placeSearchResponse && placeSearchResponse.data) {
        const places = placeSearchResponse.data.copResults.map((x) => ({
          label: x.formattedAddress,
          value: x.formattedAddress,
        }));
        const eLoc = placeSearchResponse.data.copResults.map((x) => ({
            label : x.formattedAddress,
            eloc : x.eLoc,
        }))
        setELoc(eLoc);
        setsearchResults(places);
    }
    else {
        const token  = await getToken();
        let placeSearchResponse = await axios.get(
          `https://atlas.mapmyindia.com/api/places/geocode?region=ind&itemCount=5&address=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token.data.access_token}`,
              'Access-Control-Allow-Origin': "http://localhost:3000"
            },
          }
        );
        if (placeSearchResponse && placeSearchResponse.data) {
          const places = placeSearchResponse.data.copResults.map(
            (x) => ({label: x.formattedAddress, value: x.formattedAddress})

          );
          const eLoc = placeSearchResponse.data.copResults.map((x) => ({
            label : x.formattedAddress,
            eloc : x.eLoc,
          }))
          setELoc(eLoc);
          console.log("\n\n" + places + "\n\n")
          setsearchResults(places);
        }
    }
  };
  const getToken = async () => {
    const responseToken = await axios.post(
      "https://outpost.mapmyindia.com/api/security/oauth/token",
      {
        grant_type: MAP_MY_INDIA_GRANT,
        client_id: MAP_MY_INDIA_ID,
        client_secret: MAP_MY_INDIA_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    localStorage.setItem(
      "placeKey",
      `Bearer ${responseToken.data.access_token}`
    );
    return responseToken;
  };

  const handleOnSelect = (value) => {
    changeSourceSelected(true, value)
    let username = localStorage.getItem('username')
    for(let i = 0; i < eLoc.length; i++){
        if(eLoc[i].label === value){
            let loc = eLoc[i].eloc;
            console.log(eLoc[i])
            console.log(loc)
            axios.post('http://localhost:7070/api/v1/updateloc', {username, loc})
            .then((response) => {
              console.log(response.data)
            })
            .catch((err) => console.log(err))
            break;
        }

    }
  }

  return (
      <AutoComplete showSearch
        style={{width: '100%', margin : '0.5em', zIndex : 9999}}
        size='large'
        allowClear = {true}
        //defaultOpen = {true}
        defaultValue = "Current Location"
        onSelect= {(val)=>{console.log(val); changeSourceSelected(true, val)}}//{handleOnSelect}
        onSearch= {(value) => {console.log(value)}}//{handleOnChange}//
        options={opts}
        placeholder="Enter Pickup Location"
        onClear={() => {changeSourceSelected(false, '')}} />
  )
}

export default SourcePlacesSearch