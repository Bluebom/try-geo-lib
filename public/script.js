(function () {
    const L = LeafletGeo;

    const map = L.map('map').setView([-14.235, -51.925], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-7.1167, -34.8667]).addTo(map)
        .bindPopup('<b>Hello from João Pessoa!</b><br>My custom library works!')
        .openPopup();
})();