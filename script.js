// https://jacintodesign.github.io/quotes-api/data/quotes.json
// https://twitter.com/intent/tweet

//Get Quotes From API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show Loadig

function showLoadingSpinner(){
    loader.hidden =false;
    quoteContainer.hidden =true;
}


//Hide Loading 

function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden =false;
        loader.hidden = true;
    }
}
// show new quote 

function newQuote(){
    showLoadingSpinner();
    // Pick a random quote from aoiquotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
     
    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // console.log(quote);

    // check if author feild is blank and replace it with unknown
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else{    
        authorText.textContent = quote.author;
    }

    // Check Quote Length to determine styling

    if(quote.text.length>120){
        quoteText.classList.add('long-quote');

    }else{
        quoteText.classList.remove('long-quote')
    }

    // set Quote ,Hide loader 
    quoteText.textContent = quote.text;
    removeLoadingSpinner();


}

async function getQuotes(){
     showLoadingSpinner();
     const apiUrl ="https://jacintodesign.github.io/quotes-api/data/quotes.json";
     try{
         const response = await fetch(apiUrl);
         apiQuotes = await response.json();
         newQuote();
     }catch(error){
         //Catch Error Here
     }

}

// Tweet Quote 

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl,'_blank');

}

// Event Listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);


//on load
getQuotes();


// newQuote();

// loaders
