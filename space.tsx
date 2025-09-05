"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence, useFrame } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { inSphere } from "maath/random";
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Github,
  ArrowUpRight,
  Sparkles,
  Zap,
  Palette,
  Code,
  LineChart,
  MessageSquare,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Animated Text Cycle Component
interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

function AnimatedTextCycle({
  words = ["innovation", "creativity", "excellence", "design"],
  interval = 3000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        const newWidth = elements[currentIndex].getBoundingClientRect().width;
        setWidth(`${newWidth}px`);
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  const containerVariants = {
    hidden: { 
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { 
        duration: 0.3, 
        ease: "easeIn"
      }
    },
  };

  return (
    <>
      <div 
        ref={measureRef} 
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      <motion.span 
        className="relative inline-block"
        animate={{ 
          width,
          transition: { 
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

// 3D Stars Background Component
const Stars = () => {
  const ref = useRef<any>();
  const [sphere] = useState(() => inSphere(new Float32Array(5000), { radius: 1.2 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 100;
      ref.current.rotation.y -= delta / 125;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} frustumCulled={true}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function Landing3D() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white relative overflow-hidden">
      {/* 3D Stars Background */}
      <StarsCanvas />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/20 ${scrollY > 50 ? "shadow-md shadow-purple-500/20" : ""}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Studio3D
            </span>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-sm font-medium transition-colors hover:text-purple-400">
              Services
            </a>
            <a href="#work" className="text-sm font-medium transition-colors hover:text-purple-400">
              Work
            </a>
            <a href="#about" className="text-sm font-medium transition-colors hover:text-purple-400">
              About
            </a>
            <a href="#contact" className="text-sm font-medium transition-colors hover:text-purple-400">
              Contact
            </a>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-full border-purple-500/50 text-purple-400 hover:bg-purple-500/20">
              Log In
            </Button>
            <Button size="sm" className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Get Started
            </Button>
          </div>
          
          <button className="flex md:hidden text-white" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md md:hidden"
        >
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Studio3D
              </span>
            </div>
            <button onClick={toggleMenu}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="container grid gap-3 pb-8 pt-6"
          >
            {["Services", "Work", "About", "Contact"].map((item, index) => (
              <motion.div key={index} variants={itemFadeIn}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="flex items-center justify-between rounded-full px-4 py-3 text-lg font-medium hover:bg-purple-500/20"
                  onClick={toggleMenu}
                >
                  {item}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      )}

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full min-h-screen flex items-center justify-center relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full bg-purple-500/20 border border-purple-500/30 px-4 py-2 text-sm backdrop-blur-sm"
              >
                <Zap className="mr-2 h-4 w-4 text-purple-400" />
                Next-Gen 3D Design Studio
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none"
              >
                We craft immersive{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  3D experiences
                </span>
                <br />
                that inspire{" "}
                <AnimatedTextCycle 
                  words={["innovation", "creativity", "excellence", "wonder"]}
                  interval={2500}
                  className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                />
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-[700px] mx-auto text-gray-300 text-lg md:text-xl"
              >
                From interactive web experiences to stunning 3D visualizations, we bring your digital visions to life with cutting-edge technology and artistic excellence.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-col gap-4 sm:flex-row sm:justify-center"
              >
                <Button size="lg" className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 group">
                  Start Your Project
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-purple-500/50 text-purple-400 hover:bg-purple-500/20 group">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center space-y-4 mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full bg-purple-500/20 border border-purple-500/30 px-4 py-2 text-sm backdrop-blur-sm"
              >
                Services
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              >
                What We Create
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[900px] text-gray-300 md:text-xl"
              >
                We specialize in cutting-edge 3D technologies and immersive digital experiences
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: <Palette className="h-10 w-10 text-purple-400" />,
                  title: "3D Web Experiences",
                  description: "Interactive 3D websites and applications that captivate and engage your audience.",
                },
                {
                  icon: <Code className="h-10 w-10 text-pink-400" />,
                  title: "WebGL Development",
                  description: "High-performance 3D graphics and animations running smoothly in web browsers.",
                },
                {
                  icon: <Sparkles className="h-10 w-10 text-blue-400" />,
                  title: "AR/VR Solutions",
                  description: "Immersive augmented and virtual reality experiences for various platforms.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-yellow-400" />,
                  title: "3D Modeling",
                  description: "Detailed 3D models and assets for games, applications, and visualizations.",
                },
                {
                  icon: <LineChart className="h-10 w-10 text-green-400" />,
                  title: "Data Visualization",
                  description: "Transform complex data into beautiful, interactive 3D visualizations.",
                },
                {
                  icon: <MessageSquare className="h-10 w-10 text-red-400" />,
                  title: "Motion Graphics",
                  description: "Stunning 3D animations and motion graphics for marketing and storytelling.",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 transition-all hover:border-purple-500/50"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-300"></div>
                  <div className="relative space-y-4">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-400 hover:text-purple-300 cursor-pointer">
                      Learn more
                    </span>
                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <ArrowRight className="h-4 w-4 text-purple-400" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="work" className="w-full py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center space-y-4 mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full bg-purple-500/20 border border-purple-500/30 px-4 py-2 text-sm backdrop-blur-sm"
              >
                Portfolio
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              >
                Our 3D Creations
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[900px] text-gray-300 md:text-xl"
              >
                Explore our latest 3D projects and immersive experiences
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  title: "Interactive Product Showcase",
                  description: "3D product visualization with real-time customization",
                  category: "WebGL",
                },
                {
                  title: "Virtual Art Gallery",
                  description: "Immersive VR gallery experience for digital art",
                  category: "VR",
                },
                {
                  title: "Data Landscape",
                  description: "3D visualization of complex business analytics",
                  category: "Visualization",
                },
                {
                  title: "Gaming Interface",
                  description: "Futuristic 3D UI for next-gen gaming platform",
                  category: "UI/UX",
                },
                {
                  title: "Architectural Walkthrough",
                  description: "Interactive 3D building exploration",
                  category: "Architecture",
                },
                {
                  title: "Brand Experience",
                  description: "Immersive 3D brand storytelling platform",
                  category: "Branding",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm h-64 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="mb-2">
                      <span className="inline-block rounded-full bg-purple-500/30 px-2 py-1 text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 w-fit"
                    >
                      View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-block rounded-full bg-purple-500/20 border border-purple-500/30 px-4 py-2 text-sm backdrop-blur-sm">
                  About Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pushing the boundaries of 3D design
                </h2>
                <p className="text-gray-300 text-lg">
                  We are a team of passionate 3D artists, developers, and designers who believe in the power of immersive experiences. Our mission is to transform how people interact with digital content through cutting-edge 3D technologies.
                </p>
                <p className="text-gray-300 text-lg">
                  From WebGL applications to VR experiences, we combine technical expertise with creative vision to deliver solutions that not only look stunning but also provide meaningful user experiences.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="outline" size="lg" className="rounded-full border-purple-500/50 text-purple-400 hover:bg-purple-500/20">
                    Our Process
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full border-purple-500/50 text-purple-400 hover:bg-purple-500/20">
                    Join Our Team
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative h-96 w-full rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Sparkles className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">3D Innovation</h3>
                      <p className="text-gray-300">Crafting the future of digital experiences</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="grid gap-12 lg:grid-cols-2 lg:gap-16"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-block rounded-full bg-purple-500/20 border border-purple-500/30 px-4 py-2 text-sm backdrop-blur-sm">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Let's Create Something Amazing
                </h2>
                <p className="text-gray-300 text-lg">
                  Ready to bring your 3D vision to life? Get in touch with us to discuss your next immersive project.
                </p>
                
                <div className="space-y-4">
                  <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                    <div className="rounded-full bg-purple-500/20 p-2">
                      <MapPin className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Our Studio</h3>
                      <p className="text-sm text-gray-300">123 Innovation Street, Tech City, 10001</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                    <div className="rounded-full bg-purple-500/20 p-2">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-sm text-gray-300">hello@studio3d.com</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                    <div className="rounded-full bg-purple-500/20 p-2">
                      <Phone className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-sm text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex space-x-3">
                  {[
                    { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                    { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                    { icon: <Github className="h-5 w-5" />, label: "GitHub" },
                  ].map((social, index) => (
                    <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <a
                        href="#"
                        className="rounded-full border border-purple-500/50 p-2 text-purple-400 hover:text-white hover:border-purple-400 transition-colors"
                      >
                        {social.icon}
                        <span className="sr-only">{social.label}</span>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6"
              >
                <h3 className="text-xl font-bold mb-2">Send Us a Message</h3>
                <p className="text-sm text-gray-300 mb-6">
                  Fill out the form below and we'll get back to you shortly.
                </p>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        First name
                      </label>
                      <Input 
                        id="first-name" 
                        placeholder="Enter your first name" 
                        className="rounded-full bg-white/5 border-white/20 text-white placeholder:text-gray-400" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Last name
                      </label>
                      <Input 
                        id="last-name" 
                        placeholder="Enter your last name" 
                        className="rounded-full bg-white/5 border-white/20 text-white placeholder:text-gray-400" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="rounded-full bg-white/5 border-white/20 text-white placeholder:text-gray-400" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Enter your message" 
                      className="min-h-[120px] rounded-2xl bg-white/5 border-white/20 text-white placeholder:text-gray-400" 
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container px-4 py-12 md:px-6"
        >
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Studio3D
                </span>
              </div>
              <p className="text-sm text-gray-300">
                Creating immersive 3D experiences that push the boundaries of digital interaction and visual storytelling.
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                  { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                  { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                  { icon: <Github className="h-5 w-5" />, label: "GitHub" },
                ].map((social, index) => (
                  <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {social.icon}
                      <span className="sr-only">{social.label}</span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Services</h3>
              <nav className="flex flex-col space-y-2 text-sm">
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  3D Web Development
                </a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  WebGL Applications
                </a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  AR/VR Experiences
                </a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  3D Modeling
                </a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <nav className="flex flex-col space-y-2 text-sm">
                <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors">
                  About Us
                </a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Careers
                </a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Blog
                </a>
                <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Contact
                </a>
              </nav>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Stay Updated</h3>
              <p className="text-sm text-gray-300">
                Subscribe to our newsletter for the latest 3D trends and project updates.
              </p>
              <form className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 rounded-full bg-white/5 border-white/20 text-white placeholder:text-gray-400" 
                />
                <Button type="submit" className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Studio3D. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              Crafted with passion for the future of 3D web
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

export default Landing3D;
