import React from 'react'
import './productstyle.css'

const ProductPage = ({product}) => {
  return (
    <div className='product-detail'>
         <img src={product.thumbnail} alt={product.title}/>
         <br/>
         <span className='mycolor'><strong>{product.title}</strong></span>
    </div>
  )
}

export default ProductPage