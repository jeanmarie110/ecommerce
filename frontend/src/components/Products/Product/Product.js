import React from 'react'

import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'

import './Product.scss'

const Product = (props) => {
    let product = (
        <Card className="ProductItem">
            <h1 className="ProductTitle">
                {props.title}
            </h1>
            <img src={props.imageUrl} alt={props.title} />
            <h2 className="ProductPrice">
                ${props.price}
            </h2>
            <p className="ProductDescription">
                {props.description}
            </p>
            <Button to={`/products/${props.id}`} btnType="Success">Detail</Button>
            {props.isAuth ? <Button clicked={props.cartAddProduct} btnType="Success">Add To Cart</Button> : null}
        </Card>
    )
    if (props.isAdmin) {
        product = (
            <Card className="ProductItem">
                <h1 className="ProductTitle">
                    {props.title}
                </h1>
                <img src={props.imageUrl} alt={props.title} />
                <h2 className="ProductPrice">
                    ${props.price}
                </h2>
                <p className="ProductDescription">
                    {props.description}
                </p>
                <Button to={`/products/${props.id}`} btnType="Success">Detail</Button>
                <Button to={`/products/${props.id}/edit`} btnType="Danger">Edit</Button>
                <Button clicked={props.deleteProduct} btnType="Danger">Delete</Button>
            </Card>
        )
    }
    return (
        <>
            {product}
        </>
    )
}

export default Product