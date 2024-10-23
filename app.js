let incomeModal
let expenseModal
let endPoint = `https://qnfzizaesdfdijygrkkh.supabase.co/rest/v1/finances`
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZnppemFlc2RmZGlqeWdya2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNDczNzIsImV4cCI6MjA0MzkyMzM3Mn0.llAqlwkL2QvoEaHCq9b9yf0Thp3F31xlA2f-QGx0lGk`
let incomeSummary = 0
let expenseSumary = 0



const logIn = ()=>{

    event.preventDefault()
    let username = inputUsername.value 
    window.localStorage.setItem("username", username)

    window.location = "transactions.html"

}

const createTransaction = async () => {

    event.preventDefault()

    let amount = inputAmount.value
    let type = inputType.value
    let category = ''
    let user = window.localStorage.getItem("username")

    if (type === 'Income') {
        category = catIncome.value
    }

    if (type === 'Expense') {
        category = catExpenses.value
    }

    let date = inputDate.value

    let transaction = {
        amount,
        type,
        category,
        date, 
        user
    }

    let response = await fetch(endPoint, {
        method: 'POST',
        headers: {
            'apikey': token,
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    })

    if (response.ok) {
        console.log("Object Created")
    } else {
        let body = await response.json()
        console.log("Error on creating object")
        console.log(body)
    }

    window.location =  "transactions.html"

}


async function getIncomes(){

    let username = window.localStorage.getItem("username")

    let url = `${endPoint}?user=eq.${username}&type=eq.Income`

    let response = await fetch(url, {
        method : 'GET',
        headers: {
            'apikey': token, 
            'Authorization' : token
        }
    })

    let body = await response.json()

    

    if(response.ok){

        for(let i =0;  i < body.length; i++){
            incomeSummary += body[i].amount
        }
        outPutTotalIncome.innerHTML  = `$ ${incomeSummary}`
    }

    

}



async function getExpenses(){

    let username = window.localStorage.getItem("username")

    let url = `${endPoint}?user=eq.${username}&type=eq.Expense`

    let response = await fetch(url, {
        method : 'GET',
        headers: {
            'apikey': token, 
            'Authorization' : token
        }
    })

    let body = await response.json()

    
    if(response.ok){

        for(let i =0;  i < body.length; i++){
            expenseSumary += body[i].amount
        }
        outPutTotalExpense.innerHTML  = `$ ${expenseSumary}`
    }



}




async function getTotalBalance(){

    await getIncomes()
    await getExpenses()

    let totalBalance = incomeSummary - expenseSumary
   

    outPutTotal.innerHTML = `$ ${totalBalance}`

}




getTotalBalance()

function hideShowCategory() {

    let type = inputType.value

    let categoryIncome
    let categoryExpense

    if (type === "Income") {

        categoryIncome = document.getElementById("containerIncomes")
        categoryIncome.style.display = "block"

        categoryExpense = document.getElementById("containerExpenses")
        categoryExpense.style.display = "none"

    } else {

        categoryIncome = document.getElementById("containerIncomes")
        categoryIncome.style.display = "none"

        categoryExpense = document.getElementById("containerExpenses")
        categoryExpense.style.display = "block"
    }

}


function showIncomeModal() {

    incomeModal = new bootstrap.Modal(document.getElementById("showIncome"))

    incomeModal.show()

}




function showExpensesModal() {
    expenseModal = new bootstrap.Modal(document.getElementById("showExpenses"))

    expenseModal.show()
}