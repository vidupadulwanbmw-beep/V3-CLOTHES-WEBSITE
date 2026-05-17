import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { 
  signInWithRedirect, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('v3_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Save cart to local storage and database whenever it changes
  useEffect(() => {
    localStorage.setItem('v3_cart', JSON.stringify(cart));

    if (user && user.uid) {
      const saveCartToDB = async () => {
        try {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, { cart: cart }, { merge: true });
        } catch (error) {
          console.error("Error saving cart to DB", error);
        }
      };
      saveCartToDB();
    }
  }, [cart, user]);

  // Monitor Auth State
  useEffect(() => {
    // Check if coming back from redirect login
    getRedirectResult(auth).catch((error) => {
      console.error("Redirect error:", error);
      if (error.code === 'auth/unauthorized-domain') {
        alert("Domain not authorized in Firebase! Please add this website's URL to Firebase Console > Authentication > Settings > Authorized domains.");
      } else {
        alert("Login Error: " + error.message);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
          uid: currentUser.uid
        });

        // Load cart from database
        const loadCartFromDB = async () => {
          try {
            const userRef = doc(db, 'users', currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists() && userSnap.data().cart) {
              setCart(userSnap.data().cart);
            }
          } catch (error) {
            console.error("Error loading cart from DB", error);
          }
        };
        loadCartFromDB();

      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Email Login
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        alert("Please verify your email address. Check your inbox for the verification link.");
      }
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in: ", error);
      alert("Login Error: " + error.message);
      throw error;
    }
  };

  // Email Signup
  const signUpWithEmail = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with their name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Send email verification
      await sendEmailVerification(userCredential.user);
      
      alert("Registration successful! Please check your email to verify your account.");
      
      // Optionally sign out the user until they verify, or let them stay logged in
      // For now we just return the user
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up: ", error);
      alert("Sign Up Error: " + error.message);
      throw error;
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      // Use Popup for all devices as requested
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      alert("Login Error: " + error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        user,
        loadingAuth,
        loginWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
