/**
 * 傳播與採訪筆記知識庫 - 首頁分類標籤篩選功能
 * 支援分類：全部、傳播理論（相容「理論整理」）、採訪實務、媒體觀察
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleList = document.getElementById('article-list');

  if (!filterButtons.length || !articleList) return;

  // 建立無符合結果時的提示元素
  let emptyState = document.getElementById('filter-empty-state');
  if (!emptyState) {
    emptyState = document.createElement('p');
    emptyState.id = 'filter-empty-state';
    emptyState.className = 'empty-state';
    emptyState.hidden = true;
    emptyState.textContent = '目前此分類尚無筆記文章。';
    articleList.after(emptyState);
  }

  // 同義分類相容對照（「傳播理論」與「理論整理」視為同一分類）
  const categoryAliases = {
    '傳播理論': ['傳播理論', '理論整理'],
    '理論整理': ['傳播理論', '理論整理'],
    '採訪實務': ['採訪實務'],
    '媒體觀察': ['媒體觀察']
  };

  function filterCards(selectedCategory) {
    const cards = articleList.querySelectorAll('.note-card');
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCategory = (card.getAttribute('data-category') || '').trim();
      const isAll = selectedCategory === '全部' || selectedCategory === 'all';
      const acceptedCategories = categoryAliases[selectedCategory] || [selectedCategory];
      const isMatch = isAll || acceptedCategories.includes(cardCategory);

      if (isMatch) {
        card.hidden = false;
        visibleCount++;
      } else {
        card.hidden = true;
      }
    });

    emptyState.hidden = visibleCount > 0;
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedCategory = (
        button.getAttribute('data-filter') ||
        button.textContent ||
        '全部'
      ).trim();

      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      filterCards(selectedCategory);
    });
  });
});
