"use client";

import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    id: "t1",
    quote:
      "The job simulations at CodeNest were the single most important thing I did to break into tech. I walked into my Google interview having already shipped features in a codebase that looked exactly like theirs.",
    name: "Priya Nair",
    role: "Software Engineer @ Google",
    cohort: "Bootcamp '24",
    avatar: "PN",
    stars: 5,
  },
  {
    id: "t2",
    quote:
      "I went from a marketing manager with zero coding experience to a frontend engineer at a Series B startup in 14 weeks. The intensity of the bootcamp is real — and so are the results.",
    name: "Marcus Webb",
    role: "Frontend Engineer @ Linear",
    cohort: "Bootcamp '24",
    avatar: "MW",
    stars: 5,
  },
  {
    id: "t3",
    quote:
      "What sets CodeNest apart is the mentorship. My mentor was a Staff Engineer at Stripe. She reviewed my code like I was already on her team. That level of feedback is priceless.",
    name: "Yuki Tanaka",
    role: "Full-Stack Engineer @ Stripe",
    cohort: "Job Simulation",
    avatar: "YT",
    stars: 5,
  },
  {
    id: "t4",
    quote:
      "The on-demand courses are shockingly good. Dense, modern, and built by people who actually work in the industry. I went through the systems design track and got promoted within 6 months.",
    name: "Samuel Okafor",
    role: "Senior Engineer @ Meta",
    cohort: "On-Demand",
    avatar: "SO",
    stars: 5,
  },
  {
    id: "t5",
    quote:
      "I'd tried three other bootcamps. CodeNest was the first one that felt like actual professional training, not a tutorial factory. The curriculum is demanding in the best possible way.",
    name: "Camille Dubois",
    role: "Backend Engineer @ Vercel",
    cohort: "Bootcamp '23",
    avatar: "CD",
    stars: 5,
  },
  {
    id: "t6",
    quote:
      "Three months after completing the job simulation track, I had two competing offers. The simulation for Figma's design tool team was almost identical to my actual technical interview.",
    name: "Arjun Mehta",
    role: "Product Engineer @ Figma",
    cohort: "Job Simulation",
    avatar: "AM",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#5ed29c" aria-hidden="true">
          <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.5L6 8.885L2.91 10.5L3.5 7.07L1 4.635L4.455 4.13L6 1Z" />
        </svg>
      ))}
    </div>
  );
}

function AvatarInitials({ initials }: { initials: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-[#070b0a] flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #5ed29c 0%, #1de9b6 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default function TestimonialsSection() {
  const colRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = colRefs[0].current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split into 3 columns
  const col1 = [testimonials[0], testimonials[3]];
  const col2 = [testimonials[1], testimonials[4]];
  const col3 = [testimonials[2], testimonials[5]];

  const columns = [col1, col2, col3];

  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-32"
      aria-labelledby="testimonials-heading"
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
        style={{
          width: "600px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(94,210,156,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-accent font-bold uppercase tracking-widest mb-4"
            style={{ fontSize: "11px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Success Stories
          </p>
          <h2
            id="testimonials-heading"
            className="font-black uppercase text-white leading-none tracking-tight"
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
            }}
          >
            BUILT BY STUDENTS.
            <br />
            <span className="serif-italic text-accent" style={{ fontWeight: 400, fontSize: "clamp(30px, 4.2vw, 56px)" }}>
              Proven
            </span>{" "}
            by results.
          </h2>
        </div>

        {/* Masonry columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              ref={colRefs[colIdx]}
              className="flex flex-col gap-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.7s ease ${colIdx * 0.15}s, transform 0.7s ease ${colIdx * 0.15}s`,
              }}
            >
              {col.map((t) => (
                <article
                  key={t.id}
                  className="testimonial-card rounded-2xl p-7"
                >
                  <StarRating count={t.stars} />

                  <blockquote
                    className="text-white/70 leading-relaxed my-5"
                    style={{ fontSize: "14px", fontFamily: "'Inter', sans-serif" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                    <AvatarInitials initials={t.avatar} />
                    <div>
                      <p
                        className="text-white font-semibold"
                        style={{ fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="text-white/40"
                        style={{ fontSize: "11px", fontFamily: "'Inter', sans-serif" }}
                      >
                        {t.role}
                      </p>
                    </div>
                    <span
                      className="ml-auto text-accent/60 text-xs font-medium"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px" }}
                    >
                      {t.cohort}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
