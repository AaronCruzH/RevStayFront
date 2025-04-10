import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Courses from './components/courses/Courses'
import Nav from './components/nav/Nav'
import Login from './components/login/Login'
import { HomePrivate } from './components/Layouts/HomePrivate'
import { HotelsLayout } from './components/hotels/HotelsLayout'
import { HotelsAmenitesLayout } from './components/hotels/amenities/HotelsAmenitesLayout'
import { HotelsImagesLayout } from './components/hotels/images/HotelsImagesLayout'
import { AddHotel } from './components/hotels/AddHotel'
import { UpdateHotel } from './components/hotels/UpdateHotel'
import { UpdateHotelAmenity } from './components/hotels/amenities/UpdateHotelAmenity'
import { AddHotelAmenity } from './components/hotels/amenities/AddHotelAmenity'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Nav />

      <Routes> 
        <Route path='/' element={<Courses />}/>
        <Route path='/login' element={<Login />} />

        <Route path="private" element={<HomePrivate />}>
              <Route index element={<HotelsLayout />} /> {/* Default route for private section */}
              <Route path="hotels" element={<HotelsLayout />} /> 
              <Route path="hotels/new" element={<AddHotel />} /> 
              <Route path="hotels/:hotelId/update" element={<UpdateHotel />} />
              <Route path="hotels/:hotelId/images" element={<HotelsImagesLayout />} />
              <Route path="hotels/:hotelId/amenities" element={<HotelsAmenitesLayout />} />
              <Route path="hotels/:hotelId/amenities/new" element={<AddHotelAmenity />} />
              <Route path="hotels/:hotelId/amenities/:hotelAmenityId/update" element={<UpdateHotelAmenity />} />

              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
      </Routes>
      
      
      </BrowserRouter>
    </>
  )
}

export default App
