// 文章列表筛选逻辑
(function () {
  var currentCat = 'all';
  var currentTag = 'all';

  var catBtns = document.querySelectorAll('#filterCats .cat-btn');
  var tagChips = document.querySelectorAll('#filterTags .tag-chip');
  var items = document.querySelectorAll('#articleList .article-item');
  var empty = document.getElementById('articleEmpty');

  function applyFilter() {
    var visible = 0;
    items.forEach(function (item) {
      var cats = (item.getAttribute('data-cats') || '').split(',');
      var tags = (item.getAttribute('data-tags') || '').split(',');
      var matchCat = currentCat === 'all' || cats.indexOf(currentCat) !== -1;
      var matchTag = currentTag === 'all' || tags.indexOf(currentTag) !== -1;
      var show = matchCat && matchTag;
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  catBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      catBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentCat = btn.getAttribute('data-cat');
      applyFilter();
    });
  });

  tagChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      tagChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      currentTag = chip.getAttribute('data-tag');
      applyFilter();
    });
  });
})();
