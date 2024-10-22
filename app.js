let incomeModal 
let expenseModal 

function hideShowCategory(){

    let type = inputType.value

    let categoryIncome
    let categoryExpense 

    if(type==="Income"){

        categoryIncome = document.getElementById("containerIncomes")
        categoryIncome.style.display = "block"

        categoryExpense = document.getElementById("containerExpenses")
        categoryExpense.style.display="none"

    }else {

        categoryIncome = document.getElementById("containerIncomes")
        categoryIncome.style.display = "none"

        categoryExpense = document.getElementById("containerExpenses")
        categoryExpense.style.display="block"
    }

}


function showIncomeModal(){

    incomeModal = new bootstrap.Modal(document.getElementById("showIncome")) 

    incomeModal.show()

}


function showExpensesModal(){
    expenseModal = new bootstrap.Modal(document.getElementById("showExpenses")) 

    expenseModal.show()
}