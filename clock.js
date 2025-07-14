export function renderClocks(cityTimes) {
    const container = document.getElementById('clock-container');
    container.innerHTML = ''; // clear previous clocks

    cityTimes.forEach(({ city, time, emoji, temp, ampm }) => {
        const div = document.createElement('div');
        div.className = 'clock-row';
        div.innerHTML = `
        <span class="city">${city}</span>
        <span class="time">${time}</span>
        <span class="ampm">${ampm}</span> 
        <span class="temp">${temp}</span>
        <span class="emoji">${emoji}</span>
        `;
        container.appendChild(div);
    });
}
