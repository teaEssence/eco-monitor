export interface AirQuality {
  pm25: number
  pm10: number
  no2: number
  o3: number
}

export interface Measurement {
  id: string
  stationId: string
  timestamp: string
  values: AirQuality
}