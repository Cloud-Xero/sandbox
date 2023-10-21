import "../style.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { geoJsonPoints, symbols } from "./geoJsonPoint";
import { getQuakeList } from "./getQuakeList";
import type { QuakeData } from "./getQuakeList";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [139.8107, 35.710063], // 東京スカイツリー [経度, 緯度]
  zoom: 11, // starting zoom
});

map.on("load", () => {
  map.loadImage("https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png", (error, image) => {
    if (error) throw error;
    map.addImage("custom-marker", image as any);
    // Add a GeoJSON source with 2 points
    map.addSource("points", geoJsonPoints as mapboxgl.AnySourceData);
    map.addLayer(symbols as mapboxgl.AnyLayer);
  });
});
