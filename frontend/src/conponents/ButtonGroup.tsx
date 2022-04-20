import {ProductRow} from "../types/productRow";
import React from "react";

type ButtonGroupProps = {
    products: ProductRow[];
    setProducts: React.Dispatch<React.SetStateAction<ProductRow[]>>;
}

export default function ButtonGroup(props: ButtonGroupProps
): JSX.Element {
    const {products, setProducts} = props;

    function handleCheckedButton() {
        console.log(
            "checked: ",
            products.map(product => {
                if (product.checked) {
                    return product.name;
                } else {
                    return "";
                }
            }).toString()
        )
    }

    function handleModifyMeButton() {
        console.log(
            "modify Count: ",
            products.map(product => {
                if (product.addCount || product.subtractCount) {
                    return product.name + ":" + product.addCount + "/" + product.subtractCount;
                } else {
                    return "";
                }
            }).toString()
        )
    }

    function handleUpdateCounts() {
        setProducts(
            products.map(product => {
                if (product.addCount || product.subtractCount) {
                    console.log(product)
                    return {
                        ...product,
                        quantity: (
                            product.quantity
                            + (product.addCount ? product.addCount : 0)
                            - (product.subtractCount ? product.subtractCount : 0)
                        ),
                        addCount: 0,
                        subtractCount: 0
                    } as ProductRow
                } else {
                    return product;
                }
            })
        )
    }

    return <>
        <button
            onClick={handleCheckedButton}
        >print checked
        </button>
        {" "}
        <button
            onClick={handleModifyMeButton}
        >print modify me
        </button>
        {" "}
        <button
            onClick={handleUpdateCounts}
        >update Counts
        </button>
    </>;
}
