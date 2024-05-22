/*

More SplitText demos on Codepen: https://codepen.io/collection/KiEhr

See https://www.greensock.com/splittext/ for details. 

This demo uses SplitText which is a membership benefit of Club GreenSock, https://www.greensock.com/club/
*/

var $quote = $("#quote"),
    mySplitText = new SplitText($quote, {type:"words"}),
    splitTextTimeline = gsap.timeline();

gsap.set($quote, {perspective:400});

//kill any animations and set text back to its pre-split state
function kill(){
  splitTextTimeline.clear().time(0);
  mySplitText.revert();
}

$("#chars").click(function() {
  kill();
  mySplitText.split({type:"chars, words"}) 
  splitTextTimeline.from(mySplitText.chars, {duration: 0.6, scale:4, autoAlpha:0,  rotationX:-180,  transformOrigin:"100% 50%", ease:"back", stagger: 0.02});
})

$("#words").click(function() {
  kill();
  mySplitText.split({type:"words"}) 
  $(mySplitText.words).each(function(index,el) {
    splitTextTimeline.from(el, {duration: 0.6, opacity:0, force3D:true}, index * 0.01);
    splitTextTimeline.from(el, {duration: 0.6, scale:index % 2 == 0  ? 0 : 2}, index * 0.01); 
  });
})

$("#lines").click(function() {
   kill();
   mySplitText.split({type:"lines"}) 
   splitTextTimeline.from(mySplitText.lines, {duration: 0.5, opacity:0, rotationX:-120, force3D:true, transformOrigin:"top center -150", stagger: 0.1});
 
})

$("#charsWordsLines").click(function() {
  kill();
  mySplitText.split({type:"chars, words, lines"}) 
  splitTextTimeline.from(mySplitText.chars, {duration: 0.2, autoAlpha:0, scale:4, force3D:true, stagger: 0.01}, 0.5)
    .to(mySplitText.words, {duration: 0.1, color:"#8FE402", scale:0.9, stagger: 0.1}, "words")
    .to(mySplitText.words, {duration: 0.2, color:"white", scale:1, stagger: 0.1}, "words+=0.1")
    .to(mySplitText.lines, {duration: 0.5, x:100, autoAlpha:0, stagger: 0.2}) 
})

//revert the text back to its pre-split state
$("#revert").click(function() {
  mySplitText.revert(); 
})