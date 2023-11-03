import data from "./data"

function App() {
	return (
		<div>
			<header>
				<a href="/">STYD</a>
			</header>
			<main>
				<h1>Featured Products</h1>
				<div className="products">
					{data.products.map((product) => (
						<div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
							<img src={product.Image} alt={product.name} />

              </a>
              <div className="product-info">
              <a href={`/product/${product.slug}`}>
							<p><strong>{product.name}</strong></p>
              </a>
							<p>£{product.price}</p>
              <button>Add to cart</button>
              </div>
						</div>
					))}
				</div>
			</main>
		</div>
	)
}

export default App
