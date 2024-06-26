export const geoJsonPoints = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [
      {
        // 東京タワー
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [139.745431, 35.658584],
        },
        properties: {
          title: "東京タワー",
        },
      },
      {
        // 東京ドーム
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [139.751891, 35.705636],
        },
        properties: {
          title: "東京ドーム",
        },
      },
    ],
  },
};

export const symbols = {
  id: "points",
  type: "symbol",
  source: "points",
  layout: {
    "icon-image": "custom-marker",
    // get the title name from the source's "title" property
    "text-field": ["get", "title"],
    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    "text-offset": [0, 1.25],
    "text-anchor": "top",
  },
};
