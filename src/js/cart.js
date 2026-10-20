const Cart = {
  items: [],
  load(){ try { this.items = JSON.parse(localStorage.getItem('kb_cart')) || []; } catch(e){ this.items = []; } },
  save(){ try { localStorage.setItem('kb_cart', JSON.stringify(this.items)); } catch(e){} },
  add(id){ const i = this.items.find(x=>x.id===id); i ? i.qty++ : this.items.push({id, qty:1}); this.save(); },
  change(id, d){ const i = this.items.find(x=>x.id===id); if(!i) return; i.qty += d; if(i.qty<=0) this.items = this.items.filter(x=>x.id!==id); this.save(); },
  clear(){ this.items = []; this.save(); },
  count(){ return this.items.reduce((s,i)=>s+i.qty,0); },
  total(){ return this.items.reduce((s,i)=>s + i.qty * PRODUCTS.find(p=>p.id===i.id).price, 0); }
};
