import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { cn } from "@/lib/utils";
import { User, Shield, ChefHat, CreditCard } from "lucide-react";

import roleAdmin from "@/assets/screens/role-admin.png";
import roleCustomer from "@/assets/screens/role-customer.png";
import roleKitchen from "@/assets/screens/role-kitchen.png";
import roleCashier from "@/assets/screens/role-cashier.png";

gsap.registerPlugin(ScrollTrigger, Flip);

const roles = [
  {
    id: "customer",
    name: "Customer",
    icon: User,
    position: "left",
    image: roleCustomer,
    src: "https://brandbite-demo.vercel.app/",
    description: [
      "Browse menu & add to cart",
      "Place normal or reward orders",
      "Track orders in real time",
      "Earn and redeem loyalty points",
      "Receive push notifications",
      "Leave and view reviews",
    ],
  },
  {
    id: "admin",
    name: "Admin",
    icon: Shield,
    position: "left",
    image: roleAdmin,
    src: "https://brandbite-demo.vercel.app/admin",
    description: [
      "View daily sales, customers, reviews",
      "Track orders & payments",
      "Manage menu items & categories",
      "Manage users & roles",
      "Customize branding (white-label)",
      "POV mode for other roles",
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: ChefHat,
    position: "right",
    image: roleKitchen,
    src: "https://brandbite-demo.vercel.app/kitchen",
    description: [
      "Receive confirmed orders only",
      "View order details & items",
      "Update status to preparing",
      "Mark orders as ready",
      "Timer for order management",
      "Streamlined kitchen workflow",
    ],
  },
  {
    id: "cashier",
    name: "Cashier",
    icon: CreditCard,
    position: "right",
    image: roleCashier,
    src: "https://brandbite-demo.vercel.app/cashier",
    description: [
      "Receive all incoming orders",
      "Create direct orders via menu",
      "Process payments & receipts",
      "Confirm or cancel orders",
      "Handle reward redemptions",
      "Quick action interface",
    ],
  },
];

const RoleBasedDemo = () => {
  const [activeRole, setActiveRole] = useState("customer");
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const activeRoleData = roles.find((r) => r.id === activeRole)!;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Flip animation from tablet to desktop
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(desktopRef.current, {
            scale: 0.7,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
          gsap.from(titleRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRoleChange = (roleId: string) => {
    if (roleId === activeRole) return;

    gsap.to(screenRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveRole(roleId);
        gsap.fromTo(
          screenRef.current,
          { opacity: 0, scale: 1.02 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  };

  const leftRoles = roles.filter((r) => r.position === "left");
  const rightRoles = roles.filter((r) => r.position === "right");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-dark-gradient overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 px-4">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-primary-foreground"
        >
          One System, <span className="text-primary">Four Perspectives</span>
        </h2>

        {/* Desktop Demo Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left Role Selectors */}
          <div className="flex lg:flex-col gap-4 order-2 lg:order-1">
            {leftRoles.map((role) => (
              <RoleSelector
                key={role.id}
                role={role}
                isActive={activeRole === role.id}
                onClick={() => handleRoleChange(role.id)}
              />
            ))}
          </div>

          {/* Desktop Mockup */}
          <div ref={desktopRef} className="order-1 hidden lg:block  lg:order-2 w-full max-w-6xl ">
            {activeRole == "customer" ? (
              <div className="mobile-frame">
                <div ref={screenRef} className="mobile-screen">
                  <iframe
                    key={activeRoleData.id}
                    src={activeRoleData.src}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="desktop-frame">
                  <div ref={screenRef} className="desktop-screen aspect-video">
                    <iframe key={activeRoleData.id} src={activeRoleData.src} className={`w-full h-full`}></iframe>
                  </div>
                </div>
                <div className="desktop-stand" />
              </div>
            )}
          </div>
          
          <div ref={desktopRef} className="order-1 block lg:hidden  lg:order-2 w-full max-w-5xl ">
            <div className="mobile-frame">
              <div ref={screenRef} className="mobile-screen">
                <iframe
                  key={activeRoleData.id}
                  src={activeRoleData.src}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Right Role Selectors */}
          <div className="flex lg:flex-col gap-4 order-3">
            {rightRoles.map((role) => (
              <RoleSelector
                key={role.id}
                role={role}
                isActive={activeRole === role.id}
                onClick={() => handleRoleChange(role.id)}
              />
            ))}
          </div>
        </div>

        {/* Role Description */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <h3 className="font-display text-2xl font-semibold mb-4 text-primary-foreground flex items-center justify-center gap-3">
            <activeRoleData.icon className="w-6 h-6 text-primary" />
            {activeRoleData.name} View
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            {activeRoleData.description.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

interface RoleSelectorProps {
  role: typeof roles[0];
  isActive: boolean;
  onClick: () => void;
}

const RoleSelector = ({ role, isActive, onClick }: RoleSelectorProps) => {
  const Icon = role.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 min-w-[140px]",
        isActive
          ? "bg-primary text-primary-foreground shadow-glow"
          : "bg-charcoal-light text-muted-foreground hover:bg-charcoal-light/80 hover:text-primary-foreground"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{role.name}</span>
    </button>
  );
};

export default RoleBasedDemo;
