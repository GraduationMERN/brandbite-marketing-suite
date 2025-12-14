import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

import menuBrowsing from "@/assets/screens/cart.png";
import orderTracking from "@/assets/screens/order-tracking.png";
import loyaltyRewards from "@/assets/screens/loyalty-rewards.png";
import pushNotifications from "@/assets/screens/push-notifications.png";
import reviewsRatings from "@/assets/screens/admin-dashboard.png";
import whiteLabel from "@/assets/screens/white-label.png";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "Menu & Cart",
    description: "Customers browse your beautifully designed menu and easily add items to their cart. Intuitive categories and search make finding favorites effortless.",
    image: menuBrowsing,
  },
  {
    id: 2,
    title: "Order Tracking",
    description: "Real-time order tracking keeps customers informed. From confirmed to preparing to ready—every status update is visible instantly.",
    image: orderTracking,
  },
  {
    id: 3,
    title: "Loyalty Points",
    description: "Reward your loyal customers with points on every purchase. Tiered rewards and redeemable offers keep them coming back.",
    image: loyaltyRewards,
  },
  {
    id: 4,
    title: "Push Notifications",
    description: "Stay connected with service worker-powered push notifications. Alert customers about order updates, promotions, and rewards—even when the site is closed.",
    image: pushNotifications,
  },
  {
    id: 5,
    title: "Admin Dashboard",
    description: "Powerful admin dashboard to manage orders, view sales analytics, handle customer reviews, and oversee all restaurant operations from one place.",
    image: reviewsRatings,
  },
  {
    id: 6,
    title: "White-Label",
    description: "Make it truly yours. Customize colors, upload your logo, and set restaurant imagery for a fully branded experience.",
    image: whiteLabel,
  },
];

const FeatureWalkthrough = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
        gsap.from(stepsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(tabletRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleStepChange = (index: number) => {
    if (index === activeStep) return;

    // Animate out current content
    gsap.to([imageRef.current, descRef.current], {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveStep(index);
        // Animate in new content
        gsap.fromTo(
          [imageRef.current, descRef.current],
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", stagger: 0.1 }
        );
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      id="tablet-section"
      className="relative py-20 md:py-32 bg-card"
    >
      <div ref={contentRef} className="container px-4">
        {/* Section Title */}
        <h2 ref={titleRef} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
          How <span className="text-gradient">BrandBite</span> Works
        </h2>

        {/* Steps Navigation */}
        <div ref={stepsRef} className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepChange(index)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm md:text-base",
                activeStep === index
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              <span
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  activeStep === index
                    ? "bg-primary-foreground/20"
                    : "bg-muted"
                )}
              >
                {step.id}
              </span>
              <span className="hidden md:inline">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Tablet Mockup */}
        <div  className="max-w-3xl mx-auto">
          <div ref={tabletRef} className="tablet-frame">
            <div className="tablet-screen aspect-[4/3]">
              <img
                ref={imageRef}
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mt-10 text-center">
          <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">
            {steps[activeStep].title}
          </h3>
          <p
            ref={descRef}
            className="text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            {steps[activeStep].description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureWalkthrough;
