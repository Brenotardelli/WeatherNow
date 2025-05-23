import { useEffect, useRef, useState } from "react";
import WetherInfo from "./WetherInfo";
const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("Madrid");
  const [error, setError] = useState("");
  const inputRef = useRef();

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchWeather() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
              errorData.message || "Something went wrong. Please try again."
            );
          }

          const data = await res.json();
          setData(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
            setData(null);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (city) fetchWeather();

      return function () {
        controller.abort();
      };
    },
    [city]
  );

  function searchCity() {
    const city = inputRef.current.value.trim();
    if (!city || /^\d+$/.test(city) || city.length < 2) {
      setError("Please enter a valid city name.");
      return;
    }

    setCity(city);
  }

  return (
    <div className="content">
      <h1>WeatherNow</h1>
      <div className="input-name">
        <input ref={inputRef} type="text" placeholder="Enter a city." />
        <button onClick={searchCity}>Search</button>
      </div>
      {data && <WetherInfo data={data} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
