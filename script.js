"use strict";

const quoteTextContainer = document.querySelector("#quote");
const quoteContainer = document.querySelector(".quote-container");
const authorTextContainer = document.querySelector(".quote-author");
const btnNewQuote = document.querySelector(".new-quote");
const btnTwitt = document.querySelector(".twitter-button");
const loader = document.querySelector(".loader");

let data = [],
  quote = [],
  quoteAuthor = "",
  quoteText = "";

// Fetching the quotes list
async function getQuotesList() {
  loading();
  try {
    // Fetching a list of quotes
    const quotesList = await fetch("https://type.fit/api/quotes");
    data = await quotesList.json();
    newQuote();
  } catch (error) {}
}

// Generating a new quote
function newQuote() {
  loading();
  // Creating a random number for a random quote selection
  const randPicker = Math.trunc(Math.random() * 1643);
  quote = data[randPicker];
  quoteText = quote.text;

  // Check for blank author fields
  !quote.author ? (quoteAuthor = "Unknown") : (quoteAuthor = quote.author);

  // Check if the quote is too long
  quote.text.length > 110
    ? quoteTextContainer.classList.add("long-quote")
    : quoteTextContainer.classList.remove("long-quote");
  // Setting quote texts and hiding the loader
  complete();
  quoteTextContainer.textContent = quoteText;
  authorTextContainer.textContent = quoteAuthor;
}

// Twitter button functionality
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${quoteAuthor}`;
  window.open(twitterUrl, "_blank");
}

// Show loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loader
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Fetching the entire list as app loads
getQuotesList();
// Listening to new quote button
btnNewQuote.addEventListener("click", newQuote);

// Listening to twitter button
btnTwitt.addEventListener("click", tweetQuote);
