import React, { useContext } from "react";
import Cart from "./components/Cart/Cart";
import MedicineForm from "./components/Medicine/MedicineForm";
import MedicineList from "./components/Medicine/MedicineList";
import Header from "./components/Layout/Header";
import CartContext from "./CartContext";

const App=()=>{
  const cartCtx=useContext(CartContext)
   return(
    <>
      <Cart/>
      <main>
        <Header></Header>
        <MedicineForm></MedicineForm>
        <MedicineList></MedicineList>
      </main>
    </>
   )
}
export default App;