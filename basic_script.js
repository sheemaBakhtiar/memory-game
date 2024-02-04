const main_div = document.getElementById('memory-game');
let cards = document.getElementsByClassName('card-item');
const newGameButton = document.getElementById('new-game-button');


let n = 0;
let flipped_cards = [];
let flipped_cards_data = [];
let clickable = true;
let guesses = 0;


function game() {
    main_div.addEventListener('click' ,(e)=>{
    if(!clickable){   //no more than 2 clicks!
        return;
    }
    console.log(flipped_cards_data);

    const clicked_card = e.target.classList;
    const number = e.target.textContent;

    if(clicked_card.contains('card-front')){

        if(clicked_card.contains('reverse-flip')){
            clicked_card.remove('reverse-flip');
        }

        console.log("flipped");
        clicked_card.add('flip' , `card-back${number}`);
        flipped_cards.push(clicked_card.value);
        flipped_cards_data.push(number);
        e.target.textContent = '';
        n = n+1;
        if(n%2==0){   //2 cards are flipped
            console.log("2 cards are flipped");
            clickable = false;
            check();
        }
    }

    });



    const check = ()=>{

    console.log(flipped_cards);
    match1 = parseInt(flipped_cards[0].match(/\d+$/));
    match2 = parseInt(flipped_cards[1].match(/\d+$/));
    
    console.log(match1,match2);
    //  1,11  5,12   2,8   3,7   4,10   6,9 
    if(match1===1 && match2===11 || match1===5 && match2===12 || match1===2 && match2===8 || match1===3 && match2===7 || match1===4 && match2===10 || match1===6 && match2===9 || match1===11 && match2===1 || match1===12 && match2===5 || match1===8 && match2===2 || match1===7 && match2===3 || match1===10 && match2===4 || match1===9 && match2===6  ){   //matching
        console.log("they matched!!");
        guesses += 1;

        setTimeout(()=>{

                for(i in cards){
                    //0,1
                    if(cards[i].classList){
                        // console.log(cards[i]);
                        if(cards[i].classList.contains(`card-back${match1}`)){
                            cards[i].classList.remove('flip', `card-back${match1}`);
                            cards[i].parentNode.remove();
                        }
                        if(cards[i].classList.contains(`card-back${match2}`)){
                            cards[i].classList.remove('flip', `card-back${match2}`);
                            cards[i].parentNode.remove();
                        }
                        //special cond for last card
                        if(cards.length===1){
                            cards[0].parentNode.remove();
                            console.log("game is now over");
                            break;
                        }
                }

            }

        } , 1200);
        flipped_cards = [];
        flipped_cards_data = [];
        


        console.log(cards.length);
        if(cards.length ===2){
            setTimeout(function (){window.alert(`YOU WINN!! , in ${guesses} guesses`)}, 1400)
        }
        
    }                              


    else{                               //not matching
        guesses += 1;
        console.log("flipped cards data is...",flipped_cards_data);
        setTimeout(()=>{

            for(i in cards){

                if(cards[i].classList){
                    

                //console.log(cards[i]);
                if(cards[i].classList.contains(`card-back${match1}`)){
                    cards[i].innerHTML = flipped_cards_data[0];
                    cards[i].classList.add('reverse-flip');
                    cards[i].classList.remove('flip', `card-back${match1}`);

                }
                if(cards[i].classList.contains(`card-back${match2}`)){
                    cards[i].innerHTML = flipped_cards_data[1];
                    cards[i].classList.add('reverse-flip');
                    cards[i].classList.remove('flip', `card-back${match2}`);

                }
                }
            }
            flipped_cards = [];
            flipped_cards_data = [];

        } , 1400);
        

    }
    setTimeout(enableclick ,1500);
    }

    enableclick = () =>{
    clickable = true;
    }

    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click',()=>{
       location.reload();
    })

}
game();

newGameButton.addEventListener('click',()=>{
    if (flipped_cards.length!=0) {
        location.reload();
    }
    if (cards.length!=12) {
        location.reload();
    }
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex > 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
    
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
       return array;
    }
    var arr = [1,2,3,4,5,6,7,8,9,10,11,12];
    shuffle(arr);
    const elements = document.querySelectorAll(".card-inner");  
    for (i=0;i<12;i++) {
        elements[i].childNodes[1].textContent=arr[i]
    }
    localStorage.setItem(()=> {
        for (i=0;i<12;i++) {
            elements[i].childNodes[1].textContent=arr[i]
        }
    })
    location.reload();
    game();
    

  
})


