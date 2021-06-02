
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



//스크롤 이동 시 우측 배너 생성&제거 및 탑으로 버튼 생성&제거 

const badgeEl = document.querySelector('header .badges');

window.addEventListener('scroll', _.throttle(function(){ //lodash라이브러리의 throttle을 써서 스크롤 이동 시 함수가 너무 많이 실행되지 않도록 한다
  if( window.scrollY > 500 ){ //만약 스크롤 값이 500보다 크면
    gsap.to(badgeEl, 0.6, { // gsap 라이브러리로 애니메이션 효과를 준다. gsap.to() 라는 함수를 사용하고 to함수의 인자값으로는 (애니메이션 적용 대상, 적용 시간, 옵션) 이 있다, 옵션은 오브젝트 형식으로 지정 가능하다
      opacity:0,
      display:'none'
    });
    //탑으로 버튼 보이기
    gsap.to('#to_top', 0.2, {
      x:0
    });
  }else{
    gsap.to(badgeEl, 0.6, {
      opacity:1,
      display:'block'
    });
    //탑으로 버튼 숨기기
    gsap.to('#to_top', 0.2, {
      x:100
    });
  }
},300));


//탑으로 버튼 누르면 페이지 최상단으로

const toTopEl = document.querySelector('#to_top')
toTopEl.addEventListener('click',function(){
  gsap.to(window, 1, {
    scrollTo:0
  })
});




//메인 비주얼 스르륵 나타나는 이미지들

const fadeEls = document.querySelectorAll('.visual .fade_in'); //fade_in 클래스를 가진 요소를 배열에 담는다
fadeEls.forEach(function(fadeEl,index){ // forEach안에 반복할 코드를 작성한다 forEach안의 콜백함수의 인자로는 fadeEls에 담겨있는 하나하나의 데이터 (여기선 div.fade_in), 인덱스 값을 넣었다
  gsap.to(fadeEl, 1, { //gsap 라이브러리를 사용하여 애니메이션 효과를 부여함 .to() 함수의 인자로는 애니메이션을 적용할 요소, 작용시간, 옵션{}을 넣었다
    delay: (index+1)*0.7, // gsap.to()에서 제공하는 delay속성으로 요소 하나하나마다 애니메이션 시작 시간을 딜레이시켰다 forEach에서 가져온 인덱스 값을 이용했다
    opacity:1
  });
});




// 공지사항 슬라이드 부분

// new Swiper('선택자', {옵션});
new Swiper('.notice_line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});



// 프로모션 슬라이드 부분

new Swiper('.promotion .swiper-container',{
  slidesPerView: 3, // 한번에 보여주는 슬라이드 이미지 갯수
  spaceBetween: 10, //슬라이드 이미지 양 옆의 여백
  centeredSlides: true, //1번 슬라이드 이미지를 가운데에 보이게끔
  loop :true, //루프
  autoplay:{ //자동재생, 객체 데이터로 세부속성 설정 가능
    delay: 5000 // 슬라이드 이미지마다 5초의 딜레이 후 자동재생
  },
  pagination:{
    el:'.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //페이지 번호 요소 클릭 가능여부 설정
  },
  navigation:{
    prevEl:'.promotion .swiper-prev', //이전 버튼으로 사용할 css선택자를 적을 것
    nextEl:'.promotion .swiper-next' //다음 버튼으로 사용할 css선택자를 적을 것
  }
});


// 프로모션 이미지 슬라이드 토글 

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle_promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click',function(){
  isHidePromotion = !isHidePromotion; //느낌표 뒤의 값을 반대로 만들어라 라는 뜻 isHidePromotion 변수는 위에서 false로 만들었으니 값을 true로 만들어서 재할당 한 것
  if( isHidePromotion ){
    promotionEl.classList.add('hide');
  }else{
    promotionEl.classList.remove('hide');
  }
})




//유튜브 섹션 안의 떠다니는 이미지들


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}


function floatingObject(selector,delay,size){ //함수 생성, 매개변수값을 가지는데 이 매개변수값은 함수 호출시에 넣은 인자값이다
  gsap.to(selector, random(1.5,2.5), { //gsap.to(); 메서드로 애니메이션 효과를 작성
    y:size, // y축으로 size라는 인자값만큼
    repeat:-1, //음수값으로 무한 반복
    yoyo:true, // 한번 재생된 애니메이션을 다시 역재생
    ease: Power1.easeInOut, //ease 속성으로 애니메이션의 등속운동 조절가능
    delay:random(0,delay)
  });
}
floatingObject('.floating1', 1, 15); //함수 호출시 인자값으로 css선택자, 딜레이 시간, 애니메이션 이동거리를 넣었다
floatingObject('.floating2', 0.5, 15); //함수 호출시 인자값으로 css선택자, 딜레이 시간, 애니메이션 이동거리를 넣었다
floatingObject('.floating3', 1.5, 20); //함수 호출시 인자값으로 css선택자, 딜레이 시간, 애니메이션 이동거리를 넣었다



//스크롤 매직, 좌우 슬라이드되며 나타는 효과 만들기
// 1.css로 효과를 적용할 부분들을 투명도 0, transition을 1초로 세팅, 이번 예제에선 back-to-potision이라는 이름으로 세팅함
// 2.좌우에서 나오게하려면 back-to-position.to-left 혹은 to-right 같은 이름으로 효과를 넣을 요소들을 css로 미리 좌 우에 세팅해두자 
// 3. 밑의 scrollMagic 라이브러리로 'show'라는 클래스가 붙은 요소의 후손요소중 .back-to-position이라는 클래스를 가진 요소들의 투명도와 translateX를 원래대로 돌려주게끔 css를 추가하자
// 4. css에서 delay-0 부터 delay-n 번까지 선택자 추가 후 transition-delay를 입맛대로 넣고 delay를 줄 요소에 각각의 delay 클래스를 입력하자


const spyEls = document.querySelectorAll('section.scroll-spy'); //scroll-spy라는 클래스를 가진 section태그를 찾는다. scroll-spy클래스는 html에 직접 입력하자
spyEls.forEach(function(spyEl){ // forEach메서드로 scroll-spy클래스가 붙은 각각의 section요소에 코드를 반복실행하자 라는 뜻
  new ScrollMagic
    .Scene({
      triggerElement:spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook:0.6 //효과 트리거 부분 지정 뷰포트 맨 위가 0 맨 아래가 1이고 이 사이에서 트리거가 작동할 구간을 설정하는 것
    })
    .setClassToggle(spyEl, 'show') // setClassToggle()메소드에 두개의 인자 설정 가능, 하나는 클래스를 붙일 요소, 나머지 하나는 붙이고자 하는 클래스의 이름이다
    .addTo(new ScrollMagic.Controller()); // addToI()메소드의 인자로 'new ScrollMagic라이브러리를 다시 실행하고 .Controller라는 메서드를 붙인다. 실제로 효과가 동작하게끔 하는 부분이다
});





// 어워즈 슬라이드

new Swiper('.awards .swiper-container', {
  autoplay:true,
  loop:true,
  spaceBetween:30,
  slidesPerView:5,
  navigation:{
    prevEl:'.awards .swiper-prev',
    nextEl:'.awards .swiper-next',
  }
})



//카피라이트 년도 

const thisYear = document.querySelector('.this_year'); // 년도를 표기할 요소를 변수에 집어넣음
thisYear.textContent =  new Date().getFullYear(); // .textContent로 요소의 텍스트값을 알아내거나 지정 가능함, new Date().getFullYear()로 올해의 년도를 찾아낸 후 변경함