import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingCart, CreditCard, MapPin, Gift, Star } from "lucide-react";

import cartImg from "@/assets/screens/cart.png";
import checkoutImg from "@/assets/screens/checkout.png";
import orderTrackingImg from "@/assets/screens/order-tracking.png";
import earnPointsImg from "@/assets/screens/earn-points.png";
import rateImg from "@/assets/screens/rate-experience.png";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    icon: ShoppingCart,
    headline: "Browse & Add to Cart",
    description: "Customers explore the menu and add items in seconds.",
    image: cartImg,
    accent: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 2,
    icon: CreditCard,
    headline: "Fast & Simple Checkout",
    description: "Multiple order types — normal or reward-based.",
    image: checkoutImg,
    accent: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 3,
    icon: MapPin,
    headline: "Track Orders in Real Time",
    description: "Customers follow every step of their order journey.",
    image: orderTrackingImg,
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 4,
    icon: Gift,
    headline: "Earn Loyalty Points",
    description: "Every order earns points redeemable for rewards.",
    image: earnPointsImg,
    accent: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 5,
    icon: Star,
    headline: "Rate the Experience",
    description: "Collect real feedback to improve your service.",
    image: rateImg,
    accent: "from-rose-500/20 to-red-500/20",
  },
];

const CustomerFlowStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const progressDotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const panels = panelsRef.current;

    if (!section || !container || !panels) return;

    const totalPanels = steps.length;
    const panelWidth = 100; // Each panel is 100vw

    const ctx = gsap.context(() => {
      // Main horizontal scroll animation
      const scrollTween = gsap.to(panels, {
        xPercent: -panelWidth * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (totalPanels - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut",
          },
          end: () => "+=" + (totalPanels - 1) * window.innerWidth,
        },
      });

      // Animate each panel's content
      steps.forEach((_, index) => {
        const panel = panels.children[index] as HTMLElement;
        const image = panel.querySelector(".panel-image");
        const content = panel.querySelector(".panel-content");
        const glow = panel.querySelector(".panel-glow");

        // Image parallax - moves slower than scroll
        gsap.fromTo(
          image,
          { x: 100, scale: 0.9, opacity: 0 },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 20%",
              scrub: 1,
            },
          }
        );

        // Content fade and slide
        gsap.fromTo(
          content,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 70%",
              end: "left 40%",
              scrub: 1,
            },
          }
        );

        // Background glow pulse
        gsap.fromTo(
          glow,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 60%",
              end: "left 30%",
              scrub: 1,
            },
          }
        );
      });

      // Progress dots animation
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + (totalPanels - 1) * window.innerWidth,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.round(progress * (totalPanels - 1));

          progressDotsRef.current.forEach((dot, index) => {
            if (dot) {
              if (index === activeIndex) {
                gsap.to(dot, { scale: 1.3, opacity: 1, duration: 0.2 });
                dot.classList.add("active");
              } else if (index < activeIndex) {
                gsap.to(dot, { scale: 1, opacity: 0.8, duration: 0.2 });
                dot.classList.remove("active");
              } else {
                gsap.to(dot, { scale: 1, opacity: 0.4, duration: 0.2 });
                dot.classList.remove("active");
              }
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="customer-flow"
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      {/* Section Header - Appears before scrolling */}
      <div className="absolute top-8 left-0 right-0 z-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          The <span className="text-gradient">Customer Journey</span>
        </h2>
        <p className="text-white/60 text-lg">Scroll to explore</p>
      </div>

      {/* Progress Indicator */}
      <div className="fixed-progress absolute top-1/2 right-8 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => (progressDotsRef.current[index] = el)}
            className="w-3 h-3 rounded-full bg-white/40 transition-all duration-300 cursor-pointer hover:bg-white/60"
            style={{ opacity: index === 0 ? 1 : 0.4 }}
          />
        ))}
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="h-screen w-full overflow-hidden">
        <div
          ref={panelsRef}
          className="flex h-full"
          style={{ width: `${steps.length * 100}vw` }}
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="panel relative w-screen h-screen flex items-center justify-center px-8 md:px-16 lg:px-24"
            >
              {/* Background Glow */}
              <div
                className={`panel-glow absolute inset-0 bg-gradient-radial ${step.accent} opacity-0`}
                style={{
                  background: `radial-gradient(ellipse at center, ${
                    index % 2 === 0 ? "rgba(251,146,60,0.1)" : "rgba(168,85,247,0.1)"
                  } 0%, transparent 70%)`,
                }}
              />

              {/* Content Grid */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto w-full">
                {/* Text Content */}
                <div
                  className={`panel-content ${
                    index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-white/40 font-display text-6xl font-bold">
                      {String(step.id).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {step.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-xl">
                    {step.description}
                  </p>

                  {/* Visual Accent Line */}
                  <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>

                {/* Image */}
                <div
                  className={`panel-image ${
                    index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative">
                    {/* Device Frame */}
                    <div className="relative mx-auto max-w-md lg:max-w-lg">
                      {/* Phone Frame */}
                      <div className="relative rounded-[3rem] p-3 bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-2xl">
                        {/* Screen */}
                        <div className="rounded-[2.5rem] overflow-hidden bg-zinc-900 aspect-[9/16]">
                          <img
                            src={step.image}
                            alt={step.headline}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Notch */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
                      </div>

                      {/* Floating Glow Behind Device */}
                      <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 blur-3xl -z-10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Divider Line */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:hidden">
        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => {
              if (!progressDotsRef.current[index]) {
                progressDotsRef.current[index] = el;
              }
            }}
            className="w-2 h-2 rounded-full bg-white/40 transition-all duration-300"
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:flex items-center gap-2 text-white/40">
        <span className="text-sm">Scroll</span>
        <svg
          className="w-5 h-5 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </section>
  );
};

export default CustomerFlowStory;
