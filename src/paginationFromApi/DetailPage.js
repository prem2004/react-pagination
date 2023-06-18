import React, { useEffect, useState } from 'react'
import  './detailpageStyle.css'
import ItemDetail from './ItemDetail'

const DetailPage = () => {
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState(false)
    const [product,setProduct]=useState([])
    const [currentpage,setCurrentPage]=useState(1)
    const [productperpage,setProductperPage]=useState(10)
    const [scipporduct,setScipProduct]=useState(0)
    const [pageArray,setPageArray]=useState([])

    //totalproduct/properpage 100/10 
    //currentpage:1

    useEffect(()=>{
        fetchapidata()
    },[scipporduct])

    useEffect(()=>{
      setScipProduct(currentpage*10-10)
    },[currentpage])

      //fetch('https://dummyjson.com/products?limit=10&skip=10')
     //this function get product data and udate state
    const fetchapidata=async()=>{
        try{
            setError(false)
            setLoading(true) 
            setProduct([]);
            const res=await fetch(`https://dummyjson.com/products?limit=10&skip=${scipporduct}`);
            const data=await res.json();
            console.log(data)
            setProduct(data.products);
            setLoading(false)
            let pagecount=data.total/productperpage;
             let newar=Array.from(Array(pagecount+1).keys());
             newar.splice(0,1)
             setPageArray(newar)
            
        }catch(er){
            setLoading(false)
            setError(true)
        }
      }
      const handleBack=()=>{
        setCurrentPage(currentpage-1)   
      }

      const handleForword=()=>{
        setScipProduct(currentpage*10)
        setCurrentPage(currentpage+1)   
       
       }

       const handlePageNumber=(num)=>{
        setCurrentPage(num)
        setScipProduct(num*10-10)
       }

  return (
    <div className='product-container'>
        <h1>Product page</h1>
        {loading && <div className='loading-style'>Loading...</div>}
        {error && <div style={{color:'red'}}> <strong>some thing went wrong</strong></div>}
        {!loading && !error && product.length >1 
        &&<div> 
        <div className='item-detail'>
             {product.map(item=>
               <div className='single-product' key={item.id}>
                <img className='item-img' src={item.thumbnail} alt={item.title}></img>
                <span className='title-style'>{item?.title}</span></div>)}
                
         </div>
         <div className='product-pagination'>
                    <button disabled={scipporduct===0}  onClick={ handleBack } className='pagination-arrow'>{"<"}</button>
                    {pageArray.map(num=><span onClick={(e)=>handlePageNumber(num)} className={currentpage==num ? 'page-num active':'page-num' }>{num}</span>)}
                    <button disabled={scipporduct===90}  onClick={handleForword} className='pagination-arrow'>{">"}</button>
                  </div>
         </div>}
    </div>
  )
}


export default DetailPage