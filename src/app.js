const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setuup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "leo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "leo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "leo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: "Address is not available",
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: "can't retrieve the location for this address",
          });
        }
        res.send({
          latitude,
          longitude,
          location,
          address: req.query.address,
          forecastData,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    errorMessage: "Help page is not found ",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "leo",
    errorMessage: "page is not found",
  });
});

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log("started");
});
