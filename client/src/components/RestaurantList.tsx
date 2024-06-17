// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { fetchRestaurants, resetRestaurants } from "../redux/restaurantsSlice";
// import RestaurantItem from "./RestaurantItem";
// import {
//   APIProvider,
//   Map,
//   ControlPosition,
//   MapControl,
//   AdvancedMarker,
//   useAdvancedMarkerRef,
//   useMap,
// } from "@vis.gl/react-google-maps";
// import PlaceAutocomplete from "./PlaceAutocomplete";

// const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";
// const mapId = process.env.REACT_APP_MAP_ID || "";

// const RestaurantList: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { restaurants, status, error } = useAppSelector(
//     (state) => state.restaurants
//   );
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
//     null
//   );
//   const [selectedPlace, setSelectedPlace] =
//     useState<google.maps.places.PlaceResult | null>(null);
//   const [markerRef, marker] = useAdvancedMarkerRef();

//   useEffect(() => {
//     if (location) {
//       dispatch(fetchRestaurants(location));
//     }
//   }, [dispatch, location]);

//   useEffect(() => {
//     if (selectedPlace && selectedPlace.geometry?.location) {
//       setLocation({
//         lat: selectedPlace.geometry.location.lat(),
//         lng: selectedPlace.geometry.location.lng(),
//       });
//     }
//   }, [selectedPlace]);

//   const handleGetLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error(error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleReset = () => {
//     setLocation(null);
//     setSelectedPlace(null);
//     dispatch(resetRestaurants());
//   };

//   return (
//     <div className=" bg-neutral-300">
//       <div className="m-2 p-2 flex justify-center items-center">
//         <APIProvider apiKey={apiKey}>
//           <Map
//             mapId={mapId}
//             style={{
//               width: "100vw",
//               height: "50vh",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "5px",
//               margin: "5px",
//             }}
//             defaultCenter={{ lat: 22.54992, lng: 0 }}
//             defaultZoom={3}
//             gestureHandling={"greedy"}
//             disableDefaultUI={true}
//           >
//             <AdvancedMarker ref={markerRef} position={null} />
//             <MapHandler selectedPlace={selectedPlace} marker={marker} />
//           </Map>
//           <MapControl position={ControlPosition.TOP}>
//             <div className="autocomplete-control">
//               <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
//             </div>
//           </MapControl>
//         </APIProvider>
//       </div>

//       <div className=" m-5 p-2 flex flex-col items-center rounded-md">
//         <div className="flex flex-col items-center mb-4">
//           <h3 className="text-lg font-semibold mb-2">
//             Find Nearby Restaurants
//           </h3>
//           <div className="flex space-x-4">
//             <button
//               className=" bg-neutral-700 text-white px-3 py-1 rounded-md hover:bg-neutral-900"
//               onClick={handleGetLocation}
//             >
//               Search My Location
//             </button>
//             <button
//               className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500"
//               onClick={handleReset}
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {status === "loading" && <p>Loading...</p>}
//         {status === "succeeded" && (
//           <div className="flex flex-wrap justify-center gap-4">
//             {restaurants.map((restaurant, index) => (
//               <RestaurantItem
//                 key={index}
//                 name={restaurant.name}
//                 vicinity={restaurant.vicinity}
//                 rating={restaurant.rating}
//                 userRatingsTotal={restaurant.user_ratings_total}
//                 distance={restaurant.distance}
//                 photoUrl={restaurant.photoUrl || undefined}
//                 placeId={restaurant.place_id} // Pass the place ID
//               />
//             ))}
//           </div>
//         )}
//         {status === "failed" && <p>{error}</p>}
//       </div>
//     </div>
//   );
// };

// interface MapHandlerProps {
//   selectedPlace: google.maps.places.PlaceResult | null;
//   marker: google.maps.marker.AdvancedMarkerElement | null;
// }

// const MapHandler: React.FC<MapHandlerProps> = ({ selectedPlace, marker }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (selectedPlace && selectedPlace.geometry?.location && marker && map) {
//       const location = {
//         lat: selectedPlace.geometry.location.lat(),
//         lng: selectedPlace.geometry.location.lng(),
//       };

//       marker.position = new google.maps.LatLng(location.lat, location.lng);

//       if (selectedPlace.geometry.viewport) {
//         map.fitBounds(selectedPlace.geometry.viewport);
//       } else {
//         map.setCenter(location);
//         map.setZoom(15);
//       }
//     } else if (marker && map) {
//       marker.position = null;
//       map.setCenter({ lat: 22.54992, lng: 0 });
//       map.setZoom(3);
//     }
//   }, [selectedPlace, marker, map]);

//   return null;
// };

// export default RestaurantList;

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchRestaurants, resetRestaurants } from "../redux/restaurantsSlice";
import RestaurantItem from "./RestaurantItem";
import {
  APIProvider,
  Map,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import PlaceAutocomplete from "./PlaceAutocomplete";
import defaultImage from "../images/menuplate.jpg";

const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";
const mapId = process.env.REACT_APP_MAP_ID || "";

// Component to display the list of restaurants and the map
const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurants, status, error } = useAppSelector(
    (state) => state.restaurants
  );
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showStaticImage, setShowStaticImage] = useState(true); // State for managing static image visibility

  useEffect(() => {
    if (location) {
      dispatch(fetchRestaurants(location));
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry?.location) {
      setLocation({
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      });
      setShowStaticImage(false); // Hide static image when a place is selected
    }
  }, [selectedPlace]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowStaticImage(false); // Hide static image when location is fetched
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleReset = () => {
    setLocation(null);
    setSelectedPlace(null);
    setShowStaticImage(true); // Show static image when reset is clicked
    dispatch(resetRestaurants());
  };

  return (
    <div className=" bg-neutral-300">
      <div className="m-2 p-2 flex justify-center items-center">
        <APIProvider apiKey={apiKey}>
          <Map
            mapId={mapId}
            style={{
              width: "100vw",
              height: "50vh",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px",
              margin: "5px",
            }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <AdvancedMarker ref={markerRef} position={null} />
            <MapHandler selectedPlace={selectedPlace} marker={marker} />
          </Map>
          <MapControl position={ControlPosition.TOP}>
            <div className="autocomplete-control">
              <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
            </div>
          </MapControl>
        </APIProvider>
      </div>

      <div className=" m-5 p-2 flex flex-col items-center rounded-md">
        <div className="flex flex-col items-center mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Find Nearby Restaurants
          </h3>
          <div className="flex space-x-4">
            <button
              className=" bg-neutral-700 text-white px-3 py-1 rounded-md hover:bg-neutral-900"
              onClick={handleGetLocation}
            >
              Search My Location
            </button>
            <button
              className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        {status === "loading" && <p>Loading...</p>}
        {status === "succeeded" && restaurants.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {restaurants.map((restaurant, index) => (
              <RestaurantItem
                key={index}
                name={restaurant.name}
                vicinity={restaurant.vicinity}
                rating={restaurant.rating}
                userRatingsTotal={restaurant.user_ratings_total}
                distance={restaurant.distance}
                photoUrl={restaurant.photoUrl || undefined}
                placeId={restaurant.place_id} // Pass the place ID
              />
            ))}
          </div>
        )}
        {status === "succeeded" && restaurants.length === 0 && (
          <div className="flex flex-col items-center mt-4">
            <p>No restaurants found</p>
          </div>
        )}
        {status === "failed" && <p>{error}</p>}

        {/* Show the static image when no restaurants are displayed */}
        {showStaticImage && (
          <div className="mt-4 w-full flex justify-center items-center">
            <img
              src={defaultImage}
              alt="Default"
              style={{ width: "100%", height: "50vh", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface MapHandlerProps {
  selectedPlace: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler: React.FC<MapHandlerProps> = ({ selectedPlace, marker }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry?.location && marker && map) {
      const location = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };

      marker.position = new google.maps.LatLng(location.lat, location.lng);

      if (selectedPlace.geometry.viewport) {
        map.fitBounds(selectedPlace.geometry.viewport);
      } else {
        map.setCenter(location);
        map.setZoom(15);
      }
    } else if (marker && map) {
      marker.position = null;
      map.setCenter({ lat: 22.54992, lng: 0 });
      map.setZoom(3);
    }
  }, [selectedPlace, marker, map]);

  return null;
};

export default RestaurantList;
