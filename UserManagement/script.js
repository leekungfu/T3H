let users = JSON.parse(localStorage.getItem("users")) || [];
let searchResult = [];

function handleClickSignup(event) {
  event.preventDefault();
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (firstName && lastName && email && password) {
    const checkEmail = users.find((user) => user.email === email);
    if (checkEmail) {
      alert("Email này đã tồn tại. Hãy nhập email khác!");
      return;
    }

    users.push({
      id: Date.now(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    saveUsers();
    return users;
  } else {
    alert("Hãy nhập đầy đủ thông tin.");
    return;
  }
}

function handleClickSignin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email && password) {
    const checkUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (checkUser) {
      alert(`Xin chào ${checkUser.firstName + " " + checkUser.lastName}`);
      return;
    }
  } else {
    alert("Thông tin tài khoản không chính xác.");
    return;
  }
}

function review(event) {
  event.preventDefault();
  const searchUser = document.getElementById("search-user").value.trim();

  if (searchUser !== "") {
    const result = users.filter(
      (user) =>
        user.firstName.includes(searchUser) ||
        user.lastName.includes(searchUser) ||
        user.email.includes(searchUser)
    );

    if (result) {
      searchResult = [];
      searchResult.push(result);
      console.log("search result: ", searchResult);
    }

    if (searchResult.length > 0) {
      let string = "";
      searchResult.forEach((result) => {
        result.map((r) => {
          string += `
          <tr>
          <td>${r.id}</td>
          <td>${r.firstName + " " + r.lastName}</td>
          <td>${r.email}</td>
          </tr>
            `;
          document.querySelector(".list").innerHTML = string;
        });
      });
    }
  } else {
    console.log("USer :", users);
    let string = "";
    users.forEach((u) => {
      string += `
          <tr>
          <td>${u.id}</td>
          <td>${u.firstName + " " + u.lastName}</td>
          <td>${u.email}</td>
          </tr>
          `;
      document.querySelector(".list").innerHTML = string;
    });
  }
}

function saveUsers() {
  users = localStorage.setItem("users", JSON.stringify(users));
}
