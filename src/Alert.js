import React, { useEffect } from 'react'

const Alert = ({ msg, type, removeHint, list }) => {
  useEffect(() => {
    const tik = setTimeout(() => {
      removeHint()
    }, 3000)
    return () => {
      clearTimeout(tik)
    }
  }, [list, removeHint])
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
