import React, {FormEvent, useEffect, useState} from "react";
import {createProduct, getProducts, updateProducts} from "./productsApiClient";
import {Container} from "@mui/material";
import {Product} from "./types/product";
import {ProductRow} from "./types/productRow";
import MyBigTable from "./conponents/MyBigTable";
import ButtonGroup from "./conponents/ButtonGroup";


const App = () => {
    const [products, setProducts] = useState<ProductRow[]>([]);
    const [productName, setProductName] = useState<string>("");

    const setProductNameFromInput = (event: FormEvent<HTMLInputElement>) => {
        setProductName(event.currentTarget.value);
    };

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        createProduct(productName).then(() => {
            getProducts().then(items => setProducts(items as ProductRow[]));
        });
    };

    useEffect(() => {
        getProducts().then(items => setProducts(items as ProductRow[]));
    }, []);

    useEffect(() => {
        //send data back
        updateProducts(products as Product[]).then()
        // console.log(products)
        console.log("useEffect")
    }, [products])

    return (
        <Container sx={{mx: 1, my: 1}}>
            <h1>Parts Unlimited Inventory</h1>

            <hr/>

            <MyBigTable
                products={products}
                setProducts={setProducts}
            />

            <hr/>

            <ButtonGroup products={products} setProducts={setProducts}/>

            <hr/>

            <form onSubmit={submitForm}>
                <br/>
                <label>
                    Product to add
                    <input name="product" type="text" onChange={setProductNameFromInput}/>
                </label>
                <button type="submit">Submit</button>
            </form>

            <hr/>

        </Container>
    );
}

export default App;
