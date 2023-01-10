import React, {useState} from 'react'
import { AutoComplete } from "antd";
import axios from "axios";
import { MAP_MY_INDIA_ID, MAP_MY_INDIA_SECRET, MAP_MY_INDIA_GRANT } from "../constants";

function DestinationPlacesSearch({isConfirmed, disabled,changeConfirmed,changeDestSelected,testCallback}) {

    const opts = [
            {
                label: 
                    "New Delhi, Delhi", 
                value: 
                    "New Delhi, Delhi" 
            },
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
    //console.log(MAP_MY_INDIA_GRANT, MAP_MY_INDIA_ID)
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
        console.log(placeSearchResponse.data)
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
            console.log("\n\n" + eLoc + "\n\n")
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

  //let destination;
  const handleOnSelect = (value) => {
    console.log(eLoc)
    console.log('handling onSelect')
    changeDestSelected(true, value)
    for(let i = 0; i < eLoc.length; i++){
        if(eLoc[i].label === value){
            console.log('location matched')
            console.log(eLoc[i].label)
            testCallback(eLoc[i]);
            break;
        }
    }
  }

  return (
      <AutoComplete showSearch
        disabled = {disabled || isConfirmed}
        style={{width: '90%', margin : '0.5em'}}
        size='large'
        allowClear = {true}
        autoFocus = {true }
        onChange= {handleOnChange}//{(value) => {console.log(value)}}//
        //onSearch= {handleOnChange}//{(value) => {console.log(value)}}//{handleOnChange}//
        options={searchResults}
        placeholder="Search Destination" 
        onSelect = {handleOnSelect}//{(val) => {console.log(val);changeDestSelected(true, val)}}//
        onClear={() => {changeDestSelected(false, ''); changeConfirmed(false)}}
        />
  )
}

export default DestinationPlacesSearch