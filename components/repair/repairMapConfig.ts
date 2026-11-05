export const repairMapSourceUrl =
  "https://www.google.com/maps/d/viewer?mid=13hN0tYdYSpHG86nOiIpqOjOaC03ZSo0&ehbc=2E312F"

export const nearbyRadiusMiles = 10
export const nearbyRadiusMeters = nearbyRadiusMiles * 1609.344

export const categoryLabels: Record<string, string> = {
  "Repair, reuse, recycle": "Repair, reuse & recycle",
  "Key, Umbrella, Shoe": "Keys, shoes & umbrellas",
  "Bicycle, Motorbike": "Bicycles & motorbikes",
  "Restaurants, Accommodation, Catering, Events": "Food & hospitality",
  "Wood & Furniture": "Wood & furniture",
  "Junk Shop": "Junk shops",
  "Thrift clothing bag&cloth repair": "Clothing, bags & textile repair",
  "Electronics (IT, Phone, appliance, cooling&heating, pump&fan, clock&watch))":
    "Electronics & appliances",
  "Recyclers and Transfer station": "Recycling & transfer stations",
  "BSF Farming": "BSF farming",
}

export const categoryColors = [
  "#23614e",
  "#bd684d",
  "#617eaa",
  "#9a7641",
  "#6d718e",
  "#66814b",
  "#9a5c72",
  "#3e7880",
  "#81669b",
  "#57734c",
]

export const repairDivisions = [
  "Yangon",
  "Mandalay",
  "Chin",
  "Naypyidaw Union Territory",
  "Bago",
  "Ayeyarwady",
  "Kachin",
  "Kayah",
  "Kayin",
  "Magway",
  "Mon",
  "Rakhine",
  "Sagaing",
  "Shan",
  "Tanintharyi",
  "Outside division boundaries",
] as const

export const repairDivisionBoundarySourceUrl =
  "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/MMR/ADM1/geoBoundaries-MMR-ADM1_simplified.geojson"
