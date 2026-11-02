// 移动端导航菜单
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-links');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 微信号复制
  var copyBtn = document.getElementById('copyWechat');
  var copyHint = document.getElementById('copyHint');
  if (copyBtn && copyHint) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy') || '';
      function done(msg) {
        copyHint.textContent = msg;
        setTimeout(function () { copyHint.textContent = ''; }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          done('已复制微信号');
        }).catch(function () {
          fallback();
        });
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          done('已复制微信号');
        } catch (e) {
          done('复制失败，请手动输入');
        }
        document.body.removeChild(ta);
      }
    });
  }
});
