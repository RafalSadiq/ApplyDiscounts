
function applyDiscounts(cart) {
  let totalQuantity = 0;
  let cartTotal = 0;
  let productDiscounts = {};
  let discountName = "";
  let discountAmount = 0;

  // Calculate the total quantity and cart total
  for (const item of cart) {
    const { quantity, price, name } = item;
    totalQuantity += quantity;
    cartTotal += quantity * price;

    // Check if quantity exceeds 10 for bulk_5_discount
    if (quantity > 10) {
      const itemDiscount = price * quantity * 0.05;
      productDiscounts[item.id] = itemDiscount;
    }
  }

  // Check for flat_10_discount
  if (cartTotal > 200) {
    cartTotal -= 10;
    discountName = "flat_10_discount";
    discountAmount = 10;
  }

  // Check for bulk_10_discount
  if (totalQuantity > 20) {
    cartTotal *= 0.9;
    if (discountName === "") {
      discountName = "bulk_10_discount";
      discountAmount = cartTotal * 0.1;
    } else {
      discountName += ", bulk_10_discount";
      discountAmount += cartTotal * 0.1;
    }
  }

  // Check for tiered_50_discount
  if (totalQuantity > 30) {
    for (const item of cart) {
      const { id, quantity, price, name } = item;
      if (quantity > 15) {
        const discountedQuantity = quantity - 15;
        const itemDiscount = price * discountedQuantity * 0.5;
        productDiscounts[id] = itemDiscount;
      }
    }
    if (discountName === "") {
      discountName = "tiered_50_discount";
    } else {
      discountName += ", tiered_50_discount";
    }
  }

  // Apply product-level discounts
  for (const item of cart) {
    const { id, name } = item;
    if (productDiscounts.hasOwnProperty(id)) {
      const itemDiscount = productDiscounts[id];
      cartTotal -= itemDiscount;
    }
  }

  // Calculate shipping fee and gift wrap fee
  const shippingFee = 5;
  const giftWrapFee = 2;

  // Calculate subtotal
  const subtotal = cartTotal;

  // Calculate total
  const total = subtotal + shippingFee + giftWrapFee;

  return {
    cartItems: cart.map((item) => {
      const { name, quantity, price } = item;
      const itemTotal = quantity * price;
      return {
        name,
        quantity,
        total: itemTotal,
      };
    }),
    subtotal,
    discountName,
    discountAmount,
    shippingFee,
    giftWrapFee,
    total,
  };
}

// Example usage
const cart = [
  { id: 1, name: "Product 1", quantity: 5, price: 20 },
  { id: 2, name: "Product 2", quantity: 12, price: 10 },
  { id: 3, name: "Product 3", quantity: 8, price: 15 },
  { id: 4, name: "Product 4", quantity: 25, price: 5 },
  { id: 5, name: "Product 5", quantity: 20, price: 8 },
];

const discountsApplied = applyDiscounts(cart);

console.log("Cart Items:");
for (const item of discountsApplied.cartItems) {
  console.log(`${item.name}: Quantity: ${item.quantity}, Total: $${item.total}`);
}

console.log("Subtotal: $", discountsApplied.subtotal);
console.log("Discount Applied: ", discountsApplied.discountName);
console.log("Discount Amount: $", discountsApplied.discountAmount);
console.log("Shipping Fee: $", discountsApplied.shippingFee);
console.log("Gift Wrap Fee: $", discountsApplied.giftWrapFee);
console.log("Total: $", discountsApplied.total);


  