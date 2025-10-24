import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

const PRODUCTS = [
  { id: 'n1', title: 'Tobacco Vanille (inspirada)', price: 100, category: 'nicho', img: '/images/nicho/tobacco_vanille.jpg', desc: 'Fragancia intensa con notas de vainilla, cacao y especias orientales. 120 mL', stock: 10 },
];

function formatMXN(n) { return `$${n.toFixed(2)} MXN`; }

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(state)); }, [key, state]);
  return [state, setState];
}

function ProductCard({ p }) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg hover:scale-105 transition">
      <img src={p.img} alt={p.title} className="rounded-lg mb-2" />
      <h2 className="font-bold text-lg">{p.title}</h2>
      <p className="text-sm opacity-80">{p.desc}</p>
      <p className="font-semibold mt-2">{formatMXN(p.price)}</p>
    </div>
  );
}

function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-black min-h-screen">
      {PRODUCTS.map(p => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4 flex gap-4 justify-center">
        <NavLink to="/" className="hover:text-pink-400">Inicio</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
