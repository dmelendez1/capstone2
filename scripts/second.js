// Function to fetch sunrise and sunset times
async function getSunsetForMountain(lat, lng) {
    let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('mountainDropdown');
    const findButton = document.getElementById('findMtButton');
    const list = document.querySelector('.mt-display-module-list');

    // Populate the dropdown
    // populate the dropdown
    mountainsArray.forEach(mt => {
        let option = document.createElement('option');
        option.value = mt.name;
        option.textContent = mt.name;
        dropdown.appendChild(option);
    });

    // display top 6 mountains
    displayMountains(mountainsArray.slice(0, 6));

    // event listener for find button
    findButton.addEventListener('click', function() {
        const selectedMountain = mountainsArray.find(mt => mt.name === dropdown.value);
        displayMountains([selectedMountain]);
    });
});

async function displayMountains(mountainsToShow) {
    // clear existing content
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    for(let mt of mountainsToShow) {
        // create the list item
        const li = document.createElement('li');
        li.className = 'trail-card';

        // create the image
        const img = document.createElement('img');
        img.src = `images/${mt.img}`;
        img.alt = mt.name;

        // create the info div
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        // create  append the name, elevation, effort, and description
        const h3 = document.createElement('h3');
        h3.textContent = mt.name;

        const pElevation = document.createElement('p');
        pElevation.textContent = `Elevation: ${mt.elevation} ft`;

        const pEffort = document.createElement('p');
        pEffort.textContent = `Effort: ${mt.effort}`;

        const pDesc = document.createElement('p');
        pDesc.textContent = mt.desc;

        // Fetch sunrise and sunset times
        const sunTimes = await getSunsetForMountain(mt.lat, mt.lng);
        const sunrise = sunTimes.results.sunrise;
        const sunset = sunTimes.results.sunset;

        // Create paragraphs for sunrise and sunset
        const pSunrise = document.createElement('p');
        pSunrise.textContent = `Sunrise: ${sunrise}`;

        const pSunset = document.createElement('p');
        pSunset.textContent = `Sunset: ${sunset}`;

        // Append sunrise and sunset info to the info div
        infoDiv.appendChild(h3);
        infoDiv.appendChild(pElevation);
        infoDiv.appendChild(pEffort);
        infoDiv.appendChild(pDesc);
        infoDiv.appendChild(pSunrise);
        infoDiv.appendChild(pSunset);

        // Append the image and info div to the list item
        li.appendChild(img);
        li.appendChild(infoDiv);

        // Append the list item to the list
        list.appendChild(li);
    }
}


