// 文章列表筛选 + 分页逻辑
(function () {
  var PER_PAGE = 5;

  var currentCat = 'all';
  var currentTag = 'all';
  var currentPage = 1;

  var catBtns = document.querySelectorAll('#filterCats .cat-btn');
  var tagChips = document.querySelectorAll('#filterTags .tag-chip');
  var items = Array.prototype.slice.call(document.querySelectorAll('#articleList .article-item'));
  var empty = document.getElementById('articleEmpty');
  var totalEl = document.getElementById('articleTotal');
  var pagination = document.getElementById('pagination');

  function getFiltered() {
    return items.filter(function (item) {
      var cats = (item.getAttribute('data-cats') || '').split(',');
      var tags = (item.getAttribute('data-tags') || '').split(',');
      var matchCat = currentCat === 'all' || cats.indexOf(currentCat) !== -1;
      var matchTag = currentTag === 'all' || tags.indexOf(currentTag) !== -1;
      return matchCat && matchTag;
    });
  }

  function render() {
    var filtered = getFiltered();
    var total = filtered.length;
    if (totalEl) totalEl.textContent = total;

    var totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    var start = (currentPage - 1) * PER_PAGE;
    var end = start + PER_PAGE;
    var pageItems = filtered.slice(start, end);

    items.forEach(function (item) { item.style.display = 'none'; });
    pageItems.forEach(function (item) { item.style.display = ''; });

    if (empty) empty.hidden = total !== 0;

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!pagination) return;
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // 上一页
    var prev = document.createElement('button');
    prev.className = 'page-btn' + (currentPage === 1 ? ' disabled' : '');
    prev.textContent = '上一页';
    prev.disabled = currentPage === 1;
    prev.addEventListener('click', function () {
      if (currentPage > 1) { currentPage--; render(); }
    });
    pagination.appendChild(prev);

    // 页码
    for (var i = 1; i <= totalPages; i++) {
      var btn = document.createElement('button');
      btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
      btn.textContent = i;
      (function (n) {
        btn.addEventListener('click', function () {
          currentPage = n; render();
        });
      })(i);
      pagination.appendChild(btn);
    }

    // 下一页
    var next = document.createElement('button');
    next.className = 'page-btn' + (currentPage === totalPages ? ' disabled' : '');
    next.textContent = '下一页';
    next.disabled = currentPage === totalPages;
    next.addEventListener('click', function () {
      if (currentPage < totalPages) { currentPage++; render(); }
    });
    pagination.appendChild(next);

    // 页码信息
    var info = document.createElement('span');
    info.className = 'page-info';
    info.textContent = '第 ' + currentPage + ' 页 / 共 ' + totalPages + ' 页';
    pagination.appendChild(info);
  }

  catBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      catBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentCat = btn.getAttribute('data-cat');
      currentPage = 1;
      render();
    });
  });

  tagChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      tagChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      currentTag = chip.getAttribute('data-tag');
      currentPage = 1;
      render();
    });
  });

  render();
})();
