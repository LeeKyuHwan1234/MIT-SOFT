var count = 1;
var count2 = 1;
var count3 =1;
var score = 0;
var five = 5;
var correct = 0;

var c = lottoNum();
      
function lottoNum () {
  let lotto = [];
  let i = 0;
  while (i < 1) {
    let n = Math.floor(Math.random() * 292) + 1;
    if (! sameNum(n)) {
      lotto.push(n);
      i++;
    }
  }
  function sameNum (n) {
  for (var i = 0; i < lotto.length; i++) {
    if (n === lotto[i]) {
      return true;
    }
  }
    return false;
  }
    return lotto;
  }

if (localStorage.getItem('count')) {
  count = localStorage.getItem('count');
  localStorage.removeItem('count');
}

if (localStorage.getItem('correct')) {
  correct = localStorage.getItem('correct');
  localStorage.clear();
}

// 이전 문제
$(".prev-btn").click(function () {
  count--;
  if (count == 0) {
    count = 1;

    alert("첫 번째 문제입니다.");
  }
  localStorage.setItem('count', count);
  location.href = "http://localhost:3000/quiz/" + c;
})

// 다음 문제
$(".next-btn").click(function () {
  
  if (count > 9) {
    alert(scoreTest(correct));

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/quiz/score/score",
      data: {"score": scoreTest(correct)}
    });
    localStorage.clear();
    location.href = "http://localhost:3000/quiz/end" ;
  }
  else {
    count++;
    localStorage.setItem('count', count);
    location.href = "http://localhost:3000/quiz/" + c;
  }
})


// 정답 체크
$("#checkBtn").click(function (e) {
  var answer = $(".answer")[0].value;
  var pid = $("#checkBtn")[0].dataset.value;
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/quiz/" + pid,
    data: {"answer": answer},
    success: function (response) {
      if (response == true) {
      
        $(document).ready(function() {
          $(".check-answer").html("정답입니다.");
          correct++;
          localStorage.setItem('correct', correct);
          console.log('맞췃수'+correct);
        });
       } 
      else {
        console.log('틀렸수'+correct);
        localStorage.setItem('correct', correct);
        $(".check-answer").html("틀렸습니다.");
      }
    },
    error: function (request, error) {
      console.log(error);
    }
  });
  e.preventDefault();

})

// 모달
var modal = document.getElementById('myModal');
var btn = document.getElementById('checkBtn');
var close = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
close.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}
// Store frame for motion functions
var previousFrame = null;
var paused = false;

// Setup Leap loop with frame callback function
var controllerOptions = {};

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];
      
      if(hand.grabStrength == 1){
        count2++;
        console.log(count2);
        if(count2 == 100){
          console.log('주먹');
          $(document).ready(function() {
            $('.answer').val('O');
            $("#checkBtn").trigger("click", function () {
              count++;
            })
            setTimeout(function(){
              $(".next-btn").trigger("click", function () {
                count++;
              })}, 2000)
          });
           count2 = 0;
        }
      }
      else if (hand.grabStrength == 0){
        count3++;
        console.log(count3);
        if(count3 == 100){
          console.log('보자기');
          $(document).ready(function() {
            $('.answer').val('X');
            
            $("#checkBtn").trigger("click", function () {
              count++;
            })

            setTimeout(function(){
              $(".next-btn").trigger("click", function () {
                count++;
              })}, 2000)
            
          });

        count3 = 0;
        }
      }     
    }
  }
  // Display Pointable (finger) object data
  // Store frame for motion functions
  previousFrame = frame;
})


function scoreTest(correct){
  var score = (correct * 5);
  return score;
}
