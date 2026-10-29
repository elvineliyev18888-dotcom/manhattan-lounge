'use client';

import React, { useState } from 'react';
import { ShoppingBag, Utensils, CheckCircle, Plus, Minus } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Category {
  title: string;
  items: MenuItem[];
}

const menuData: Category[] = [
  {
    title: "Şorbalar / Soups",
    items: [
      { id: "s1", name: "Mərci şorbası / Lentil soup", price: 5.00 },
      { id: "s2", name: "Çolpa şorbası / Chicken soup", price: 5.00 },
      { id: "s3", name: "Tomat şorbası / Tomato soup", price: 5.00 },
      { id: "s4", name: "Düşbərə / Dushbara", price: 6.00 },
      { id: "s5", name: "Göbələk şorbası / Mushroom soup", price: 5.00 },
    ]
  },
  {
    title: "Salatlar / Salads",
    items: [
      { id: "sal1", name: "Sezar salatı toyuq ilə", price: 11.00 },
      { id: "sal2", name: "Sezar salatı krevetka ilə", price: 13.00 },
      { id: "sal3", name: "Çoban salatı", price: 5.00 },
      { id: "sal4", name: "Toyuq salatı", price: 8.00 },
      { id: "sal5", name: "Tuna salatı", price: 12.00 },
      { id: "sal6", name: "Mal əti salatı", price: 12.00 },
      { id: "sal7", name: "Yunan salatı", price: 7.00 },
      { id: "sal8", name: "Manhattan salatı", price: 14.00 },
      { id: "sal9", name: "Tərəvəz buket", price: 5.00 },
    ]
  },
  {
    title: "Sendviç və Burger / Sandwich & Burger",
    items: [
      { id: "b1", name: "Çizburger", price: 14.00 },
      { id: "b2", name: "Black burger", price: 15.00 },
      { id: "b3", name: "Klub sendviç", price: 11.00 },
      { id: "b4", name: "Tost", price: 8.00 },
      { id: "b5", name: "Şaurma", price: 7.00 },
      { id: "b6", name: "Toyuq burger", price: 12.00 },
      { id: "b7", name: "Mal əti burger", price: 14.00 },
    ]
  },
  {
    title: "Pizzalar / Pizzas",
    items: [
      { id: "p1", name: "Margarita", price: 11.00 },
      { id: "p2", name: "Sezar pizza", price: 15.00 },
      { id: "p3", name: "Toyuqlu pizza", price: 13.00 },
      { id: "p4", name: "Barbekü pizza", price: 12.00 },
      { id: "p5", name: "Pepperoni pizza", price: 14.00 },
      { id: "p6", name: "Mix pizza", price: 17.00 },
      { id: "p7", name: "Manhattan pizza", price: 17.00 },
    ]
  },
  {
    title: "İsti Yeməklər / Hot Dishes",
    items: [
      { id: "h1", name: "Toyuq sac (2 nəfərlik)", price: 20.00 },
      { id: "h2", name: "Çoban qovurma", price: 14.00 },
      { id: "h3", name: "Quzu sac (2 nəfərlik)", price: 25.00 },
      { id: "h4", name: "Toyuq langeti", price: 12.00 },
      { id: "h5", name: "Can əti sac (2 nəfərlik)", price: 28.00 },
      { id: "h6", name: "Ət langeti", price: 14.00 },
      { id: "h7", name: "Can assorti (2 nəfərlik)", price: 30.00 },
      { id: "h8", name: "Monastr", price: 12.00 },
      { id: "h10", name: "Tabaka (çolpa)", price: 20.00 },
      { id: "h11", name: "BBQ souslu ət", price: 14.00 },
      { id: "h12", name: "Fajitas", price: 13.00 },
      { id: "h13", name: "Kefli beçə", price: 20.00 },
      { id: "h14", name: "Chicken stroganoff", price: 11.00 },
      { id: "h15", name: "Nar qovurma", price: 12.00 },
      { id: "h16", name: "Beef stroganoff", price: 12.00 },
      { id: "h17", name: "Chicken rice", price: 11.00 },
      { id: "h18", name: "Vişnə souslu can əti", price: 14.00 },
      { id: "h19", name: "Beef rice", price: 13.00 },
      { id: "h20", name: "Şefdən özəl (Chef's Special)", price: 40.00 },
      { id: "h21", name: "Gorden blue", price: 14.00 },
    ]
  },
  {
    title: "Kabablar / Kebabs",
    items: [
      { id: "k1", name: "Lülə kabab", price: 12.00 },
      { id: "k2", name: "Tikə kabab", price: 13.00 },
      { id: "k3", name: "Antrekot", price: 14.00 },
      { id: "k4", name: "Dana basdırma", price: 13.00 },
      { id: "k5", name: "Toyuq kababı", price: 9.00 },
      { id: "k6", name: "Kartof kababı quyruq ilə", price: 6.00 },
      { id: "k7", name: "Tərəvəz kababı", price: 6.00 },
    ]
  },
  {
    title: "Qarnirlər / Garnishes",
    items: [
      { id: "g1", name: "Kartof fri", price: 4.00 },
      { id: "g2", name: "Düyü", price: 3.00 },
      { id: "g3", name: "Ev sayağı kartof", price: 4.00 },
      { id: "g4", name: "Tərəvəzlər", price: 6.00 },
    ]
  },
  {
    title: "Qəlyanaltılar / Snacks",
    items: [
      { id: "sn1", name: "Nuggets", price: 11.00 },
      { id: "sn2", name: "Mozzarella çubuqları", price: 10.00 },
      { id: "sn3", name: "Pendir assorti", price: 12.00 },
      { id: "sn4", name: "Brusketta", price: 7.00 },
      { id: "sn5", name: "La Capresse", price: 9.00 },
      { id: "sn6", name: "Acılı qanad", price: 10.00 },
      { id: "sn7", name: "Turşu assorti", price: 6.00 },
    ]
  },
  {
    title: "Məzələr / Appetizers",
    items: [
      { id: "mz1", name: "Çipsi / Chips", price: 4.00 },
      { id: "mz2", name: "Antep", price: 7.00 },
      { id: "mz3", name: "Saçaq pendir", price: 4.00 },
      { id: "mz4", name: "Qızardılmış pendir", price: 4.50 },
      { id: "mz5", name: "Qızardılmış düşbərə", price: 4.50 },
      { id: "mz6", name: "Boğaz", price: 4.00 },
      { id: "mz7", name: "Pətənək", price: 5.00 },
      { id: "mz8", name: "Günəbaxan tumu", price: 3.00 },
      { id: "mz9", name: "Bildirçin", price: 5.00 },
      { id: "mz10", name: "Krevetka", price: 10.00 },
      { id: "mz11", name: "Sosiska (İveriya)", price: 7.00 },
      { id: "mz12", name: "Sosiska (Sardelka)", price: 6.00 },
      { id: "mz13", name: "Assorti kolbasa", price: 15.00 },
      { id: "mz14", name: "Ət basdırma", price: 8.00 },
      { id: "mz15", name: "Dorado", price: 15.00 },
      { id: "mz16", name: "Alabalıq", price: 7.00 },
      { id: "mz17", name: "Krakovstomat", price: 8.00 },
      { id: "mz18", name: "Krevetka tempura", price: 13.00 },
      { id: "mz19", name: "Krevetka tavada", price: 10.00 },
      { id: "mz20", name: "Fimi", price: 7.00 },
      { id: "mz21", name: "Qrenki", price: 6.00 },
      { id: "mz22", name: "Krevetka (shoot)", price: 15.00 },
    ]
  },
  {
    title: "Desertlər / Desserts",
    items: [
      { id: "d1", name: "Meyvə assorti", price: 16.00 },
      { id: "d2", name: "Meyvə salatı", price: 8.00 },
      { id: "d3", name: "Dondurma", price: 7.00 },
    ]
  },
  {
    title: "Şirniyyatlar / Sweets",
    items: [
      { id: "sw1", name: "Cheesecake", price: 10.00 },
      { id: "sw2", name: "Tiramisu", price: 8.00 },
      { id: "sw3", name: "Türk paxlavası", price: 4.00 },
      { id: "sw4", name: "Şirniyyat mix", price: 6.00 },
      { id: "sw5", name: "Şaftalı mürəbbəsi", price: 5.00 },
      { id: "sw6", name: "Vişnə mürəbbəsi", price: 5.00 },
      { id: "sw7", name: "Ağ gilas mürəbbəsi", price: 5.00 },
      { id: "sw8", name: "Çiyələk mürəbbəsi", price: 5.00 },
      { id: "sw9", name: "Qoz mürəbbəsi", price: 7.00 },
      { id: "sw10", name: "Snickers mürəbbəsi", price: 7.00 },
      { id: "sw11", name: "Plombir mürəbbəsi", price: 7.00 },
    ]
  },
  {
    title: "Spirtsiz İçkilər / Soft Drinks",
    items: [
      { id: "i1", name: "Sirab premium", price: 4.00 },
      { id: "i2", name: "Red bull", price: 7.00 },
      { id: "i3", name: "Coca-cola", price: 3.50 },
      { id: "i4", name: "Fanta", price: 3.50 },
      { id: "i5", name: "Sprite", price: 3.50 },
      { id: "i6", name: "Tonic", price: 3.00 },
      { id: "i7", name: "Sarıkız", price: 3.00 },
      { id: "i8", name: "Bizon", price: 2.50 },
      { id: "i9", name: "Hell", price: 3.00 },
      { id: "i10", name: "Meyvə şirəsi 200 ml", price: 3.00 },
      { id: "i11", name: "Meyvə şirəsi 1 l", price: 7.00 },
      { id: "i12", name: "Kompot", price: 6.00 },
    ]
  },
  {
    title: "İsti İçkilər / Hot Drinks",
    items: [
      { id: "hot1", name: "Qara çay", price: 5.00 },
      { id: "hot2", name: "Yaşıl çay", price: 5.00 },
      { id: "hot3", name: "Bitki çayı", price: 7.00 },
      { id: "hot4", name: "Jasmin çayı", price: 6.00 },
      { id: "hot5", name: "Espresso", price: 4.00 },
      { id: "hot6", name: "Double espresso", price: 5.00 },
      { id: "hot7", name: "Americano", price: 5.00 },
      { id: "hot8", name: "Cappuccino", price: 6.00 },
      { id: "hot9", name: "Latte", price: 7.00 },
    ]
  },
  {
    title: "Pivə / Beer",
    items: [
      { id: "beer1", name: "Xırdalan", price: 3.50 },
      { id: "beer2", name: "Xırdalan (filtersiz)", price: 3.80 },
      { id: "beer3", name: "Corona", price: 7.00 },
      { id: "beer4", name: "Erdinger", price: 8.00 },
      { id: "beer5", name: "Miller", price: 7.00 },
      { id: "beer6", name: "Tuborg 330 ml", price: 6.00 },
      { id: "beer7", name: "Efes", price: 7.00 },
      { id: "beer8", name: "Efes zero", price: 5.00 },
      { id: "beer9", name: "Alivaria", price: 6.00 },
      { id: "beer10", name: "Blanch", price: 6.00 },
      { id: "beer11", name: "Hoegaarden 0.33 ml", price: 6.00 },
    ]
  },
  {
    title: "Spirtli Kokteylər / Alcoholic Cocktails",
    items: [
      { id: "cock1", name: "Aperol Spritz", price: 10.00 },
      { id: "cock2", name: "Mojito", price: 8.00 },
      { id: "cock3", name: "Blue Lagoon", price: 9.00 },
      { id: "cock4", name: "Sex on the Beach", price: 10.00 },
      { id: "cock5", name: "Margarita", price: 10.00 },
      { id: "cock6", name: "Tequila Sunrise", price: 9.00 },
      { id: "cock7", name: "Negroni", price: 9.00 },
      { id: "cock8", name: "Long Island Ice Tea", price: 13.00 },
      { id: "cock9", name: "Cosmopolitan", price: 9.00 },
      { id: "cock10", name: "Daiquiri", price: 9.00 },
      { id: "cock11", name: "Bloody Mary", price: 10.00 },
      { id: "cock12", name: "Manhattan", price: 11.00 },
    ]
  },
  {
    title: "Şərablar / Wine",
    items: [
      { id: "w1", name: "Savalan", price: 25.00 },
      { id: "w2", name: "Savalan kəmşirin", price: 30.00 },
      { id: "w3", name: "Meysəri", price: 30.00 },
      { id: "w4", name: "Hillside", price: 35.00 },
      { id: "w5", name: "Basarkeçər", price: 15.00 },
      { id: "w6", name: "Sevgilim", price: 24.00 },
      { id: "w7", name: "Yeddi gözəl", price: 18.00 },
      { id: "w8", name: "Çinar", price: 16.00 },
    ]
  },
  {
    title: "Spirtli İçkilər / Alcoholic Beverages",
    items: [
      { id: "alc1", name: "Jameson 0.050 Ml", price: 6.00 },
      { id: "alc2", name: "Jameson 1 L", price: 100.00 },
      { id: "alc3", name: "Jack Daniels 0.050 Ml", price: 7.00 },
      { id: "alc4", name: "Jack Daniels 1 L", price: 110.00 },
      { id: "alc5", name: "Chivas Regal (12) 0.050 Ml", price: 7.00 },
      { id: "alc6", name: "Chivas Regal (12) 1 L", price: 120.00 },
      { id: "alc7", name: "Jagermeister 0.050 Ml", price: 6.00 },
      { id: "alc8", name: "Jagermeister 1 L", price: 90.00 },
      { id: "alc9", name: "Tequila (Sierra) 0.050 Ml", price: 5.00 },
      { id: "alc10", name: "Tequila (Olmega) 0.050 Ml", price: 6.00 },
      { id: "alc11", name: "Tequila (Sierra) 1 L", price: 90.00 },
      { id: "alc12", name: "Tequila (Olmega) 1 L", price: 100.00 },
      { id: "alc13", name: "Türk Rakısı 0.7 L", price: 70.00 },
      { id: "alc14", name: "Türk Rakısı 1 L", price: 85.00 },
    ]
  },
  {
    title: "Qəlyan / Hookah",
    items: [
      { id: "q1", name: "Qəlyan (çaşka)", price: 20.00 },
      { id: "q2", name: "Qəlyan (qreyfrut)", price: 25.00 },
      { id: "q3", name: "Qəlyan (ananas)", price: 30.00 },
      { id: "q4", name: "Qəlyan (qarpız)", price: 30.00 },
    ]
  }
];

export default function MenuPage() {
  const [tableNumber, setTableNumber] = useState('');
  const [cart, setCart] = useState<{ item: MenuItem; count: number }[]>([]);
  const [orderSent, setOrderSent] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) {
        return prev.map(p => p.item.id === item.id ? { ...p, count: p.count + 1 } : p);
      }
      return [...prev, { item, count: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.map(p => p.item.id === id ? { ...p, count: p.count - 1 } : p).filter(p => p.count > 0));
  };

  const totalPrice = cart.reduce((sum, current) => sum + current.item.price * current.count, 0);

  const sendOrder = () => {
    if (!tableNumber) {
      alert('Zəhmət olmasa otaq nömrəsini daxil edin!');
      return;
    }
    if (cart.length === 0) {
      alert('Səbətiniz boşdur!');
      return;
    }

    const newOrder = {
      id: Date.now(),
      table: tableNumber,
      items: cart,
      total: totalPrice,
      time: new Date().toLocaleTimeString(),
      status: 'Yeni'
    };

    const existingOrders = JSON.parse(localStorage.getItem('manhattan_orders') || '[]');
    localStorage.setItem('manhattan_orders', JSON.stringify([newOrder, ...existingOrders]));

    setOrderSent(true);
    setTimeout(() => {
      setCart([]);
      setOrderSent(false);
    }, 4000);
  };

  return (
    <main className="min-h-screen text-white relative bg-gray-950 overflow-x-hidden">
      {/* Arxa Fon Hərəkətli Video - Parlaq və aydın görünməsi üçün */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Brauzeriniz videonu dəstəkləmir.
      </video>

      {/* Yazıların oxunması üçün tünd qat (Overlay) */}
      <div className="fixed inset-0 bg-gray-950/70 z-0 pointer-events-none" />

      {/* Əsas Məzmun */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8">
        <header className="text-center mb-8 border-b border-gray-800 pb-4 bg-gray-900/80 backdrop-blur-md p-4 rounded-xl border border-gray-700/80 shadow-lg">
          <h1 className="text-3xl font-bold tracking-wider text-amber-500">MANHATTAN</h1>
          <p className="text-gray-300 text-sm">Lounge Rooms • QR Menyu</p>
          
          <div className="mt-4 flex justify-center items-center gap-2">
            <label className="text-sm font-medium text-gray-200">Otaq Nömrəsi:</label>
            <input 
              type="text" 
              value={tableNumber} 
              onChange={(e) => setTableNumber(e.target.value)} 
              placeholder="Məs: 5" 
              className="w-20 px-3 py-1 bg-gray-950/85 border border-gray-700 rounded-lg text-center text-amber-400 font-bold focus:outline-none focus:border-amber-500 shadow-lg"
            />
          </div>
        </header>

        {orderSent && (
          <div className="bg-emerald-900/80 border border-emerald-500 text-emerald-200 p-4 rounded-xl mb-6 text-center flex items-center justify-center gap-2 backdrop-blur-md shadow-xl">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <span>Sifarişiniz uğurla kassaya göndərildi! Tezliklə hazırlanacaq.</span>
          </div>
        )}

        <div className="space-y-8 mb-24">
          {menuData.map((cat, idx) => (
            <div key={idx} className="bg-gray-900/85 backdrop-blur-md border border-gray-800/80 rounded-xl p-4 md:p-6 shadow-2xl">
              <h2 className="text-xl font-semibold text-amber-400 mb-4 border-b border-gray-800 pb-2">{cat.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-950/75 p-3 rounded-lg border border-gray-800/60 shadow-md">
                    <div>
                      <h3 className="font-medium text-gray-200 text-sm md:text-base">{item.name}</h3>
                      <span className="text-amber-500 font-bold text-sm">{item.price.toFixed(2)} AZN</span>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold p-2 rounded-lg transition-colors flex items-center gap-1 text-xs shadow-md"
                    >
                      <Plus className="w-4 h-4" /> Seç
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 p-4 shadow-2xl z-50">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-gray-400 text-sm">Seçilən məhsullar: </span>
                <span className="font-bold text-amber-400">{cart.reduce((a, c) => a + c.count, 0)} ədəd</span>
                <span className="mx-3 text-gray-600">|</span>
                <span className="text-gray-400 text-sm">Cəmi: </span>
                <span className="font-bold text-amber-400 text-lg">{totalPrice.toFixed(2)} AZN</span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto max-w-xs md:max-w-md">
                {cart.map(c => (
                  <span key={c.item.id} className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-300 flex items-center gap-1">
                    {c.item.name.substring(0, 10)}... (x{c.count})
                    <button onClick={() => removeFromCart(c.item.id)} className="text-red-400 font-bold ml-1">×</button>
                  </span>
                ))}
              </div>

              <button 
                onClick={sendOrder}
                className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" /> Sifarişi Təsdiqlə
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}