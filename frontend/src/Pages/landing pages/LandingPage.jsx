import { motion } from "framer-motion";
import { ArrowUpRight, PenLine, BookOpen, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <motion.div
        className="
          absolute
          -left-32
          top-1/4
          h-125
          w-125
          rounded-full
          bg-blue-500/15
          blur-[120px]
          pointer-events-none
        "
        animate={{
          x: [0, 180, 80, 0],
          y: [0, -80, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Second blue glow */}
      <motion.div
        className="
          absolute
          -right-40
          -bottom-20
          h-137
          w-137
          rounded-full
          bg-cyan-400/10
          blur-[130px]
          pointer-events-none
        "
        animate={{
          x: [0, -150, -50, 0],
          y: [0, -100, 70, 0],
          scale: [1, 0.8, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ================= NAVBAR ================= */}

      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
            <PenLine size={15} className="text-white" />
          </div>

          <span className="text-lg font-semibold tracking-tight">
            Consise
          </span>
        </motion.div>


        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate("/login")}
          className="
            rounded-full
            border
            border-neutral-200
            px-5
            py-2
            text-sm
            transition
            hover:border-black
            hover:bg-black
            hover:text-white
          "
        >
          Sign in
        </motion.button>

      </nav>


      {/* ================= HERO ================= */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center px-6 md:px-12">

        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">


          {/* ================= LEFT ================= */}

          <div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500" />

              <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                Your space on the internet
              </span>
            </motion.div>


            <div className="overflow-hidden">

              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  max-w-4xl
                  text-[15vw]
                  font-semibold
                  leading-[0.78]
                  tracking-[-0.08em]
                  sm:text-8xl
                  md:text-[105px]
                  lg:text-[120px]
                "
              >
                Ideas
                <br />

                <span className="text-neutral-300">
                  worth
                </span>{" "}

                sharing.
              </motion.h1>

            </div>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
              className="
                mt-10
                max-w-lg
                text-base
                leading-7
                text-neutral-500
                md:text-lg
              "
            >
              Write what you think. Discover what others think.
              Keep the stories that matter.
            </motion.p>


            {/* CTA */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.7,
              }}
              className="mt-8 flex items-center gap-5"
            >

              <button
                onClick={() => navigate("/login")}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-black
                  px-6
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:shadow-blue-500/10
                "
              >
                Start writing

                <motion.span
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black"
                  whileHover={{ rotate: 45 }}
                >
                  <ArrowUpRight size={14} />
                </motion.span>
              </button>


              <span className="text-sm text-neutral-400">
                It's free to begin.
              </span>

            </motion.div>

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="relative hidden h-[500px] lg:block">

            {/* Floating card */}

            <motion.div
              initial={{
                opacity: 0,
                x: 80,
                rotate: 4,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 4,
              }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                absolute
                right-10
                top-16
                w-[330px]
                rounded-2xl
                border
                border-neutral-200
                bg-white/80
                p-6
                shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                backdrop-blur-xl
              "
            >

              <div className="mb-10 flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black">
                  <BookOpen size={16} className="text-white" />
                </div>

                <span className="text-xs text-neutral-400">
                  01 / 03
                </span>

              </div>


              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Featured thought
              </p>

              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight">
                Sometimes the smallest
                <span className="text-blue-500">
                  {" "}ideas
                </span>
                create the biggest changes.
              </h2>


              <div className="mt-10 flex items-center justify-between border-t border-neutral-100 pt-4">

                <span className="text-xs text-neutral-400">
                  Explore stories
                </span>

                <ArrowUpRight size={17} />

              </div>

            </motion.div>


            {/* Small floating card */}

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [-4, -2, -4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-20
                left-8
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-neutral-200
                bg-white/80
                px-5
                py-4
                shadow-lg
                backdrop-blur-xl
              "
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10">
                <Sparkles size={16} className="text-blue-500" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Your next idea
                </p>
                <p className="text-xs text-neutral-400">
                  Start writing today
                </p>
              </div>

            </motion.div>


            {/* Decorative blue circle */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                -right-20
                bottom-10
                h-72
                w-72
                rounded-full
                border
                border-blue-400/20
              "
            />

          </div>

        </div>

      </section>


      {/* ================= BOTTOM ================= */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="
          absolute
          bottom-6
          left-6
          right-6
          z-20
          flex
          items-center
          justify-between
          text-xs
          text-neutral-400
          md:left-12
          md:right-12
        "
      >

        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          A home for your ideas
        </div>

      </motion.div>

    </main>
  );
};

export default LandingPage;