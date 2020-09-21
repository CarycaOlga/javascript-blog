'use strict'

const titleClickHandler = function(){
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* [DONE] add class 'active' to the clicked link */

  event.preventDefault();

  const clickedElement = this;

  console.log('clickedElement (with plus): ' + clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('.posts article.active');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  console.log(articleSelector);


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages(){
	   titleList.innerHTML = '';
}

   clearMessages();
  /* for each article */

  const articles = document.querySelectorAll (optArticleSelector);

  for (let article of articles) {
    console.log(article);

    /* get the article id */

    const articleId = article.getAttribute('id');

    console.log(articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    console.log (linkHTML);

    /* create HTML of the link */

    /* insert link into titleList */

}
}

generateTitleLinks();
