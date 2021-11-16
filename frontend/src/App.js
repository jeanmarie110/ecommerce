import React, { useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'

// import Auth from './containers/Auth/Auth'
import MainPage from './containers/MainPage/MainPage'
import Logout from './containers/Auth/Logout/Logout'
import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner'
import * as actions from './store/actions/index'

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const Shop = React.lazy(() => {
  return import('./containers/Shop/Shop')
})

const Cart = React.lazy(() => {
  return import('./containers/Cart/Cart')
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})

const Admin = React.lazy(() => {
  return import('./containers/Admin/Admin')
})

const AddProduct = React.lazy(() => {
  return import('./containers/Admin/AddProduct/AddProduct')
})

const SingleProduct = React.lazy(() => {
  return import('./containers/SingleProduct/SingleProduct')
})

const EditProduct = React.lazy(() => {
  return import('./containers/Admin/EditProduct/EditProduct')
})

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const App = props => {
  const { onTryAutoSignup } = props
  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes = (
    <React.Fragment>
      <Routes>
        <Route path="/shop" element={<Shop {...props} />} />
        <Route path="/products/:productId" element={<SingleProduct {...props} />} />
        <Route path="/auth" element={<Auth {...props} />} />
        <Route path="/" element={<MainPage />} />
        {/* <Navigate to="/" /> */}
      </Routes>
    </React.Fragment>
  )
  if (props.isAuthenticated) {
    routes = (
        <Routes>
          {/* <Route path="/checkout" render={(props) => <Checkout {...props} />} /> */}
          {/* <Route path="/orders" render={(props) => <Orders {...props} />} /> */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products/:productId/edit" element={<EditProduct />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/" exact element={<MainPage />} />
          {/* <Navigate to="/" /> */}
        </Routes>
    )
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(App));
