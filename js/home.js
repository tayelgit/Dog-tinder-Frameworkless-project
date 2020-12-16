const submitClicked = ()=>{

    const fname = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;
    const password = document.getElementById("pw").value;
    const message = `Your firstname : ${fname}\nYour email : ${email}\nYour Age : ${number}\nYour PW : ${password}`    
    alert( message);
}


const form = document.getElementById('form');
form.addEventListener("change", () => {
    document.getElementById('submitBtn').disabled = !form.checkValidity()
});