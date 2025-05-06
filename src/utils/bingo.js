const getRandomKeywords = (keywords, count) => {
  const shuffled = [...keywords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateHTML = (cards) => {
  const style = `
    <style>
      body {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: Arial, sans-serif;
        background: #fff;
      }

      .page {
        page-break-after: always;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      .bingo-wrapper {
        width: 320px;
        margin: 4px;
        background-color: #fff;
        padding: 24px 32px 12px 32px;
        border: 2px solid #000;
      }

      .bingo-title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 72px;
        margin-bottom: 24px;
        color: #000;
        font-size: 32px;
        font-weight: 600;
      }

      .bingo-keywords {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border: 1px solid #000;
      }

      .bingo-keyword {
        color: #000;
        background-color: #fff;
        padding: 8px 4px;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        border: 1px solid #000;
        min-height: 60px;
        min-width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        word-break: break-word;
      }

      .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 8px;
        font-size: 10px;
        color: #000;
      }
    </style>
  `;

  let pages = '';
  for (let i = 0; i < cards.length; i += 4) {
    const group = cards.slice(i, i + 4);
    const page = `
      <div class="page">
        <div class="grid">
          ${group
            .map(
              (card) => `
            <div class="bingo-wrapper">
              <div class="bingo-title">${card.moduleId.title}</div>
              <div class="bingo-keywords">
                ${card.keywords.map((k) => `<div class="bingo-keyword">${k}</div>`).join('')}
              </div>
              <div class="footer">
                <span>#${card.index}</span>
                <span>flashvn.org</span>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    `;
    pages += page;
  }

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">${style}</head><body>${pages}</body></html>`;
};

module.exports = { getRandomKeywords, generateHTML };
