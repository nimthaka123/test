document.addEventListener("DOMContentLoaded", function () {
  const cartTableBody = document.querySelector("#cartTable tbody");

  // Add to cart functionality
  function addToCart() {
      const productCards = document.querySelectorAll(".product-card");
      cartTableBody.innerHTML = ""; // Clear current cart
      let totalPrice = 0;

      productCards.forEach((card) => {
          const name = card.querySelector("h3").textContent;
          const price = parseFloat(card.querySelector("p").textContent.replace("Rs", ""));
          const quantity = parseInt(card.querySelector("input").value);

          if (quantity > 0) {
              const row = document.createElement("tr");

              row.innerHTML = `
                  <td>${name}</td>
                  <td>Rs${price.toFixed(2)}</td>
                  <td>${quantity}</td>
                  <td>Rs${(price * quantity).toFixed(2)}</td>
              `;

              cartTableBody.appendChild(row);
              totalPrice += price * quantity;
          }
      });

      // Add total price row
      const totalRow = document.createElement("tr");
      totalRow.innerHTML = `
          <td colspan="3"><strong>Total Price</strong></td>
          <td><strong>Rs${totalPrice.toFixed(2)}</strong></td>
      `;
      cartTableBody.appendChild(totalRow);
  }

  // Save favorites
  function saveFavorites() {
      const cartItems = [];
      cartTableBody.querySelectorAll("tr").forEach((row) => {
          const cells = row.querySelectorAll("td");
          if (cells.length === 4) {
              cartItems.push({
                  name: cells[0].textContent,
                  price: parseFloat(cells[1].textContent.replace("Rs", "")),
                  quantity: parseInt(cells[2].textContent),
              });
          }
      });
      localStorage.setItem("favoriteCart", JSON.stringify(cartItems));
      alert("Favorites saved successfully!");
  }

  // Apply favorites
  function applyFavorites() {
      const favoriteCart = JSON.parse(localStorage.getItem("favoriteCart") || "[]");

      if (favoriteCart.length > 0) {
          cartTableBody.innerHTML = ""; // Clear current cart
          let totalPrice = 0;

          favoriteCart.forEach((item) => {
              const row = document.createElement("tr");

              row.innerHTML = `
                  <td>${item.name}</td>
                  <td>Rs${item.price.toFixed(2)}</td>
                  <td>${item.quantity}</td>
                  <td>Rs${(item.price * item.quantity).toFixed(2)}</td>
              `;

              cartTableBody.appendChild(row);
              totalPrice += item.price * item.quantity;
          });

          // Add total price row
          const totalRow = document.createElement("tr");
          totalRow.innerHTML = `
              <td colspan="3"><strong>Total Price</strong></td>
              <td><strong>Rs${totalPrice.toFixed(2)}</strong></td>
          `;
          cartTableBody.appendChild(totalRow);
          alert("Favorites applied successfully!");
      } else {
          alert("No favorites saved.");
      }
  }

  // Navigate to the order page
  function navigateToOrderPage() {
      const orderDetails = [];
      cartTableBody.querySelectorAll("tr").forEach((row) => {
          const cells = row.querySelectorAll("td");
          if (cells.length === 4) {
              orderDetails.push({
                  name: cells[0].textContent,
                  price: cells[1].textContent,
                  quantity: cells[2].textContent,
                  totalPrice: cells[3].textContent,
              });
          }
      });
      

      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
      window.location.href = "details.html";
  }
  

  // Add event listeners
  document.querySelector("button[onclick='Addtocart()']").addEventListener("click", addToCart);
  document.querySelector("button[onclick='saveFavorites()']").addEventListener("click", saveFavorites);
  document.querySelector("button[onclick='applyFavorites()']").addEventListener("click", applyFavorites);
  document.querySelector("button[onclick='navigateToOrderPage()']").addEventListener("click", navigateToOrderPage);
});
