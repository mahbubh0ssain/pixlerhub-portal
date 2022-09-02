fetchCategoryApi = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

displayNewsCategory = async () => {
  const news = await fetchCategoryApi();
  const newsCateGory = document.getElementById("news-category");
  news.data.news_category.forEach((category) => {
    const { category_name } = category;
    const li = document.createElement("li");
    li.innerHTML = `
      <a href=""><li>${category_name}</li></a>
    `;
    newsCateGory.appendChild(li);
  });
};
displayNewsCategory();

fetchNewsApi = async () => {
  const url = `https://openapi.programming-hero.com/api/news/category/01`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
// fetchNewsApi();

displayNews = async () => {
  const data = await fetchNewsApi();
  const cardSection = document.getElementById("card-section");
  data.data.forEach((news) => {
    const { title, author, details, thumbnail_url, total_view } = news;
    const { name, published_date, img } = author;
    console.log(img);
    const div = document.createElement("div");
    div.classList.add("card", "mb-3");
    div.innerHTML = `
           <div class="row g-0">
            <div class="col-md-3">
              <img src="${thumbnail_url}" class="img-fluid p-3 w-full" alt="..." />
            </div>
            <div class="col-md-9 flex-row">
              <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <p class="card-text">
                  ${
                    details.length > 500
                      ? details.slice(0, 500) + " ..."
                      : details
                  }
                </p>

                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <div class="d-flex align-items-center" >
                    <img src="${img}" id="auth-img" class="img-fluid rounded-circle"  alt="..." />     
                    <div class="ms-1">
                      <p<small>${name}</small></p>   
                      <p><small>${published_date}</small></p>   
                    </div>
                  </div>
                  <div>
                    <h6><i class="fa-solid fa-eye"></i> ${total_view}</h6>
                  </div>
                  <div>
                     <p><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></p>
                  </div>
                  <div>
                  <h4><i class="fa-solid fa-arrow-right-from-bracket"></i></h4>
                  </div>
                </div>


              </div>
            </div>
          </div>
    `;
    cardSection.appendChild(div);

    console.log(news);
  });
};
displayNews();
