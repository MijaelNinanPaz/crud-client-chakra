
coolcalc.googleMapsAssistant = function(mapDiv, locationInput, myLocation, myUpdateLocationCallback) {

    // Attributes for Google map.
    this.map = null;
    this.geocoder = null;
    this.infowindow = null;
    this.marker = null;
    this.autocomplete = null;

    // location is any variable which has standard location attributes such as latitude, longitude, address, city, state.
    this.location = myLocation;

    // updateLocationCallback is an optional callback function the client wishes to execute after selecting a place on the map.
    this.updateLocationCallback = myUpdateLocationCallback;

    // Map variable.
    this.map = new google.maps.Map(mapDiv, {
        gestureHandling: 'cooperative',
        center: {
            lat: 42.42916309999999669,
            lng: -71.04842569999999569
        },
        zoom: 14
    });

    // Google Geocoder.
    this.geocoder = new google.maps.Geocoder();

    // Marker and info window.
    this.infowindow = new google.maps.InfoWindow();
    this.marker = new google.maps.Marker({
        map: this.map,
        draggable:true,
        animation: google.maps.Animation.DROP
    });

    // Autocomplete.
    this.autocomplete = new google.maps.places.Autocomplete(locationInput, {fields: ['address_components', 'geometry']});
    this.autocomplete.setComponentRestrictions({
        'country': ['US', 'CA']
    });

    // Copy this to local variable for use in callbacks.
    var myObj = this;

    // Update lat/long if user drags pin.
    google.maps.event.addListener(this.marker, 'dragend', function(e) { 
        myObj.location.latitude = e.latLng.lat();
        myObj.location.longitude = e.latLng.lng();
    });

    // Autocomplete change handler.
    this.autocomplete.addListener('place_changed', function() {
        myObj.selectLocation();
    });

    // Some funky code to select the first option from autocomplete suggestions if user hits tab or enter.
    this.hasDownBeenPressed = false;

    locationInput.addEventListener('keydown', function(e) {
        if (e.keyCode === 40) {
            myObj.hasDownBeenPressed = true;
        }
    });

    google.maps.event.addDomListener(locationInput, "keydown", function(e) {
        e.cancelBubble = true;
        // If enter key, or tab key
        if (e.keyCode === 13 || e.keyCode === 9) {
            // If user isn't navigating using arrows and this hasn't ran yet
            if (!myObj.hasDownBeenPressed && !e.hasRanOnce) {
                google.maps.event.trigger(e.target, "keydown", {
                    keyCode: 40,
                    hasRanOnce: true
                });
            }
        }
    });

    // Reset hasDownBeenPressed when location input receives focus.
    locationInput.addEventListener("focus", function() {
        myObj.hasDownBeenPressed = false;
    });

    // Set map center to the location of our initial data, if any.
    if (this.location  &&  this.location.latitude  &&  this.location.longitude) {
        this.updateMap();
        this.hasDownBeenPressed = false;
    }
}


// selectLocation sets address properties of this.location when selecting a place from the autocomplete options.
coolcalc.googleMapsAssistant.prototype.selectLocation = function() {

    var place = this.autocomplete.getPlace();

    // Verify results are valid.
    if (!place || !place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
    }

    // Reset address, elevation.
    this.location.address = "";
    this.location.city = "";
    this.location.state = "";
    this.location.zip = "";
    this.location.county = "";
    this.location.country = "";
    this.location.elevation = 0;

    // Set latitude and longitude.
    this.location.latitude = place.geometry.location.lat();
    this.location.longitude = place.geometry.location.lng();

    // Parse address details.
    for (var i = 0; i < place.address_components.length; i++) {

        var addressType = "";
        if (place.address_components[i].types[0]) {
            addressType = place.address_components[i].types[0].toString();
        }

        switch (addressType) {
            case "street_number":
                this.location.address = place.address_components[i].short_name + ' ' + this.location.address;
                break;
            case "route":
                this.location.address += place.address_components[i].long_name;
                break;
            case "postal_code":
                this.location.zip = place.address_components[i].short_name;
                break;
            case "locality":
                this.location.city = place.address_components[i].long_name;
                break;
            case "administrative_area_level_1":
                this.location.state = place.address_components[i].short_name;
                break;
            case "administrative_area_level_2":
                this.location.county = place.address_components[i].short_name;
                break;
            case "country":
                this.location.country = place.address_components[i].short_name;
                break;
        }
    }

    // Get elevation for selected location.
    if (this.location.latitude && this.location.longitude) {
        var elevator = new google.maps.ElevationService;
        latlng = {
            lat: this.location.latitude,
            lng: this.location.longitude
        };
        // Initiate the location request
        var myLocation = this.location;
        elevator.getElevationForLocations({
            'locations': [latlng]
        }, function (results, status) {
            if (status === google.maps.ElevationStatus.OK) {
                // Retrieve the first result
                if (results[0]) {  
                    myLocation.elevation = parseInt(results[0].elevation * 3.28);
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

    // Update user interface (map).
    this.updateMap();
    if (this.updateLocationCallback) {
        this.updateLocationCallback(this.location);
    }
}


// updateMap updates the map and info window when location property is set.
coolcalc.googleMapsAssistant.prototype.updateMap = function() {

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    if (this.location  &&  this.location.latitude  &&  this.location.longitude) {

        var myLatLng = new google.maps.LatLng(this.location.latitude, this.location.longitude);
        this.map.setCenter(myLatLng);
        this.map.setZoom(15);
        this.marker.setPosition(myLatLng);
        this.marker.setVisible(true);

        var myInfoContent = 
            '<div>' 
            + '<span class="move_marker">Drag Pin To Move</span><br>' 
            + escapeHtml(this.location.address || "") + '<br>' 
            + escapeHtml(this.location.city || "") + ", " + escapeHtml(this.location.state || "") 
            + '</div>';

        if (!this.location.state) {
            myInfoContent =
                '<div>' 
                + '<span class="move_marker">Drag Pin To Move</span><br>' 
                + escapeHtml(this.location.address || "") + '<br>' 
                + escapeHtml(this.location.city || "")  
                + '</div>';
        }

        this.infowindow.setContent(
            myInfoContent
        );

        this.infowindow.open(this.map, this.marker);
    }
}