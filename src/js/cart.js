
const Cart = {
  items: [],

  load() {
    try {
      const saved = JSON.parse(localStorage.getItem('kb_cart')) || [];
      this.items = Array.isArray(saved)
        ? saved.filter(item =>
            item &&
            typeof item.id === 'string' &&
            Number.isInteger(item.qty) &&
            item.qty > 0
          )
        : [];
    } catch (e) {
      this.items = [];
    }
  },

  save() {
    try {
      localStorage.setItem('kb_cart', JSON.stringify(this.items));
    } catch (e) {
      console.warn('Could not save cart to local storage.');
    }
  },

  add(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const item = this.items.find(x => x.id === id);

    if (item) {
      item.qty++;
    } else {
      this.items.push({ id, qty: 1 });
    }

    this.save();
  },

  change(id, d) {
    const item = this.items.find(x => x.id === id);
    if (!item || !Number.isInteger(d)) return;

    item.qty += d;

    if (item.qty <= 0) {
      this.items = this.items.filter(x => x.id !== id);
    }

    this.save();
  },

  clear() {
    this.items = [];
    this.save();
  },

  count() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },

  total() {
    return this.items.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return sum + (product ? item.qty * product.price : 0);
    }, 0);
  }
};
