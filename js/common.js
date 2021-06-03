// 검색바 스크립트


const searchEl = document.querySelector('.search'); //searchEl 변수에 .search 요소를 담고
const searchInputEl = searchEl.querySelector('input'); // searchInputEl 변수에는 .searchEl 변수에 넣은 .search요소의 자식인 input요소를 넣는다

searchEl.addEventListener('click',function(){ //.search요소를 클릭하면
  searchInputEl.focus(); //.search요소의 자식요소인 input에 강제적으로 포커스를 넣어라 라는 뜻
});

searchInputEl.addEventListener('focus',function(){ //input요소에 포커스가 가면
  searchEl.classList.add('focused'); //돋보기가 사라지는 focused 클래스를 추가하고
  searchInputEl.setAttribute('placeholder','통합검색'); //placeholder 통합검색 속성을 추가해라 라는 뜻
});
searchInputEl.addEventListener('blur',function(){ //input요소에 포커스가 해제되면
  searchEl.classList.remove('focused'); //돋보기가 사라지는 focused 클래스를 제거하고
  searchInputEl.setAttribute('placeholder',''); //placeholder 빈 문자 속성을 추가해라 라는 뜻
});





//카피라이트 년도 

const thisYear = document.querySelector('.this_year'); // 년도를 표기할 요소를 변수에 집어넣음
thisYear.textContent =  new Date().getFullYear(); // .textContent로 요소의 텍스트값을 알아내거나 지정 가능함, new Date().getFullYear()로 올해의 년도를 찾아낸 후 변경함