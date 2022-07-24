import {useSearchParams,useLocation ,useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { getUser } from '../../../services/login'
function AdminHome() {
  // const [searchParams, setSearchParams] = useSearchParams()
  // console.log(searchParams.get('id'))
  // const params = useParams()
  // const location =useLocation()
  // console.log(params)
  // console.log(location)
  const getUseInfo = () => {
    getUser().then(res => {
      console.log('--------------------------', res)
    })
  }
  useEffect(() => {
    getUseInfo()
  }, [])
  return <div>AdminHome</div>
}

export default AdminHome