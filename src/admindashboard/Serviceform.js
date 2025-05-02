import React, { useState } from 'react'
import adminStyles from "../admindashboard/admin.module.css";
import axios from 'axios';
const Serviceform = () => {
    const [service,setService] = useState("");
    const [subservice,setSubservice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [amount,setAmount] = useState("");

    const addservice=(e)=>{
        e.preventDefault();
        axios.post("https://food-order-system-backend.onrender.com/server",{service,subservice,quantity,amount})
        .then((res)=>{
           alert("service added suc...")
          //  setService("");
           setSubservice("");
           setQuantity("");
           setAmount("");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
    <>
     <section>
    <div className={`${adminStyles.serviceprovider}`}>
      <div className='row'>
       <div className='col-lg-4'></div>
       <div className='col-lg-4 mt-5 p-0'>
       <form className={`${adminStyles.formstyles}`} onSubmit={addservice}>
        <h2 className='text-center'>Fill the Form</h2>
         <div className='mb-3'>
            <select value={service} onChange={(e) => setService(e.target.value)} className='form-control'>
                 <option >Select a Service</option>
                 <option >Break fast</option>
                 <option >Lunch</option>
                 <option >Dinner</option>
            </select>
         </div>
        <div className='mb-3'>
            <select className='form-control' value={subservice} onChange={(e)=>setSubservice(e.target.value)}>
                 <option >Bread Omelette</option>
                 <option >Chapathi </option>
                 <option >Dosa</option>
                 <option >Idli </option>
                 <option >Parotta</option>
                 <option >Poha</option>
                 <option >lemon rice</option>
                 <option >Puri</option>
                 <option >Roti</option>
                 <option >Upma</option>
                 <option >Chicken Biryani</option>
                 <option >Chicken Fried Rice</option>
                 <option >Chicken Naan</option>
                 <option >Mutton Biryani </option>
                 <option >White Rice </option>
            </select>
         </div>
        <div>
        <input type="text" placeholder='Quantity' className='form-control mb-3' value={quantity}  onChange={(e)=>setQuantity(e.target.value)}/>
        </div>
        <div>
        <input type="text" placeholder='Amount' className='form-control mb-3' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        </div>
        <div>
        <input type="submit" value="Add service" className='btn btn-dark'/>
        </div>
    </form>
    </div>
    </div>
    </div>
    </section>
</>
  )
}

export default Serviceform