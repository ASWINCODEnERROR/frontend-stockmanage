import { useLocation, Navigate, Outlet } from "react-router-dom";

const PrivateAuth = () => {

    const accessToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMDYxMzc5LCJpYXQiOjE3MjEwNjEzNzYsImp0aSI6Ijk5ZGFmYjA1ZTg1NjQ1YjE5MjQ1NmRmYmMxNTVhZGNlIiwidXNlcl9pZCI6MX0.4tI2FPclcgiyJIwRNNiS9fjWymAszKgZD5X2wO-C31U"
    const location = useLocation();
  return (
    // authstate != null

    accessToken != null
        ? <Outlet state={{from: location}} />
        : <Navigate to="/" state={{ from: location.pathname }} replace />
    
)
}

export default PrivateAuth