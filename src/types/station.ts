export interface Coordinates {
  lat: number
  lng: number
}

export type StationType = 'urban' | 'industrial' | 'rural'

export interface Station {
  id: string
  name: string
  type: StationType
  coordinates: Coordinates
}