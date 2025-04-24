import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const success = searchParams.get("success")
        const orderId = searchParams.get("orderId")

        const verifyPayment = async () => {
            await axios.post(url+"/api/order/verify",{success,orderId});
            if (success === 'true') {
                navigate("/");
            }
            else{
                navigate("/")
            }
        }

        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <p>Verifying your payment...</p>
    </div>
  )
}

export default Verify