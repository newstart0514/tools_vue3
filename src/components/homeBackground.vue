<template>
  <div class="background">
    <div id="main">
      <h1>something</h1>
      <div class="content">
        <p>
          You can press <kbd>▲</kbd> <kbd>▼</kbd> on your keyboard or swipe
          up/down to navigate. Mouse wheel works too.
        </p>
        <p>
          <a href="https://codepen.io/theseventh" target="_blank">codepen</a> //
          <a href="https://twitter.com/the_seventh_kek" target="_blank"
          >twitter</a
          >
        </p>
      </div>
    
      <div class="buttons">
        <button class="next" onclick="go(-1)"></button>
        <button class="prev" onclick="go(1)"></button>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import 'gsap/dist/gsap.min'
export default {
  name: 'homeBackground',
  mounted() {
    const cols = 3;
    const main = document.getElementById('main');
    let parts = [];
  
    let images = [
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
    ];
    let current = 0;
    let playing = false;
  
    for (let i in images) {
      new Image().src = images[i];
    }
  
    for (let col = 0; col < cols; col++) {
      let part = document.createElement('div');
      part.className = 'part';
      let el = document.createElement('div');
      el.className = "section";
      let img = document.createElement('img');
      img.src = images[current];
      el.appendChild(img);
      part.style.setProperty('--x', -100/cols*col+'vw');
      part.appendChild(el);
      main.appendChild(part);
      parts.push(part);
    }
  
    let animOptions = {
      duration: 2.3,
      ease: Power4.easeInOut
    };
  
    function go(dir) {
      if (!playing) {
        playing = true;
        if (current + dir < 0) current = images.length - 1;
        else if (current + dir >= images.length) current = 0;
        else current += dir;
      
        function up(part, next) {
          part.appendChild(next);
          gsap.to(part, {...animOptions, y: -window.innerHeight}).then(function () {
            part.children[0].remove();
            gsap.to(part, {duration: 0, y: 0});
          })
        }
      
        function down(part, next) {
          part.prepend(next);
          gsap.to(part, {duration: 0, y: -window.innerHeight});
          gsap.to(part, {...animOptions, y: 0}).then(function () {
            part.children[1].remove();
            playing = false;
          })
        }
      
        for (let p in parts) {
          let part = parts[p];
          let next = document.createElement('div');
          next.className = 'section';
          let img = document.createElement('img');
          img.src = images[current];
          next.appendChild(img);
        
          if ((p - Math.max(0, dir)) % 2) {
            down(part, next);
          } else {
            up(part, next);
          }
        }
      }
    }
  
    window.addEventListener('keydown', function(e) {
      if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
        go(1);
      }
    
      else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        go(-1);
      }
    });
  
    function lerp(start, end, amount) {
      return (1-amount)*start+amount*end
    }
  
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
  
    const cursorF = document.createElement('div');
    cursorF.className = 'cursor-f';
    let cursorX = 0;
    let cursorY = 0;
    let pageX = 0;
    let pageY = 0;
    let size = 8;
    let sizeF = 36;
    let followSpeed = .16;
  
    document.body.appendChild(cursor);
    document.body.appendChild(cursorF);
  
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      cursorF.style.display = 'none';
    }
  
    cursor.style.setProperty('--size', size+'px');
    cursorF.style.setProperty('--size', sizeF+'px');
  
    window.addEventListener('mousemove', function(e) {
      pageX = e.clientX;
      pageY = e.clientY;
      cursor.style.left = e.clientX-size/2+'px';
      cursor.style.top = e.clientY-size/2+'px';
    });
  
    function loop() {
      cursorX = lerp(cursorX, pageX, followSpeed);
      cursorY = lerp(cursorY, pageY, followSpeed);
      cursorF.style.top = cursorY - sizeF/2 + 'px';
      cursorF.style.left = cursorX - sizeF/2 + 'px';
      requestAnimationFrame(loop);
    }
  
    loop();
  
    let startY;
    let endY;
    let clicked = false;
  
    function mousedown(e) {
      gsap.to(cursor, {scale: 4.5});
      gsap.to(cursorF, {scale: .4});
    
      clicked = true;
      startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
    }
    function mouseup(e) {
      gsap.to(cursor, {scale: 1});
      gsap.to(cursorF, {scale: 1});
    
      endY = e.clientY || endY;
      if (clicked && startY && Math.abs(startY - endY) >= 40) {
        go(!Math.min(0, startY - endY)?1:-1);
        clicked = false;
        startY = null;
        endY = null;
      }
    }
    window.addEventListener('mousedown', mousedown, false);
    window.addEventListener('touchstart', mousedown, false);
    window.addEventListener('touchmove', function(e) {
      if (clicked) {
        endY = e.touches[0].clientY || e.targetTouches[0].clientY;
      }
    }, false);
    window.addEventListener('touchend', mouseup, false);
    window.addEventListener('mouseup', mouseup, false);
  
    let scrollTimeout;
    function wheel(e) {
      clearTimeout(scrollTimeout);
      setTimeout(function() {
        if (e.deltaY < -40) {
          go(-1);
        }
        else if (e.deltaY >= 40) {
          go(1);
        }
      })
    }
    window.addEventListener('mousewheel', wheel, false);
    window.addEventListener('wheel', wheel, false);
  }
}
</script>

<style scoped>
.background {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  cursor: none;
  user-select: none;
  -webkit-user-drag: none;
}
#main {
  display: flex;
}
#main .part {
  flex: 1;
}
#main .part .section {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
#main .part .section img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  /*left: var(--x);*/
  left: 0;
  pointer-events: none;
}
.cursor {
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: white;
  position: absolute;
  z-index: 999;
  pointer-events: none;
  mix-blend-mode: difference;
}
.cursor-f {
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('@/assets/homeBackgroundCursor.svg');
  background-size: cover;
  mix-blend-mode: difference;
  pointer-events: none;
  opacity: 0.5;
}
.buttons {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
}
.buttons button {
  border: none;
  background-size: contain;
  background: url('@/assets/homeBackgroundBtn.svg') no-repeat center;
  width: 10px;
  height: 30px;
  display: block;
  margin: 20px 0;
  padding: 0 15px;
  transition-duration: 0.6s;
}
.buttons button.next {
  transform: scaleY(-1);
}
.buttons button.prev:active {
  transform: translateY(8px);
}
.buttons button.next:active {
  transform: scaleY(-1) translateY(8px);
}
h1 {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  color: white;
  text-align: center;
  font-size: 2.6em;
  mix-blend-mode: overlay;
  pointer-events: none;
}
.content {
  width: 90%;
  position: absolute;
  bottom: 20px;
  text-align: center;
  left: 0;
  right: 0;
  margin: auto;
  color: white;
  z-index: 99;
  font-size: 0.8em;
}
.content p {
  margin: 0.5em auto;
}
.content kbd {
  width: 15px;
  height: 15px;
  border: 1px solid white;
  display: inline-block;
  border-radius: 3px;
  font-size: 0.9em;
  vertical-align: text-top;
}
.content a {
  color: rgba(227, 227, 227, 0.78);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.content a:hover {
  padding-bottom: 1px;
}

</style>
