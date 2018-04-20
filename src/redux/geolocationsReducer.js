/*
IS_IN_BOUNDS NEED TO CHECK THE FENCE THAT IS TOGGLED TRUE.
*/

import axios from "axios";

var initialState = {
  geolocations: [],
  dependentLocation: [],
  currLat: "",
  currLng: "",
  currLocation: "",
  toggledKey: "",
  isInBounds: true
};

const GET_GEOLOCATIONS = "GET_GEOLOCATIONS";
const FIND_DEPENDENT = "FIND_DEPENDENT";
const UPDATE_CURRENT_LOCATION = "UPDATE_LOCATION";
const IS_IN_BOUNDS = "IS_IN_BOUNDS";
const UPDATE_TOGGLED_KEY = "UPDATE_TOGGLED_KEY";

export function getDependent() {
  return {
    type: FIND_DEPENDENT,
    payload: axios.get("/api/dependent")
  };
}

export function getGeolocations() {
  return {
    type: GET_GEOLOCATIONS,
    payload: axios.get("/api/geolocations")
  };
}
export function updateCurrentLocation() {
  return {
    type: UPDATE_CURRENT_LOCATION,
    payload: axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${
        process.env.REACT_APP_GEOLOCATION_API_KEY
      }`
    )
  };
}
export function isInBounds(lat, lng, key) {
  //make axios request for one that is toggled
  console.log("here is the key:", key);
  return {
    type: IS_IN_BOUNDS,
    payload: axios.get(
      `https://api.fencer.io/v1.0/position/inside/${
        process.env.REACT_APP_DEV_KEY //!!!!!NEED TO MAKE IT ONLY FENCE THAT IS TOGGLED!!!!!!!//////
      }`,
      {
        headers: {
          Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`,
          "Lat-Pos": lat,
          "Lng-Pos": lng
        }
      }
    )
  };
}

export function updateToggledKey(key) {
  console.log("hit function in reducer");
  return {
    type: UPDATE_TOGGLED_KEY,
    payload: key
  };
}

///////////////////////////////////////////////////////////////////
/////////////////////////REDUCER//////////////////////////////////
///////////////////////////////////////////////////////////////////

export default function geolocationsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_GEOLOCATIONS}_FULFILLED`:
      return { ...state, geolocations: action.payload.data };
    case `${FIND_DEPENDENT}_FULFILLED`:
      return { ...state, dependentLocation: action.payload.data };
    case `${UPDATE_CURRENT_LOCATION}_FULFILLED`:
      console.log(initialState);
      return {
        ...state,
        currLocation: action.payload.data.location,
        currLat: action.payload.data.location.lat,
        currLng: action.payload.data.location.lng
      };
    case `${IS_IN_BOUNDS}_FULFILLED`:
      return { ...state, isInBounds: action.payload.data.data.inside };
    case `${UPDATE_TOGGLED_KEY}`:
      console.log(action.payload, "hit reducer");
      return { ...state, toggledKey: action.payload };
    default:
      return state;
  }
}
