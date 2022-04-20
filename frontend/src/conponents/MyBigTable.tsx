import React from "react";
import {ProductRow} from "../types/productRow";
import {TableColumns, TableCore} from "../Table";


type MyBigTableProps = {
    products: ProductRow[];
    setProducts: React.Dispatch<React.SetStateAction<ProductRow[]>>;
}

export default function MyBigTable(props: MyBigTableProps) {
    const {products, setProducts} = props;

    function toggleChecked(item: ProductRow) {
        setProducts(
            products.map(
                (product) => {
                    if (product.name !== item.name) {
                        return product
                    } else {
                        return {
                            ...item,
                            checked: !item.checked,
                        } as ProductRow
                    }
                })
        )
    }


    function updateCount(item: ProductRow, count: number, key: string) {
        setProducts(
            products.map(
                (product) => {
                    if (product.name !== item.name) {
                        return product
                    } else {
                        return {
                            ...item,
                            [key]: count
                        } as ProductRow
                    }
                })
        )
    }

    const myColumns: TableColumns<ProductRow>[] = [
        {
            headerTitle: 'Pick Me',
            cellRender: (product: ProductRow) => (
                <input type={"checkbox"}
                       checked={product.checked}
                       onChange={() => toggleChecked(product)}
                />),
        },
        {
            headerTitle: 'Product',
            attribute: "name",
            header: {style: {backgroundColor: "red"}},
            column: {style: {backgroundColor: "lightblue"}},
        },
        {
            headerTitle: 'Quantity',
            attribute: "quantity",
            tableFooter: (products: ProductRow[]) => {
                let count = 0;
                products.forEach(p => {
                    count += p.quantity
                });
                return count;
            },
            column: {style: {backgroundColor: "lightcoral"}},
            footer: {style: {backgroundColor: "lawngreen"}},
        },
        {
            headerTitle: 'Add Count',
            cellRender: (product: ProductRow) => (
                <input name={"Add Count"}
                       type="number"
                       value={product.addCount}
                       onChange={(e) => {
                           console.log("aww", e)
                           updateCount(product, parseInt(e.target.value), 'addCount')
                       }}
                />
            ),
        },
        {
            headerTitle: 'Subtract Count',
            cellRender: (product) => (
                <input name={"Subtract Count"}
                       type="number"
                       value={product.subtractCount}
                       onChange={(e) => {
                           console.log("aww", e)
                           updateCount(product, parseInt(e.target.value), 'subtractCount')
                       }}
                />
            ),
        },
    ]


    return <TableCore<ProductRow>
        tableColumns={myColumns}
        tableRows={products}
        table={{style: {backgroundColor: "lightgoldenrodyellow"}}}
        header={{style: {backgroundColor: "yellow"}}}
        footer={{style: {backgroundColor: "rosybrown"}}}

    />;
}
