import React, { createContext, useContext, useState } from "react";

type ShopContextType = {
    cartItems: any[];
    addToCart: (item: any, quantity?: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    getTotalPrice: () => number;
    clearCart: () => void;
};

export const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    const addToCart = async (item: any, quantity: number = 1) => {
        setCartItems(prevItems => {
            const existingIndex = prevItems.findIndex(
                cartItem => cartItem.id === item.id
            );
            if (existingIndex >= 0) {
                const updatedItems = [...prevItems];
                if (updatedItems[existingIndex].quantity + quantity > 0) {
                    updatedItems[existingIndex].quantity += quantity;
                }
                return updatedItems;
            } else {
                return [...prevItems, { ...item, quantity }];
            }
        });
    };

    const removeFromCart = async (itemId: number) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== itemId)
        );
    };

    const getTotalPrice = () => {
        const total = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        return Number(total.toFixed(2));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <ShopContext.Provider
            value={{ cartItems, addToCart, removeFromCart, getTotalPrice, clearCart }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
