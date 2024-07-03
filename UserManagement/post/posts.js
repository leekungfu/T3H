const posts = [
  {
    id: 1,
    title: "A",
    content: "B",
    image: "/",
    user: "tien@gmail.com",
    created_at: "01/07/2024",
    updated_at: "02/07/2024",
  },
  {
    id: 2,
    title: "T",
    content: "R",
    image: "/",
    user: "tien@gmail.com",
    created_at: "01/07/2024",
    updated_at: "02/07/2024",
  },
  {
    id: 3,
    title: "A",
    content: "B",
    image: "/",
    user: "hoang@gmail.com",
    created_at: "01/07/2024",
    updated_at: "02/07/2024",
  },
  {
    id: 4,
    title: "C",
    content: "D",
    image: "/",
    user: "jack@gmail.com",
    created_at: "01/07/2024",
    updated_at: "02/07/2024",
  },
  {
    id: 5,
    title: "M",
    content: "K",
    image: "/",
    user: "tien@gmail.com",
    created_at: "01/07/2024",
    updated_at: "02/07/2024",
  },
];

function genPost() {
  let string = "";
  posts.forEach((p) => {
    string += `
        <tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.created_at}</td>
        <td>${p.user}</td>
        </tr>
        `;
  });
  document.querySelector(".list").innerHTML = string;
}
genPost();

function handleClickSearch(event) {
  event.preventDefault();
  const key = document.getElementById("search-post").value.trim();
  const list = document.querySelector(".list-post");
  list.innerHTML = "";
  if (key) {
    console.log(key);
    const result = posts.find((p) => p.id == key);
    console.log("result: ", result);
    list.innerHTML = `
    <table class="table">
            <thead>
              <tr>
                <th style="width: 15%">ID</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Link ảnh</th>
                <th>Tên người tạo</th>
                <th>Ngày tạo</th>
                <th>Ngày sửa</th>
              </tr>
            </thead>
            <tbody class="list"></tbody>
        <tr>
        <td>${result.id}</td>
        <td>${result.title}</td>
        <td>${result.content}</td>
        <td>${result.image}</td>
        <td>${result.user}</td>
        <td>${result.created_at}</td>
        <td>${result.updated_at}</td>
        </tr>
        `;
    return list;
  }
}

function handleClickSearchWithEmail(event) {
  event.preventDefault();
  const key = document.getElementById("search-with-email").value.trim();
  let string = "";
  if (key) {
    console.log(key);
    const result = posts.filter((p) => p.user === key);
    console.log("result: ", result);
    result.forEach((r) => {
      string += `
        <tr>
        <td>${r.id}</td>
        <td>${r.title}</td>
        <td>${r.content}</td>
        <td>${r.image}</td>
        <td>${r.user}</td>
        <td>${r.created_at}</td>
        <td>${r.updated_at}</td>
        </tr>
        `;
      document.querySelector(".posts").innerHTML = string;
    });
  }
}
