import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom';

import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

import './EditProduct.scss'

const EditProduct = (props) => {
    const [productForm, setProdctForm] = useState({
        title: {
            label: 'title',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'title'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        price: {
            label: 'price',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'price'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        imageUrl: {
            label: 'imageUrl',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'imageUrl'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        description: {
            label: 'description',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'description'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        stock: {
            label: 'stock',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'stock'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
    })
    const [isFormEmpty, setIsFormEmpty] = useState(true)

    const productId = props.match.params.productId
    const { onFetchAdminSingleProduct, token, userId } = props
    useEffect(() => {
        onFetchAdminSingleProduct(token, userId, productId)
    }, [onFetchAdminSingleProduct, token, userId, productId])


    if (isFormEmpty && props.fetchedProduct) {
        const updatedForm = updateObject(productForm, {
            title: updateObject(productForm.title, {
                value: props.fetchedProduct.title,
                valid: true,
                touched: true
            }),
            price: updateObject(productForm.price, {
                value: props.fetchedProduct.price,
                valid: true,
                touched: true
            }),
            imageUrl: updateObject(productForm.imageUrl, {
                value: props.fetchedProduct.imageUrl,
                valid: true,
                touched: true
            }),
            description: updateObject(productForm.description, {
                value: props.fetchedProduct.description,
                valid: true,
                touched: true
            }),
            stock: updateObject(productForm.stock, {
                value: props.fetchedProduct.stock,
                valid: true,
                touched: true
            })
        })
        setProdctForm(updatedForm)
        setIsFormEmpty(false)
    }

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(productForm, {
            [controlName]: updateObject(productForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, productForm[controlName].validation),
                touched: true
            })
        })
        setProdctForm(updatedControls)
    }

    let editProductRedirect = null
    const submitHandler = (event) => {
        event.preventDefault()
        let editedProduct = {
            title: productForm.title.value,
            price: productForm.price.value,
            imageUrl: productForm.imageUrl.value,
            description: productForm.description.value,
            stock: productForm.stock.value,
        }
        props.onAdminEditProducts(props.token, productId, editedProduct)
    }

    if (props.productEdited) {
        editProductRedirect = <Navigate to={props.adminRedirectPath} />
    }

    const formElementsArray = []
    for (let key in productForm) {
        formElementsArray.push({
            id: key,
            config: productForm[key]
        })
    }
    let form = formElementsArray.map(formElement => {
        return (
            <Input
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangeHandler(event, formElement.id)} />
        )
    })
    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    return (
        <>
            <h1>EditProducts Page</h1>
            <div className="EditProduct">
                {editProductRedirect}
                <form onSubmit={submitHandler}>
                    {form}
                    {errorMessage}
                    <Button btnType="Default">SUBMIT</Button>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        error: state.admin.error,
        productEdited: state.admin.productEdited,
        adminRedirectPath: state.admin.adminRedirectPath,
        token: state.auth.token,
        userId: state.auth.userId,
        fetchedProduct: state.admin.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAdminSingleProduct: (token, userId, productId) => dispatch(actions.fetchAdminSingleProduct(token, userId, productId)),
        onAdminEditProducts: (token, productId, editedProductInfo) => dispatch(actions.adminEditProduct(token, productId, editedProductInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);