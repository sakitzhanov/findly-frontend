import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const Location = () => {
    const [marker, setMarker] = useState({lat: 51.160522, lng: 71.470360});

    const customIcon = new Icon({
        iconUrl: require("../assets/images/map-marker.png"),
        iconSize: [38, 38]
    })

    useMapEvents({
        click: (e) => {
            setMarker(e.latlng)
        }
    })

    return (
        <Marker position={marker} icon={customIcon}>
            <Popup>Hello</Popup>
        </Marker>
    )
}

const LocationSelect = () => {
    return (
        <MapContainer center={[51.160522, 71.470360]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Location />
        </MapContainer>
    )
}

export default LocationSelect;