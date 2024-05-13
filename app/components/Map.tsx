"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";
import mapIcon from "../../public/assets/images/mapIcon.gif";
const ICON = icon({
  iconUrl: mapIcon.src,
  iconSize: [60, 60],
});
export default function Map({locationValue}: {locationValue: string}) {
  const {getCountryByValue} = useCountries()
  const latLang = getCountryByValue(locationValue)?.latLang
  return (
    <MapContainer
      center={latLang ?? [51.505, -0.09]}
      zoom={7}
      scrollWheelZoom={true}
      className="h-[50vh] rounded-lg relative z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLang ?? [51.505, -0.09]} icon={ICON}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
