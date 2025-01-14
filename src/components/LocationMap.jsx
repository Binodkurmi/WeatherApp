import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const LocationMap = ({ latitude, longitude }) => (
  <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '300px', width: '100%' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[latitude, longitude]}>
      <Popup>Your selected city</Popup>
    </Marker>
  </MapContainer>
);

export default LocationMap;
