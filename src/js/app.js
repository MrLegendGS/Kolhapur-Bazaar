const $ = id => document.getElementById(id);
const rupees = n => 'Rs. ' + n.toLocaleString('en-IN');

function renderProducts(list = PRODUCTS){
  $('productGrid').innerHTML = list.length ? list.map(p => `
    <article class="card">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      <div class="pic" style="background:${p.bg}" aria-hidden="true">${p.icon}</div>
      <h3>${p.name}</h3>
      <p class="cat">${p.cat}</p>
      <p class="meta">${p.desc}</p>
      <p class="rating">★ ${p.rating.toFixed(1)}</p>
      <div class="row">
        <span class="price">${rupees(p.price)}<span class="old">${rupees(p.old)}</span></span>
        <button class="buy" data-add="${p.id}">Add</button>
      </div>
    </article>`).join('') : '<p>No products found.</p>';
}

function renderCart(){
  $('cartCount').textContent = Cart.count();
  $('cartTotal').textContent = rupees(Cart.total());
  $('cartItems').innerHTML = Cart.items.length ? Cart.items.map(i => {
    const p = PRODUCTS.find(x => x.id === i.id);
    return `<li><span>${p.icon} ${p.name}</span><span class="qty">
      <button data-dec="${p.id}" aria-label="Decrease">-</button>${i.qty}
      <button data-inc="${p.id}" aria-label="Increase">+</button></span></li>`;
  }).join('') : '<li>Your cart is empty. Add a product to start.</li>';
}

function openCart(open){
  $('cartPanel').classList.toggle('open', open);
  $('overlay').classList.toggle('show', open);
  $('cartPanel').setAttribute('aria-hidden', String(!open));
}

let toastTimer;
function toast(msg){
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

document.addEventListener('click', e => {
  const t = e.target;
  if (t.dataset.add) { Cart.add(+t.dataset.add); toast(PRODUCTS.find(p => p.id === +t.dataset.add).name + ' added to cart'); }
  else if (t.dataset.inc) Cart.change(+t.dataset.inc, 1);
  else if (t.dataset.dec) Cart.change(+t.dataset.dec, -1);
  else if (t.closest('#cartBtn')) openCart(true);
  else if (t.id === 'closeCart' || t.id === 'overlay') openCart(false);
  else if (t.id === 'checkoutBtn') {
    if (!Cart.count()) { $('orderMsg').textContent = 'Add at least one product before placing an order.'; return; }
    $('orderMsg').textContent = 'Order placed. Total ' + rupees(Cart.total()) + ', pay on delivery.';
    Cart.clear();
  } else return;
  renderCart();
});

Cart.load();
renderProducts();
renderCart();
