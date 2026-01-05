const normalizePrice = (price) => {
  if (price == null) return 0;

  if (typeof price === "number") return price;

  if (typeof price === "string") {
    const cleaned = price.replace(/\$/g, "").trim();
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  }

  return 0;
};


export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
export const addToCart = (book) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === book.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...book, qty: 1 });
  }

  saveCart(cart);
};
export const updateCartQty = (id, type) => {
  const cart = getCart().map((item) =>
    item.id === id
      ? {
          ...item,
          qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
        }
      : item
  );
  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
};
