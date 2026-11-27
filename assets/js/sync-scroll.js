/* Desktop : les captures desktop et mobile d’une même page défilent ensemble,
   avec une seule barre de défilement, à droite (celle de la version mobile). */
(function () {
  var mq = window.matchMedia('(min-width: 1024px)');
  document.querySelectorAll('.st-wf__pair').forEach(function (pair) {
    var frames = pair.querySelectorAll('.st-scroll');
    if (frames.length !== 2) return;
    var lock = false;
    function sync(from, to) {
      if (!mq.matches || lock) return;
      // Même décalage en pixels : les deux images défilent à la même vitesse
      // (la plus courte s'arrête simplement en bas quand elle est finie).
      lock = true;
      to.scrollTop = Math.min(from.scrollTop, to.scrollHeight - to.clientHeight);
      requestAnimationFrame(function () { lock = false; });
    }
    frames[0].addEventListener('scroll', function () { sync(frames[0], frames[1]); }, { passive: true });
    frames[1].addEventListener('scroll', function () { sync(frames[1], frames[0]); }, { passive: true });
    pair.classList.add('st-wf__pair--sync');
  });
})();
