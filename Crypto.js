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
    
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}&api_key=4dae1cb54d65bcf2c1cf6a4937bca72034b90f16b6a6be46537a8831e3fb605b`)
            .then(response => response.json())
            .then(data => {
                var rate = data[to];
                var result = amount * rate;
                document.getElementById("result").innerText = `${amount} ${from} = ${result} ${to}`;
                document.getElementById("result1").innerText = `Rate: 1 ${from} = ${rate} ${to}`;
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

let inputHistory = JSON.parse(localStorage.getItem('InputHistory')) || [];

openHistoryFormButton.addEventListener('click', () => {
    const input1 = input_1.value;
    const input2 = input_2.value;
    inputHistory.push({ input1, input2 });
    input1.value = '';
    input2.value = '';

    // Limit history to the last 10 entries
    inputHistory = inputHistory.slice(-10);

    // Save input history to local storage
    localStorage.setItem('InputHistory', JSON.stringify(inputHistory));

    updateHistory();
});

saveHistory.addEventListener('click', () => {
    historyFormPopup.classList.toggle('hidden');
  favoriteFormPopup.classList.add("hidden1");
  historicalDiv.style.display = historicalDiv.style.display === "none" ? "block" : "none";
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
    inputHistory = JSON.parse(localStorage.getItem('InputHistory')) || [];
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

let inputFavorite = JSON.parse(localStorage.getItem('InputFavorite')) || [];

openFavoriteFormButton.addEventListener('click', () => {
    const fvr1 = fvr_1.value;
    const fvr2 = fvr_2.value;
    inputFavorite.push({ fvr1, fvr2 });
    fvr1.value = '';
    fvr2.value = '';

    // Limit history to the last 10 entries
    inputFavorite = inputFavorite.slice(-5);

    // Save input history to local storage
    localStorage.setItem('InputFavorite', JSON.stringify(inputFavorite));

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
    inputFavorite = JSON.parse(localStorage.getItem('InputFavorite')) || [];
    updateFavorite();
});

const newsList = document.getElementById('newsList');

document.addEventListener('DOMContentLoaded', retrieve);

function retrieve() {
    let url = `https://min-api.cryptocompare.com/data/v2/news/?categories=BTC,ETH,DOGE?limit=10?lang=EN&api_key=03db3d3be809317ed06837fdaaddd5b9edda5fabe88d373d49071866402da496`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        newsList.innerHTML = ''; // Clear previous headlines
        data.Data.forEach(Data => {
            let listItem = document.createElement('li');
            listItem.classList.add('news-item');

            let img= document.createElement('img');
            img.setAttribute('src', Data.imageurl);
            img.setAttribute('alt', Data.title);

            let a = document.createElement('a');
            a.setAttribute('href', Data.url);
            a.setAttribute('target', '_blank');
            a.textContent = Data.title;

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
  fetch(`https://api.polygon.io/v1/indicators/sma/X:${From1}${To1}?timespan=day&window=50&series_type=close&order=desc&limit=7&apiKey=iDsE4z4NqkGXpcp8pwNVdAkZZwOL3YYL`)
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
