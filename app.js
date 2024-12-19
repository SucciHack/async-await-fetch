const API = "https://inventory-app-ten-gilt.vercel.app/api/v1/products"

async function fetchProducts(){
    try {
        const res = await fetch(API)
    const result= await res.json()
    renderProducts(result.data)
    renderProduct(result.data[0])

    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    console.log(params)

    const slug = params.get("slug")
    const detailItem = result.data.find((item)=> item.slug === slug)
    console.log(detailItem, slug)
    renderProduct(detailItem)
    } catch (error) {
        console.log("error in fetch")
    }
}

fetchProducts()


const productsContainer = document.querySelector(".productsContainer")
function renderProducts(items){
    productsContainer.innerHTML= ''
    items.forEach((item)=>{
        const productHtml=`
                <a href="index.html?slug=${item.slug}" class="product">
                    <img src="${item.productThumbnail}" alt="" width="80px" height="80px">
                    <div class="content">
                        <p class="line-clamp">${item.name}</p>
                        <p class="line-clamp">${item.productDetails}</p>                   
                        <p>$${item.productPrice}</p>  
                    </div>
                </a>`
                productsContainer.insertAdjacentHTML("beforeend", productHtml)
    })
}
const productDetails = document.querySelector(".productDetails")
function renderProduct(product){
    productDetails.innerHTML = ''
    const details  = `
            <img src="${product.productThumbnail}" alt="">
                <div class="time">
                    <div class="flex">
                        <p><i class='bx bx-time' ></i>90 minutes</p>
                        <p><i class='bx bx-user' ></i>4 servings</p>
                        <i class='bx bx-minus-circle' ></i>
                        <i class='bx bx-plus-circle' ></i>
                    </div>
                    <div class="bookmark">
                        <i class='bx bx-bookmark' ></i>
                    </div>
                </div>
                <div class="description">
                    <h2>${product.name}</h2>

                    <div class="receipt">
                        <div class="one">
                            <img src="${product.productImages[0]}" alt="image">
                            <img src="${product.productImages[1]}" alt="image">
                            <img src="${product.productImages[2]}" alt="image">
                        </div>
                    </div>
                </div>
                <div class="last">
                    <h2>HOW TO COOK IT
                    </h2>
                    <p>This recipe was carefully designed and tested by Real Simple. Please check out directions at their website.</p>
                    <button class="btn">DIRECTION <i class='bx bx-right-arrow-alt' ></i></button>
                </div>`

                productDetails.insertAdjacentHTML("beforeend", details)
}