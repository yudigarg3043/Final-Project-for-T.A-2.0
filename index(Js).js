function showContent() {
    const historicalDiv = document.querySelector(".historical");
    historicalDiv.style.display = historicalDiv.style.display === "none" ? "block" : "none";
    historyFormPopup.classList.add("hidden");
    favoriteFormPopup.classList.add("hidden1");
  }
  
function ClearFields() {
    document.getElementById("amount").value = "";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
  }

  function convert() {
    var amount = document.getElementById("amount").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;

    fetch(`https://v6.exchangerate-api.com/v6/703459cf375a15b3773dbe4b/latest/${from}`)
    .then(response => response.json())
    .then(data => {
        var rate = data.conversion_rates[to];
        var result = amount * rate;
        var date = data.time_last_update_utc;
        document.getElementById("result").innerText = `${amount} ${from} = ${result} ${to}`;
        document.getElementById("result1").innerText = `Rate: 1 ${from} = ${rate} ${to}`;
        document.getElementById("date").innerText = `Data refreshed on ${date}`;
    })
    .catch(err => console.log(err));
    }
    function swap() {
      const temp= from.value;
      from.value = to.value;
      to.value = temp;
    }

const input_1 = document.getElementById("from");
const input_2 = document.getElementById("to");
const openHistoryFormButton = document.getElementById("openHistoryForm");
const historyFormPopup = document.getElementById("historyFormPopup");
const closeHistoryFormButton = document.getElementById("closeHistoryForm");
const historyList = document.getElementById("historyList");
const historyMessage = document.getElementById("historyMessage");
const saveHistory = document.getElementById("saveHistory");

let inputHistory = JSON.parse(localStorage.getItem('inputHistory')) || [];

openHistoryFormButton.addEventListener('click', () => {
    const input1 = input_1.value;
    const input2 = input_2.value;
    inputHistory.push({ input1, input2 });
    input1.value = '';
    input2.value = '';

    // Limit history to the last 10 entries
    inputHistory = inputHistory.slice(-10);

    // Save input history to local storage
    localStorage.setItem('inputHistory', JSON.stringify(inputHistory));

    updateHistory();
});

saveHistory.addEventListener('click', () => {
    historyFormPopup.classList.toggle('hidden');
  favoriteFormPopup.classList.add("hidden1");
  updateHistory();
});

function updateHistory() {
    historyList.innerHTML = '';
    inputHistory.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `Entry ${index+1}: From: ${entry.input1}, To: ${entry.input2}`;
        historyList.appendChild(li);
    });
}

openHistoryFormButton.addEventListener("click", () => {
 updateHistory();
});

saveHistory.addEventListener("click", () => {
  historyFormPopup.classList.remove("hidden");
  favoriteFormPopup.classList.add("hidden1");
  historicalDiv.style.display = historicalDiv.style.display === "none" ? "block" : "none";
  updateHistory();
})

closeHistoryFormButton.addEventListener("click", () => {
  historyFormPopup.classList.add("hidden");
  historyMessage.textContent = ""; // Clear message on closing
});
openHistoryFormButton.addEventListener("click", updateHistory);

window.addEventListener('load', () => {
    inputHistory = JSON.parse(localStorage.getItem('inputHistory')) || [];
    updateHistory();
});

const fvr_1 = document.getElementById("from");
const fvr_2 = document.getElementById("to");
const openFavoriteFormButton = document.getElementById("openFavoriteForm");
const favoriteFormPopup = document.getElementById("favoriteFormPopup");
const closeFavoriteFormButton = document.getElementById("closeFavoriteForm");
const favoritesList = document.getElementById("favoritesList");
const favoriteMessage = document.getElementById("favoriteMessage");
const saveFavorite = document.getElementById("saveFavorite");

let inputFavorite = JSON.parse(localStorage.getItem('inputFavorite')) || [];

openFavoriteFormButton.addEventListener('click', () => {
    const fvr1 = fvr_1.value;
    const fvr2 = fvr_2.value;
    inputFavorite.push({ fvr1, fvr2 });
    fvr1.value = '';
    fvr2.value = '';

    // Limit history to the last 10 entries
    inputFavorite = inputFavorite.slice(-5);

    // Save input history to local storage
    localStorage.setItem('inputFavorite', JSON.stringify(inputFavorite));

    updateFavorite();
});

function useFavorite(entry) {
    document.getElementById("from").value = entry.fvr1;
    document.getElementById("to").value = entry.fvr2;
}

saveFavorite.addEventListener('click', () => {
    favoriteFormPopup.classList.toggle('hidden1');
  historyFormPopup.classList.add("hidden");
  updateFavorite();
});

function updateFavorite() {
    favoritesList.innerHTML = '';
    inputFavorite.forEach((entry, index) => {
        const li = document.createElement('li');
        //li.textContent = Entry ${index+1}: From: ${entry.fvr1}, To: ${entry.fvr2};
    li.textContent = `From: ${entry.fvr1}, To: ${entry.fvr2}`;
        li.addEventListener("click", () => useFavorite(entry));
        favoritesList.appendChild(li);
    });
}

openFavoriteFormButton.addEventListener("click", () => {
 updateFavorite();
});

saveFavorite.addEventListener("click", () => {
  favoriteFormPopup.classList.remove("hidden1");
  historyFormPopup.classList.add("hidden");
  updateFavorite();
})

closeFavoriteFormButton.addEventListener("click", () => {
  favoriteFormPopup.classList.add("hidden1");
  favoriteMessage.textContent = ""; // Clear message on closing
});
openFavoriteFormButton.addEventListener("click", updateFavorite);

window.addEventListener('load', () => {
    inputFavorite = JSON.parse(localStorage.getItem('inputFavorite')) || [];
    updateFavorite();
});

const apiKey = "iDsE4z4NqkGXpcp8pwNVdAkZZwOL3YYL"; // Replace with your actual API key

function fetchData(date) {
  var date1 = document.getElementById("input12").value;
  var date2 = document.getElementById("input12").value;
  var from = document.getElementById("from12").value;
  var to = document.getElementById("to12").value;
  var from12 = from.toUpperCase();
  var to12 = to.toUpperCase();

  const url = `https://api.polygon.io/v2/aggs/ticker/C:${from12}${to12}/range/1/day/${date1}/${date2}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { c, h, l, t } = data.results[0]; // Destructuring response object
      const c1= c.toFixed(2);
      const h1 = h.toFixed(2);
      const l1 = l.toFixed(2);
      document.getElementById("data").innerHTML=`Highest Price: ${h1}&emsp; Lowest Price: ${l1}&emsp; Close Price: ${c1}`
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}
const newsList = document.getElementById('newsList');

document.addEventListener('DOMContentLoaded', retrieve);

function retrieve() {
    let url = `https://api.polygon.io/v2/reference/news?apiKey=iDsE4z4NqkGXpcp8pwNVdAkZZwOL3YYL`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        newsList.innerHTML = ''; // Clear previous headlines
        data.results.forEach(result => {
            let listItem = document.createElement('li');
            listItem.classList.add('news-item');
            //image
            let img = document.createElement('img');
            img.setAttribute('src', result.image_url);
            img.setAttribute('alt', result.title);
            console.log(result.image_url);
            //link&title
            let a = document.createElement('a');
            a.setAttribute('href', result.article_url);
            a.setAttribute('target', '_blank');
            a.textContent = result.title;
            listItem.appendChild(img);
            listItem.appendChild(a);
            newsList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching news:', error));
}

function updateGraph(){
    // Rate Chart
    function convertTimestamps(timestamps) {
        const humanDates = [];
        for (const timestamp of timestamps) {
          const date = new Date(timestamp);
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const humanDate = date.toLocaleDateString('en-US', options);
          humanDates.push(humanDate);
        }
        return humanDates;
      }
  
      let rate = []; // Declare rate outside the .then callback
      var From1 = document.getElementById("from").value;
      var To1 = document.getElementById("to").value;
      // Usage
      fetch(`https://api.polygon.io/v1/indicators/sma/C:${From1}${To1}?timespan=day&adjusted=true&window=50&series_type=close&order=desc&apiKey=iDsE4z4NqkGXpcp8pwNVdAkZZwOL3YYL`)
        .then(response => response.json())
        .then(data => {
          const values = data.results.values;
          rate = []; // Empty the rate array before processing new data
          for (const value of values) {
            rate.push(value.value);
          }
          const timestamps = values.map(value => value.timestamp);
          const humanDates = convertTimestamps(timestamps);
          console.log('List of human-readable dates:', humanDates);
  
          // Use rate and humanDates here after data is processed
  
          const xValues = humanDates;
  
          new Chart("myChart", {
            type: "line",
            data: {
              labels: xValues,
              datasets: [{
                data: rate,
                borderColor: "red",
                fill: false
              }]
            },
            options: {
              legend: { display: false },
            }
          });
        })
    }
    document.getElementById("from").addEventListener("change", updateGraph);
    document.getElementById("to").addEventListener("change", updateGraph);

    window.addEventListener("load", updateGraph);