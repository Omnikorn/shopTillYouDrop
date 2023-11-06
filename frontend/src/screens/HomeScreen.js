import { Link } from "react-router-dom"

import { useEffect, useReducer,  } from "react"
import axios from "axios"
import logger from 'use-reducer-logger'

axios.defaults.baseURL = "http://localhost:5000"

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true }
		case "FETCH_SUCCESS":
			return {
				...state,
				products: action.payload,
				loading: false,
			}
		case "FETCH_FAIL":
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

const HomeScreen = () => {
	
	const [{ loading, error, products }, dispatch] =
		useReducer(logger(reducer), { loading: true, error: "", products:[] })

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: "FETCH_REQUEST" })
			try {
				const result = await axios.get("/api/products")
				dispatch({type:'FETCH_SUCCESS', payload: result.data})
			} catch (err) {
				dispatch({
					type: "FETCH_FAIL",
					payload: err.message,
				})
			}

			
		}

		fetchData()
	}, [])

	console.log(products)

	return (
		<div>
			<h1>Featured Products</h1>
			<div className="products">

			{loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
				products.map((product) => (
					<div className="product" key={product.slug}>
						<Link to={`/product/${product.slug}`}>
							<img src={product.image} alt={product.name} />
						</Link>
						<div className="product-info">
							<Link to={`/product/${product.slug}`}>
								<p>
									<strong>{product.name}</strong>
								</p>
							</Link>
							<p>£{product.price}</p>
							<button>Add to cart</button>
						</div>
					</div>
				)))}
			</div>
		</div>
	)
}

export default HomeScreen
