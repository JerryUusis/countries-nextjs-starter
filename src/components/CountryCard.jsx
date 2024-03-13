import React from 'react'
import { Card,CardMedia, Box, List, ListItem  } from 'react-bootstrap'

const CountryCard = () => {
  return (
    <Box className="mt-5" key={country.name.common}>
              <Card className="h-100">
                <FavoriteIcon
                  onClick={() => dispatch(addFavourite(country))}
                ></FavoriteIcon>
                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
                  <CardMedia
                    variant="top"
                    src={country.flags.svg}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>
                <Box className="d-flex flex-column">
                  <Typography>{country.name.common}</Typography>
                  <Typography >
                    {country.name.official}
                  </Typography>
                  <List
                    
                  >
                    <ListItem>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListItem>
                    <ListItem>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListItem>
                    <ListItem>
                      <i className="bi bi-people me-2"></i>
                      {country.population.toLocaleString()}
                    </ListItem>
                  </List>
                </Box>
              </Card>
            </Box>
  )
}

export default CountryCard