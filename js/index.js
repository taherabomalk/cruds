


let productname = document.querySelector("#productname");
let productprice = document.querySelector("#productprice");
let productcatogary = document.querySelector("#productcatogary");
let producttaxes = document.querySelector("#producttaxes");
let productads = document.querySelector("#productads");
let productdiscount = document.querySelector("#productdiscount");
let count = document.querySelector("#count");
let total = document.querySelector("#total");
let add = document.querySelector(".add");
let img = document.querySelector('productimg');
let mood = 'add product';
let tmp;





const navbar = document.querySelector(".navbar");
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');

    } else {
        navbar.classList.remove('scrolled');
    }
});




let products;

if (localStorage.getItem("product") == null) {
    products = [];

} else {

    products = JSON.parse(localStorage.getItem("product"))
    showdata(products)

}

function calculateTotal() {
    if (productprice.value !== "") {
        let result = (Number(productprice.value) + Number(producttaxes.value) + Number(productads.value)) - Number(productdiscount.value);
        total.innerHTML = result;
        total.style.backgroundColor = "#008000";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#0b5ed7";

    }
}


// let products = [];

// Clear form
function cleardata() {
    productname.value = "";
    productprice.value = "";
    productcatogary.value = "";
    producttaxes.value = "";
    productads.value = "";
    productdiscount.value = "";
    productimg.valu ="";
    count.value = "";
    total.innerHTML = "";

}


// read   showdata

function showdata(arr) {
    let table = '';
    for (let i = 0; i < arr.length; i++) {
        table += `
         <tr>
                <td>${i}</td>
                <td>${arr[i].name}</td>
                 <td>${arr[i].price}</td>
                 <td>${arr[i].taxes}</td>
                 <td>${arr[i].ads}</td>
                 <td>${arr[i].discount}</td>
                <td>${arr[i].total}</td>
                <td>${arr[i].catogary}</td>
                <td><img src="${arr[i].img}" alt="Product Image"></td>
               

                <td><button type="button" onclick=" updatedata(${i})" class="btn btn-primary">update</button></td>
                <td><button type="button" onclick="deletepro(${i})"  class="btn btn-danger">delete</button></td>
            </tr> 
        `
    }
    document.getElementById('tbody').innerHTML = table;


    //btn delete


    let btndell = document.getElementById('dell')
    if(products.length > 0){
        btndell.innerHTML=`<button onclick="deletedata(${products.length})" class="text-center w-75 btn btn-danger " type="button">Delete All</button> `
        console.log(btndell)
    }else{
         btndell.innerHTML='';
    showdata()
    }
    calculateTotal()
}

 add.addEventListener("click",function(){
     createProduct()
 })


// create product

function createProduct() {
    // console.log(productimg.files[0].name)
    let newpro = {
        name: productname.value,
        price: productprice.value,
        catogary: productcatogary.value,
        taxes: producttaxes.value,
        ads: productads.value,
        discount: productdiscount.value,
        count: count.value,
        total: total.innerHTML,
         img:`img/${productimg.files[0]?.name}`,
    };

    // validiton
    if (productname.value !== '' && productprice.value !== '' && productcatogary.value !== '' && count.value < 100) {
        if (mood === 'add product') {
            // count
            if (newpro.count > 1)
                for (let i = 0; i < newpro.count; i++) {
                    products.push(newpro);
                } else {
                products.push(newpro);
            }
            //mood updata
        } else {
            products[tmp] = newpro;
            mood = 'add product';
            add.innerHTML = 'add product';
            count.style.display = 'block';
            total.style.backgroundColor = "#0b5ed7";

        }
        cleardata()
    } 

    // save localstarage
    localStorage.setItem('product', JSON.stringify(products));
    showdata(products)

}

// deletepro

function deletepro(i) {
    products.splice(i, 1);
    localStorage.product = JSON.stringify(products) /*after delete push new array in local starage*/
    showdata(products)


}

//* deletall *//

// function deletedata() {
//     products.splice(i)
//     showdata()
// }



// updata data


function updatedata(i) {

    productname.value = products[i].name;
    productprice.value = products[i].price;
    producttaxes.value = products[i].taxes;
    productads.value = products[i].ads;
    productdiscount.value = products[i].discount;
    productcatogary.value = products[i].catogary;
    productimg.name = products[i].img ;
    count.style.display = 'none';
    add.innerHTML = "update";
    mood = 'updatedata';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'

    })
}


// search

// let searchmood = '';

// function getsearch(id) {
//     let search = document.getElementById("search")

//     if (id === searchtitle) {
//         searchmood = 'name'
//         // search.Placeholder = 'search title';
//     }
//     search.focus()
// }



function searchdata(value) {

    let searchproduct =[];
    

        for (let i = 0; i < products.length; i++) {
            if (products[i].name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                searchproduct.push(products[i])
            }
        }
    
    showdata(searchproduct)

    if (searchproduct == "") {
        document.getElementById('tbody').innerHTML = `<h3 class=" bg-warning text-center text-capitalize text-danger p-3 m-auto my-3"> No Data to show </h3>`;
    }
}

// 


function vaildateinputs (ele){
   
    let regax ={
        productname:/^[A-z] [a-z]{1,12}$/,
        productprice: /^[1-9][0-9]{1,7}$/ ,
        productcatogary: /^(tv|mopile|screen|laptop)$/i,
        count: /^[1-9]{1,100}$/,


    }
    
    if(regax[ele.id].test(ele.value) == true ){

        ele.classList.add('is-valid')
        ele.classList.remove("is-invalid")
        ele.nextElementSibling.classList.add('d-none')
        


    }else{

        ele.classList.add('is-invalid')
        ele.classList.remove("is-valid")
        ele.nextElementSibling.classList.remove('d-none')
        
        
    }

}

// validate input

productname.addEventListener("input",function(){
    vaildateinputs(this);

})
productprice.addEventListener("input",function(){
    vaildateinputs(this);

})
productcatogary.addEventListener("input",function(){
    vaildateinputs(this);

})
count.addEventListener("input",function(){
    vaildateinputs(this);

})








