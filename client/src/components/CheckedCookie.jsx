import React, { useEffect } from 'react'
import Cookies from "js-cookie"

const CheckedCookie = () => {
  const getToken = () => {
    return Cookies.get("tabstyle")
  }

  useEffect(() => {
    console.log(getToken())
  }, [])
  return (
    <div>CheckedCookie</div>
  )
}

export default CheckedCookie