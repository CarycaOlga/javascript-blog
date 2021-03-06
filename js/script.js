'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const titleClickHandler = function(event) {
  console.log('Link was clicked!');

  event.preventDefault();

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  const clickedElement = this;

  console.log('clickedElement (with plus): ' + clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles) {
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
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  let html = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles) {
    console.log(article);

    /* get the article id */

    const articleId = article.getAttribute('id');

    console.log(articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */

    html = html + linkHTML;

    console.log(html);

  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags){
  const params = {
    max: 0 ,
    min: 999999
  };
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
}
function generateTags(){

  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll (optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {
    console.log(article);

    /* find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);

      /* generate HTML of the link */

      const linkHTMLdata = {tag: tag};
      const linkHTML = templates.tagLink(linkHTMLdata);

      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }
    titleList.innerHTML = html;
    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for(const activeTagLink of activeTagLinks) {

    /* remove class active */

    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetTagLinks);

  /* START LOOP: for each found tag link */

  for(const targetTagLink of targetTagLinks) {

    /* add class active */
    targetTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  const customSelector = '[data-tags~="' + tag + '"]';
  generateTitleLinks(customSelector);
  console.log('customSelector: ', customSelector);
}

function addClickListenersToTags(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  console.log('tagsLinks: ', tagLinks);

  /* START LOOP: for each link */

  for(const link of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

const generateAuthor = () => {
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (const article of articles) {
    /* find tags wrapper, make html variable with empty string, get tags from data-tags attribute, split tags into array */
    let authorHTML = '';
    const author = article.getAttribute('data-author');
    /* generate HTML of the link, add generated code to html variable */
    const linkHTML = '<a href="#author-' + author.replace(' ','-') + '">By ' + author + '</a>';
    authorHTML += linkHTML;
    if(!allAuthors[author]) {
      /* [NEW] add generated code to allTags array */
      allAuthors[author]=1;
    }
    else{
      allAuthors[author]++;
    }
    /* insert HTML of all the links into the tags wrapper */
    article.querySelector(optArticleAuthorSelector).innerHTML = authorHTML;
  }
  let allAuthorsHTML = '';
  for (const author in allAuthors) {
    allAuthorsHTML += '<li><a href="#author-' + author.replace(' ','-') + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
  }
  /* END LOOP: for every article: */
  document.querySelector(optAuthorsListSelector).innerHTML = allAuthorsHTML;
};

generateAuthor();

function authorClickHandler(event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  const author = href.replace('#author-', '').replace('-',' ');
  /* find all authors links with class active */
  const activelinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for (const activelink of activelinks) {
    /* remove class active */
    activelink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const links = document.querySelectorAll('a[href="'+ href +'"]');
  /* START LOOP: for each found tag link */
  for (const link of links) {
    /* add class active */
    link.classList.add('active');
  }
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

const addClickListenersToAuthors = () => {
  /* find all links to tags */
  const list = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (const author of list) {
    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
};

addClickListenersToAuthors();
