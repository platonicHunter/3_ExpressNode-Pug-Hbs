const path = require("path");
const rootDir = require("../util/path");
const express = require("express");
const { title } = require("process");
//const { title } = require('process');
const router = express.Router();

const products = [];

// Middleware that runs for all routes in this router (uncomment if needed)
// router.use('/', (req, res, next) => {
//     console.log("This always runs");
//     next();
// });

//admin/add-product==>GET
router.get("/add-product", (req, res, next) => {
  //res.sendFile(path.join(rootDir,'views','add-product.html'))
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    //for hbs
    activeAddProduct : true,
    formCSS :true,

  });
});

//admin/add-product==>POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  console.log({ title: req.body.title }); // Log the form data
  res.redirect("/");
});

exports.route = router;
exports.products = products;
