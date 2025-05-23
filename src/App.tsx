import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/nav/Nav'
import Login from './components/login/Login'
import Register from './components/register/Register'
import { HomePrivate } from './components/Layouts/HomePrivate'
import { HotelsLayout } from './components/hotels/HotelsLayout'
import { HotelsAmenitesLayout } from './components/hotels/amenities/HotelsAmenitesLayout'
import { HotelsImagesLayout } from './components/hotels/images/HotelsImagesLayout'
import { AddHotel } from './components/hotels/AddHotel'
import { UpdateHotel } from './components/hotels/UpdateHotel'
import { UpdateHotelAmenity } from './components/hotels/amenities/UpdateHotelAmenity'
import { AddHotelAmenity } from './components/hotels/amenities/AddHotelAmenity'
import { UpdateHotelImage } from './components/hotels/images/UpdateHotelImage'
import { AddHotelImage } from './components/hotels/images/AddHotelImage'
import { createContext, useState } from 'react'
import Rooms from './components/Rooms/Rooms'
import RegisterRoom from './components/Rooms/RegisterRoom'
import UpdateRoom from './components/Rooms/UpdateRoom'
import { ReservationsAdmin } from './components/reservations/ReservationsAdmin'
import DeleteRoom from './components/Rooms/DeleteRoom'

export interface AuthContextType{
  role: "USER"|"OWNER"|"ADMIN" | "UNAUTHENTICATED"
  token: string | null
  setRole:(role: "USER"|"OWNER"|"ADMIN" | "UNAUTHENTICATED") => void
  setToken:(token: string | null) => void
}
export const authContext = createContext<AuthContextType | null>(null)

function App() {

  const [role, setRole] = useState<"USER"|"OWNER"|"ADMIN" | "UNAUTHENTICATED">("UNAUTHENTICATED")
  const [token, setToken] = useState<string | null>(null)
  
  return (
    <>
    <authContext.Provider value={{role,setRole,token,setToken}}>
      <BrowserRouter>
      <Nav />

      <Routes> 
        <Route path='/'/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path="rooms" element={<Rooms />} /> 
        <Route path="rooms/register" element={<RegisterRoom />} /> 
        <Route path="rooms/update" element={<UpdateRoom />} /> 
        <Route path="rooms/delete" element={<DeleteRoom />} /> 
        
        <Route path="private" element={<HomePrivate />}>
            {/* Private route for authenticated users */}
              <Route index element={<HotelsLayout />} /> {/* Default route for private section */}
              <Route path="hotels" element={<HotelsLayout />} /> 
              <Route path="hotels/new" element={<AddHotel />} /> 
              <Route path="hotels/:hotelId/update" element={<UpdateHotel />} />
              <Route path="hotels/:hotelId/images" element={<HotelsImagesLayout />} />
              <Route path="hotels/:hotelId/images/new" element={<AddHotelImage />} />
              <Route path="hotels/:hotelId/images/:hotelImageId/update" element={<UpdateHotelImage />} />
              <Route path="hotels/:hotelId/amenities" element={<HotelsAmenitesLayout />} />
              <Route path="hotels/:hotelId/amenities/new" element={<AddHotelAmenity />} />
              <Route path="hotels/:hotelId/amenities/:hotelAmenityId/update" element={<UpdateHotelAmenity />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
          <Route path='reservations' element={<ReservationsAdmin />} />
      </Routes>
      
      
      </BrowserRouter>
      </authContext.Provider>
    </>
  )
}

export default App
