import { Container, Button, Col, Image, Row, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const { VITE_OPENWEATHER_API } = import.meta.env;

const CountriesSingle = () => {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${VITE_OPENWEATHER_API}`)
      .catch((error) => {
        console.log(error)
        setError(true)
      })
      .then((response) => {
        setWeather(response.data)
        setLoading(false)
      })
  }, [country.capital])

  console.log(weather)
  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    )
  }

  return (
    <Container>
      <Row className="m-5">
        <Col>
        {""}
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`}></Image>
        </Col>
        <Col>
          <h2 className="display-4">{country.name.common}</h2>
          <h3>Capital: {country.capital}</h3>
          {!error && weather && (
            <div>
              <p>
                Right now it is <strong>{}</strong>{""}
                degrees in {country.capital} and {""} {weather.weather[0].description}
              </p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
        <Button variant="light" onClick={() => navigate("/countries")}>
            Back to countries
        </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
