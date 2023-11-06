import { useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import ListGroup from "react-bootstrap/ListGroup"
import Rating from "../components/Rating"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/esm/Button"


const ProductScreen = () => {
	const params = useParams()
	const { slug } = params

	const reducer = (state, action) => {
		switch (action.type) {
			case "FETCH_REQUEST":
				return { ...state, loading: true }
			case "FETCH_SUCCESS":
				return {
					...state,
					product: action.payload,
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

	const [{ loading, error, product }, dispatch] =
		useReducer(reducer, {
			loading: true,
			error: "",
			product: [],
		})

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: "FETCH_REQUEST" })
			try {
				const result = await axios.get(
					`/api/products/slug/${slug}`
				)
				dispatch({
					type: "FETCH_SUCCESS",
					payload: result.data,
				})
			} catch (err) {
				dispatch({
					type: "FETCH_FAIL",
					payload: err.message,
				})
			}
		}

		fetchData()
	}, [slug])

	return loading ? (
		<div>Loading ... </div>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<Row>
				<Col md={6}>
          <img className="img-large"
          src={product.image} alt={product.name} />
        </Col>
				<Col md={3}>
          <ListGroup variant="flush" >
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews}>
              </Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              £{product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
				<Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>£{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock>0 ? <Badge bg="success">Available</Badge>
                      : <Badge bg="danger">Not currently in stock</Badge>}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary">
                        Add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
			</Row>
		</div>
	)
}

export default ProductScreen
