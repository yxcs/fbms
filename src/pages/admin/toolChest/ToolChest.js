import { useSearchParams, useLocation, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Card } from 'antd'
import { getUser } from '../../../services/login'
function AdminToolChest() {
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
  return (
    <div>
      <Card title="颜色转换" bordered={true} size="">
        <p>Card content</p>
      </Card>
    </div>
  )
}

export default AdminToolChest