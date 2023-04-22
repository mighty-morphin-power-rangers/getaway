import React from "react"
import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import  PersonPin from "@mui/icons-material/PersonPin";

const TherapistMap = (props:any) =>{
const { therapists, userLat, userLong } = props;
interface Therapist {
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};
const [activeMarker, setActiveMarker] = useState(null);

const { isLoaded } = useLoadScript({
  googleMapsApiKey: "AIzaSyAeyWtchlH6xEtItoaqcXUGkLjKvtyjkHM",
});

if (!isLoaded) return <div>Loading...</div>;
return (
  <GoogleMap
    mapContainerClassName="map-container"
    mapContainerStyle={{ width: "600px", height: "400px", borderRadius:"40px"}}
    zoom={12}
    center={{ lat: userLat, lng: userLong }}
  >
    {therapists.map((therapist:any) => {
      return (
        <Marker
          key={therapist.id}
          position={therapist.geometry.location}
          onMouseOver={() => setActiveMarker(therapist)}
          onMouseOut={() => setActiveMarker(null)}
        >
          {/*
            Render the InfoWindow conditionally for the active marker only
          */}
          {activeMarker === therapist && (
            <InfoWindow>
              <div>{therapist.name}</div>
            </InfoWindow>
          )}
        </Marker>
      );
    })}
    <Marker position={{ lat: userLat, lng: userLong }} />
  </GoogleMap>
);
  }




export default TherapistMap