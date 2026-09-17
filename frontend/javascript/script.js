const priorityCards = document.querySelectorAll(".priority-card");

priorityCards.forEach(card => {

    card.addEventListener("click", () => {

        priorityCards.forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");

    });

});


const findRoute = document.getElementById("findRoute");

findRoute.addEventListener("click", () => {

    const source = document.getElementById("source").value.trim();
    const destination = document.getElementById("destination").value.trim();

    if (source === "" || destination === "") {
        alert("Please enter both locations.");
        return;
    }

    const selected = document.querySelector(".priority-card.active");

    let priority = "Balanced Route";

    if (selected) {
        priority = selected.querySelector("h4").innerText;
    }

    // Show results
    const results = document.getElementById("results");

    results.style.display = "block";

    // Update route information
    document.getElementById("routeText").innerText =
        `${source} → ${destination} • ${priority}`;

    // Scroll to results
    results.scrollIntoView({
        behavior: "smooth"
    });

    // Create map
    const map = L.map("map").setView(
        [28.6139, 77.2090],
        11
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);

    // Demo route points
    const routePoints = [
        [28.4595, 77.3050],
        [28.5200, 77.2700],
        [28.5750, 77.2400],
        [28.6139, 77.2090]
    ];

    const routeLine = L.polyline(
        routePoints,
        {
            color: "#8064d8",
            weight: 6
        }
    ).addTo(map);

    L.marker(routePoints[0])
        .addTo(map)
        .bindPopup("Starting Location");

    L.marker(routePoints[routePoints.length - 1])
        .addTo(map)
        .bindPopup("Destination");

    map.fitBounds(routeLine.getBounds());

});
