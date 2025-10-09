document.addEventListener('DOMContentLoaded', () => {
  const credits = document.querySelectorAll('.credit-item');

  credits.forEach(item => {
    const header = item.querySelector('.credit-header');
    const content = item.querySelector('.credit-content');
    const arrow = item.querySelector('span');

    header.addEventListener('click', () => {
      const isOpen = content.style.display === 'block';
      document.querySelectorAll('.credit-content').forEach(c => c.style.display = 'none');
      document.querySelectorAll('.credit-header span').forEach(a => a.textContent = '▼');

      if (!isOpen) {
        content.style.display = 'block';
        arrow.textContent = '▲';
      }
    });
  });
});
