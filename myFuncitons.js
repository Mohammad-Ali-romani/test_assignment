let carts = []
if(localStorage.getItem("carts") == ''){

    localStorage.setItem('carts', '[]')
}
if (localStorage.getItem("carts") != null)
    carts = JSON.parse(localStorage.getItem("carts"))



// page application
if (window.location.pathname == "/Application.html") {
    let countOrders = document.getElementById('count-orders');
    if (countOrders.value != '')
        countOrders.innerText = carts.length

    function addCart(title, price) {
        let isamount = false;
        carts.forEach(cart => {
            if (cart.title == title) {
                isamount = true
                cart.amount++
            }
        })
        if (!isamount)
            carts.push({
                'title': title,
                'price': price,
                'amount': 1,
            })
        localStorage.setItem("carts", JSON.stringify(carts))
        console.log(carts)
        countOrders.innerText = carts.length
    }
}
// page checkout
if (location.pathname == "/checkOut.html") {
    const boxCheckout = document.querySelector('.box-checkout');
    const confirmBuy = document.querySelector('.confirm-buy');
    const tableCheckout = document.getElementById('table-checkout');
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    let orders = ''
    let i = 1;
    let total = 0
    carts.forEach(cart => {
        orders += "<tr>"
        orders += `
            <td>${i}</td>
            <td>${cart.title}</td>
            <td>${cart.price}</td>
            <td>${cart.amount}</td>
            <td>${cart.amount * cart.price}</td>
            `
        orders += "</tr>"
        total += cart.amount * cart.price
        i++;
    });
    orders += `
    <tr>
        <tr>
            <td>#</td>
            <td colspan="3">المجموع النهائي</td>
            <td>${total} ل.س</td>
    </tr>`
    tableCheckout.innerHTML = orders
    function cleanOrders() {
        carts = []
        localStorage.setItem('carts', '')
        window.location.href = `${window.location.origin}/Application.html`;

    }
    function nextOrder() {
        boxCheckout.style.display = "none"
        confirmBuy.style.display = "block"
    }
    IDnumber.onkeypress = function () {
        if (IDnumber.value.length >= 11) {
            return false
        }
    }
    numberPhone.onkeypress = function () {
        if (numberPhone.value.length >= 10) {
            return false
        }
    }
    const codes = [3, 8, 9, 5, 6, 4]
    const validationCode = "qGphJ"
    function submitOrder(e, form) {
        e.preventDefault()
        let errors = []
        if (IDnumber.value == "") {
            errors.push("الرقم الوطني مطلوب")
        } else {
            if (IDnumber.value.length != 11) {
                errors.push("الرقم الوطني يجب أن يكون 11 رقم")
            }
        }
        if (numberPhone.value != "") {

            if (numberPhone.value.length != 10) {
                errors.push("رقم الهاتف يجب أن يتألف من 10 ارقام")

            } else {
                iscode = false
                codes.forEach(code => {
                    if (numberPhone.value[2] == code) {
                        iscode = true
                    }

                })
                if (!iscode) {
                    errors.push("رقم الموبايل يجب أن يكون صالح لشركة سيرياتل أو أم تي أن")
                }
            }
        }
        if (verificationCode.value != validationCode) {
            errors.push("رمز التحقق غير صحيح")
        }
        if (errors.length == 0) {
            alert(total + ' ل.س')
            localStorage.clear()
            form.submit()
        } else {
            const errorList = document.getElementById("error-list");
            const boxErrors = document.querySelector('.errors')
            boxErrors.style.display = "block"
            errorList.innerHTML = ""
            errors.forEach(error => errorList.innerHTML += `<li>${error}</li>`)
        }
    }

}
