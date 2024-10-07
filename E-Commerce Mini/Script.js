document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  

    updateCart();
 
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        addToCart(productName, productPrice);
      });
    });
  
    function addToCart(name, price) {
      const product = cart.find(item => item.name === name);
      if (product) {
        product.quantityz++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }
      updateCart();
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    function removeFromCart(name) {
      const productIndex = cart.findIndex(item => item.name === name);
      if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
          cart[productIndex].quantity--; 
        } else {
          cart.splice(productIndex, 1); 
        }
      }
      updateCart();
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
  
      if (cart.length === 0) {
        cartItems.innerHTML = '<p>El carrito está vacío.</p>';
        checkoutBtn.style.display = 'none';
      } else {
        cart.forEach(item => {
          const itemEl = document.createElement('div');
          itemEl.classList.add('cart-item');
          
          const itemInfo = document.createElement('p');
          itemInfo.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(3)}`;
          
          const removeBtn = document.createElement('button');
          removeBtn.textContent = 'Eliminar 1';
          removeBtn.classList.add('remove-btn');
          removeBtn.addEventListener('click', () => removeFromCart(item.name));
  
          itemEl.appendChild(itemInfo);
          itemEl.appendChild(removeBtn);
          cartItems.appendChild(itemEl);
  
          total += item.price * item.quantity;
        });
  
        checkoutBtn.style.display = 'block'; 
      }
  
      totalPriceEl.textContent = total.toFixed(3);
    }
  
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert("Tu carrito está vacío.");
      } else {
        alert("Gracias por tu compra.");
        cart = [];
        updateCart();
        localStorage.removeItem('cart');
      }
    });
  });
  