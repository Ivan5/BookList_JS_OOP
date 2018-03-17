//Book Constructor
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//UI constructor
function UI(){}
//add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  //create tr element
  const row = document.createElement('tr');
  //Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
}

//Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value= '';
  document.getElementById('author').value= '';
  document.getElementById('isbn').value= '';
  
}
//Alert
UI.prototype.showAlert = function(message,className){
  //Create div
  const div = document.createElement('div');
  //Add class
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector('.container');
  //get form
  const form = document.querySelector('#book-form');
  //Insert alert
  container.insertBefore(div,form);
  //Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);
}
//Event Listeners
document.getElementById('book-form').addEventListener('submit',function(e){
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  //console.log(title,author,isbn);

  //Instansiate book
  const book = new Book(title,author,isbn);

  //Instatiate UI
  const ui = new UI();

  //Validate
  if(title === '' || author === '' || isbn === ''){
    //Error alert
    ui.showAlert('Please fill in all fileds','error');
  }else{
      //Add book to list
    ui.addBookToList(book);
    //Show success
    ui.showAlert('Book added ','success');
    //Clear fileds
    ui.clearFields();
  }
  
  //console.log(book);
  e.preventDefault();
});