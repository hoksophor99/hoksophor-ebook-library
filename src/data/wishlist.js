const WISHLIST_KEY = "wishlist";

// Get wishlist
export const getWishlist = () => {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
};

// Add / Remove book
export const toggleWishlist = (book) => {
  const wishlist = getWishlist();
  const exists = wishlist.find((b) => b.id === book.id);

  let updated;

  if (exists) {
    updated = wishlist.filter((b) => b.id !== book.id);
  } else {
    updated = [...wishlist, book];
  }

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  return updated;
};

// Remove one item
export const removeFromWishlist = (id) => {
  const updated = getWishlist().filter((b) => b.id !== id);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  return updated;
};