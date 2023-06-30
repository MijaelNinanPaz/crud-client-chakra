import React, { useEffect, useState } from 'react';
import { Box, Card, CardBody, CardHeader, Flex, Input } from '@chakra-ui/react';


const GoogleMapDirection = ({ setLocation, children }) => {
    const [markerPosition, setMarkerPosition] = useState({ lat: 42.42916309999999669, lng: -71.04842569999999569 });
    const [googleMap, setGoogleMap] = useState(null);


    useEffect(() => {

        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                gestureHandling: 'cooperative',
                center: markerPosition,
                zoom: 14,
            });

            const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('pac-input'), {
                fields: ['address_components', 'formatted_address', 'geometry']
            });
            autocomplete.setComponentRestrictions({
                'country': ['US', 'CA']
            });
            autocomplete.bindTo('bounds', map);

            const infowindow = new window.google.maps.InfoWindow();
            const infowindowContent = document.getElementById('infowindow-content');

            infowindow.setContent(infowindowContent);

            const marker = new window.google.maps.Marker({
                map,
                anchorPoint: new window.google.maps.Point(0, -29),
                draggable: true,
                position: markerPosition,
                animation: window.google.maps.Animation.DROP
            });

            const locationData = {};

            const updateLocationData = place => {
                if (!place.geometry || !place.geometry.location) {
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                infowindowContent.children['place-name'].textContent = place.name;
                infowindowContent.children['place-address'].textContent = place.formatted_address;
                infowindow.open(map, marker);

                // update locationData
                locationData.latitude = place.geometry.location.lat();
                locationData.longitude = place.geometry.location.lng();
                locationData.address = place.formatted_address;

                // Parse address details.
                for (var i = 0; i < place.address_components.length; i++) {

                    var addressType = "";
                    if (place.address_components[i].types[0]) {
                        addressType = place.address_components[i].types[0].toString();
                    }
                    switch (addressType) {
                        case "postal_code":
                            locationData.zip = place.address_components[i].short_name;
                            break;
                        case "locality":
                            locationData.city = place.address_components[i].long_name;
                            break;
                        case "administrative_area_level_1":
                            locationData.state = place.address_components[i].short_name;
                            break;
                        case "administrative_area_level_2":
                            locationData.county = place.address_components[i].short_name;
                            break;
                        case "country":
                            locationData.country = place.address_components[i].short_name;
                            break;
                        default:
                            break;
                    }
                }

                // Get elevation for selected location.
                if (locationData.latitude && locationData.longitude) {
                    var elevator = new window.google.maps.ElevationService();

                    elevator.getElevationForLocations({
                        'locations': [{
                            lat: locationData.latitude,
                            lng: locationData.longitude
                        }]
                    }, function (results, status) {
                        if (status === window.google.maps.ElevationStatus.OK) {
                            // Retrieve the first result
                            if (results[0]) {
                                locationData.elevation = parseInt(results[0].elevation * 3.28);
                            } else {
                                alert('No results found.');
                            }
                        } else {
                            alert('Elevation service failed due to: ' + status);
                        }
                    });
                } else {
                    alert("Sorry, latitude and longitude are required.");
                }

                console.log("update", locationData);

                //update state
                setLocation(locationData);

                //localStorage
                const newProjectRecovered = JSON.parse(localStorage.getItem('newProject'));
                let newProject;
                if(newProjectRecovered) {
                    newProject = {
                        ...newProjectRecovered,
                        location: locationData
                    }
                } else {
                    newProject = {
                        location: locationData
                    }
                }
                console.log(newProject)
                const newProjectString = JSON.stringify(newProject);
                localStorage.setItem("newProject", newProjectString);

            };

            //Evento cuando buscan y seleccionan un lugar
            autocomplete.addListener('place_changed', () => {
                infowindow.close();
                marker.setVisible(false);
                const place = autocomplete.getPlace();

                updateLocationData(place);
                console.log("place autocomplete event", place)
            });

            //Evento cuando el marcador se mueve
            marker.addListener('dragend', () => {
                const newPosition = marker.getPosition();
                const newCoordinates = {
                    lat: newPosition.lat(),
                    lng: newPosition.lng(),
                };
                setMarkerPosition(newCoordinates); // Actualiza markerPosition

                // update locationData
                locationData.latitude = newCoordinates.lat;
                locationData.longitude = newCoordinates.lng;
                console.log("dragend event",locationData)

                //update state
                setLocation(locationData);

                //localStorage
                const newProjectRecovered = JSON.parse(localStorage.getItem('newProject'));
                let newProject;
                if(newProjectRecovered) {
                    newProject = {
                        ...newProjectRecovered,
                        location: locationData
                    }
                } else {
                    newProject = {
                        location: locationData
                    }
                }
                console.log(newProject)
                const newProjectString = JSON.stringify(newProject);
                localStorage.setItem("newProject", newProjectString);
            });
        };

        // Cargar el script de la API de Google Maps
        if (!googleMap) {
            const gmpsKey = import.meta.env.VITE_GMPS_KEY;
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${gmpsKey}&callback=initMap&libraries=places`;
            script.defer = true;

            document.head.appendChild(script);
            window.initMap = initMap;
            setGoogleMap(true);
        }

    }, []);


    return (
        <Card boxShadow='0 2px 14px -1px rgba(0,0,0,0.25)'>
            <Card id="pac-card">
                <CardHeader id="pac-container" mx="12px" pb="12px" >
                <Flex gap="8" direction={{ base: 'column', md: 'row'}}>
                    <Input id="pac-input" type="text" placeholder="Enter a location" variant='flushed'/>
                    { children }
                </Flex>

                    
                </CardHeader>
            </Card>
            <CardBody>
            <Box id="map" height="100%" width="100%" flex="1" minHeight="60vh"></Box>
                    <Box id="infowindow-content" fontWeight={'bold'}>
                        <span id="place-name" className="title"></span>
                        <br />
                        <span id="place-address"></span>
                    </Box>
            </CardBody>
        </Card>
    );
};

export default GoogleMapDirection;