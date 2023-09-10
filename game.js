let s='stone',w='paper',g='scissor';
let buttons = document.querySelectorAll('.btns');
    buttons.forEach((btn) => {
    btn.addEventListener('click',function(){
        document.querySelector('#player-value').setAttribute('value',this.value);
        window.player= this.value;
        compFunc();
    })
})

let score=0;


function compFunc(){
    
            const player = window.player;
            let value=['stone', 'paper','scissor']
            let random = Math.floor(Math.random()*value.length );  
            let compvalue=value[random]
            document.querySelector('#input').setAttribute('value',compvalue);
            
            switch (compvalue) {
                            case "stone":
                                if (player=='stone') { 
                                    document.querySelector('#result').innerHTML='Draw!';
                                } else if (player=='paper') { 
                                    document.querySelector('#result').innerHTML='You Win!';
                                    score++
                                } else if (player=='scissor') { 
                                    document.querySelector('#result').innerHTML='You Lose!'
                                }
                                break;
                            case "paper":
                                if (player=='stone') { 
                                    document.querySelector('#result').innerHTML='You Lose!'
                                } else if (player=='paper') { 
                                    document.querySelector('#result').innerHTML='Draw!';
                                } else if (player=='scissor') { 
                                    document.querySelector('#result').innerHTML='You Win!';
                                    score++
                                }
                                break;
                            case "scissor":
                                if (player=='stone') { 
                                    document.querySelector('#result').innerHTML='You Win!';
                                    score++
                                } else if (player=='paper') { 
                                    document.querySelector('#result').innerHTML='You Lose!'
                                } else if (player=='scissor') { 
                                    document.querySelector('#result').innerHTML='Draw!';
                                }
                                break;
                            default:
                                break;
            }
            document.querySelector('#scoreid').value=score;
}

// document.querySelector('#play').addEventListener('click',()=>{
        
    //     let player = window.player
    //         let value=['stone', 'paper','scissor']
    //         let random = Math.floor(Math.random()*value.length );  
    //         let compvalue=value[random]
    //         document.querySelector('#input').setAttribute('value',compvalue);
            
    //         switch (compvalue) {
    //             case "stone":
    //                 if (player=='stone') { 
    //                     document.querySelector('#result').innerHTML='Draw!';
    //                 } else if (player=='paper') { 
    //                     document.querySelector('#result').innerHTML='You Win!';
    //                     score++
    //                 } else if (player=='scissor') { 
    //                     document.querySelector('#result').innerHTML='You Lose!'
    //                 }
    //                 break;
    //             case "paper":
    //                 if (player=='stone') { 
    //                     document.querySelector('#result').innerHTML='You Lose!'
    //                 } else if (player=='paper') { 
    //                     document.querySelector('#result').innerHTML='Draw!';
    //                 } else if (player=='scissor') { 
    //                     document.querySelector('#result').innerHTML='You Win!';
    //                     score++
    //                 }
    //                 break;
    //             case "scissor":
    //                 if (player=='stone') { 
    //                     document.querySelector('#result').innerHTML='You Win!';
    //                     score++
    //                 } else if (player=='paper') { 
    //                     document.querySelector('#result').innerHTML='You Lose!'
    //                 } else if (player=='scissor') { 
    //                     document.querySelector('#result').innerHTML='Draw!';
    //                 }
    //                 break;
    //             default:
    //                 break;
    //         }
    //         document.querySelector('#scoreid').value=score;
    // })