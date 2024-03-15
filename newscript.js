"use strict";

// searching table data


function searchingData(){

    let input , category,  filter , table ,tr, td, i, textvalue;

    input = document.getElementById("myInput");
     category = document.getElementById("category");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbl2");
    tr = document.getElementsByTagName("tr");


    // alert()
    //  tr = table.children;

    // let categoryNo = Number(category.value) -1;
    for(i=0; i<tr.length; i++){
        // const td = tr[i].tr[categoryNo].innerText.toUpperCase();
       td = tr[i].getElementsByTagName("td")[category.selectedIndex]; // [category.value] instead of category.selectedIndex;
       //td = tr[i].getElementsByTagName("td")[0]; 
        
        if(td){
            textvalue = td.textContent || td.innerText;
            if(textvalue.toUpperCase().indexOf(filter)>-1){
                tr[i].style.display='';
            }
            else{
                    tr[i].style.display='none';
            }
            
        }

     }

}

//input.addEventListener('input', searchingData);
// category.addEventListener('change', searchingData);









// Get the modal popup

let modal = document.getElementById("header");

let btn = document.getElementById("addBtn");

let span = document.getElementsByClassName("close")[0];

// open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};






let row = null;
//let tableData = document.getElementById("tabledata");
let form = document.getElementById("registration");
form.addEventListener("submit", (e)=>{
    let name = document.getElementById("name").value;
    let empid = document.getElementById("empid").value;
    let dept = document.getElementById("dept").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
 
    if(name=="" || empid=="" || dept=="" || email=="" || pass==""){
        alert("Please fill your details")
    }

    if(row==null){
        insertData();
    }else{
        update();
    }


    let checkStatus=0;

    let user = JSON.parse(localStorage.getItem("userInputData")) ?? []; // userInputData is a key...

    for(let v of user){
        if(v.empid==empid){
            checkStatus=1;
            break;
        }
    }
    if(checkStatus==1){
        alert("This empid is already exxist")

    }
    else

    {

        user.push({
        name,
        empid,
        dept,
        email,
        pass
        })

        localStorage.setItem("userInputData", JSON.stringify(user));

     insertData();
     resetData();

    }
    
   
//     let addBtn= document.querySelector(".add-btn");
// addBtn.addEventListener("click", form) 

console.log(addBtn, form );



   e.preventDefault();

});





let insertData = ()=>{

    let user = JSON.parse(localStorage.getItem("userInputData")) ?? [];

    let tableInsert = "";

    user.forEach((element, i)=>{
        tableInsert += `<table><tr>
        <td>${element.name}</td>
        <td>${element.empid}</td>
        <td>${element.dept}</td>
        <td>${element.email}</td>
        <td>${element.pass}</td>
        <td><button onclick = "onEdit(this)">Edit</button><button onclick ="onDelete(${i})">Delete</button></td>
        </tr></table>`

    })

    tableData.innerHTML=tableInsert;

}

let resetData =()=>{
    document.getElementById("name").value="";
    document.getElementById("empid").value="";
    document.getElementById("dept").value="";
    document.getElementById("email").value="";
    document.getElementById("pass").value="";


}

let onEdit =(td)=>{

    let user = JSON.parse(localStorage.getItem("userInputData")) ?? [];

    row=td.parentElement.parentElement;

    let newUser = user.filter(item=>item.empid !== row.cells[1].innerHTML);

    localStorage.setItem("userInputData", JSON.stringify(newUser));

    document.getElementById("name").value=row.cells[0].innerHTML;
    document.getElementById("empid").value=row.cells[1].innerHTML;
    document.getElementById("dept").value=row.cells[2].innerHTML;
    document.getElementById("email").value=row.cells[3].innerHTML;
    document.getElementById("pass").value=row.cells[4].innerHTML;

}

let update=()=>{

    row.cells[0].innerHTML=document.getElementById("name").value;
    row.cells[1].innerHTML=document.getElementById("empid").value;
    row.cells[2].innerHTML=document.getElementById("dept").value;
    row.cells[3].innerHTML=document.getElementById("email").value;
    row.cells[4].innerHTML=document.getElementById("pass").value;

}

let onDelete =(index)=>{
    let user = JSON.parse(localStorage.getItem("userInputData")) ?? [];
    let newUser = user.splice(index,1)

    localStorage.setItem("userInputData", JSON.stringify(user));

    insertData();
}
insertData();