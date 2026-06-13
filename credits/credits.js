# /credits/credits.js

async function loadCredits() {

```
const response = await fetch('/showpages/upcoming.json');
const data = await response.json();

const today = new Date();

const shows = data.shows;

const upcomingShows = shows
    .filter(show => new Date(show.endDate) >= today)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

const completedShows = shows
    .filter(show => new Date(show.endDate) < today)
    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

buildUpcomingCalendar(upcomingShows);
buildRecentShows(completedShows);
buildCredits(data.structure, completedShows);
```

}

function buildUpcomingCalendar(shows) {

```
const container = document.getElementById('upcoming-calendar');

const now = new Date();

for (let offset = 0; offset < 4; offset++) {

    const monthDate = new Date(
        now.getFullYear(),
        now.getMonth() + offset,
        1
    );

    const monthName = monthDate.toLocaleString('en-GB', {
        month: 'long'
    }).toUpperCase();

    const monthIndex = monthDate.getMonth();
    const year = monthDate.getFullYear();

    const monthShows = shows.filter(show => {

        const start = new Date(show.startDate);

        return (
            start.getMonth() === monthIndex &&
            start.getFullYear() === year
        );

    });

    const column = document.createElement('div');
    column.className = 'calendar-column';

    let html = `
        <div class="calendar-month">
            ${monthName}
        </div>
    `;

    monthShows.forEach(show => {

        html += `
            <div class="calendar-show">

                <a href="${show.url}" class="calendar-title">
                    ${show.title}
                </a>

                <div class="calendar-meta">
                    ${show.role} • ${show.venue}
                </div>

            </div>
        `;

    });

    column.innerHTML = html;

    container.appendChild(column);

}
```

}

function buildRecentShows(shows) {

```
const container = document.getElementById('recent-productions');

const recent = shows.slice(0, 3);

recent.forEach(show => {

    const card = document.createElement('a');

    card.href = show.url;
    card.className = 'recent-card';

    card.innerHTML = `
        <div class="card-glow"></div>

        <span>${show.title}</span>

        <small>
            ${show.role} • ${show.venue}
        </small>
    `;

    container.appendChild(card);

});
```

}

function buildCredits(structure, shows) {

```
const container = document.getElementById('credits-container');

structure.forEach(category => {

    let categoryHTML = `
        <div class="credits-column reveal">

            <div class="category-box">

                <h2 class="category-title">
                    ${category.name}
                </h2>
    `;

    category.companies.forEach(company => {

        const companyShows =
            shows.filter(
                s =>
                s.category === category.name &&
                s.company === company.name
            );

        if (!companyShows.length) return;

        categoryHTML += `
            <div class="show-list">

                <span class="sub-heading">
                    ${company.name}
                </span>
        `;

        company.groups.forEach(group => {

            const groupShows =
                companyShows.filter(
                    s => s.group === group
                );

            if (!groupShows.length) return;

            categoryHTML += `
                <span class="sub-heading">
                    ${group}
                </span>
            `;

            groupShows.forEach(show => {

                categoryHTML += `
                    <a href="${show.url}"
                       class="credit-link">

                        ${show.title}

                        <small>
                            ${show.role}
                            •
                            ${show.venue}
                        </small>

                    </a>
                `;

            });

        });

        categoryHTML += `</div>`;

    });

    categoryHTML += `
            </div>
        </div>
    `;

    container.innerHTML += categoryHTML;

});
```

}

loadCredits();
