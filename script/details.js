document.addEventListener("DOMContentLoaded", function() {
    // Function to populate the cart table
    function populateCart() {
      const cartTableBody = document.querySelector("#cartTable tbody");
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      // Clear the table before repopulating
      cartTableBody.innerHTML = "";
  
      cartItems.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td>Rs ${item.price}</td>
          <td>${item.quantity}</td>
          <td>Rs ${item.totalPrice}</td>
        `;
        cartTableBody.appendChild(row);
      });
    }
  
    // Call populateCart to show cart on page load
    populateCart();
  
    // Handle form submission for placing an order
    window.submitOrder = function() {
      const personalForm = document.getElementById("personalForm");
      const deliveryForm = document.getElementById("deliveryForm");
      const cardForm = document.getElementById("cardForm");
  
      // Get personal, delivery, and card details
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
      const city = document.getElementById("city").value;
      const postalCode = document.getElementById("postalCode").value;
      const cardNumber = document.getElementById("cardNumber").value;
      const expiryDate = document.getElementById("expiryDate").value;
      const cvv = document.getElementById("cvv").value;
  
      // Validate the inputs
      if (!fullName || !email || !phone || !address || !city || !postalCode || !cardNumber || !expiryDate || !cvv) {
        alert("Please fill in all the details.");
        return;
      }

     
      // Gather order details
      const orderDetails = {
        personalDetails: {
          fullName, email, phone
        },
        deliveryDetails: {
          address, city, postalCode
        },
        cardDetails: {
          cardNumber, expiryDate, cvv
        },
        cartItems: JSON.parse(localStorage.getItem("cartItems")) || []
      };
  
      // Send order details to the server (or save it locally for now)
      console.log("Order details:", orderDetails);
  
      // Clear the cart after order
      localStorage.removeItem("cartItems");
  
      alert("order placed success fully!");
      window.location.href = "new.html"; // Redirect back to home page or a thank-you page}
    
      
    };
  });
  