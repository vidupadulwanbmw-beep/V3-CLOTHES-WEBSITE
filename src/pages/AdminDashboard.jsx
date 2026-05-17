import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ visits: 0, sales: 0 });
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'T-Shirts',
    description: '',
    image: ''
  });
  const [editingProductId, setEditingProductId] = useState(null);

  if (!user || user.email !== 'v3clothesbusiness@gmail.com') {
    return (
      <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--danger)' }}>Access Denied</h2>
        <p>You do not have permission to view the Admin Panel.</p>
      </div>
    );
  }

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const prods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(prods);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    
    // Fetch real-time stats
    const unsubStats = onSnapshot(doc(db, 'stats', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setStats(prev => ({ ...prev, visits: docSnap.data().visits || 0 }));
      }
    });
    
    return () => unsubStats();
  }, []);

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  // Image Compressor Logic
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const MAX_WIDTH = 800;
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(new File([blob], file.name, { type: 'image/jpeg' }));
              } else {
                resolve(file);
              }
            }, 'image/jpeg', 0.8);
          } catch (e) { resolve(file); }
        };
        img.onerror = () => resolve(file);
      };
      reader.onerror = () => resolve(file);
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Max 5
    if (files.length > 0) {
      setImageFiles(files);
      const previews = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setImagePreviews([...previews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!editingProductId && imageFiles.length === 0) {
      alert("Please select at least 1 image!");
      return;
    }
    setLoading(true);
    try {
      let downloadURLs = [];
      const imgbbAPIKey = "688b8816cb76acb462626a93c611b489";

      for (const file of imageFiles) {
        const compressedFile = await compressImage(file);
        
        const formData = new FormData();
        formData.append("image", compressedFile);
        
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
          method: "POST",
          body: formData
        });
        
        const data = await response.json();
        if (data.success) {
          downloadURLs.push(data.data.url);
        } else {
          throw new Error(data.error?.message || "Failed to upload image to server.");
        }
      }
      
      if (editingProductId) {
        const updateData = {
          name: newProduct.name,
          price: parseFloat(newProduct.price) || 0,
          category: newProduct.category,
          description: newProduct.description,
        };
        if (downloadURLs.length > 0) {
          updateData.image = downloadURLs[0];
          updateData.images = downloadURLs;
        }
        await updateDoc(doc(db, 'products', editingProductId), updateData);
        alert("Product updated successfully!");
      } else {
        const prodData = {
          name: newProduct.name,
          price: parseFloat(newProduct.price) || 0,
          category: newProduct.category,
          description: newProduct.description,
          image: downloadURLs[0],
          images: downloadURLs,
          createdAt: new Date().toISOString()
        };
        await addDoc(collection(db, 'products'), prodData);
        alert("Product uploaded successfully!");
      }
      
      setNewProduct({ name: '', price: '', category: 'T-Shirts', description: '', image: '' });
      setImageFiles([]);
      setImagePreviews([]);
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product", error);
      alert("Failed to upload product. Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category || 'T-Shirts',
      description: product.description || '',
      image: product.image || ''
    });
    setEditingProductId(product.id);
    setImageFiles([]);
    setImagePreviews(product.images || (product.image ? [product.image] : []));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="admin-dashboard container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="heading-xl">Admin Panel & Progress</h2>
      
      <div className="admin-grid">
        {/* Left side: Sales Progress */}
        <div className="admin-card glass">
          <h3>Live Website Stats</h3>
          <p className="admin-subtitle">Real-time Global Analytics</p>
          
          <div className="progress-container mt-4">
             <div className="progress-label">
                <span>Total Website Visitors</span>
                <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>{stats.visits}</span>
             </div>
             <div className="progress-bar-bg" style={{ height: '8px' }}>
                <motion.div 
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((stats.visits / 1000) * 100, 100)}%` }}
                  transition={{ duration: 1.5 }}
                />
             </div>
             <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>Target: 1,000 visits</div>
          </div>
          
          <div className="progress-container mt-4">
             <div className="progress-label">
                <span>Total Products in Store</span>
                <span style={{color: 'var(--success)', fontWeight: 'bold'}}>{products.length}</span>
             </div>
             <div className="progress-bar-bg" style={{ height: '8px' }}>
                <motion.div 
                  className="progress-bar-fill"
                  style={{ background: 'var(--success)'}}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((products.length / 50) * 100, 100)}%` }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
             </div>
             <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>Target: 50 products</div>
          </div>
        </div>

        {/* Right side: Add Product */}
        <div className="admin-card glass">
          <h3>{editingProductId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleAddProduct} className="admin-form mt-4">
            <div className="input-group">
              <input type="text" className="input-field" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
            </div>
            <div className="input-group">
              <input type="number" className="input-field" placeholder="Price (Rs.)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
            </div>
            <div className="input-group">
              <label style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Product Images (Max 5)</label>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                className="input-field" 
                onChange={handleImageChange} 
                required={imageFiles.length === 0} 
              />
              {imagePreviews.length > 0 && (
                <div style={{ display: 'flex', gap: '5px', marginTop: '10px', overflowX: 'auto' }}>
                  {imagePreviews.map((p, i) => (
                    <img key={i} src={p} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                  ))}
                </div>
              )}
            </div>
             <div className="input-group">
              <select className="input-field" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                <option value="Outerwear">Outerwear</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Footwear">Footwear</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="input-group">
              <textarea className="input-field" placeholder="Description" rows="3" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
            </div>
            <div className="input-group" style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                {loading ? 'Saving...' : (editingProductId ? 'Update Product' : 'Save Product')}
              </button>
              {editingProductId && (
                <button type="button" className="btn btn-secondary" style={{ flex: 1, background: '#333', color: 'white', borderColor: '#333' }} onClick={() => {
                  setEditingProductId(null);
                  setNewProduct({ name: '', price: '', category: 'T-Shirts', description: '', image: '' });
                }}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Product List Table */}
      <div className="admin-card glass mt-4">
        <h3>Manage Products</h3>
        {loading ? <p>Loading products...</p> : (
          <div className="table-responsive mt-4">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                   <tr><td colSpan="4" className="text-center">No products found in Database yet. Please add some above.</td></tr>
                ) : (
                  products.map(prod => (
                    <tr key={prod.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                           {prod.images && prod.images[0] && <img src={prod.images[0]} alt="" style={{width: '40px', height: '40px', borderRadius: '5px', objectFit:'cover'}} />}
                           {prod.name}
                        </div>
                      </td>
                      <td>{prod.category}</td>
                      <td>Rs. {prod.price}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem', color: 'var(--primary)', borderColor: 'var(--primary)' }} onClick={() => handleEdit(prod)}>Edit</button>
                          <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => handleDelete(prod.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
