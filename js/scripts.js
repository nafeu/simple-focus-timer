$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$(document).ready(function(){
  task.text("Identify Task & Hit Enter");
  task.attr("contentEditable", "true");
  task.focus();
  task.click(function(){
    if (joined) {
      $(this).text("");
      joined = false;
    }
    if ($(this).attr("contentEditable") == "false") {
      $(this).attr("contentEditable", "true");
      $(this).focus();
    }
  });
  task.on("keydown",function(e){
    if (joined) {
      $(this).text("");
      joined = false;
    }
    var key = e.keyCode || e.charCode;  // ie||others
    if(key == 13 && !e.shiftKey) {
      $(this).attr("contentEditable", "false");
      if (!active) {
        toggle();
      }
    }
  });
});

var counter = $("#counter"),
    task = $("#task"),
    interruptions = $("#interruptions"),
    intMessages = $("#interrupt-message"),
    seconds = 0,
    minutes = 0,
    hours = 0,
    active = false,
    numInterrupts = 0,
    joined = true,
    t;

var interruptMessages = [
  "get your shit together",
  "please just stay on task",
  "hope it's important you dipshit",
  "be real with yourself like honestly",
  "concentrate for goodness sake",
  "+1 for being a piece of shit",
  "come on, seriously?",
  "not my fault if you choose failure",
  "lol fricken scrub",
  "getting rekt I see",
  "oh yeah your focus is great #sarcasm",
  "I do not appreciate mediocrity",
  "you gonna work or what?",
  "naw naw, it's cool, you just suck",
  "others are okay with your laziness but not me",
  "wicked job, no not really",
  "focus damnit",
  "do you ever feel like a plastic bag",
  "con-cen-tra-tion...",
  "c-o-n-c-e-n-t-r-a-t-e does it help if I spell it out?",
  "great, another person with no real focus, good job",
  "there it is, rofl, nice one you pleb",
  "might as well just not work amirite?",
  "what are you going on facebook or something",
  "is it an emergency though?",
  "is it really that important though?",
  "was it worth it?",
  "noice... didn't expect anything less",
  "hurry up",
  "again with this shit?",
  "you fucking fuckface",
  "please just try for once",
  "don't worry you can just complain about it again later",
  "rofl, nice",
  "you can just call GG early at this point tbh.",
  "another one bites the dust",
  "just prove to me that you are at least capable of something",
  "it's simple, just DONT be a dumbass.",
  "you get an F for EFFORT",
  "trash, absolute trash",
  "you are literal trash",
  "LITERALLY trash.",
  "no one is going to hold your hand",
  "you can improve your focus by being real with yourself",
  "just don't be all confused about your productivity later"
];

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    counter.text(function(){
      return (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
        ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" + (seconds > 9 ? seconds : "0" + seconds);
    });
}
function timer() {
    t = setInterval(add, 1000);
}

/* Start button */
function start(){
  timer();
}

/* Stop button */
function stop() {
    clearInterval(t);
}

function toggle() {
  flashCounter();
  // setTimeout(function(){
  if (active) {
    stop();
  } else {
    start();
  }
  active = !active;
  // }, 150);
}

function reset() {
  counter.animateCss("shake");
  interruptions.animateCss("shake");
  clearCounter();
}

function resetTime() {
  counter.animateCss("shake");
  counter.text("00:00:00");
  seconds = 0; minutes = 0; hours = 0;
  stop();
  active = false;
}

/* Clear button */
// TODO: Seperate clear counter into two separate helpers
function clearCounter() {
  counter.text("00:00:00");
  seconds = 0; minutes = 0; hours = 0;
  stop();
  active = false;
  numInterrupts = 0;
  interruptions.text(numInterrupts);
  intMessages.text("");
}

function addInterrupt() {
  var anims = ["tada", "wobble", "jello", "rubberBand"];
  interruptions.animateCss(anims[Math.floor(Math.random() * anims.length)]);
  setTimeout(function(){
    interruptions.text(++numInterrupts);
    intMessages.text(interruptMessages[Math.floor(Math.random() * interruptMessages.length)]);
  }, 300);
}

function flashCounter() {
  counter.css({ "color": "#f2695c" });
  setTimeout(function(){
    counter.css({ "color": "#f2d9ba" });
  }, 200);
}
