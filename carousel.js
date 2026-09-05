(function () {
  document.querySelectorAll('.carousel').forEach(function (car) {
    var track = car.querySelector('.track');
    var slides = track.children;
    var dots = car.querySelectorAll('.dots button');
    var idx = 0, timer = null, touched = false;
    function go(n) {
      idx = (n + slides.length) % slides.length;
      track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' });
    }
    function sync() {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== idx) idx = i;
      dots.forEach(function (d, k) { d.classList.toggle('on', k === idx); });
    }
    car.querySelector('.prev').addEventListener('click', function () { touched = true; go(idx - 1); });
    car.querySelector('.next').addEventListener('click', function () { touched = true; go(idx + 1); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { touched = true; go(k); }); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(sync); });
    track.addEventListener('touchstart', function () { touched = true; }, { passive: true });
    car.addEventListener('mouseenter', function () { clearInterval(timer); });
    car.addEventListener('mouseleave', function () { if (!touched) start(); });
    function start() {
      clearInterval(timer);
      timer = setInterval(function () { if (touched) { clearInterval(timer); return; } go(idx + 1); }, 6000);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
  });
})();
