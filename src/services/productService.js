import axios from "axios";

let baseUrl = "http://localhost:3000";

export default {
  getProducts() {
    return axios.get(`${baseUrl}/products`);
  },
  createProduct(book) {
    return axios.post(`${baseUrl}/products`, book);
  },
  addToCart(product) {
    // return axios.post(`${baseUrl}/cart`, product); // url qui reçoit le product
    // use localstorage
    return new Promise(resolve => {
      //voir dans le localstorage si on a déjà un caddie
      let cartInLocalstorage = localStorage.getItem("vuex-commerce-cart");
      let cart = {};
      if (!cartInLocalstorage) {
        product.quantity = 1;
        cart = {
          products: [product]
        };
        localStorage.setItem("vuex-commerce-cart", JSON.stringify(cart));
        resolve(cart);
      } else {
        const products = JSON.parse(localStorage.getItem("vuex-commerce-cart"))
          .products;
        //is same product already in cart ?
        const index = products.findIndex(p => p.id === product.id);
        if (index === -1) {
          product.quantity = 1;
          cart = { products: [product, ...products] };
        } else {
          products[index].quantity += 1;
          cart = {
            products: [...products]
          };
        }
      }
      localStorage.setItem("vuex-commerce-cart", JSON.stringify(cart));
      resolve(cart);
    });
  },
  removeOneFromCart(product) {
    return new Promise(resolve => {
      const products = JSON.parse(localStorage.getItem("vuex-commerce-cart"))
        //récupére le contenu du local storage (on le parse car dans le local storage on ne récupère que des chaines)
        .products; // on peut accéder à la propriété qui nous intéresse ici products
      const index = products.findIndex( p => p.id === product.id); // on trouve l'index du produit
      products[index].quantity -= 1; // on se sert de cet index pour décrementer la quantité

      // remove this product from cart if it's new quantity is zero
      if (products[index].quantity === 0) {
        products.splice(index, 1); // on supprime à la position de cet index un élément
      }

      const cart = {
        // on va créer de nouveau un caddie qui est un objet
        products: [...products] // qui une propriété product, sa valeur est un tableau d'objets
      };
      localStorage.setItem("vuex-commerce-cart", JSON.stringify(cart)); // du coup on remet dans notre localstorage la version stringifiée de notre caddie
      resolve(cart); // on résout la promesse un appelant la méthode resolve
    });
  }
};
