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
let compscore=0;
let prevcompselected;


function compFunc(){
    
            const player = window.player;
            let value=['stone', 'paper','scissor']
            let random = Math.floor(Math.random()*value.length );  
            let compvalue=value[random]
            let compbtn = document.querySelectorAll('.compbtns');

            if (compvalue=='stone') {
                document.querySelector(".comppaper").classList.remove("compselected")
                document.querySelector(".compscissor").classList.remove("compselected")
                document.querySelector(".compstone").classList.add("compselected")
                prevcompselected=compvalue;
            }
            if (compvalue=='paper') {
                document.querySelector(".compscissor").classList.remove("compselected")
                document.querySelector(".compstone").classList.remove("compselected")
                document.querySelector(".comppaper").classList.add("compselected")
                prevcompselected=compvalue;
            }
            if (compvalue=='scissor') {
                document.querySelector(".comppaper").classList.remove("compselected")
                document.querySelector(".compstone").classList.remove("compselected")
                document.querySelector(".compscissor").classList.add("compselected")
                prevcompselected=compvalue;
            }
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
                                    compscore++;
                                }
                                break;
                            case "paper":
                                if (player=='stone') { 
                                    document.querySelector('#result').innerHTML='You Lose!'
                                    compscore++;
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
                                    compscore++;
                                } else if (player=='scissor') { 
                                    document.querySelector('#result').innerHTML='Draw!';
                                }
                                break;
                            default:
                                break;
            }
            document.querySelector('#scoreid').value=score;
            document.querySelector('#compscoreid').value=compscore;
}

