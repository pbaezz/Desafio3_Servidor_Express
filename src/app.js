import express from "express"
import ProductManager from "./components/ProductManager.js"

const app = express()
app.use(express.urlencoded({extended : true}))

const dataProd = new ProductManager()
const allProducts = dataProd.readProducts()

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await allProducts)
    let allProd = await allProducts
    let productLimit = allProd.slice(0, limit)
    res.send(productLimit)
})

app.get("/products/:id", async (req, res) =>{
    let id = parseInt(req.params.id)
    let allProd = await allProducts
    let productById = allProd.find(product => product.id === id)
    res.send(productById)
})

const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Express por Local Host ${server.address().port}`)
})
app.on("error", (error) => console.log(`Error del servidor ${error}`))