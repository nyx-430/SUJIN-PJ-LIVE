// Beanpole 메인 JS - main.js //

// 페이지 로딩시 최상단 이동하기
window.addEventListener('load',()=>window.scrollTo(0,0));

document.querySelector("html").style.scrollBehavior = "smooth";

// 8초 후 아래로 이동 ////////////
setTimeout(() => {
  console.log('8초 후 이동함');
  window.scrollTo(0, document.querySelector("#ban").offsetTop);
  
  // 자동 넘김 호출 함수 최초 호출하기
  autoSlide();
}, 8000);

// 슬라이드 배너 이벤트 ////////////
const slide = document.querySelector(".slider");
// console.log(slide.querySelectorAll("li"));

function goSlide() {
  // 먼저 왼쪽으로 이동하기
  slide.style.left = "-100%";
  slide.style.transition = ".6s ease-in-out";

  // 이동하는 시간 0.7초간 기다림!
  setTimeout(() => {
    // 맨 앞 li 맨 뒤로 이동
    slide.appendChild(slide.querySelectorAll("li")[0]);
    // 슬라이드 left 값이 -100% 이므로 left값을 0으로 변경
    slide.style.left = "0";
    // left 트랜지션 없애기
    slide.style.transition = "none";
  }, 700);

  // 슬라이드 버튼



} ///////////// goSlide 함수 ////////////////
/////////////////////////////////////////////

// 배너 자동 넘김 호출 함수
function autoSlide() {
  setInterval(goSlide, 3500);
} //////////////// autoSlide 함수 ////////////////
/////////////////////////////////////////////////


// 마우스커서 이벤트 ////////////
const cursor=document.querySelector('.cursor');
const myBody=document.body;

myBody.onmousemove=(e)=>{
  cursor.style.top=e.clientY+'px';
  cursor.style.left=e.clientX+'px';
}; /////////// mousemove ///////////

// 영역별 마우스 오버 체크 커서 변경하기
// 이벤트 대상 : #ban-area
// 대상 : cursor
const cursorSet = document.querySelectorAll('.cursor-set');

cursorSet.forEach(ele=>{
  ele.onmouseenter = ()=>{
    cursor.classList.add(
      ele.getAttribute('data-cursor'));
  };
  ele.onmouseleave = ()=>{
    cursor.classList.remove(
      ele.getAttribute('data-cursor'));
  };
}); /// forEach ///

// 햄버거 버튼 클릭으로 메뉴 열고 닫기
const menuBtn=document.querySelector('.hambtn');
const menuBox=document.querySelector('.menu-box');

console.log('메뉴 버튼:',menuBtn,'메뉴 박스:',menuBox);

menuBtn.addEventListener('click',showmenu);

function showmenu(){
  
  setTimeout(() => {
    menuBox.style.display=
    this.classList.contains('on')?'block':'none';
    // 클래스 on이 들어간 경우 block으로 보이게 함!
    // 반대인 경우는 none으로 숨김기
  }, 300);
}

const pagePos = [];
const page = document.querySelectorAll('.page');
page.forEach((ele,idx)=>{
  pagePos[idx] = ele.offsetTop;
})
console.log(pagePos);


// 휠 이벤트에 따라 페이지 넘기기

// 페이지번호 
let pgNum = 0;

// 광스크롤 금지
let wheelSts = false;

window.addEventListener('wheel',(e)=>{

  // 광휠 금지
  if(wheelSts){
    return;
  }
  wheelSts = true;
  setTimeout(()=>{
    wheelSts = false;
  },600);


  // 스크롤 내릴 때 deltaY값 양수 / 올리면 음수
  if(e.deltaY>0){
    pgNum++;
  }else{
    pgNum--;
  }
  if(pgNum<0){
    pgNum=0;
  }
  if(pgNum>page.length-1){
    pgNum=page.length-1;
  }
  console.log(pgNum);

  // 페이지 이동
  window.scrollTo(0,pagePos[pgNum]);
});