export default async function getLocationInfo(latitude, longitude) {
  const baseUrl = "http://api.openweathermap.org/geo/1.0/reverse";
  const apiKey = process.env.REACT_APP_MAPS_API_KEY;
  const limit = 1;
  const apiResults = await (
    await fetch(
      `${baseUrl}?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${apiKey}`
    )
  ).json();

  if (apiResults.cod) {
    throw new Error(`API call failed with error: ${apiResults.message}`);
  }
  // console.log(apiResults);
  return {
    city: apiResults[0].name,
    country: apiResults[0].country,
    latitude: apiResults[0].lat,
    longitude: apiResults[0].lon,
  };
}
