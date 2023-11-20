document.addEventListener("DOMContentLoaded", () => { 
    populateLocationDropdown();  // call my three functions
    populateTypeDropdown();
    displayTop10Parks();
});

function populateLocationDropdown() { //pops  a dropdown menu for selectring park locatrion. creates option in dropdown using array.
    const locationDropdown = document.getElementById('locationDropdown');
    locationDropdown.onchange = handleLocationChange;
    addOption(locationDropdown, "Location", true, true);
    addOption(locationDropdown, "All", false, false);
    locationsArray.forEach(location => {
        addOption(locationDropdown, location, false, false);
    });
}

function populateTypeDropdown() {
    const typeDropdown = document.getElementById('typeDropdown');
    typeDropdown.onchange = handleTypeChange;
    addOption(typeDropdown, "Park Type", true, true);
    addOption(typeDropdown, "All", false, false);
    parkTypesArray.forEach(type => {
        addOption(typeDropdown, type, false, false);
    });
}

function displayTop10Parks() {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.textContent = ''; // Clear previous results

    top10ParksArray.forEach(park => {
        appendParkDetails(resultsDiv, park);
    });
}

function addOption(dropdown, text, isPlaceholder, isSelected) {
    const option = document.createElement('option');
    option.textContent = text;
    option.value = text;
    if (isPlaceholder) option.disabled = true;
    if (isSelected) option.selected = true;
    dropdown.appendChild(option);
}

function handleLocationChange() {
    
}

function handleTypeChange() {
    
}

document.getElementById('findParkButton').addEventListener('click', () => {
    const selectedLocation = document.getElementById('locationDropdown').value;
    const selectedType = document.getElementById('typeDropdown').value;
    displayParks(selectedLocation, selectedType);
});

function displayParks(selectedLocation, selectedType) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.textContent = ''; // Clear previous results

    const filteredParks = nationalParksArray.filter(park => 
        (selectedLocation === 'All' || park.State === selectedLocation) &&
        (selectedType === 'All' || park.LocationName.toLowerCase().includes(selectedType.toLowerCase()))
    );

    if (filteredParks.length === 0) {
        resultsDiv.textContent = 'No parks found';
        return;
    }

    filteredParks.forEach(park => {
        appendParkDetails(resultsDiv, park);
    });
}

function appendParkDetails(container, park) {
    const parkDiv = document.createElement('div');

    const nameHeading = document.createElement('h3');
    nameHeading.textContent = park.LocationName;
    parkDiv.appendChild(nameHeading);

    const addressParagraph = document.createElement('p');
    addressParagraph.textContent = `${park.Address}, ${park.City}, ${park.State}`;
    parkDiv.appendChild(addressParagraph);

    // Check if Visit link is available nd add it
    if (park.Visit) {
        const visitLink = document.createElement('a');
        visitLink.href = park.Visit;
        visitLink.textContent = 'visit parks page';
        visitLink.target = '_blank'; // To open link in a newtab
        visitLink.style.display = 'block'; 
        parkDiv.appendChild(visitLink);
    }

    container.appendChild(parkDiv);
}

