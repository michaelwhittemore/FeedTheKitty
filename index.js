//color constants
const safe='#14A76C';
const mid='#FFE400';
const danger='#FF652F';
$(document).ready(
    () => {
        //intialize variables
        let angery = 0;
        let chonky = 0;
        let annoyance = 0;
        let berserk = false
        $("#confused").hide();
        let score = 0;
        let bestScore = 0;
        let gameInterval;
        let confuseInterval;
        //functions to modify variable and the appriopraite text
        const colorCorrector= (name,value) =>{
            if (value<30){
                $('#'+name).css("color",safe)
            } else if (value<70){
                $('#'+name).css("color",mid)
            } else if (value>=70){
                $('#'+name).css("color",danger)
            }
        }
        const adjustAngery = (amount) => {
            angery += amount;
            angery = angery < 0 ? 0 : angery
            $('#angery').text(angery)
            colorCorrector('angery',angery)
        }
        const adjustChonky = (amount) => {
            chonky += amount;
            chonky = chonky < 0 ? 0 : chonky
            $('#chonky').text(Math.round(chonky))
            colorCorrector('chonky',chonky)
        }
        const adjustAnnoyance = (amount) => {
            annoyance += amount;
            annoyance = annoyance < 0 ? 0 : annoyance
            $('#annoyance').text(annoyance)
            colorCorrector('annoyance',annoyance)
        }
        const gameOver = () => {
            angery = 0;
            chonky = 0;
            annoyance = 0;
            berserk = false;
            $("#confused").hide()
            clearInterval(gameInterval)
            clearTimeout(confuseInterval)
            bestScore= score > bestScore ? score : bestScore;
            $("#bestScore").text(bestScore)
            score = 0;
            $('#start').prop('disabled', false);
        }
        //buttons
        $("#feed").click(() => {
            adjustChonky(5);
            adjustAngery(-10);
            adjustAnnoyance(-5);
        })
        $("#pet").click(() => {
            adjustAnnoyance(-5);
            adjustAngery(Math.round(Math.random() * 20 - 13))
        })
        $("#pickUp").click(() => {
            adjustAnnoyance(-10);
            adjustAngery(20);
        })
        $('#sing').click(()=>{
            $("#confused").show()
            confuseTimeout=setTimeout( ()=> {
                $("#confused").hide()
            },3000)
        })
        $("#reset").click(() => {
            gameOver()
            
        })
        $("#start").click(()=>{
            gameInterval = setInterval(gameloop, 200)
            $('#start').prop('disabled', true);
        })
        //gameloop
        const gameloop = () => {
            adjustAngery(1)
            if (berserk) {
                adjustAnnoyance(5)
            } else {
                adjustAnnoyance(1)
            }
            adjustChonky(-.5)
            if (chonky >= 100) {
                alert("The Kitty Is Too Full And Explodes! \nGame Over");
                gameOver()
            }
            if (annoyance >= 100) {
                alert("You Were So Annoyed You Throw The Kitty Out The Window! \nGame Over");
                gameOver()
            }
            if (angery >= 100) {
                berserk = true;
                $("#beserk").text("The kitty has gone beserk!")
            } else {
                berserk = false;
                $("#beserk").text("")
            }
            score++;
            $("#score").text(score)
        }
        
    })