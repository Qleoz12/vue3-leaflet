import Vue from 'vue'
// import * as Dms from './Dms';


// export default class LatLonSpherical
// {
  

//   public _lat:Number =0
//   public _lon:Number =0

//   Dms:any = require('./DMS.js')
//   /**
//      * Creates a latitude/longitude point on the earth’s surface, using a spherical model earth.
//      *
//      * @param  {number} lat - Latitude (in degrees).
//      * @param  {number} lon - Longitude (in degrees).
//      * @throws {TypeError} Invalid lat/lon.
//      *
//      * @example
//      *   import LatLon from '/js/geodesy/latlon-spherical.js';
//      *   const p = new LatLon(52.205, 0.119);
//      */
//    constructor(lat, lon) {
//     if (isNaN(lat)) throw new TypeError(`invalid lat ‘${lat}’`);
//     if (isNaN(lon)) throw new TypeError(`invalid lon ‘${lon}’`);

    
//     this._lat = this.Dms.wrap90(Number(lat));
//     this._lon = this.Dms.wrap180(Number(lon));
//     }


//    /**
//      * Returns the distance along the surface of the earth from ‘this’ point to destination point.
//      *
//      * Uses haversine formula: a = sin²(Δφ/2) + cosφ1·cosφ2 · sin²(Δλ/2); d = 2 · atan2(√a, √(a-1)).
//      *
//      * @param   {LatLon} point - Latitude/longitude of destination point.
//      * @param   {number} [radius=6371e3] - Radius of earth (defaults to mean radius in metres).
//      * @returns {number} Distance between this point and destination point, in same units as radius.
//      * @throws  {TypeError} Invalid radius.
//      *
//      * @example
//      *   const p1 = new LatLon(52.205, 0.119);
//      *   const p2 = new LatLon(48.857, 2.351);
//      *   const d = p1.distanceTo(p2);       // 404.3×10³ m
//      *   const m = p1.distanceTo(p2, 3959); // 251.2 miles
//      */
// distanceTo(point, radius=6371e3) {
//     if (!(point instanceof LatLonSpherical)) point = LatLonSpherical.parse(point); // allow literal forms
//     if (isNaN(radius)) throw new TypeError(`invalid radius ‘${radius}’`);

//     // a = sin²(Δφ/2) + cos(φ1)⋅cos(φ2)⋅sin²(Δλ/2)
//     // δ = 2·atan2(√(a), √(1−a))
//     // see mathforum.org/library/drmath/view/51879.html for derivation

//     const R = radius;
//     const φ1 = this.Dms.toRadians(this._lat),  λ1 = this.Dms.toRadians(this._lon);
//     const φ2 = point.lat.toRadians(), λ2 = point.lon.toRadians();
//     const Δφ = φ2 - φ1;
//     const Δλ = λ2 - λ1;

//     const a = Math.sin(Δφ/2)*Math.sin(Δφ/2) + Math.cos(φ1)*Math.cos(φ2) * Math.sin(Δλ/2)*Math.sin(Δλ/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     const d = R * c;

//     return d;
// }


//     /**
//      * Parses a latitude/longitude point from a variety of formats.
//      *
//      * Latitude & longitude (in degrees) can be supplied as two separate parameters, as a single
//      * comma-separated lat/lon string, or as a single object with { lat, lon } or GeoJSON properties.
//      *
//      * The latitude/longitude values may be numeric or strings; they may be signed decimal or
//      * deg-min-sec (hexagesimal) suffixed by compass direction (NSEW); a variety of separators are
//      * accepted. Examples -3.62, '3 37 12W', '3°37′12″W'.
//      *
//      * Thousands/decimal separators must be comma/dot; use _Dms.fromLocale to convert locale-specific
//      * thousands/decimal separators.
//      *
//      * @param   {number|string|Object} lat|latlon - Latitude (in degrees) or comma-separated lat/lon or lat/lon object.
//      * @param   {number|string}        [lon]      - Longitude (in degrees).
//      * @returns {LatLon} Latitude/longitude point.
//      * @throws  {TypeError} Invalid point.
//      *
//      * @example
//      *   const p1 = LatLon.parse(52.205, 0.119);                                    // numeric pair (≡ new LatLon)
//      *   const p2 = LatLon.parse('52.205', '0.119');                                // numeric string pair (≡ new LatLon)
//      *   const p3 = LatLon.parse('52.205, 0.119');                                  // single string numerics
//      *   const p4 = LatLon.parse('52°12′18.0″N', '000°07′08.4″E');                  // _Dms pair
//      *   const p5 = LatLon.parse('52°12′18.0″N, 000°07′08.4″E');                    // single string _Dms
//      *   const p6 = LatLon.parse({ lat: 52.205, lon: 0.119 });                      // { lat, lon } object numeric
//      *   const p7 = LatLon.parse({ lat: '52°12′18.0″N', lng: '000°07′08.4″E' });    // { lat, lng } object _Dms
//      *   const p8 = LatLon.parse({ type: 'Point', coordinates: [ 0.119, 52.205] }); // GeoJSON
//      */
//      static parse(...args) {
//       if (args.length == 0) throw new TypeError('invalid (empty) point');
//       if (args[0]===null || args[1]===null) throw new TypeError('invalid (null) point');

//       let lat=undefined, lon=undefined;
    
//     let Dms:any = require('./DMS.js')
//       if (args.length == 2) { // regular (lat, lon) arguments
//           [ lat, lon ] = args;
//           lat = Dms.wrap90(Dms.parse(lat));
//           lon = Dms.wrap180(Dms.parse(lon));
//           if (isNaN(lat) || isNaN(lon)) throw new TypeError(`invalid point ‘${args.toString()}’`);
//       }

//       if (args.length == 1 && typeof args[0] == 'string') { // single comma-separated lat,lon string
//           [ lat, lon ] = args[0].split(',');
//           lat = Dms.wrap90(Dms.parse(lat));
//           lon = Dms.wrap180(Dms.parse(lon));
//           if (isNaN(lat) || isNaN(lon)) throw new TypeError(`invalid point ‘${args[0]}’`);
//       }

//       if (args.length == 1 && typeof args[0] == 'object') { // single { lat, lon } object
//           const ll = args[0];
//           if (ll.type == 'Point' && Array.isArray(ll.coordinates)) { // GeoJSON
//               [ lon, lat ] = ll.coordinates;
//           } else { // regular { lat, lon } object
//               if (ll.latitude  != undefined) lat = ll.latitude;
//               if (ll.lat       != undefined) lat = ll.lat;
//               if (ll.longitude != undefined) lon = ll.longitude;
//               if (ll.lng       != undefined) lon = ll.lng;
//               if (ll.lon       != undefined) lon = ll.lon;
//               lat = Dms.wrap90(Dms.parse(lat));
//               lon = Dms.wrap180(Dms.parse(lon));
//           }
//           if (isNaN(lat) || isNaN(lon)) throw new TypeError(`invalid point ‘${JSON.stringify(args[0])}’`);
//       }

//       if (isNaN(lat) || isNaN(lon)) throw new TypeError(`invalid point ‘${args.toString()}’`);

//       return new LatLonSpherical(lat, lon);
//   }

export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
