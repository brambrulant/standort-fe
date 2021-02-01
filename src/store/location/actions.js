import axios from "axios";
import { ACCESS_KEY, apiUrl } from "../../config/constants";

export const SET_MY_LOCATION = "SET_MY_LOCATION";
export const LOCATION_FOUND = "LOCATION_FOUND";
export const LOCATION_NOT_FOUND = "LOCATION_NOT_FOUND";
export const NEW_LOCATION_STATUS = "NEW_LOCATION_STATUS";

function setMyLocality(data) {
  let locality;
  if (data.locality !== null) {
    locality = data.locality;
  } else if (data.region !== null) {
    locality = data.region;
  } else if (data.country !== null) {
    locality = data.country;
  } else
    return {
      type: LOCATION_NOT_FOUND,
    };
  return {
    type: SET_MY_LOCATION,
    payload: locality,
  };
}

const setlocationStatus = (status) => ({
  type: NEW_LOCATION_STATUS,
  payload: status,
});

export const getMyLocationName = (latitude, longitude) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}/position/reverse?access_key=${ACCESS_KEY}&query=${latitude},${longitude}`
      );
      dispatch(setMyLocality(response.data.data[0]));
      setTimeout(() => dispatch(setlocationStatus("Found")), 1500);
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getLocationByString = (string) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `${apiUrl}/position/forward?access_key=${ACCESS_KEY}&query=${string}`
    );
    if (response.data.data.length < 1) return dispatch(setlocationStatus("Not Found"));
    dispatch(setMyLocality(response.data.data[0]));
    setTimeout(() => dispatch(setlocationStatus("Found")), 1500);
  } catch (e) {
    console.error("error:", e.message);
  }
};
