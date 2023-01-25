const express=require("express");
const bodyparser=require("body-parser");
const path=require("path");
require("dotenv").config();
const app=express();

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use('/uploads', express.static('uploadFiles'));
app.use(express.static(path.resolve(__dirname, 'uploadFiles')));

const routeService=require("./routes/index");

const port=process.env.PORT||9000;

app.use("/api", routeService);

app.listen(port, () => {
    console.log(`Connection at ${port}`);
});



//DOWNLOAD AS CSV FILE:- (JUST DONE IT FOR GENERATING A CSV FILE FOR BULK UPLOAD PURPOSE)

// const {Parser}=require('json2csv');
// const fs=require('fs');
// const db=require("./models");
// const product=db.products;

// app.get('/api/product/download/get-csv', async (req, res) => {
//     try {
//         const filePath=path.join(__dirname+"/uploadFiles", "Products.csv");
//         console.log("filePath", filePath);
//         const products=await product.findAll();
//         console.log("products", products);
//         const fields=["productId", "productName", "category", "brand", "price"];
//         console.log("fields", fields);
//         const json2csv=new Parser({fields});
//         let csv=await json2csv.parse(products);
//         console.log(csv);
//         fs.writeFile(filePath, csv, function(err) {
//             if(err) throw err;
//             res.download(filePath);
//         })
//     } catch(err) {
//         return res.status(500).json(err);
//     }
// })