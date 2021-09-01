const makeUrl = document.getElementById("triviaForm");
const card = document.getElementById("card");
let p = 0;
let s = 0;
/*function that create a URL dinamic with the imputs from the index html*/
const createApiUrl = e => {
  e.preventDefault();
  let difficulty = document.getElementById("difficulty").value;
  let category = document.getElementById("category").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;
  const API = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
  fetchDataAPI(API);
};
/*function that make the request from the api and give us a response */
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
/*function that paint in html the fist element from the json*/
const paint = (data,dataLenght) => {
    let positionAnswer = Math.floor(Math.random() * 3);
    let answers = data[p].incorrect_answers;
    let correctAnswer = data[p].correct_answer;
    console.log(data)

    if (data[0].incorrect_answers.length > 1){  
        answers.splice(positionAnswer,0,correctAnswer)
        card.innerHTML = 
        `<div class="card_question">
            <h2>Categoty<br><span>${data[p].category}</span></h2>
            <h3>Difficulty<br><span>${data[p].difficulty}</span></h3>
                <h4>Question<br><span>${data[p].question}</span></h4>
                <div id="questions" class="question_one">
                <div class="data_container_answer_one">
                    <p>${data[p].incorrect_answers[0]}</p>
                    <p>${data[p].incorrect_answers[1]}</p>
                </div> 
                <div class="data_container_answer_two">   
                    <p>${data[p].incorrect_answers[2]}</p>
                    <p>${data[p].incorrect_answers[3]}</p>  
                </div>    
                </div> 
                <button id="next" class="next">Next</button>
            </div> `
    }
    else{  
        answers.splice(positionAnswer,0,correctAnswer)
        card.innerHTML = 
        `<div class="card_question">
            <h2>Categoty<br><span>${data[p].category}</span></h2>
            <h3>Difficulty<br><span>${data[p].difficulty}</span></h3>
            <h4>Question<br><span>${data[p].question}</span></h4>
            <div id="questions" class="question_two">
                <p>${data[p].incorrect_answers[0]}</p>
                <p>${data[p].incorrect_answers[1]}</p>
            </div>
            <button id="next" class="next">Next</button>
         </div>`       
    }
   const questions = document.getElementById("questions"); 
   const next = document.getElementById("next");
   questions.addEventListener('click',(e)=>{answer(e,data)}); 
   next.addEventListener('click',()=>{nextQuestion(data,dataLenght)});  
}


/*a funcion that store and control the score from the questions*/
function answer(e,data){
    
    if(s===p || s < p  ){

    if(e.target.textContent === data[p].correct_answer){
        s += 1;
        console.log('puto')
        console.log(s)
    } }

    else if (s===p || s > p && e.target.textContent !== data[p].correct_answer ){
        console.log('putisimo')
        s -= 1;
        console.log(s)
    }
}

    
/*function that paint in html the fist the nexts question from the json*/
function nextQuestion(data,dataLenght){
    p += 1
    let positionAnswer = Math.floor(Math.random() * 3);
    let answers = data[p].incorrect_answers;
    let correctAnswer = data[p].correct_answer;
  

    if (data[p].incorrect_answers.length > 1){
        
        answers.splice(positionAnswer,0,correctAnswer)
        card.innerHTML = 
        `<div class="card_question">
            <h2>Categoty<br><span>${data[p].category}</span></h2>
            <h3>Difficulty<br><span>${data[p].difficulty}</span></h3>
                <h4>Question<br><span>${data[p].question}</span></h4>
                <div id="questions" class="question_one">
                <div class="data_container_answer_one">
                    <p>${data[p].incorrect_answers[0]}</p>
                    <p>${data[p].incorrect_answers[1]}</p>
                </div> 
                <div class="data_container_answer_two">   
                    <p>${data[p].incorrect_answers[2]}</p>
                    <p>${data[p].incorrect_answers[3]}</p>  
                </div>    
                </div> 
                <button id="next" class="next">Next</button>
            </div> `
    }
    else{   
        answers.splice(positionAnswer,0,correctAnswer)
        card.innerHTML = 
        `<div class="card_question">
            <h2> Categoty <br><span>${data[p].category}</span></h2>
            <h3> Difficulty <br><span>${data[p].difficulty}</span></h3>
            <h4>Question <br><span>${data[p].question}</span></h4>
            <div id="questions" class="question_two">
                <p>${data[p].incorrect_answers[0]}</p>
                <p>${data[p].incorrect_answers[1]}</p>
            </div>
            <button id="next" class="next">Next</button>
         </div>`            
    }
    const questions = document.getElementById("questions"); 
    const next = document.getElementById("next");
    questions.addEventListener('click',(e)=>{answer(e,data);});
    if (p<dataLenght - 1){
        next.addEventListener('click',()=>{nextQuestion(data,dataLenght)});
    }
    else{
        next.addEventListener('click',()=>{finalQuestion(s,dataLenght)});
    }
}




/*function that show us our score and allow play again */
function finalQuestion(s,dataLenght){
    let percentage = (s*100) / dataLenght;
    console.log(percentage)   

    if (percentage>80){
    card.innerHTML = `
        <div class="card_final_score">
            <div>
                <h2>Your score is ${s}!!</h2>
                <p>Congrats !!</p>
                <a href="">Play again</a>
            </div>    
        </div>`
    }
   else if  (percentage>50){
    card.innerHTML = `
    <div class="card_final_score">
            <div>
                <h2>Your score is ${s}!!</h2>
                <p>You should study a little</p>
                <a href="">Play again</a>
            </div>    
        </div>`
   }
   else  {
    card.innerHTML = `
    <div class="card_final_score">
            <div>
                <h2>Your score is ${s}!!</h2>
                <p>You need go back to school :(</p>
                <a href="">Play again</a>
            </div>    
        </div>`
   }
}

makeUrl.onsubmit = createApiUrl;



