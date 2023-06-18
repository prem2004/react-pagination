import React,{useState,useEffect} from 'react'
import ProductPage from './ProductPage'

const Home = () => {
    const[products,setProduct]=useState([])
    const[page,setPage]=useState(1)
    const[loading,setLoding]=useState(false);
    const[error,setError]=useState(false)
    const[pageNumber,setPageNumber]=useState([])

     const totalpages= Math.ceil(products.length/10)
        console.log(`totalpages===${totalpages}`)

    const fetchdata=async()=>{
        setLoding(true)
        try{
        const res=await fetch('https://dummyjson.com/products')
        const data=await res.json();
        console.log(data.products)
        setProduct(data.products)
        setLoding(false)
        }catch(er)
        { 
            setLoding(false)
            setError(true)
        }
      }
   
      useEffect(()=>{
          fetchdata()
      },[])

     const handlePageNumberClick =(pnum)=>{
         
         if(pnum)
         {
          setPage(pnum)
         }
       }

       const generatePageNo=()=>{
        //total page is 3 
        //par page 10
       
          let ar=[]        
        for(let i=page;i<=totalpages;i++)
        {
         ar.push(i)
        }
        console.log(ar)
       }
       generatePageNo()

      if(error)
      {
        return <h1>Some thing went wrong please try again later</h1>
      }



  return (
    <div>
    <div style={{margin:'20px',display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px'}}>
        { loading ?<h1>Loadding...</h1> : products.length> 0 && products.slice(page*10-10, page*10).map(product=><ProductPage product={product}/>) }
    </div>
      {products.length > 0 && <div className='pagination'>
        <span className='page-number-style' >Prev</span>
         {pageNumber.length>0 && pageNumber.map((pageNo)=><span onClick={()=>handlePageNumberClick(pageNo)}  key={pageNo} className='page-number-style'>{pageNo}</span>)  }
        <span className='page-number-style'>Next</span>
      </div>
      }
    </div>
  )
}

export default Home