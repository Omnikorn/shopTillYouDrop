import { Link } from "react-router-dom"

import { useEffect, useState } from "react"
import axios from "axios"

const HomeScreen = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get("/api/products")
			setProducts(result.data)
			
		}

		fetchData()
		
console.log(products)
	}, [])
	
	return (
		<div>
			<h1>Featured Products</h1>
			<div className="products">
				{products.map((product) => (
					<div className="product" key={product.slug}>
						<Link to={`/product/${product.slug}`}>
							<img src={product.Image} alt={product.name} />
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
				))}
			</div>
		</div>
	)
}

export default HomeScreen
