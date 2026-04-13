(function () {
  var activeType = '';
  var activeTopic = '';
  var activeSource = '';
  var activeAuthor = '';

  function normalize(str) {
    return (str || '').toLowerCase();
  }

  function applyFilters() {
    var items = document.querySelectorAll('.recordings-list li[data-type]');
    items.forEach(function (li) {
      var type   = li.getAttribute('data-type') || '';
      var source = li.getAttribute('data-source') || '';
      var author = li.getAttribute('data-author') || '';
      var topics = (li.getAttribute('data-topics') || '').split(' ');

      var matchType   = !activeType   || type === activeType;
      var matchTopic  = !activeTopic  || topics.indexOf(activeTopic) !== -1;
      var matchSource = !activeSource || source === activeSource;
      var matchAuthor = !activeAuthor || normalize(author).indexOf(normalize(activeAuthor)) !== -1;

      li.style.display = (matchType && matchTopic && matchSource && matchAuthor) ? '' : 'none';
    });

    // Hide section headings when all items in their section are hidden
    var sections = document.querySelectorAll('.recordings-section');
    sections.forEach(function (section) {
      var visible = section.querySelectorAll('li[data-type]:not([style*="display: none"])');
      section.style.display = visible.length ? '' : 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Type filter buttons
    var typeButtons = document.querySelectorAll('.filter-btn[data-filter="type"]');
    typeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        typeButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeType = btn.getAttribute('data-value') || '';
        applyFilters();
      });
    });

    // Topic dropdown
    var topicSelect = document.getElementById('filter-topic');
    if (topicSelect) {
      topicSelect.addEventListener('change', function () {
        activeTopic = topicSelect.value;
        applyFilters();
      });
    }

    // Source dropdown
    var sourceSelect = document.getElementById('filter-source');
    if (sourceSelect) {
      sourceSelect.addEventListener('change', function () {
        activeSource = sourceSelect.value;
        applyFilters();
      });
    }

    // Author search
    var authorInput = document.getElementById('filter-author');
    if (authorInput) {
      authorInput.addEventListener('input', function () {
        activeAuthor = authorInput.value;
        applyFilters();
      });
    }

    // Reset button
    var resetBtn = document.getElementById('filter-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        activeType   = '';
        activeTopic  = '';
        activeSource = '';
        activeAuthor = '';
        typeButtons.forEach(function (b) { b.classList.remove('active'); });
        if (typeButtons[0]) typeButtons[0].classList.add('active');
        if (topicSelect) topicSelect.value = '';
        if (sourceSelect) sourceSelect.value = '';
        if (authorInput)  authorInput.value  = '';
        applyFilters();
      });
    }
  });
})();
