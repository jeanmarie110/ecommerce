import React from 'react'
import { connect } from 'react-redux'

const MainPage = (props) => {
    return (
        <div>
            <h1>Main Page</h1>
            <h2>Welcome to ecommerce fullstack!</h2>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);