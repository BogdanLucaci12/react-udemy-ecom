import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom';
import Navigation from '../src/routes/navigation/navigation.component'
import Authentication from "./routes/authenticator/authenticator.component";
const Shop = () => {
  return (
    <p>fuck you all</p>
  )
}
const App = () => {
  return (
    <Routes>
   
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>


  )
}
export default App;