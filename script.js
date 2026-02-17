// ===============================
// Custom scroll indicator logic
// ===============================
function updateScrollIndicator() {
	const scrollFrames = document.querySelectorAll(".scroll-frame");

	scrollFrames.forEach((frame) => {
		const wrapper = frame.parentElement;
		const scrollHint = wrapper.querySelector(".scroll-hint");
		if (!scrollHint) return;

		const railHeight = wrapper.clientHeight;
		const hintHeight = scrollHint.offsetHeight;

		// Check if there is enough content to scroll
		if (frame.scrollHeight > frame.clientHeight) {
			// Calculate scroll percentage
			const scrollPercentage =
				frame.scrollTop / (frame.scrollHeight - frame.clientHeight);

			// Calculate new top position
			const newTop =
				scrollPercentage * (frame.clientHeight - scrollHint.offsetHeight);

			scrollHint.style.top = `${newTop}px`;
			scrollHint.style.display = "block";
		} else {
			scrollHint.style.display = "none";
		}
	});
}

// Scroll listeners
document.addEventListener("DOMContentLoaded", () => {
	const scrollFrames = document.querySelectorAll(".scroll-frame");

	scrollFrames.forEach((frame) => {
		const wrapper = frame.parentElement;
		const scrollHint = wrapper.querySelector(".scroll-hint");
		if (!scrollHint) return;

		let isDragging = false;
		let startY = 0;
		let startScrollTop = 0;

		const railHeight = () => wrapper.clientHeight;
		const hintHeight = () => scrollHint.offsetHeight;

		scrollHint.addEventListener("mousedown", (e) => {
			isDragging = true;
			startY = e.clientY;
			startScrollTop = frame.scrollTop;
			document.body.classList.add("is-dragging");
			e.preventDefault();
		});

		document.addEventListener("mousemove", (e) => {
			if (!isDragging) return;

			const deltaY = e.clientY - startY;
			const maxScroll = frame.scrollHeight - frame.clientHeight;

			const maxRail = railHeight() - hintHeight() - 40;

			const scrollDelta = (deltaY / maxRail) * maxScroll;

			frame.scrollTop = startScrollTop + scrollDelta;
		});

		document.addEventListener("mouseup", () => {
			isDragging = false;
			document.body.classList.remove("is-dragging");
		});

		// Keep indicator synced when user scrolls normally
		frame.addEventListener("scroll", updateScrollIndicator);
	});

	updateScrollIndicator();
});

// Update on resize (important for responsive)
window.addEventListener("resize", updateScrollIndicator);

// ===============================
// Intersection reveal animations
// ===============================
document.addEventListener("DOMContentLoaded", () => {
	const items = document.querySelectorAll(
		".point-row-container, .skills-cards-container",
	);

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.25 },
	);

	items.forEach((item) => observer.observe(item));
});

// ===============================
// Typewriter effect
// ===============================
document.addEventListener("DOMContentLoaded", () => {
	const elements = document.querySelectorAll(".typewriter");
	const speed = 100;

	function typeHTML(element, html, i = 0) {
		let isTag = false;
		let text = "";

		function typeChar() {
			if (i < html.length) {
				const char = html[i];

				if (char === "<") isTag = true;

				text += char;
				element.innerHTML = text;

				if (char === ">") isTag = false;

				i++;
				setTimeout(typeChar, speed);
			} else {
				element.classList.add("is-done");
			}
		}

		typeChar();
	}

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const el = entry.target;
					if (!el.dataset.started) {
						el.dataset.started = "true";
						const html = el.dataset.text;
						el.innerHTML = "";
						typeHTML(el, html);
					}
					obs.unobserve(el);
				}
			});
		},
		{ threshold: 0.5 },
	);

	elements.forEach((el) => observer.observe(el));
});

// Hamburger Animation

const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("active");
	navbar.classList.toggle("active");
});

/* Auto close when clicking a link */
document.querySelectorAll(".navbar a").forEach((link) => {
	link.addEventListener("click", () => {
		navbar.classList.remove("active");
		hamburger.classList.remove("active");
	});
});
