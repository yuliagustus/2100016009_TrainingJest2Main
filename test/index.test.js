// ! Dont change this code
const {
  fetchProductsData,
  setProductsCards,
  convertToRupiah,
  countDiscount,
} = require("../src/index.js");
const cartData = require("../src/data/cart.js");

// @ Write your code here

// Asyncronous Testing
// https://jestjs.io/docs/asynchronous
describe("Product API Testing", () => {
  // Test Case 1: should return product data with id 1
  test("should return product data with id 1", async () => {
    const productData = await fetchProductsData(1);
    expect(productData.id).toBe(1);
    expect(productData.title).toBe("iPhone 9");
  });
/**Menggunakan asynchronous test (async ()) karena menggunakan fetchProductsData yang mengembalikan promise.
 * Memastikan produk dengan id 1 memiliki properti id yang sesuai dan title adalah "iPhone 9".
 */

  // Test Case 2: should check products.length with limit
  test("should check products.length with limit", async () => {
    const productsData = await fetchProductsData();
    const productsCards = setProductsCards(productsData.products);
    const limit = productsData.limit;
    expect(productsCards.length).toBe(limit);
  });
/**Mengambil data produk dari API dan mengonversinya menjadi cards menggunakan setProductsCards.
 * Memastikan jumlah produk cards sesuai dengan batas (limit) yang diharapkan.
 */

  // Test Case 3: Example of additional test case
  test("should validate product discount calculation", () => {
    const price = 100;
    const discountPercentage = 10;
    const discountedPrice = countDiscount(price, discountPercentage);
    expect(discountedPrice).toBe(90);
  });
  /**Menggunakan countDiscount untuk menghitung harga diskon dari suatu produk.
   * Memastikan hasil perhitungan diskon sesuai dengan harapan.
   */
});

// Mocking
// https://jestjs.io/docs/mock-functions
const { fetchCartsData } = require("../src/dataService");

jest.mock("../src/dataservice", () => {
  const originalModule = jest.requireActual("../src/dataservice");
  return {
    ...originalModule,
    __esModule: true,
    fetchCartsData: jest.fn(),
  };
});

describe("Cart API Testing", () => {
  // Test case 1
  test("should compare total cart items with length of fetched data", async () => {
    fetchCartsData.mockResolvedValue(cartData.carts);
    const cartsData = await fetchCartsData();
    const totalItems = cartsData.length;
    const expectedTotal = cartData.total;
    expect(totalItems).toBe(expectedTotal);
  });
  /**Menggunakan mock function untuk menggantikan fetchCartsData dan memberikan nilai yang diinginkan.
   * Membandingkan jumlah total item keranjang dengan panjang data yang diambil dari fungsi fetchCartsData.
   */

  // Test case 2
  test("should compare total length of carts data with total", async () => {
    fetchCartsData.mockResolvedValue([
      { id: 1, product: 1, quantity: 2, price: 30 },
      { id: 2, product: 2, quantity: 1, price: 50 },
    ]);
    const cartsData = await fetchCartsData();
    const totalLength = cartsData.reduce((acc, cart) => acc + cart.quantity, 0);
    expect(totalLength).toBe(3);
  });
  /**Menggunakan mock function untuk menggantikan fetchCartsData dan memberikan nilai yang diinginkan.
   * Membandingkan jumlah total item pada data keranjang dengan total yang diharapkan. 
   */
});

// Setup & Teardown
// https://jestjs.io/docs/setup-teardown

let productsData; // Variabel untuk menyimpan data produk dari API

// Fetch data produk sebelum menjalankan test suite
beforeAll(async () => {
  productsData = await fetchProductsData();
});

describe("Product Utility Testing", () => {
  describe("convertToRupiah", () => {
    // Test case 1
    test("should convert 100 dollars into rupiah", () => {
      const priceInRupiah = convertToRupiah(100);
      expect(priceInRupiah).toMatch(/Rp\s1\.543\.600,\d{2}/);
      expect(typeof priceInRupiah).toBe("string");
    });
  /**Menggunakan convertToRupiah untuk mengonversi harga dalam dollar ke Rupiah.
   * Memastikan hasilnya sesuai dengan format Rupiah dan berupa string. 
   */

    // Test case 2
    test("should convert 1000 dollars into rupiah", () => {
      const priceInRupiah = convertToRupiah(1000);
      expect(priceInRupiah).toMatch(/Rp\s15\.436\.000,\d{2}/);
    });
  });
  /**Menggunakan convertToRupiah untuk mengonversi harga dalam dollar ke Rupiah.
   * Memastikan hasilnya sesuai dengan format Rupiah.
   */

  test("should calculate discount correctly", () => {
    // Test case 1
    const discountedPrice1 = countDiscount(100000, 20);
    expect(discountedPrice1).toBe(80000);

    // Test case 2
    const discountedPrice2 = countDiscount(75000, 10);
    expect(discountedPrice2).toBe(67500);
  });
  /**Menggunakan countDiscount untuk menghitung harga diskon.
   * Memastikan perhitungan diskon sesuai dengan harapan. 
   */

  describe("setProductsCards", () => {
    test("it should return an array of products with specific keys", () => {
      const productsCards = setProductsCards(productsData.products);
      const firstProductKeys = Object.keys(productsCards[0]);
      const expectedKeys = ["price", "after_discount", "image"];
      expect(firstProductKeys).toEqual(expect.arrayContaining(expectedKeys));
    });
  });
  /**Menggunakan setProductsCards untuk mengonversi data produk menjadi kartu produk.
   * Memastikan setiap produk kartu memiliki kunci-kunci yang diharapkan. 
   */
});