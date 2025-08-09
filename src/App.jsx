import React, { useState } from "react";
import birch from "./image/birch.jpeg";
import build from "./image/build.jpeg";
import flower from "./image/flower.jpeg";
import "./App.css";
const photos = [
  { id: 1, url: birch, category: "Природа", title: "Берёзовая роща" },
  { id: 2, url: build, category: "Город", title: "Лесное озеро" },
  { id: 3, url: flower, category: "Пейзаж", title: "Цветок" },
];
const categories = ["Все", ...Array.from(new Set(photos.map(p => p.category)))];
export default function App() {
  const [activeCat, setActiveCat] = useState("Все");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [orderData, setOrderData] = useState({ name: "", phone: "", details: "" });
  const [formSent, setFormSent] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const filteredPhotos =
    activeCat === "Все" ? photos : photos.filter(p => p.category === activeCat);
  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormSent(false), 4000);
    } else {
      alert("Пожалуйста, заполните все поля формы обратной связи.");
    }
  };
  const handleOrderChange = e => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = e => {
    e.preventDefault();
    if (orderData.name && orderData.phone) {
      setOrderSent(true);
      setOrderData({ name: "", phone: "", details: "" });
      setTimeout(() => setOrderSent(false), 4000);
    } else {
      alert("Пожалуйста, заполните имя и телефон для заказа.");
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Портфолио фотографа</h1>
        <p>Красивые фото с разных фотосессий</p>
      </header>

      <section className="gallery-section">
        <h2>Галерея работ</h2>
        <div className="filter-buttons">
          {categories.map(cat => (
            <button
              key={cat}
              className={cat === activeCat ? "active" : ""}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="gallery">
          {filteredPhotos.length ? (
            filteredPhotos.map(photo => (
              <div key={photo.id} className="photo-card">
                <img src={photo.url} alt={photo.title} />
                <div className="photo-info">
                  <h3>{photo.title}</h3>
                  <p>{photo.category}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Нет фотографий в этой категории.</p>
          )}
        </div>
      </section>
      <section className="order-section">
        <h2>Заказать фотосессию</h2>
        <form onSubmit={handleOrderSubmit} className="order-form">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={orderData.name}
            onChange={handleOrderChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={orderData.phone}
            onChange={handleOrderChange}
          />
          <textarea
            name="details"
            placeholder="Дополнительные детали"
            value={orderData.details}
            onChange={handleOrderChange}
          />
          <button type="submit">Заказать</button>
        </form>
        {orderSent && <p className="success-msg">Спасибо! Ваш заказ получен.</p>}
      </section>
      <section className="contact-section">
        <h2>Обратная связь</h2>
        <form onSubmit={handleFormSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleFormChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
          />
          <textarea
            name="message"
            placeholder="Сообщение"
            value={formData.message}
            onChange={handleFormChange}
          />
          <button type="submit">Отправить</button>
        </form>
        {formSent && <p className="success-msg">Спасибо за ваше сообщение!</p>}
      </section>
      <footer>
        <p>© 2025 Портфолио фотографа</p>
      </footer>
    </div>
  );
}
