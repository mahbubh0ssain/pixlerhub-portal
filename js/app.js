// fetchCategoryApi;
fetchCategoryApi = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// display news category
displayNewsCategory = async () => {
  const news = await fetchCategoryApi();
  const newsCateGory = document.getElementById("news-category");
  news.data.news_category.forEach((category) => {
    const { category_name, category_id } = category;
    const div = document.createElement("div");
    div.innerHTML = `
      <button type="button" class="btn" onclick="fetchNewsApi('${category_id}')">${category_name}</button>
    `;
    newsCateGory.appendChild(div);
  });
};
displayNewsCategory();

// fetch news API
fetchNewsApi = async (id) => {
  document.getElementById("spinner").classList.remove("d-none");
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data);
  return data;
};
fetchNewsApi("08");

// displayNews;
displayNews = (data) => {
  document.getElementById("spinner").classList.add("d-none");
  //sort by views
  data.data.sort((a, b) => b.total_view - a.total_view);
  const itemsElement = document.getElementById("items-found");
  itemsElement.classList.add("p-2", "my-2", "bg-light", "rounded");
  itemsElement.innerText = `${data.data.length} items found.`;
  const cardSection = document.getElementById("card-section");
  cardSection.textContent = "";
  data.data.forEach((news) => {
    const { title, author, details, image_url, total_view, _id } = news;
    const { name, published_date, img } = author;
    const div = document.createElement("div");
    div.classList.add("card", "mb-3");
    div.innerHTML = `
           <div class="row g-0">
            <div class="col-md-12 col-lg-3 col-sm-12">
              <img src="${image_url}" class="img-fluid p-3 w-100 h-100" alt="..." />
            </div>
            <div class="col-md-12 col-lg-9 col-sm-12">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">
                  ${
                    details.length > 500
                      ? details.slice(0, 500) + " ..."
                      : details
                  }
                </p>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <div class="d-flex align-items-center" >
                    <img src="${img}" id="auth-img" class="img-fluid rounded-circle"  alt="..." />     
                    <div class="ms-1 ">
                      <p class="m-0"><small>${
                        name === null ? "No data available" : name
                      }</small>
                      </p>   
                      <p class="m-0"><small>${
                        published_date === null
                          ? "No data available"
                          : published_date
                      }</small></p>   
                    </div>
                  </div>
                  <div>
                    <h6 class="m-0"><i class="fa-solid fa-eye"></i> ${
                      total_view ? total_view : "No data available"
                    }</h6>
                  </div>
                  <div>
                     <p class="m-0"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i></p>
                  </div>
                  <div>
                    <h4>
                       <i class="fa-solid fa-arrow-right-from-bracket"
                        onclick="fetchForModal('${_id}')" type="button"
                       class="btn btn-primary" data-bs-toggle="modal"data-bs-target="#exampleModal">
                       </i>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    cardSection.appendChild(div);
  });
};

// show news in modal
fetchForModal = async (_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDataForModal(data);
  return data;
};

displayDataForModal = (newsInfo) => {
  const { total_view, title, author, image_url, details } = newsInfo.data[0];
  const { name, published_date, img } = author;
  document.getElementById("exampleModalLabel").innerText = title;
  document.getElementById("modal-body").innerHTML = `
      <img src="${image_url}" class="img-fluid w-100 h-100" alt="..." />
      <div class="d-flex justify-content-between align-items-center mt-2">
                  <div class="d-flex align-items-center" >
                    <img src="${img}" id="auth-img" class="img-fluid rounded-circle"  alt="..." />     
                    <div class="ms-1 ">
                      <p class="m-0"><small>${
                        name === null ? "No data available" : name
                      }</small></p>   
                      <p class="m-0"><small>${
                        published_date === null
                          ? "No data available"
                          : published_date
                      }</small></p>   
                    </div>
                   </div>
                   <div>
                    <h6 class="m-0"><i class="fa-solid fa-eye"></i> ${
                      total_view ? total_view : "No data available"
                    }</h6>
                   </div>
                  </div>



      <p class="card-text mt-2">
        ${details}
      </p>
  
  
  
  `;
  console.log(newsInfo.data[0]);
};
