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


  console.log(data.data);
};
fetchNewsApi();

displayNews = async => {
  
}