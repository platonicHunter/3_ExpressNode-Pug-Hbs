const path = require("path");

const express = require("express");
const rootDir = require("../util/path");

//shop data
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  //console.log("In Next Middle Ware");
  // res.send("<h1>Hello From Express JS</h1>");

  //get data
  //console.log(adminData.products);

  //In Express
  //res.sendFile(path.join(rootDir,'views','shop.html'));//(  __dirname,folder , file)

  //In Ejs pug file
  products = adminData.products;
  res.render("shop", {
    prods: products,
    docTitle: "Shop",
    pageTitle: "Shop Page",
    path: "/",
    //for hbs
    hasProducts: products.length > 0,
    activeShop: true, 
    productCSS :true,
  });
});

module.exports = router;
