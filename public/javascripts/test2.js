var count = 1;
var count2 = 1;

if (localStorage.getItem('count')) {
  count = localStorage.getItem('count');
}

// 이전 문제
$(".prev-btn").click(function () {
  count--;
  if (count == 0) {
    count = 1;

    alert("첫 번째 문제입니다.");
  }
  localStorage.setItem('count', count);
  location.href = "http://localhost:3000/quiz/" + count;
})

// 다음 문제
$(".next-btn").click(function () {
 
  console.log('a' + count);
  if (count > 9) {
    count = 10;
    alert(" 무야호");
    localStorage.clear();
  }

  count++;
  
  localStorage.setItem('count', count);
  
  location.href = "http://localhost:3000/quiz/" + count;
  localStorage.clear();
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
        $(".check-answer").html("정답입니다.");
      } else {
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

  var handString = "";
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];
      
      if(hand.grabStrength == 1)
      {
        count2++;
        console.log(count2);

        if(count2 == 100){

          
          $(".next-btn").trigger("click", function () {
            console.log(count);
            count++;
          })

          count2 = 0;
          
        }
      }     
      
    }
  }
  previousFrame = frame;
})
