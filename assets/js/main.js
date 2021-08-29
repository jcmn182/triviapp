const makeUrl = document.getElementById("triviaForm");
const card = document.getElementById("card");
let p = 0;
let s = 0;

const createApiUrl = e => {
  e.preventDefault();
  let difficulty = document.getElementById("difficulty").value;
  let category = document.getElementById("category").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;
  const API = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
  fetchDataAPI(API);
};

async function fetchDataAPI (url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const dataLenght = data.results.length;
        const dataArray = data.results;
        paint(dataArray,dataLenght)

    } catch (error) {
        console.log(error)
    }
};

const paint = (data,dataLenght) => {
    /*position += 1;
    if (position < dataLenght - 1) {
        console.log(position) console.log(dataLenght - 1);
    }
*/

    

    if (data[0].incorrect_answers.length > 1){
       
        
        let positionAnswer = Math.floor(Math.random() * 3);
        let answers = data[p].incorrect_answers;
        let correctAnswer = data[p].correct_answer;
        answers.splice(positionAnswer,0,correctAnswer)
        console.log(data)
        card.innerHTML = `<h2> Categoty :${data[p].category}</h2>
                        <h3> Difficulty :${data[p].difficulty}</h3>
                        <p>Question: ${data[p].question}</p>
                        <div>
                        <p>${data[p].incorrect_answers[0]}</p>
                        <p>${data[p].incorrect_answers[1]}</p>
                        <p>${data[p].incorrect_answers[2]}</p>
                        <p>${data[p].incorrect_answers[3]}</p>
                        <button>Next question</button>
                        </div>
        `
    }
    
    else{
        let positionAnswer = Math.floor(Math.random() * 1);
        let answers = data[p].incorrect_answers;
        let correctAnswer = data[p].correct_answer;
        answers.splice(positionAnswer,0,correctAnswer)
        card.innerHTML = `<h2> Categoty :${data[p].category}</h2>
        <h3> Difficulty :${data[p].difficulty}</h3>
        <p>Question: ${data[p].question}</p>
        <div>
        <p>${data[p].incorrect_answers[0]}</p>
        <p>${data[p].incorrect_answers[1]}</p>
        <button>Next question</button>
        </div>
`
    }
  
    
   
  
}


makeUrl.onsubmit = createApiUrl;

export{makeUrl,};

