import { getDataForCity } from './city.js';
import { renderClocks } from './clock.js';

const cities = ['London', 'Coolgardie', 'Darwin', 'Adelaide', 'Melbourne', 'Brookfield'];

async function updateClocks() {
    const cityTimes = await Promise.all(
        cities.map(city => getDataForCity(city)));
    renderClocks(cityTimes);
}

window.addEventListener('DOMContentLoaded', () => {
    updateClocks();
    setInterval(updateClocks, 60_000);
});

