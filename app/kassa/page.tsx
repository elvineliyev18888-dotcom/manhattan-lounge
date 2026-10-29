'use client';

import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, Trash2, RefreshCw, Lock, KeyRound } from 'lucide-react';

interface Order {
  id: number;
  table: string;
  items: { item: { name: string; price: number }; count: number }[];
  total: number;
  time: string;
  status: string;
}

export default function KassaPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  // Səhifə yenilənəndə giriş vəziyyətini yoxlayırıq
  useEffect(() => {
    const auth = localStorage.getItem('manhattan_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // BURADAN ŞİFRƏNI DƏYİŞƏ BİLƏRSİNİZ (Hazırkı şifrə: 1234)
    if (password === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('manhattan_auth', 'true');
    } else {
      alert('Şifrə yanlışdır! Zəhmət olmasa yenidən yoxlayın.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('manhattan_auth');
  };

  const loadOrders = () => {
    const saved = localStorage.getItem('manhattan_orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
      const interval = setInterval(loadOrders, 3000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const clearAllOrders = () => {
    if (confirm('Bütün sifariş tarixçəsini təmizləmək istədiyinizə əminsiniz?')) {
      localStorage.removeItem('manhattan_orders');
      setOrders([]);
    }
  };

  const removeOrder = (id: number) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem('manhattan_orders', JSON.stringify(updated));
  };

  // Əgər giriş edilməyibsə, Şifrə Giriş Ekranını göstər
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center p-4 relative bg-slate-950">
        {/* Arxa Fon Loqo - Şəffaflığı artırıldı (opacity-60) */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-60"
          style={{ backgroundImage: `url('/logo.jpg')` }}
        />
        {/* Giriş qutusunun arxasındakı qat bir az tündləşdirildi ki, yazılar oxunsun */}
        <div className="fixed inset-0 bg-slate-950/70 z-0 pointer-events-none" />

        {/* Giriş Qutusu */}
        <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-6">
            <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20 shadow-inner">
              <Lock className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-2xl font-bold text-amber-500">MANHATTAN KASSA</h1>
            <p className="text-slate-300 text-sm mt-1">Davam etmək üçün kassa şifrəsini daxil edin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Şifrə</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrəni daxil edin..."
                className="w-full px-4 py-3 bg-slate-950/85 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 font-medium"
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <KeyRound className="w-5 h-5" /> Giriş Et
            </button>
          </form>
          <p className="text-xs text-slate-400 text-center mt-4">Standart şifrə: <span className="text-amber-400 font-bold">1234</span></p>
        </div>
      </main>
    );
  }

  // Giriş edilibsə əsas Kassa Panelini göstər
  return (
    <main className="min-h-screen text-white p-6 relative bg-slate-950">
      {/* Arxa Fon Loqo - Şəffaflığı artırıldı (opacity-50) */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-50"
        style={{ backgroundImage: `url('/logo.jpg')` }}
      />
      <div className="fixed inset-0 bg-slate-950/75 z-0 pointer-events-none" />

      {/* Əsas Kassa Məzmunu */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/80 shadow-lg">
          <div>
            <h1 className="text-2xl font-bold text-amber-500">MANHATTAN - KASSA PANELİ</h1>
            <p className="text-slate-300 text-sm">Real-vaxt müştəri sifarişləri izləmə sistemi</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={loadOrders}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-slate-700 shadow-md transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Yenilə
            </button>
            <button 
              onClick={clearAllOrders}
              className="bg-red-900/40 hover:bg-red-900 text-red-300 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-red-800 shadow-md transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Hamısını Təmizlə
            </button>
            <button 
              onClick={handleLogout}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm border border-slate-700 hover:text-white shadow-md transition-colors"
            >
              Çıxış
            </button>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-slate-300 bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-xl">
            <Bell className="w-12 h-12 mx-auto mb-3 text-amber-500 animate-bounce" />
            <p className="text-lg">Hələ ki, aktiv sifariş yoxdur. Müştəri menyudan sifariş verdikdə dərhal burada görünəcək.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-xl p-5 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                    <span className="bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-lg text-lg shadow-md">
                      Masa {order.table}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">{order.time}</span>
                  </div>

                  <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
                    {order.items.map((cartItem, idx) => (
                      <li key={idx} className="flex justify-between text-sm bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/60">
                        <span className="text-slate-100">{cartItem.item.name}</span>
                        <span className="font-bold text-amber-400">x{cartItem.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Ümumi Məbləş</span>
                    <span className="text-lg font-bold text-emerald-400">{order.total.toFixed(2)} AZN</span>
                  </div>
                  <button 
                    onClick={() => removeOrder(order.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors shadow-lg"
                  >
                    <CheckCircle className="w-4 h-4" /> Tamamla
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}