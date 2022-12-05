import { createContext } from "react";
import { useState } from "react";
import Swal from 'sweetalert2';

export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const [cartList, setCartList] = useState([]);

    const addToCart = (item, qty) => {
        let checkProd = cartList.find(prod => prod.itemId === item.id);
        console.log(cartList);

        if (checkProd === undefined) {
            setCartList([
            ...cartList,
            {
                itemId: item.id,
                itemImg: item.imagen,
                itemName: item.nombre,
                itemDesc: item.descripcion,
                itemCost: item.precio,
                itemQty: qty
            },]);
        } else {
            checkProd.itemQty += qty;
            setCartList([
                ...cartList
            ])
        }
    }

    const clearMsg = () => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar los productos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                '¡Borrados!',
                'Tu carrito ha sido vaciado',
                'success'
              )
                setCartList([]);
            }
          })
    }
    
    const clear = () => {
        setCartList([]);
    }

    const deleteItem = (id) => {
        let result = cartList.filter(prod => prod.itemId !== id);
        setCartList(result);
    }

    const totalQty = () => {
        let total = cartList.map(prod => prod.itemQty);
        return total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    const totalPerItem = (id) => {
        let item = cartList.find(prod => prod.itemId === id);
        return item.itemCost * item.itemQty;
    }

    const totalCost = (id) => {
        let total = cartList.reduce((accum, item) => accum + (item.itemCost * item.itemQty), 0);
        return total;
    }

    return (
        <CartContext.Provider value={{cartList, addToCart, clear, clearMsg, deleteItem, totalQty, totalPerItem, totalCost}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
