const timezones = {
    London: 'Europe/London',
    Melbourne: 'Australia/Melbourne',
    Adelaide: 'Australia/Adelaide',
    Darwin: 'Australia/Darwin',
    Coolgardie: 'Australia/Perth'
};


function getEmojiForTemp(t) {
    if (t < 10) return '❄️';
    if (t < 20) return '🧥';
    if (t < 30) return '👕';
    return '👙';
}

function getEmojiForTime(hour) {
    if (hour < 12) return '🌅';
    if (hour < 18) return '🍵';
    return '🌙';
}

export async function getDataForCity(city) {
    const tz = timezones[city];
    if (!tz) return { time: 'Unknown timezone', emoji: '' };

    const now = new Date();
    const localHour = now.toLocaleString('en-GB', { timeZone: tz, hour: 'numeric', hour12: false });
    const ampm = getEmojiForTime(parseInt(localHour, 10));
    if (!ampm) return { time: 'Unknown time', ampm: '' };

    const time = now.toLocaleTimeString('en-GB', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit'
    });

    // Fetch temperature from Open-Meteo
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geo = await res.json();
    const { latitude, longitude } = geo.results[0];
    const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${tz}`
    );
    const weather = await weatherRes.json();
    const temp = weather.current_weather.temperature;
    const emoji = getEmojiForTemp(temp);
    return { city, time, emoji: ` ${emoji}`, temp, ampm };
}
