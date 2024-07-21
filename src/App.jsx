import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [productData, setProductData] = useState([])
  const [page,setPage] = useState(0)
  const [perPage,setPerPage] = useState(10)

  const [totalLength,setTotalLength] = useState(0)
  const [loader,setLoader]=useState(true)
  const getProducts = async () => {
    try {
      setLoader(false)
      const response = await fetch(`https://dummyjson.com/products?limit=${(page+1)*perPage - (page*perPage)}&skip=${page*perPage}`);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const products  = await response.json();
      setProductData(products.products)
      setTotalLength(products?.total)
      setLoader(true)

    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  useEffect(() => {
    getProducts()
  }, [page,perPage])
  return (
    <div className='container'>
      <div className="sub-container">
      <div className="product-container">
        <h3>Products</h3>
        {/* {
          productData ? productData?.slice(page*perPage,(page+1)*perPage)?.map((product,i) => {
            return (<div>{product.id}.{product.title}</div>)
          }) : ""
        } */}
        {
          loader ? productData?.map((product,i) => {
            return (<div>{product.id}.{product.title}</div>)
          }) : ""
        }
      </div>
      <div className='pagination-container'>
        <button onClick={()=>setPage(page-1)}>&lt;</button>
         {Array(Math.ceil(totalLength/perPage))?.fill()?.map((_,i)=>{
          return(
            <div className={`page ${i==(page) ? 'active':''}`} onClick={()=>setPage(i)}>{i+1}</div>
          )
         })}
        <button onClick={()=>setPage(page+1)}>&gt;</button>
        <select onClick={(e)=>setPerPage(e.target.value)}>
        {[10,20,30].map((option, index) => (
          <option key={index}  >
            {option}
          </option>
        ))}
        </select>
      </div>
      </div>
    </div>
  );
}

export default App;
