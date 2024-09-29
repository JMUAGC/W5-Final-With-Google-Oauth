import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login'; //Google OAuth - APIs
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import Subscriptions from './components/Subscriptions';
import CreditCard from './components/CreditCard'; // Import your Credit Card component
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);

    const responseGoogle = (response) => {
        setUser(response.profileObj); // Save user info on successful loginn
    };

    const handleLogout = () => {
        setUser(null); // clear user info on logout
    };

    const isAuthenticated = !!user;

    // addToCart function
    const addToCart = (subscription) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === subscription.id);
            if (!existingItem) {
                return [...prevItems, subscription];
            } else {
                
                return prevItems;
            }
        });
    };

    // removeItem function
    const removeItem = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <Router>
            <div className="App">
                <Navbar cartItems={cartItems} />
                {isAuthenticated ? (
                    <Routes>
                        <Route path="/" element={<StreamList />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/cart" element={<Cart cartItems={cartItems} removeItem={removeItem} />} />
                        <Route path="/subscriptions" element={<Subscriptions addToCart={addToCart} cartItems={cartItems} removeItem={removeItem} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/credit-card" element={<CreditCard />} /> {/* Credit Card route */}
                    </Routes>
                ) : (
                    <Navigate to="/login" />
                )}
                {!isAuthenticated && (
                    <div className="login-container">
                        <h2>Please Log In</h2>
                        <GoogleLogin
                            clientId="143198007003-ha9dii5bfrjmjvausgbuv9ig5rjvcv73.apps.googleusercontent.com" // OAuth client ID
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;