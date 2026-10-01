(function () {
  const catalogue = window.HamperBuilderData?.products || [];
  const categoryMetadata = {
    drinks: 'drinks',
    food: 'food',
    beauty: 'beauty',
    lifestyle: 'lifestyle',
    accessories: 'accessories'
  };

  function getBudgetValue(text) {
    const matches = text.match(/(?:₦|NGN|naira|naira|\bN\b)[\s]*([0-9][0-9,\.]*)/i) || text.match(/([0-9][0-9,\.]*)\s*(?:naira|ngn|₦)/i);
    if (!matches) return null;
    const salary = Number(String(matches[1]).replace(/,/g, ''));
    return Number.isFinite(salary) ? salary : null;
  }

  function inferRecipient(text) {
    const patterns = [
      'boss', 'mum', 'mom', 'mother', 'dad', 'father', 'wife', 'husband', 'partner', 'friend', 'client', 'employee', 'team', 'teacher', 'child', 'new employee', 'manager', 'colleague', 'grandparent'
    ];
    const found = patterns.find((pattern) => new RegExp(pattern, 'i').test(text));
    return found ? found.charAt(0).toUpperCase() + found.slice(1) : 'Recipient';
  }

  function inferOccasion(text) {
    const occasions = [
      ['birthday', 'Birthday'], ['christmas', 'Christmas'], ['anniversary', 'Anniversary'], ['valentine', 'Valentine\'s Day'], ['graduation', 'Graduation'], ['thank you', 'Thank You'], ['corporate', 'Corporate Appreciation'], ['client', 'Client Appreciation'], ['wedding', 'Wedding'], ['housewarming', 'Housewarming'], ['baby', 'Baby Celebration'], ['just because', 'Just Because']
    ];
    const match = occasions.find(([pattern]) => new RegExp(pattern, 'i').test(text));
    return match ? match[1] : 'General gifting';
  }

  function inferStyle(text) {
    const style = /luxury|premium|executive|elegant|sophisticated|luxurious/.test(text) ? 'Executive / Premium' : 'Thoughtful / Everyday';
    return style;
  }

  function inferPreferences(text) {
    const preferences = [];
    if (/coffee|espresso|latte|cappuccino/i.test(text)) preferences.push('Coffee');
    if (/snacks|nuts|biscuits|chocolate|sweet|treat|premium snacks/i.test(text)) preferences.push('Premium snacks');
    if (/skincare|beauty|wellness|self care/i.test(text)) preferences.push('Skincare / beauty');
    if (/tea|cocoa/i.test(text)) preferences.push('Tea and warm treats');
    if (/book|notebook|desk|workspace/i.test(text)) preferences.push('Lifestyle / desk essentials');
    return preferences.length ? preferences : ['General premium gifting'];
  }

  function inferDislikes(text) {
    const dislikes = [];
    if (/no chocolate|don't want chocolate|don\'t want sweets|nothing too sweet|avoid chocolate|not chocolate/i.test(text)) dislikes.push('Chocolate');
    if (/doesn\'t drink coffee|not coffee|no coffee/i.test(text)) dislikes.push('Coffee');
    return dislikes;
  }

  function parseRequest(text) {
    const query = String(text || '').trim();
    const budget = getBudgetValue(query);
    return {
      recipient: inferRecipient(query),
      occasion: inferOccasion(query),
      budget,
      preferenceSummary: inferPreferences(query).join(', '),
      dislikes: inferDislikes(query),
      style: inferStyle(query),
      raw: query
    };
  }

  function productMatches(query, product) {
    const text = query.raw.toLowerCase();
    if (!product) return false;
    const categoryMatches = (!query.preferenceSummary || !query.preferenceSummary.toLowerCase().includes(product.category)) && !/coffee|snacks|premium|lifestyle|beauty/i.test(text) ? true : true;
    if (/coffee|espresso|latte|cappuccino/.test(text) && product.category === 'drinks') return true;
    if (/snacks|nuts|biscuits|chocolate|sweet|treat/.test(text) && (product.category === 'food' || product.category === 'drinks')) return true;
    if (/skincare|beauty|self care/.test(text) && product.category === 'beauty') return true;
    if (/desk|notebook|mug|workspace/.test(text) && product.category === 'lifestyle') return true;
    if (/premium|executive|luxury|boss/.test(text) && (product.category === 'drinks' || product.category === 'food' || product.category === 'lifestyle')) return true;
    if (/gift for my mum|gift for my mother|mum|mother/.test(text)) return true;
    return true;
  }

  function makeRecommendationSet(parsed) {
    const budget = parsed.budget || Infinity;
    const filtered = catalogue.filter((product) => {
      const isAllowed = Number(product.price) <= budget || product.price === 'Price coming soon' || budget === Infinity;
      if (!isAllowed && budget !== Infinity) return false;
      return true;
    });

    const selection = filtered.length ? filtered.slice(0, 6) : catalogue.slice(0, 6);
    const items = selection.slice(0, 4);
    const total = items.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0);

    return [
      {
        title: 'Best Match',
        products: items,
        total,
        why: `Your ${parsed.budget ? `₦${parsed.budget.toLocaleString()} budget` : 'stated requirements'} and preferences for ${parsed.preferenceSummary.toLowerCase()} align with a premium, thoughtful hamper.`
      },
      {
        title: 'More Premium',
        products: selection.slice(2, 5),
        total: selection.slice(2, 5).reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0),
        why: 'A more elevated option for a premium occasion or executive-style gift.'
      },
      {
        title: 'Budget Friendly',
        products: selection.slice(0, 3),
        total: selection.slice(0, 3).reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0),
        why: 'A considered choice that keeps the gifting feel polished while staying comfortably within budget.'
      }
    ];
  }

  function formatMoney(value) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value || 0);
  }

  function buildInsights(parsed) {
    const fields = [
      ['Recipient', parsed.recipient],
      ['Budget', parsed.budget ? `₦${parsed.budget.toLocaleString()}` : 'Not specified'],
      ['Occasion', parsed.occasion],
      ['Preferences', parsed.preferenceSummary],
      ['Likely gifting style', parsed.style],
      ['Known dislikes', parsed.dislikes.length ? parsed.dislikes.join(', ') : 'None noted']
    ];

    return fields.map(([label, value]) => `
      <div>
        <dt>${label}</dt>
        <dd>${value}</dd>
      </div>
    `).join('');
  }

  function renderRecommendations(parsed) {
    const output = document.getElementById('recommendations');
    const recommendations = makeRecommendationSet(parsed);
    output.innerHTML = recommendations.map((recommendation, index) => {
      const productBadges = recommendation.products.map((product) => `
        <li>
          <span>${product.name}</span>
          <strong>${typeof product.price === 'number' ? formatMoney(product.price) : product.price}</strong>
        </li>
      `).join('');

      return `
        <article class="recommendation-card ${index === 0 ? 'is-featured' : ''}">
          <div class="recommendation-header">
            <div>
              <p class="card-label">${recommendation.title}</p>
              <h2>${index === 0 ? 'Your recommended hamper' : recommendation.title}</h2>
            </div>
            <strong class="recommendation-total">${formatMoney(recommendation.total)}</strong>
          </div>
          <p class="recommendation-copy">${recommendation.why}</p>
          <ul class="product-list">${productBadges}</ul>
          <div class="recommendation-actions">
            <button type="button" class="button button-primary" data-build-recommendation="${index}">Build This Hamper <span aria-hidden="true">↗</span></button>
            <button type="button" class="button button-text compact" data-preview-recommendation="${index}">View Details</button>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderInsightPanel(parsed) {
    const insights = document.getElementById('ai-insights');
    insights.innerHTML = buildInsights(parsed);
  }

  function addAssistantMessage(message) {
    const thread = document.getElementById('chat-thread');
    const bubble = document.createElement('div');
    bubble.className = 'message assistant-message';
    bubble.innerHTML = `<span class="message-role">AI</span><p>${message}</p>`;
    thread.appendChild(bubble);
    thread.scrollTop = thread.scrollHeight;
  }

  function addUserMessage(message) {
    const thread = document.getElementById('chat-thread');
    const bubble = document.createElement('div');
    bubble.className = 'message user-message';
    bubble.innerHTML = `<span class="message-role">You</span><p>${message}</p>`;
    thread.appendChild(bubble);
    thread.scrollTop = thread.scrollHeight;
  }

  function buildRecommendationQuery(index) {
    const recommendation = makeRecommendationSet(parseRequest(document.getElementById('gift-query').value))[index];
    const products = recommendation.products.map((product) => product.id).join(',');
    const box = recommendation.products.length > 3 ? 'large' : 'medium';
    const budget = parseRequest(document.getElementById('gift-query').value).budget || 70000;
    return `builder.html?ai-box=${encodeURIComponent(box)}&ai-budget=${encodeURIComponent(budget)}&ai-recipient=${encodeURIComponent(parseRequest(document.getElementById('gift-query').value).recipient)}&ai-products=${encodeURIComponent(products)}`;
  }

  function setPrompt(value) {
    const input = document.getElementById('gift-query');
    input.value = value;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }

  function runAi() {
    const query = document.getElementById('gift-query').value.trim();
    if (!query) {
      addAssistantMessage('I need a little more detail to make the right recommendation. Who is the gift for, or what is the occasion?');
      return;
    }
    addUserMessage(query);
    const parsed = parseRequest(query);
    renderInsightPanel(parsed);
    renderRecommendations(parsed);
    const defaultReply = parsed.budget
      ? `I’ve noted the request for ${parsed.recipient} with a budget of ₦${parsed.budget.toLocaleString()}. I’d recommend starting with a ${parsed.style.toLowerCase()} hamper that leans into ${parsed.preferenceSummary.toLowerCase()}.`
      : `I’ve noted the request for ${parsed.recipient}. I’d recommend starting with a ${parsed.style.toLowerCase()} hamper that suits the ${parsed.occasion.toLowerCase()} occasion.`;
    addAssistantMessage(defaultReply);
  }

  document.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-prompt]');
    if (chip) {
      setPrompt(chip.dataset.prompt);
      return;
    }

    const buildButton = event.target.closest('[data-build-recommendation]');
    if (buildButton) {
      const url = buildRecommendationQuery(Number(buildButton.dataset.buildRecommendation));
      window.location.href = url;
      return;
    }

    const previewButton = event.target.closest('[data-preview-recommendation]');
    if (previewButton) {
      const query = document.getElementById('gift-query').value.trim();
      const parsed = parseRequest(query);
      const recommendation = makeRecommendationSet(parsed)[Number(previewButton.dataset.previewRecommendation)];
      addAssistantMessage(`Here’s why this option fits: ${recommendation.why}`);
    }
  });

  document.getElementById('ai-form').addEventListener('submit', (event) => {
    event.preventDefault();
    runAi();
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.ai-navigation');
  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open AI navigation');
      navigation.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open AI navigation' : 'Close AI navigation');
      navigation.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const defaultParsed = parseRequest(document.getElementById('gift-query').value);
  renderInsightPanel(defaultParsed);
  renderRecommendations(defaultParsed);
})();
