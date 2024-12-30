import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { getBusinessLocations } from '../services/mapService';

const BusinessMap = () => {
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState([43.7022, -79.5188]); // Mount Dennis area

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    const data = await getBusinessLocations();
    setLocations(data);
  };

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
          >
            <Popup>
              <div>
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <p>{location.category}</p>
                <a href={location.website} target="_blank" rel="noopener noreferrer">
                  More Info
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default BusinessMap;