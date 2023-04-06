import axios from "axios";
import React, { useEffect, useState } from "react";
import * as icons from "./assets/icons";
import theme from "./theme";
import logo from "./assets/icons/mega-logo.png";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [isCelcium, setIsCelcium] = useState(true);

  useEffect(() => {
    if (isDark) {
      for (let i in theme.dark) {
        document.documentElement.style.setProperty(i, theme.dark[i]);
      }
    } else {
      for (let i in theme.light) {
        document.documentElement.style.setProperty(i, theme.light[i]);
      }
    }
  }, [isDark]);

  function getData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4f76ef8a1a352c2cf0769656549175da`;
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      getData(location);
      setLocation("");
    }
  };

  useEffect(() => {
    axios.get("https://ipapi.co/json").then(({ data }) => {
      getData(data.city);
    });
  }, []);

  return (
    <div className="app">
      <div className="search">
        {/* <img id="logo" src={logo} alt="" /> */}

        <input
          placeholder="Enter location"
          value={location}
          type="text"
          autoFocus
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
        />
      </div>

      <div className="switchers">
        <label
          role="button"
          for="checkbox"
          class="switch"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        >
          <input type="checkbox" id="checkbox" />
          <span class="switch__ball"></span>
          <i class="ri-sun-line switch__sun"></i>
          <i class="ri-moon-line switch__moon"></i>
        </label>
        <label
          role="button"
          for="checkbox1"
          class="switch1"
          checked={isCelcium}
          onChange={(e) => setIsCelcium(e.target.checked)}
        >
          <input type="checkbox" id="checkbox1" />
          <span class="switch__ball1"></span>
          <i class="ri-sun-line switch__sun1"></i>
          <i class="ri-moon-line switch__moon1"></i>
        </label>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              isCelcium ? (
                <h1 className="cur-temp">
                  {Math.round(data.main.temp - 273.15)}°C
                </h1>
              ) : (
                <h1 className="cur-temp">
                  {Math.round((data.main.temp - 273.15) * (9 / 5) + 32)}°F
                </h1>
              )
            ) : null}
            <div className="icon">
              {data.main ? (
                <img
                  id="icon"
                  src={icons[`icon_${data.weather[0].icon}`]}
                  alt="icon"
                />
              ) : null}
              <div className="description">
                {data.weather ? <p id="desc">{data.weather[0].main}</p> : null}
              </div>
            </div>
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="bottom-temp">
              {data.main ? (
                isCelcium ? (
                  <p className="bold">
                    {Math.round(data.main.feels_like - 273.15)}°C
                  </p>
                ) : (
                  <p className="bold">
                    {Math.round((data.main.feels_like - 273.15) * (9 / 5) + 32)}
                    °F
                  </p>
                )
              ) : null}
              <p className="bottom-desc">Feels like</p>
            </div>
            <div className="bottom-temp">
              {data.main ? (
                isCelcium ? (
                  <p className="bold">
                    {Math.round(data.main.temp_min - 273.15)}°C
                  </p>
                ) : (
                  <p className="bold">
                    {Math.round((data.main.temp_min - 273.15) * (9 / 5) + 32)}
                    °F
                  </p>
                )
              ) : null}
              <p>min</p>
            </div>
            <div className="bottom-temp">
              {data.main ? (
                isCelcium ? (
                  <p className="bold">
                    {Math.round(data.main.temp_max - 273.15)}°C
                  </p>
                ) : (
                  <p className="bold">
                    {Math.round((data.main.temp_max - 273.15) * (9 / 5) + 32)}
                    °F
                  </p>
                )
              ) : null}
              <p>max </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
