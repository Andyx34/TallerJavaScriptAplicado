document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  const checkoutBtn = document.getElementById('checkout');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const updateCart = () => {
    cartItems.innerHTML = cart.length ? '' : '<p>El carrito está vacío.</p>';
    totalPriceEl.textContent = cart.reduce((total, item) => {
      cartItems.innerHTML += `
        <div class="cart-item">
          <p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(3)}</p>
          <button onclick="removeFromCart('${item.name}')">Eliminar 1</button>
        </div>`;
      return total + item.price * item.quantity;
    }, 0).toFixed(3);
    checkoutBtn.style.display = cart.length ? 'block' : 'none';
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  document.querySelectorAll('.add-to-cart').forEach(button =>
    button.onclick = () => {
      const product = cart.find(item => item.name === button.dataset.name);
      product ? product.quantity++ : cart.push({ name: button.dataset.name, price: +button.dataset.price, quantity: 1 });
      updateCart();
    });

  window.removeFromCart = (name) => {
    const product = cart.find(item => item.name === name);
    product.quantity > 1 ? product.quantity-- : cart = cart.filter(item => item.name !== name);
    updateCart();
  };

  checkoutBtn.onclick = () => cart.length && (alert("Gracias por tu compra."), cart = [], updateCart());

  updateCart();
});
