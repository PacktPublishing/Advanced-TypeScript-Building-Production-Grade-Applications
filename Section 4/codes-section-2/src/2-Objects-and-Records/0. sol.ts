// Define a type for the store's inventory, where each product (string) maps to a quantity (number).
// type Inventory = {
//   [product: string]: number;
// };

type Inventory = Record<string, number>;

const storeInventory: Inventory = {};

// Adding products and their quantities to the inventory.
storeInventory.apple = 50;
storeInventory.banana = 100;
storeInventory.orange = 75;

// Alternatively, you could use bracket notation:
// storeInventory["apple"] = 50;
// storeInventory["banana"] = 100;
// storeInventory["orange"] = 75;
