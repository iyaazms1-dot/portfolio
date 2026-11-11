/* ==========================================================================
   main.js — renders every page from data.js using jQuery.
   Each page's <body> has data-page="home|about|projects|certifications|research|contact".
   Layout in this file: helpers → shared (header/footer/theme) → one render
   function per page → boot.
   ========================================================================== */

$(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const esc = (s) => $("<div>").text(s == null ? "" : s).html();
  const real = (v) => !!v && !/^TODO/i.test(String(v).trim());          // false for empty / "TODO..." values
  const link = (u, label) => (real(u) ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(label)}</a>` : "");
  const tags = (arr = []) => arr.filter(real).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  const initials = SITE.name.split(" ").map((w) => w[0]).slice(0, 3).join("");

  const PAGES = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "about", href: "about.html", label: "About" },
    { id: "projects", href: "projects.html", label: "Projects" },
    { id: "certifications", href: "certifications.html", label: "Certificates" },
    { id: "research", href: "research.html", label: "Research" },
    { id: "contact", href: "contact.html", label: "Contact" },
  ];
  const page = $("body").data("page");

  /* ---------- shared: header, footer, theme ---------- */
  function renderHeader() {
    const links = PAGES.map(
      (p) => `<li><a href="${p.href}" class="${p.id === page ? "active" : ""}">${p.label}</a></li>`
    ).join("");
    $("#site-header").html(`
      <header class="site-header">
        <div class="container nav">
          <a class="logo" href="index.html" aria-label="Home">${esc(SITE.shortName)}.dev</a>
          <ul class="nav-links" id="navLinks">${links}</ul>
          <div style="display:flex;gap:10px">
            <button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode">◐</button>
            <button class="icon-btn menu-toggle" id="menuBtn" aria-label="Menu">☰</button>
          </div>
        </div>
      </header>`);
    $("#menuBtn").on("click", () => $("#navLinks").toggleClass("open"));
    $("#themeBtn").on("click", () => {
      const next = $("html").attr("data-theme") === "dark" ? "light" : "dark";
      $("html").attr("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  function socialLinks() {
    return Object.entries(SITE.links).filter(([, u]) => real(u))
      .map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(k[0].toUpperCase() + k.slice(1))}</a>`).join("");
  }

  function renderFooter() {
    $("#site-footer").html(`
      <footer class="site-footer">
        <div class="container footer-inner">
          <div><strong style="font-family:var(--font-display);font-size:1.2rem">${esc(SITE.name)}</strong><br>
            <span class="mono">© ${new Date().getFullYear()} · Built with HTML, CSS, jQuery &amp; JavaScript</span></div>
          <div class="footer-links">${socialLinks()}</div>
        </div>
      </footer>`);
  }

  function initTheme() {
    let t = null;
    try { t = localStorage.getItem("theme"); } catch (e) {}
    if (!t && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) t = "dark";
    if (t) $("html").attr("data-theme", t);
  }

  /* ---------- reusable card builders ---------- */
  function projectCard(p) {
    return `
      <article class="block hoverable ${p.color || ""} ${p.todo ? "todo" : ""}" data-id="${esc(p.id)}" tabindex="0" role="button">
        <div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:12px;flex-wrap:wrap">
          <span class="status">${esc(p.status)}</span><span class="mono">${esc(p.year)}</span>
        </div>
        <h3>${esc(p.title)}</h3>
        <p class="mono" style="margin:6px 0 10px">${esc(p.category)} · ${esc(p.role)}</p>
        <p style="margin-bottom:14px">${esc(p.summary)}</p>
        <div>${tags(p.stack.slice(0, 4))}</div>
      </article>`;
  }

  function certCard(c) {
    const img = c.image ? `<img src="${esc(c.image)}" alt="${esc(c.title)} certificate" loading="lazy">` : `<span>${esc(c.issuer)}</span>`;
    return `
      <article class="block cert-card ${c.todo ? "todo" : ""}">
        <div class="cert-img">${img}</div>
        <span class="status">${esc(c.category)}</span>
        <h3 style="margin-top:10px">${esc(c.title)}</h3>
        <p class="mono muted">${esc(c.issuer)} · ${esc(c.date)}</p>
        ${c.credentialId ? `<p class="mono">ID: ${esc(c.credentialId)}</p>` : ""}
        <div style="margin:10px 0">${tags(c.skills)}</div>
        ${real(c.url) ? `<a class="btn sm" href="${esc(c.url)}" target="_blank" rel="noopener">Verify ↗</a>` : ""}
      </article>`;
  }

  function skillGroup(g) {
    const rows = g.items.map((s) => `
      <div class="skill ${s.todo ? "todo" : ""}">
        <div class="skill-top"><span>${esc(s.name)}</span>${s.level ? `<span class="mono">${s.level}%</span>` : ""}</div>
        ${s.level ? `<div class="bar"><i data-level="${s.level}"></i></div>` : ""}
      </div>`).join("");
    return `<div class="block ${g.color}"><h3 style="margin-bottom:16px">${esc(g.group)}</h3>${rows}</div>`;
  }

  /* filter + search helper used by projects & certificates */
  function filterable({ items, getCat, getText, build, $filters, $grid, $search }) {
    const cats = ["All", ...new Set(items.map(getCat))];
    $filters.html(cats.map((c, i) => `<button class="filter-btn ${i === 0 ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join(""));
    let cat = "All", q = "";
    const draw = () => {
      const list = items.filter((x) => (cat === "All" || getCat(x) === cat) && (!q || getText(x).toLowerCase().includes(q)));
      $grid.html(list.length ? list.map(build).join("") : `<p class="block span-12">Nothing matches. Try another filter.</p>`);
      revealAll();
    };
    $filters.on("click", ".filter-btn", function () {
      $filters.find(".filter-btn").removeClass("active"); $(this).addClass("active");
      cat = $(this).data("cat"); draw();
    });
    if ($search) $search.on("input", function () { q = $(this).val().trim().toLowerCase(); draw(); });
    draw();
  }

  /* ---------- scroll reveal + animations ---------- */
  function revealAll() {
    const $els = $(".reveal:not(.in)");
    const check = () => {
      const bottom = $(window).scrollTop() + $(window).height() - 40;
      $els.each(function () { if ($(this).offset().top < bottom) $(this).addClass("in"); });
      $(".bar > i:not(.done)").each(function () {
        if ($(this).offset().top < bottom) { $(this).addClass("done").css("width", $(this).data("level") + "%"); }
      });
    };
    check(); $(window).off("scroll.rv").on("scroll.rv", check);
  }

  function countUp($el, to) {
    $({ n: 0 }).animate({ n: to }, { duration: 1200, step() { $el.text(Math.floor(this.n)); }, complete() { $el.text(to); } });
  }

  function typewriter($el, words) {
    let w = 0, i = 0, del = false;
    (function tick() {
      const word = words[w];
      i += del ? -1 : 1;
      $el.text(word.slice(0, i));
      let delay = del ? 45 : 90;
      if (!del && i === word.length) { del = true; delay = 1400; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; delay = 300; }
      setTimeout(tick, delay);
    })();
  }

  /* ---------- PAGE: home ---------- */
  function renderHome() {
    $("#heroName").text(SITE.name);
    $("#heroTagline").text(SITE.tagline);
    $("#heroAvail").text(SITE.availability || "").toggle(!!SITE.availability);
    $("#heroPhoto").html(real(SITE.photo) ? `<img src="${esc(SITE.photo)}" alt="${esc(SITE.name)}" onerror="this.replaceWith(document.createTextNode('${esc(initials)}'))">` : esc(initials));
    $("#resumeBtn").attr("href", SITE.resumeUrl);
    typewriter($("#rotatorText"), SITE.rotator);

    $("#marqueeInner").html(
      [...Array(2)].map(() => SITE.rotator.concat(["Node.js", "JavaScript", "Research", "Privacy", "LLMs"]).map((t) => `<span>${esc(t)} ✦</span>`).join("")).join("")
    );

    $("#stats").html(STATS.map((s, i) => `
      <div class="block ${s.color} stat reveal">
        <div class="value" data-i="${i}">${s.value != null ? esc(s.value) : 0}</div>
        <div class="label">${esc(s.label)}</div>
      </div>`).join(""));
    STATS.forEach((s, i) => {
      if (s.value != null) return;
      const to = s.auto === "certs" ? CERTS.filter((c) => !c.todo).length : s.count;
      countUp($(`.value[data-i=${i}]`), to);
    });

    $("#featuredProjects").html(PROJECTS.filter((p) => !p.todo).slice(0, 3).map((p) => projectCard(p)).join(""));
    $("#latestCerts").html(CERTS.slice(0, 3).map(certCard).join(""));
    $("#featuredProjects").on("click", "[data-id]", () => (window.location = "projects.html"));
  }

  /* ---------- PAGE: about ---------- */
  function renderAbout() {
    $("#bio").html(SITE.bioLong.map((p) => `<p class="${/^TODO/.test(p) ? "todo" : ""}" style="margin-bottom:14px">${esc(p)}</p>`).join(""));
    $("#aboutPhoto").html(real(SITE.photo) ? `<img src="${esc(SITE.photo)}" alt="${esc(SITE.name)}" onerror="this.replaceWith(document.createTextNode('${esc(initials)}'))">` : esc(initials));
    $("#timeline").html(TIMELINE.map((t) => `
      <div class="tl-item ${t.type} reveal">
        <div class="block ${t.todo ? "todo" : ""}">
          <span class="mono">${esc(t.period)}</span>
          <h3>${esc(t.title)}</h3>
          <p class="muted"><strong>${esc(t.org)}</strong></p>
          <p>${esc(t.detail)}</p>
        </div>
      </div>`).join(""));
    $("#skills").html(SKILLS.map(skillGroup).join(""));
    $("#achievements").html(ACHIEVEMENTS.map((a) => `<li>${esc(a)}</li>`).join(""));
  }

  /* ---------- PAGE: projects ---------- */
  function renderProjects() {
    filterable({
      items: PROJECTS, getCat: (p) => p.category,
      getText: (p) => p.title + p.summary + p.stack.join(" "),
      build: (p) => `<div class="reveal">${projectCard(p)}</div>`,
      $filters: $("#filters"), $grid: $("#projectGrid"), $search: $("#projectSearch"),
    });
    const open = (id) => {
      const p = PROJECTS.find((x) => x.id === id); if (!p) return;
      const links = (p.links || []).map((l) => `<a class="btn sm" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join(" ");
      $("#modalBody").html(`
        <span class="status">${esc(p.status)}</span> <span class="mono">${esc(p.year)} · ${esc(p.role)}</span>
        <h2 style="margin:12px 0">${esc(p.title)}</h2>
        <p style="margin-bottom:16px">${esc(p.summary)}</p>
        <ul class="list-plain" style="margin-bottom:16px">${p.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
        <div style="margin-bottom:16px">${tags(p.stack)}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">${links}</div>`);
      $("#modalBack").addClass("open");
    };
    $("#projectGrid").on("click keypress", "[data-id]", function (e) {
      if (e.type === "keypress" && e.key !== "Enter") return;
      open($(this).data("id"));
    });
    $("#modalBack").on("click", function (e) { if (e.target === this || $(e.target).is(".close")) $(this).removeClass("open"); });
    $(document).on("keydown", (e) => e.key === "Escape" && $("#modalBack").removeClass("open"));
  }

  /* ---------- PAGE: certifications ---------- */
  function renderCerts() {
    filterable({
      items: CERTS, getCat: (c) => c.category,
      getText: (c) => c.title + c.issuer + (c.skills || []).join(" "),
      build: (c) => `<div class="reveal">${certCard(c)}</div>`,
      $filters: $("#filters"), $grid: $("#certGrid"), $search: $("#certSearch"),
    });
    $("#certCount").text(CERTS.filter((c) => !c.todo).length);
  }

  /* ---------- PAGE: research ---------- */
  function renderResearch() {
    $("#researchList").html(RESEARCH.map((r, i) => `
      <article class="block ${["violet", "lime", "sky"][i % 3]} reveal">
        <span class="status">${esc(r.type)}</span> <span class="mono">${esc(r.year)}</span>
        <h3 style="margin:10px 0">${esc(r.title)}</h3>
        <p style="margin-bottom:12px">${esc(r.abstract)}</p>
        <div>${tags(r.tags)}</div>
        ${(r.links || []).map((l) => `<a class="btn sm alt" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join(" ")}
      </article>`).join(""));
  }

  /* ---------- PAGE: contact ---------- */
  function renderContact() {
    const rows = [
      ["Email", SITE.email, real(SITE.email) ? `mailto:${SITE.email}` : ""],
      ["Phone", SITE.phone, SITE.phone ? `tel:${SITE.phone}` : ""],
      ["Location", SITE.location, ""],
      ["LinkedIn", SITE.links.linkedin, SITE.links.linkedin],
      ["GitHub", SITE.links.github, SITE.links.github],
    ].filter(([, v]) => real(v));
    $("#contactInfo").html(rows.map(([k, v, h]) => `
      <p class="mono muted">${k}</p>
      <p style="margin-bottom:14px;font-weight:600">${h ? `<a href="${esc(h)}" target="_blank" rel="noopener">${esc(v)}</a>` : esc(v)}</p>`).join("")
      || `<p>Add your email and links in <code>data.js</code>.</p>`);

    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      const name = $("#cName").val().trim(), email = $("#cEmail").val().trim(), msg = $("#cMsg").val().trim();
      const $m = $("#formMsg");
      if (!name || !/^\S+@\S+\.\S+$/.test(email) || msg.length < 5) { return $m.text("Please fill every field with a valid email.").css("color", "#d62828"); }
      if (SITE.contactFormEndpoint) {
        $.post(SITE.contactFormEndpoint, { name, email, message: msg })
          .done(() => $m.text("Sent! I'll get back to you soon.").css("color", "#1b8a3a"))
          .fail(() => $m.text("Couldn't send. Please email me directly.").css("color", "#d62828"));
      } else if (real(SITE.email)) {
        const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("Portfolio message from " + name)}&body=${encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")")}`;
        window.location.href = mailto;
        $m.text("Your email app should open with the message ready to send.").css("color", "#1b8a3a");
      } else { $m.text("Set SITE.email or SITE.contactFormEndpoint in data.js.").css("color", "#d62828"); }
    });
  }

  /* ---------- boot ---------- */
  initTheme();
  renderHeader();
  renderFooter();
  document.title = (page === "home" ? "" : PAGES.find((p) => p.id === page)?.label + " · ") + SITE.name;
  ({ home: renderHome, about: renderAbout, projects: renderProjects, certifications: renderCerts, research: renderResearch, contact: renderContact })[page]?.();
  $(".block, .section-title").addClass("reveal");
  revealAll();
});
