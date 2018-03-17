class Book{
  constructor(title,auhor,isbn){
    this.title = title;
    this.auhor = auhor;
    this.isbn = isbn;
  }
}

class UI{
  addBookToList(book){
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

  showAlert(message,className){
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
  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
  clearFields(){
    document.getElementById('title').value= '';
    document.getElementById('author').value= '';
    document.getElementById('isbn').value= '';
  }
}
//LocalStorage Class
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book){
      const ui = new UI();
      //Add book to UI
      ui.addBookToList(book);
    });    
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));
  }

  static removeBook(isbn,index){
    const books = Store.getBooks();
    books.forEach(function(book){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books',JSON.stringify(books));
     
  }
}
//Dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
//Event Listeners for add Book
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
    //Add to Ls
    Store.addBook(book);
    //Show success
    ui.showAlert('Book added ','success');
    //Clear fileds
    ui.clearFields();
  }
  
  //console.log(book);
  e.preventDefault();
});

//Event listener for delete book
document.getElementById('book-list').addEventListener('click',function(e){
    //Instatiate UI
    const ui = new UI();
    //Delet bokk
    ui.deleteBook(e.target);
    //Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //Show message
    ui.showAlert('Book removed','success');
    e.preventDefault();
});