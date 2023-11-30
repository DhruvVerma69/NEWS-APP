function searchNews() {
    const apiKey = 'fb8eb1f9464a4b23b593b9c4f698df46';
    const searchInput = document.querySelector('#search-input').value;
    const selectedDate = document.querySelector('#date-picker').value;
    const bottomDiv = document.querySelector('.bottom-div');

    fetch(`https://newsapi.org/v2/everything?q=${searchInput}&sortBy=publishedAt&apiKey=${apiKey}&from=${selectedDate}&to=${selectedDate}`)
        .then(response => response.json())
        .then(data => {
            if (data.articles.length > 0) {
                data.articles.forEach(article => {
                    if (article.urlToImage && article.title && article.description && article.url) {
                        let newsBox = document.createElement('div');
                        newsBox.classList.add('news-box');
                        newsBox.innerHTML = `
                            <div class="top-box">
                                <img src="${article.urlToImage}" alt="${article.title}">
                            </div>
                            <div class="bottom-box">
                                <h2>${article.title}</h2>
                                <p>${article.description}</p>
                                <a href="${article.url}">Read More</a>
                            </div>`;
                        bottomDiv.append(newsBox);
                    }
                });
            } else {
                bottomDiv.textContent = 'NO RESULTS FOUND';
            }
        })
        .catch(error => console.error(error));
}
