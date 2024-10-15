

let productName = window.document.getElementById("productName");
let productPrice = window.document.getElementById("productPrice");
let productCategory = window.document.getElementById("productCategory");
let productDescription = window.document.getElementById("productDescription");
let productImage = window.document.getElementById("productImage");

let searchInput = window.document.getElementById("searchProduct");
let index = 0 ;

let productList = [];

if (localStorage.getItem("products") !== null) {
  productList = JSON.parse(localStorage.getItem("products"));

  displayProducts();
}

function addProduct() {
  if (
    validation(productName, "alertName") &&
    validation(productPrice, "alertPrice") &&
    validation(productCategory, "alertCategory") &&
    validation(productDescription, "alertDescription") 
    // &&
    // // validation(productImage, "alertImage")
  ) {
    product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      //Trenary Opreator
      image: productImage.files[0]?.name
        ? `images/${productImage.files[0]?.name}`
        : `images/4.jpg`,
    };

    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));
    clearProduct();
    displayProducts();
  } else {
    alert("ERRRRRRRRRRORRRRRRRRR");
  }
}

function clearProduct() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
  productImage.value = null;

  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
}

function displayProducts() {
  let box = ``;

  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      box += `
       <tr>
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td>
          
              <img width="100px" src="${productList[i].image}" alt="product" />
            </td>
 
            <td>
              <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button>
              <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>
      
      
      `;
    }
  }
  document.getElementById("display").innerHTML = box;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productList));

  displayProducts();
}

// function searchProducts() {
//   let box = ``;

//   for (let i = 0; i < productList.length; i++) {
//     if (
//       productList[i].name
//         .toLowerCase()
//         .includes(searchInput.value.toLowerCase())
//     ) {
//       box += `
//        <tr>
//             <td>${i}</td>
//             <td>${productList[i].name}</td>
//             <td>${productList[i].price}</td>
//             <td>${productList[i].category}</td>
//             <td>${productList[i].description}</td>
//             <td>
//               <img width="100px" src="${productList[i].image}" alt="product" />
//             </td>

//             <td>
//               <button class="btn btn-outline-warning btn-sm">Update</button>
//               <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
//             </td>
//           </tr>

//       `;
//     }
//   }
//   document.getElementById("display").innerHTML = box;
// }

function validation(element, id) {
  let regex = {
    productName: /^[A-Z][a-z]{3,8}$/,
    productPrice: /^[0-9]{3,6}$/,
    productCategory: /^(tv|screens|mobile|electronic)$/i,
    productDescription: /^.{3,}$/m,
    productImage: /^.{1,}\.(jpg|png|avif|jpeg|svg)$/,
  };

  let alertMessage = document.getElementById(id);

  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    alertMessage.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    alertMessage.classList.remove("d-none");
    return false;
  }
}

function setFormUpdate(indexElement){
 
  productName.value = productList[indexElement].name
  productPrice.value = productList[indexElement].price
  productCategory.value = productList[indexElement].category
  productDescription.value = productList[indexElement].description

  document.getElementById('btnUpdate').classList.remove('d-none')
  document.getElementById('btnAdd').classList.add('d-none')

  index = indexElement

}

function updateProduct() {
  product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    //Trenary Opreator
    image: productImage.files[0]?.name
      ? `images/${productImage.files[0]?.name}`
      : `images/4.jpg`,
  };

  productList.splice(index , 1 , product)
  localStorage.setItem("products" , JSON.stringify(productList))
  displayProducts()
  clearProduct()
  document.getElementById('btnUpdate').classList.add('d-none')
  document.getElementById('btnAdd').classList.remove('d-none')

  
}