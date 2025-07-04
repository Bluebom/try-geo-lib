(function () {
    const L = window.GeoChartLib;
    console.log(L);
    

    const map = L.map('map').setView([-7.1195, -34.8451], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-7.1195, -34.8451]).addTo(map)
        .bindPopup('<b>Hello from João Pessoa!</b><br>My custom library works!')
        .openPopup();
})();