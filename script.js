const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorName = document.getElementById("author");
const nextBtn = document.getElementById("next-btn");
const tweetBtn = document.getElementById("twiiter-btn");

const loader = document.getElementById("loader");
const head = document.getElementById('head');


let apiQuote = [];

//loading function

function loading() {
  quoteContainer.hidden = true;
  tweetBtn.hidden = true;
  
  loader.hidden = false;
  head.hidden = true;

}

function hideLoader() {
  loader.hidden = true;
  quoteContainer.hidden = false;
  tweetBtn.hidden = false;

  head.hidden = false;
}

//to get new quote from api

function newQuote() {
  loading();
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  console.log(quote);
  quoteText.textContent = quote.text;
  if (quote.author) {
    authorName.textContent = quote.author;
  } else {
    authorName.textContent = "Unknown";
  }

  if (quote.text.lenght > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  hideLoader();
}

async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
}


function tweetCode() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorName.textContent}`;
    window.open(tweetUrl,'_blank');
}

getQuote();
