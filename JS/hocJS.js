// function User(firstName, lastName, avatar) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.avatar = avatar;
//     this.getFullname = function() {
//         return `${this.firstName} ${this.lastName}`;
//     }
// }

// User.prototype.className = 'JavaScript';

// var author = new User('Hoang', 'Nam', 'Avatar1');
// var student = new User('Trung', 'Lai', 'Avatar2');

// author.title = 'Tao la anh';
// student.mess = 'Toi hoc kem';

// console.log(author.className);
// console.log(student);


//  Object date
// let date = new Date();
// console.log(date);



// <!-- Tạo ra reduce -->
// Array.prototype.reduce2 = function (callback, result) {
//     let i = 0;
//     if (arguments.length < 2) {
//         i = 1;
//         result = this[0];
//     }
//     for (; i < this.length; i++) {
//         result = callback(result, this[i], i, this);
//     }
//     return result;
// }

// const numbers = [1, 2, 3, 4, 5];

// const result = numbers.reduce2(function (total, nubmer) {
//     return total + nubmer;
// });

// console.log(result);


// var boxNote = document.querySelector('.box-1');
// console.log(boxNote);

// console.log(boxNote.querySelectorAll('li'));

// ---Hàm Callback Hell---
// hell(1, function(valueA) {
//     hell(valueA + 1, function(valueB) {
//         hell(valueB + 1, function(valueC) {
//             hell(valueC + 1, function(valueD) {
//                 console.log(valueD);
//             });
//         });
//     })
// })

// function hell(value, cb) {
//     cb(value);
// }


// ---------Thực hành Promise---------

// var users = [
//     {
//         id: 1,
//         name: 'Nam Hoang',
//     },
//     {
//         id: 2,
//         name: 'Thanh Lam',
//     },
//     {
//         id: 3,
//         name: 'Chien Thang',
//     }
// ];

// var comments = [
//     {
//         id: 1,
//         content: 'Xin chao ban',
//         userId: 1
//     },
//     {
//         id: 2,
//         content: 'Oh! Xin chao ban',
//         userId: 2
//     },
//     {
//         id: 3,
//         content: 'Xin chao moi nguoi',
//         userId: 3
//     },
// ];

// // Hàm lấy các comments
// function getComments() {
//     return new Promise(function(resolve) {
//         setTimeout(function () {
//             resolve(comments);
//         }, 1000);
//     });
// };

// // Hàm lấy các User có id trùng với id trong comment
// function getUserById(userIds) {
//     return new Promise(function(resolve) {
//         var result = users.filter(function (user) {
//             return userIds.includes(user.id);
//         });
//         setTimeout(function () {
//             resolve(result);
//         }, 1000);
//     });
// };

// getComments()
//     .then(function(comments) {
//         var userIds = comments.map(function(comment) {
//             return comment.userId;
//         })

//         return getUserById(userIds)
//             .then(function(users) {
//                 return {
//                     users: users,
//                     comments: comments,
//                 };
//             });
//     })

//     .then(function(data) { 
//         var commentBox = document.getElementById('commentBox');
//         var commentHTML = '';
//         data.comments.forEach(function(comment) {
//             var user = data.users.find(function(user) {
//                 return user.id === comment.userId;
//             });
//             commentHTML += `<li>${user.name}: ${comment.content}</li>`;
//         });

//         commentBox.innerHTML = commentHTML;
//     });

// ----------Hết thực hành Promise----------


function highlight([first, ...strings], ...value) {
    return value.reduce((acc, curr) => [...acc, `<span>${curr}</span>`, strings.shift()], [first]).join('');
}

var course = 'Javascript';
var brand = 'F8';

var html = highlight`Học lập trình ${course} tại ${brand}!`;

console.log(html);

