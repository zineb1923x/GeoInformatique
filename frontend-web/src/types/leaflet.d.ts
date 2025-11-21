declare module 'leaflet' {
  export type PointExpression = [number, number];
  export type LatLngExpression = [number, number];

  export interface FitBoundsOptions {
    padding?: PointExpression;
    maxZoom?: number;
  }

  export interface MapOptions {
    center?: LatLngExpression;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
  }

  export interface TileLayerOptions {
    attribution?: string;
    maxZoom?: number;
    minZoom?: number;
  }

  export interface MarkerOptions {
    icon?: Icon;
  }

  export interface IconOptions {
    iconUrl?: string;
    iconRetinaUrl?: string;
    shadowUrl?: string;
    iconSize?: PointExpression;
    iconAnchor?: PointExpression;
    popupAnchor?: PointExpression;
    shadowSize?: PointExpression;
  }

  export class Icon<T extends IconOptions = IconOptions> {
    constructor(options?: T);
  }

  export class Map {}
  export class TileLayer {}
  export class Marker<T = any> {}
  export class Popup {}

  const L: {
    Icon: typeof Icon;
  };

  export default L;
}