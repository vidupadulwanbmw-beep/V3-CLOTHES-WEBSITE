import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Products.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

export default function Products() {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [lightboxImage, setLightboxImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleImageNav = (e, productId, direction, length) => {
    e.stopPropagation(); // prevent opening the lightbox when clicking arrows
    setCurrentImageIndex(prev => {
      const current = prev[productId] || 0;
      let next = current + direction;
      if (next < 0) next = length - 1;
      if (next >= length) next = 0;
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id] || 'M';
    const productWithSize = {
      ...product,
      id: `${product.id}-${size}`,
      originalId: product.id,
      selectedSize: size,
      name: `${product.name} (Size: ${size})`,
      image: product.images[0]
    };
    addToCart(productWithSize);
  };

  const handleOrderNow = (product) => {
    handleAddToCart(product);
    navigate('/checkout');
  };

  const handleCustomizeWhatsapp = (product) => {
    const size = selectedSizes[product.id] || 'M';
    const url = `https://wa.me/94706461066?text=${encodeURIComponent(`Hi, I want to customize the product "${product.name}" (Size: ${size}). Here is how I want it customized: \n\n(Rate your web experience: ⭐⭐⭐⭐⭐)`)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0 }}
        className="products-page container"
      >
        <h2 className="page-title">{t('new_arrivals') || 'Our Products'}</h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 products-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
             <div style={{ color: 'white', textAlign: 'center', gridColumn: '1 / -1' }}>Loading products...</div>
          ) : products.length === 0 ? (
             <div style={{ color: 'white', textAlign: 'center', gridColumn: '1 / -1' }}>No products found.</div>
          ) : products.map((product) => {
            const imgIndex = currentImageIndex[product.id] || 0;
            const currentImgLayoutId = `img-${product.id}-${imgIndex}`;
            return (
              <motion.div key={product.id} variants={itemVariants} className="product-card glass" style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  className="product-image-container" 
                  style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setLightboxImage({ url: product.images[imgIndex], layoutId: currentImgLayoutId })}
                >
                  <AnimatePresence mode="wait">
                    {product.images && product.images.length > 0 ? (
                      <motion.img 
                        key={imgIndex}
                        layoutId={currentImgLayoutId}
                        src={product.images[imgIndex]} 
                        alt={product.name} 
                        className="product-img"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)' }}>
                         <span style={{ color: '#fff' }}>No Image</span>
                      </div>
                    )}
                  </AnimatePresence>
                  <div className="product-category" style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>{product.category || 'T-Shirts'}</div>
                  
                  {product.images && product.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => handleImageNav(e, product.id, -1, product.images.length)}
                        style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '5px', color: 'white', cursor: 'pointer', zIndex: 10 }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={(e) => handleImageNav(e, product.id, 1, product.images.length)}
                        style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '5px', color: 'white', cursor: 'pointer', zIndex: 10 }}
                      >
                        <ChevronRight size={20} />
                      </button>
                      {/* Dots indicator */}
                      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px', zIndex: 10 }}>
                        {product.images.map((_, idx) => (
                          <div 
                            key={idx} 
                            style={{ 
                              width: '6px', height: '6px', borderRadius: '50%', 
                              background: idx === imgIndex ? 'var(--primary)' : 'rgba(255,255,255,0.5)',
                              transition: 'background 0.3s'
                            }} 
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="product-info" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3>{product.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '10px', flex: 1 }}>{product.description}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#fff' }}>Size:</span>
                    <select 
                      value={selectedSizes[product.id] || 'M'} 
                      onChange={(e) => handleSizeChange(product.id, e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px', padding: '3px 8px', outline: 'none', cursor: 'pointer' }}
                    >
                      {['S', 'M', 'L', 'XL', '2XL'].map(s => <option key={s} value={s} style={{ color: '#000'}}>{s}</option>)}
                    </select>
                  </div>

                  <div className="product-bottom" style={{ marginTop: 'auto' }}>
                    <span className="product-price">Rs. {Number(product.price).toFixed(2)}</span>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                      title="Add to Cart"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button 
                      className="btn btn-primary" 
                      style={{ flex: 1, fontSize: '0.85rem', padding: '0.6rem', textAlign: 'center' }}
                      onClick={() => handleOrderNow(product)}
                    >
                      Order Now
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      style={{ flex: 1, fontSize: '0.85rem', padding: '0.6rem', textAlign: 'center', background: '#25D366', color: 'white', borderColor: '#25D366' }}
                      onClick={() => handleCustomizeWhatsapp(product)}
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            style={{ 
              position: 'fixed', 
              top: 0, left: 0, right: 0, bottom: 0, 
              background: 'rgba(0,0,0,0.85)', 
              backdropFilter: 'blur(5px)',
              zIndex: 99999, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'zoom-out',
              padding: '20px'
            }}
          >
            <button 
              onClick={() => setLightboxImage(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 100000 }}
            >
              <X size={32} />
            </button>
            <motion.img 
              layoutId={lightboxImage.layoutId}
              src={lightboxImage.url}
              style={{ 
                maxHeight: '90vh', 
                maxWidth: '90vw', 
                borderRadius: '15px', 
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                objectFit: 'contain'
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
