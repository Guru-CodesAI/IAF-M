// Vayu Gaurav Museum - Global Interactivity Controller
// Contains: Dynamic Navbar, Mobile Drawer, Eligibility Diagnostic Modal, Search Command Palette, and News/Gallery Filter handlers.

document.addEventListener("DOMContentLoaded", () => {
    // Initialize UI components
    initNavbarScroll();
    initMobileDrawer();
    initEligibilityModal();
    initSearchPalette();
    initArchivesGallery();
    initNewsFilters();
    initScrollReveal();
});

// 1. Dynamic Navbar Scroll Transition
function initNavbarScroll() {
    const navs = document.querySelectorAll("nav");
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY > 40;
        navs.forEach(nav => {
            if (scrolled) {
                nav.classList.add("shadow-2xl", "bg-black/90", "border-b", "border-white/10");
                nav.classList.remove("bg-glass-white");
            } else {
                nav.classList.remove("shadow-2xl", "bg-black/90", "border-b", "border-white/10");
                nav.classList.add("bg-glass-white");
            }
        });
    });
}

// 2. Mobile Menu Drawer
function initMobileDrawer() {
    // Create drawer DOM element
    const drawer = document.createElement("div");
    drawer.id = "mobile-nav-drawer";
    drawer.className = "fixed inset-0 z-[120] bg-background/98 backdrop-blur-2xl flex flex-col p-8 opacity-0 pointer-events-none transition-opacity duration-300";
    drawer.innerHTML = `
        <div class="flex justify-between items-center mb-12">
            <span class="font-display-hero-mobile text-2xl font-extrabold tracking-tighter text-saffron-accent">IAF MUSEUM</span>
            <button id="mobile-drawer-close" class="text-on-surface hover:text-saffron-accent transition-colors" aria-label="Close menu">
                <span class="material-symbols-outlined text-3xl">close</span>
            </button>
        </div>
        <ul class="flex flex-col gap-6 font-label-caps text-lg tracking-wider">
            <li><a class="text-on-surface hover:text-saffron-accent transition-colors block py-2 border-b border-white/5" href="index.html#fleet">Aircraft</a></li>
            <li><a class="text-on-surface hover:text-saffron-accent transition-colors block py-2 border-b border-white/5" href="history.html">History</a></li>
            <li><a class="text-on-surface hover:text-saffron-accent transition-colors block py-2 border-b border-white/5" href="careers.html">Careers</a></li>
            <li><a class="text-on-surface hover:text-saffron-accent transition-colors block py-2 border-b border-white/5" href="news.html">News</a></li>
            <li><a class="text-on-surface hover:text-saffron-accent transition-colors block py-2 border-b border-white/5" href="archives.html">Archives</a></li>
        </ul>
        <div class="mt-auto flex flex-col gap-4">
            <button id="mobile-drawer-search" class="w-full border border-white/10 text-on-surface font-label-caps text-label-caps py-4 rounded text-center block font-bold flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[18px]">search</span> Search Archives
            </button>
            <button id="mobile-drawer-join" class="w-full bg-saffron-accent text-deep-charcoal font-label-caps text-label-caps py-4 rounded text-center block font-bold">
                Join Portal
            </button>
        </div>
    `;
    document.body.appendChild(drawer);

    // Bind triggers — any nav button whose icon text is "menu"
    document.querySelectorAll("nav button").forEach(btn => {
        const icon = btn.querySelector(".material-symbols-outlined");
        if (icon && icon.textContent.trim() === "menu") {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                openDrawer();
            });
        }
    });
    // Also bind standalone span.material-symbols-outlined with text "menu" inside nav
    document.querySelectorAll("nav .material-symbols-outlined").forEach(icon => {
        if (icon.textContent.trim() === "menu") {
            icon.style.cursor = "pointer";
            icon.addEventListener("click", (e) => {
                e.preventDefault();
                openDrawer();
            });
        }
    });

    const closeBtn = document.getElementById("mobile-drawer-close");
    closeBtn.addEventListener("click", closeDrawer);

    const drawerLinks = drawer.querySelectorAll("a");
    drawerLinks.forEach(link => link.addEventListener("click", closeDrawer));

    const drawerSearch = document.getElementById("mobile-drawer-search");
    drawerSearch.addEventListener("click", () => {
        closeDrawer();
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
            document.getElementById("search-palette-modal").classList.remove("opacity-0", "pointer-events-none");
            setTimeout(() => searchInput.focus(), 150);
        }
    });

    const drawerJoin = document.getElementById("mobile-drawer-join");
    drawerJoin.addEventListener("click", () => {
        closeDrawer();
        openEligibilityModal();
    });

    function openDrawer() {
        drawer.classList.remove("opacity-0", "pointer-events-none");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        drawer.classList.add("opacity-0", "pointer-events-none");
        document.body.style.overflow = "";
    }
}

// 3. Commissioned Officer Eligibility Diagnostic Modal
function initEligibilityModal() {
    // Create modal DOM element
    const modal = document.createElement("div");
    modal.id = "join-portal-modal";
    modal.className = "fixed inset-0 z-[130] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300";
    modal.innerHTML = `
        <div class="relative w-full max-w-lg bg-surface-container border border-saffron-accent/20 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
            <button id="join-modal-close" class="absolute top-4 right-4 text-on-surface hover:text-saffron-accent transition-colors" aria-label="Close portal">
                <span class="material-symbols-outlined text-2xl">close</span>
            </button>
            
            <div class="text-center">
                <span class="font-label-caps text-[10px] text-saffron-accent tracking-widest uppercase block mb-1">Commissioned Officer Selection</span>
                <h3 class="font-headline-md text-2xl font-bold text-on-surface">IAF Eligibility Diagnostic</h3>
                <p class="font-body-sm text-xs text-secondary mt-1">Evaluate your pathways into the Indian Air Force Commissioned ranks.</p>
            </div>

            <form id="eligibility-form" class="flex flex-col gap-4">
                <div>
                    <label class="block font-label-caps text-[10px] text-secondary mb-1">FULL NAME</label>
                    <input type="text" id="el-name" required placeholder="Aspirant Name" class="w-full bg-surface-container-low border border-white/10 rounded px-4 py-2.5 text-on-surface focus:border-saffron-accent outline-none font-body-sm"/>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block font-label-caps text-[10px] text-secondary mb-1">AGE (YEARS)</label>
                        <input type="number" id="el-age" required min="10" max="50" step="0.1" placeholder="e.g. 18.5" class="w-full bg-surface-container-low border border-white/10 rounded px-4 py-2.5 text-on-surface focus:border-saffron-accent outline-none font-body-sm"/>
                    </div>
                    <div>
                        <label class="block font-label-caps text-[10px] text-secondary mb-1">QUALIFICATION</label>
                        <select id="el-edu" class="w-full bg-surface-container-low border border-white/10 rounded px-4 py-2.5 text-on-surface focus:border-saffron-accent outline-none font-body-sm">
                            <option value="12th">10+2 (Schooling)</option>
                            <option value="grad-tech">Graduation (BE / B.Tech)</option>
                            <option value="grad-nontech">Graduation (B.Sc / B.Com / BA)</option>
                            <option value="postgrad">Post Graduation (M.Sc / MBA)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block font-label-caps text-[10px] text-secondary mb-1">BRANCH INTEREST</label>
                    <div class="flex gap-4 mt-2">
                        <label class="flex items-center gap-2 cursor-pointer font-body-sm text-sm">
                            <input type="radio" name="el-branch" value="flying" checked class="text-saffron-accent focus:ring-0 bg-transparent border-white/20"/>
                            Flying
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer font-body-sm text-sm">
                            <input type="radio" name="el-branch" value="technical" class="text-saffron-accent focus:ring-0 bg-transparent border-white/20"/>
                            Technical
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer font-body-sm text-sm">
                            <input type="radio" name="el-branch" value="ground" class="text-saffron-accent focus:ring-0 bg-transparent border-white/20"/>
                            Ground Duty
                        </label>
                    </div>
                </div>
                <button type="submit" class="w-full bg-saffron-accent text-deep-charcoal font-label-caps text-label-caps py-3 rounded-full hover:brightness-110 transition-all font-bold mt-2">
                    Evaluate Entry Pathways
                </button>
            </form>

            <!-- Eligibility Result Screen -->
            <div id="eligibility-result" class="hidden flex flex-col gap-4 border border-saffron-accent/20 bg-saffron-accent/5 p-4 rounded-xl">
                <h4 class="font-label-caps text-[10px] text-saffron-accent tracking-widest uppercase">DIAGNOSTIC REPORT</h4>
                <div id="result-status" class="font-headline-md text-lg font-bold text-on-surface"></div>
                <p id="result-text" class="font-body-sm text-sm text-secondary"></p>
                <div class="flex gap-2 mt-2">
                    <button id="result-reset" class="flex-1 border border-white/10 hover:border-saffron-accent/30 text-on-surface font-label-caps text-[10px] py-2 rounded transition-all">RE-EVALUATE</button>
                    <a href="https://indianairforce.nic.in" target="_blank" rel="noopener noreferrer" class="flex-1 bg-saffron-accent text-deep-charcoal font-label-caps text-[10px] py-2 rounded text-center font-bold flex items-center justify-center gap-1">OFFICIAL IAF SITE ↗</a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Bind triggers: any anchor/button with text "Join Portal"
    document.addEventListener("click", (e) => {
        const target = e.target.closest("a, button");
        if (target && target.textContent.trim().toLowerCase() === "join portal") {
            e.preventDefault();
            openEligibilityModal();
        }
    });

    const closeBtn = document.getElementById("join-modal-close");
    closeBtn.addEventListener("click", closeEligibilityModal);

    const form = document.getElementById("eligibility-form");
    const resultDiv = document.getElementById("eligibility-result");
    const statusText = document.getElementById("result-status");
    const reportText = document.getElementById("result-text");
    const resetBtn = document.getElementById("result-reset");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const age = parseFloat(document.getElementById("el-age").value);
        const edu = document.getElementById("el-edu").value;
        const branch = document.querySelector('input[name="el-branch"]:checked').value;
        const name = document.getElementById("el-name").value;

        let status = "";
        let text = "";

        if (age < 16.5) {
            status = "NOT YET ELIGIBLE";
            text = `Hello ${name}. You are currently ${age} years old. The minimum age for entry is 16.5 years (NDA). Focus on your studies and prepare for the UPSC NDA written examination!`;
        } else if (age >= 16.5 && age < 19.5) {
            if (edu === "12th") {
                status = "NDA ELIGIBLE";
                text = `Congratulations ${name}! At ${age} years, you are eligible to apply for the National Defence Academy (NDA) entry. Ensure you have Physics & Mathematics in 10+2 for the Flying Branch.`;
            } else {
                status = "NDA ELIGIBLE (AGE LIMIT)";
                text = `Hello ${name}. You are eligible for NDA by age (${age} years), but NDA typically requires entering immediately after 10+2. If you are pursuing graduation, prepare for CDSE/AFCAT.`;
            }
        } else if (age >= 19.5 && age <= 24) {
            if (edu.startsWith("grad") || edu === "postgrad") {
                if (branch === "flying") {
                    status = "CDSE & AFCAT ELIGIBLE";
                    text = `Congratulations ${name}! You are eligible for the Flying Branch through CDSE (UPSC) or AFCAT (IAF). Ensure you meet the physical and visual standards (6/6 vision, no hypermetropia).`;
                } else if (branch === "technical" && edu === "grad-tech") {
                    status = "AFCAT TECHNICAL ELIGIBLE";
                    text = `Congratulations ${name}! With a B.E./B.Tech degree, you are highly eligible for the Aeronautical Engineering (Mechanical/Electronics) branches via AFCAT.`;
                } else {
                    status = "AFCAT GROUND DUTY ELIGIBLE";
                    text = `Congratulations ${name}! You are eligible for Ground Duty (Administration, Logistics, Accounts) branches via AFCAT.`;
                }
            } else {
                status = "GRADUATION REQUIRED";
                text = `Hello ${name}. At ${age} years, entry requires a completed or ongoing Bachelor's degree (CDSE/AFCAT). Finish your degree to qualify for Commissioned Rank entries.`;
            }
        } else if (age > 24 && age <= 26) {
            if (branch === "flying") {
                status = "FLYING AGE LIMIT EXCEEDED";
                text = `Hello ${name}. The age limit for the Flying Branch is 24 years. However, you remain eligible for Ground Duty (Technical or Non-Technical) branches up to 26 years via AFCAT.`;
            } else if (edu.startsWith("grad") || edu === "postgrad") {
                status = "AFCAT GROUND DUTY ELIGIBLE";
                text = `Congratulations ${name}! You are within the age limit (up to 26 years) for Ground Duty (Technical/Non-Technical) branches via AFCAT.`;
            } else {
                status = "GRADUATION REQUIRED";
                text = `Hello ${name}. Graduation is mandatory for entries at this age range.`;
            }
        } else {
            status = "AGE LIMIT EXCEEDED";
            text = `Hello ${name}. At ${age} years, you exceed the maximum age limit for direct entry as a Commissioned Officer (26 years). Check official IAF channels for civilian or specialist postings.`;
        }

        form.classList.add("hidden");
        resultDiv.classList.remove("hidden");
        statusText.textContent = status;
        reportText.textContent = text;
    });

    resetBtn.addEventListener("click", () => {
        resultDiv.classList.add("hidden");
        form.classList.remove("hidden");
        form.reset();
    });
}

function openEligibilityModal() {
    const modal = document.getElementById("join-portal-modal");
    modal.classList.remove("opacity-0", "pointer-events-none");
    document.body.style.overflow = "hidden";
}

function closeEligibilityModal() {
    const modal = document.getElementById("join-portal-modal");
    modal.classList.add("opacity-0", "pointer-events-none");
    document.body.style.overflow = "";
    // Reset state
    document.getElementById("eligibility-result").classList.add("hidden");
    document.getElementById("eligibility-form").classList.remove("hidden");
    document.getElementById("eligibility-form").reset();
}

// 4. Global Search Palette and Keyboard Navigation
const SEARCH_INDEX = [
    { title: "Sukhoi Su-30MKI", url: "su-30mki.html", desc: "Twinjet multirole air superiority fighter specifications, engine vectoring, systems bento.", keys: "su-30mki sukhoi fighter engine speed mach russian specification wings" },
    { title: "Dassault Rafale", url: "rafale.html", desc: "Omnirole delta-wing combat jet, technical specs, cockpit simulator details.", keys: "rafale dassault fighter french meteor mica specs radar simulator" },
    { title: "Dassault Mirage 2000", url: "mirage-2000.html", desc: "Multirole combat aircraft, legacy of strategic air strikes and technical specs.", keys: "mirage 2000 dassault fighter cargo delta wing kargil legacy" },
    { title: "Careers Center", url: "careers.html", desc: "Officer entry pathways (NDA, CDSE, AFCAT) and eligibility requirements.", keys: "careers nda cdse afcat join jobs exam training syllabus age eligibility selection pilot flying ground technical" },
    { title: "Historical Timeline", url: "history.html", desc: "Chronological milestones of the IAF from 1932 foundations to modern operations.", keys: "history timeline legacy wars heritage origins 1932 kargil post-independence display" },
    { title: "Multimedia Archives", url: "archives.html", desc: "Curated historical images, aerobatic formations, and operations videos.", keys: "archives gallery video photos images spitfire tejas globemaster surya kiran apache" },
    { title: "News & Dispatches", url: "news.html", desc: "Latest dispatches on fleet modernization, exercises, and indigenous technologies.", keys: "news updates trials tejas tarang shakti uttam radar aesa drdo exercises bulletins" },
    { title: "About the Museum", url: "about.html", desc: "Our mission, curators info, guidelines, and feedback contact details.", keys: "about curators contact admin guidelines legal disclaimer emblems act info" },
    { title: "LCA Tejas Mark 1A", url: "tejas.html", desc: "Indigenous Light Combat Aircraft high-altitude trials and induction news.", keys: "tejas lca indigenous light combat hal trials high-altitude aesa" },
    { title: "Exercise Tarang Shakti", url: "tarang-shakti.html", desc: "Strategic multinational refueling and combat drills details.", keys: "tarang shakti exercise joint operations refueling combat air-to-air" },
    { title: "Uttam AESA Radar", url: "uttam-aesa.html", desc: "DRDO's indigenous Active Electronically Scanned Array fire-control radar for Tejas Mk1A.", keys: "uttam aesa radar drdo lrde indigenous active electronically scanned array tejas fire control" }
];

function initSearchPalette() {
    // 4.1 Append Search Icon to Navbar Trailing Actions dynamically
    // Only target the trailing actions container (gap-4), not the nav links (gap-8)
    const nav = document.querySelector("nav");
    if (!nav || nav.querySelector("#search-trigger")) return;

    // Find the last flex container in nav (trailing actions)
    const navContainers = nav.querySelectorAll(".flex.items-center.gap-4");
    const trailingActions = navContainers[navContainers.length - 1];
    if (!trailingActions) return;

    const trigger = document.createElement("span");
    trigger.id = "search-trigger";
    trigger.className = "material-symbols-outlined text-on-surface hover:text-saffron-accent transition-colors cursor-pointer select-none text-[22px]";
    trigger.textContent = "search";
    trigger.title = "Search Archives (/)";
    trailingActions.insertBefore(trigger, trailingActions.firstChild);

    // 4.2 Create Search Modal DOM element
    const modal = document.createElement("div");
    modal.id = "search-palette-modal";
    modal.className = "fixed inset-0 z-[150] bg-background/95 backdrop-blur-2xl flex items-start justify-center p-4 pt-[15vh] opacity-0 pointer-events-none transition-opacity duration-300";
    modal.innerHTML = `
        <div class="w-full max-w-2xl bg-surface-container border border-saffron-accent/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                <span class="material-symbols-outlined text-saffron-accent text-2xl">search</span>
                <input type="text" id="search-input" placeholder="Search aircraft, operations, timeline, dispatches..." class="flex-grow bg-transparent text-on-surface outline-none border-none font-body-lg text-lg placeholder-secondary/50"/>
                <span class="font-label-caps text-[9px] bg-white/10 text-secondary px-2 py-1 rounded">ESC</span>
            </div>
            <div id="search-results" class="max-h-[50vh] overflow-y-auto p-4 flex flex-col gap-2">
                <p class="text-secondary/60 text-xs font-label-caps tracking-widest text-center py-8">Type to begin searching the digital museum archives...</p>
            </div>
            <div class="bg-surface-container-low px-6 py-3 border-t border-white/5 flex justify-between items-center text-secondary/60 text-[10px] font-label-caps">
                <span>↑↓ to navigate</span>
                <span>Enter to select</span>
                <span>ESC to close</span>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById("search-input");
    const resultsContainer = document.getElementById("search-results");

    // 4.3 Trigger binding
    document.addEventListener("click", (e) => {
        if (e.target.closest("#search-trigger")) {
            openSearch();
        }
    });

    // Keyboard trigger: '/' opens, 'Esc' closes
    document.addEventListener("keydown", (e) => {
        if (e.key === "/" && document.activeElement !== input) {
            e.preventDefault();
            openSearch();
        }
        if (e.key === "Escape") {
            closeSearch();
        }
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeSearch();
        }
    });

    function openSearch() {
        modal.classList.remove("opacity-0", "pointer-events-none");
        document.body.style.overflow = "hidden";
        setTimeout(() => input.focus(), 100);
    }

    function closeSearch() {
        modal.classList.add("opacity-0", "pointer-events-none");
        document.body.style.overflow = "";
        input.value = "";
        resultsContainer.innerHTML = `<p class="text-secondary/60 text-xs font-label-caps tracking-widest text-center py-8">Type to begin searching the digital museum archives...</p>`;
    }

    // 4.4 Search Matching & Render
    let activeIndex = -1;

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        activeIndex = -1;

        if (!query) {
            resultsContainer.innerHTML = `<p class="text-secondary/60 text-xs font-label-caps tracking-widest text-center py-8">Type to begin searching the digital museum archives...</p>`;
            return;
        }

        const matches = SEARCH_INDEX.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query) || 
            item.keys.includes(query)
        );

        if (matches.length === 0) {
            resultsContainer.innerHTML = `<p class="text-secondary/60 text-xs font-label-caps tracking-widest text-center py-8">No matching dispatches found.</p>`;
            return;
        }

        resultsContainer.innerHTML = matches.map((item, idx) => `
            <a href="${item.url}" class="search-result-item flex flex-col gap-1 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-saffron-accent/5 hover:border-saffron-accent/30 transition-all group" data-index="${idx}">
                <div class="flex justify-between items-center">
                    <span class="font-headline-md text-sm font-bold text-on-surface group-hover:text-saffron-accent transition-colors">${item.title}</span>
                    <span class="material-symbols-outlined text-xs text-secondary/40 group-hover:text-saffron-accent transition-colors">arrow_forward</span>
                </div>
                <p class="font-body-sm text-xs text-secondary line-clamp-1">${item.desc}</p>
            </a>
        `).join("");
    });

    // Keyboard result selection
    input.addEventListener("keydown", (e) => {
        const items = resultsContainer.querySelectorAll(".search-result-item");
        if (items.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % items.length;
            highlightItem(items);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            highlightItem(items);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < items.length) {
                items[activeIndex].click();
            } else if (items.length > 0) {
                items[0].click();
            }
        }
    });

    function highlightItem(items) {
        items.forEach((item, idx) => {
            if (idx === activeIndex) {
                item.classList.add("bg-saffron-accent/5", "border-saffron-accent/30");
                item.scrollIntoView({ block: "nearest" });
            } else {
                item.classList.remove("bg-saffron-accent/5", "border-saffron-accent/30");
            }
        });
    }
}

// 5. Multimedia Archives Gallery filter & Video overlay
function initArchivesGallery() {
    // 5.1 Filters for Archives
    const filterButtons = document.querySelectorAll("[data-filter]");
    const galleryItems = document.querySelectorAll("[data-category]");

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Remove active styling from all buttons
                filterButtons.forEach(b => {
                    b.classList.remove("bg-saffron-accent/10", "border-saffron-accent", "text-saffron-accent");
                    b.classList.add("bg-transparent", "border-surface-variant", "text-on-surface");
                });

                // Add active styling
                btn.classList.add("bg-saffron-accent/10", "border-saffron-accent", "text-saffron-accent");
                btn.classList.remove("bg-transparent", "border-surface-variant", "text-on-surface");

                const filter = btn.getAttribute("data-filter");

                galleryItems.forEach(item => {
                    if (filter === "all" || item.getAttribute("data-category") === filter) {
                        item.classList.remove("hidden");
                        item.style.display = ""; // Reset style override
                        // Trigger scroll animation check
                        item.classList.add("visible");
                    } else {
                        item.classList.add("hidden");
                        item.style.display = "none"; // Direct display control
                    }
                });
            });
        });
    }

    // 5.2 Video Lightbox Modal
    const videoCards = document.querySelectorAll("[data-video-src]");
    if (videoCards.length > 0) {
        // Create video modal element
        const videoModal = document.createElement("div");
        videoModal.id = "video-player-modal";
        videoModal.className = "fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300";
        videoModal.innerHTML = `
            <button id="video-modal-close" class="absolute top-6 right-6 text-on-surface hover:text-saffron-accent transition-colors" aria-label="Close player">
                <span class="material-symbols-outlined text-3xl">close</span>
            </button>
            <div class="w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl relative">
                <video id="modal-video-element" controls class="w-full h-full object-contain">
                    <source src="" type="video/mp4"/>
                </video>
            </div>
        `;
        document.body.appendChild(videoModal);

        const videoEl = document.getElementById("modal-video-element");
        const closeBtn = document.getElementById("video-modal-close");

        videoCards.forEach(card => {
            card.addEventListener("click", () => {
                const src = card.getAttribute("data-video-src");
                if (src) {
                    videoEl.src = src;
                    videoEl.load();
                    videoModal.classList.remove("opacity-0", "pointer-events-none");
                    document.body.style.overflow = "hidden";
                    videoEl.play().catch(e => console.log("Autoplay blocked or aborted:", e));
                }
            });
        });

        closeBtn.addEventListener("click", closeVideoModal);
        videoModal.addEventListener("click", (e) => {
            if (e.target === videoModal) closeVideoModal();
        });

        function closeVideoModal() {
            videoModal.classList.add("opacity-0", "pointer-events-none");
            document.body.style.overflow = "";
            videoEl.pause();
            videoEl.src = "";
        }
    }
}

// 6. News filter dispatches
function initNewsFilters() {
    const topicRibbon = document.querySelector(".py-stack-lg");
    if (!topicRibbon) return;

    const filterButtons = topicRibbon.querySelectorAll("button");
    // Select all news card anchors inside the news grid section
    const newsGrid = document.querySelector(".py-section-gap .grid");
    const newsCards = newsGrid
        ? newsGrid.querySelectorAll("a[href], article")
        : document.querySelectorAll("a[href='tejas.html'], a[href='tarang-shakti.html'], a[href='uttam-aesa.html']");

    if (filterButtons.length > 0 && newsCards.length > 0) {
        // Tag news cards with categories programmatically
        newsCards.forEach((card, idx) => {
            if (card.hasAttribute("data-news-cat")) return;
            
            const text = card.textContent.toLowerCase();
            const cats = [];
            if (text.includes("acquisit") || text.includes("moderniz") || text.includes("induct") || text.includes("upgrade")) cats.push("acquisitions");
            if (text.includes("exercise") || text.includes("shakti") || text.includes("maneuver")) cats.push("exercises");
            if (text.includes("indigenous") || text.includes("tejas") || text.includes("uttam") || text.includes("radar") || text.includes("drdo")) cats.push("indigenous-tech");
            if (text.includes("global") || text.includes("partnership") || text.includes("multilateral") || text.includes("joint")) cats.push("global-partnerships");
            
            if (cats.length === 0) {
                if (idx % 4 === 0) cats.push("acquisitions");
                else if (idx % 4 === 1) cats.push("exercises");
                else if (idx % 4 === 2) cats.push("indigenous-tech");
                else cats.push("global-partnerships");
            }
            card.setAttribute("data-news-cat", cats.join(","));
        });

        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const isActive = btn.classList.contains("border-saffron-accent");
                
                // Reset all buttons
                filterButtons.forEach(b => {
                    b.classList.remove("border-saffron-accent", "text-saffron-accent");
                    b.classList.add("border-surface-variant", "text-on-surface");
                });

                if (isActive) {
                    // Show all if clicking the active one again
                    newsCards.forEach(card => {
                        card.classList.remove("hidden");
                        card.style.display = "";
                    });
                } else {
                    btn.classList.add("border-saffron-accent", "text-saffron-accent");
                    btn.classList.remove("border-surface-variant", "text-on-surface");
                    
                    const text = btn.textContent.trim().toLowerCase();
                    let targetCategory = "";
                    if (text.includes("acquisitions")) targetCategory = "acquisitions";
                    if (text.includes("exercises")) targetCategory = "exercises";
                    if (text.includes("indigenous")) targetCategory = "indigenous-tech";
                    if (text.includes("global")) targetCategory = "global-partnerships";

                    newsCards.forEach(card => {
                        const cats = card.getAttribute("data-news-cat") || "";
                        if (cats.includes(targetCategory)) {
                            card.classList.remove("hidden");
                            card.style.display = ""; // Reset style override
                        } else {
                            card.classList.add("hidden");
                            card.style.display = "none"; // Direct display control
                        }
                    });
                }
            });
        });
    }
}

// 7. Scroll Reveal Utility
function initScrollReveal() {
    const reveals = document.querySelectorAll(".scroll-reveal");
    if (reveals.length === 0) return;

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.9;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < triggerBottom) {
                reveal.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkReveal);
    checkReveal(); // Trigger once on load
}
