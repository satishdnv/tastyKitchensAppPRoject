import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import itemClass from './FoodItem.module.css'
import './index.css'

class FoodItem extends Component {
  state = {
    isFound: false,
    quantity: 0,
  }

  // get the local storage data
  componentDidMount() {
    this.findTheCartItemInList()
  }

  /* getTheLocalStorageData = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list')) || []
    // console.log(cartList)
    this.setState({cartList})
  } */

  /* Add to cart when click on add button. this will
  store in local storage */

  findTheCartItemInList = () => {
    const cartData = JSON.parse(localStorage.getItem('cart_data')) || []
    const {foodItem} = this.props
    const cartItem = cartData.filter(each => each.id === foodItem.id)
    // console.log(cartItem)
    if (cartItem.length !== 0) {
      // console.log(cartItem)
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isFound: true})
      } else if (cartItem[0].quantity <= 0) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isFound: false})
      }
    }
  }

  incrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cart_data'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        if (eachItem.quantity <= 9) {
          const updatedQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cart_data', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  decrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cart_data'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cart_data', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cart_data'))
    const {foodItem} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== foodItem.id,
    )
    localStorage.setItem('cart_data', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  addCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cart_data')) || []
    const {foodItem} = this.props
    // console.log(foodItem)
    const cartItem = {...foodItem, quantity: 1}
    // console.log(cartItem)
    cartData.push(cartItem)
    localStorage.setItem('cart_data', JSON.stringify(cartData))
    this.findTheCartItemInList()
  }

  render() {
    const {foodItem} = this.props
    const {isFound, quantity} = this.state
    console.log(quantity)
    return (
      <li className={itemClass.ListItem} testid="foodItem">
        <img
          src={foodItem.imageUrl}
          alt="food-item"
          className={itemClass.RestaurantImage}
        />
        <div className={itemClass.ItemDetails}>
          <h1 className={itemClass.ItemName}>{foodItem.name}</h1>
          <div className={itemClass.ItemRateContainer}>
            <BiRupee className={itemClass.ItemRupee} />
            <p className={itemClass.ItemCost}>{foodItem.cost}</p>
          </div>
          <div className={itemClass.ItemRatingContainer}>
            <AiFillStar className={itemClass.ItemStar} />
            <p className={itemClass.ItemRatingText}>{foodItem.rating}</p>
          </div>
          {isFound ? (
            <div className="each-item-counter-container" id={foodItem.id}>
              <button
                type="button"
                className="minus-icon-container"
                testid="decrement-count"
              >
                <HiOutlineMinusSm
                  className="minus-icon"
                  onClick={this.decrementCartItemQuantity}
                />
              </button>
              <p className="count-value" testid="active-count">
                {quantity}
              </p>
              <button
                type="button"
                className="plus-icon-container"
                testid="increment-count"
              >
                <BsPlus
                  className="plus-icon"
                  onClick={this.incrementCartItemQuantity}
                />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={itemClass.AddButton}
              onClick={this.addCartItem}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
