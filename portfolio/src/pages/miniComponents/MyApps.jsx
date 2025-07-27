"use client"

import { Card } from "@/components/ui/card"
import axios from "axios"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Github,
  Trophy,
  Target,
  Users,
  GitBranch,
  Star,
  TrendingUp,
  Award,
  Code,
  Calendar,
  ExternalLink,
} from "lucide-react"

const MyApps = () => {
  const [apps, setApps] = useState([])
  const [githubData, setGithubData] = useState(null)
  const [leetcodeData, setLeetcodeData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appsResponse = await axios.get("https://backend-1-986s.onrender.com/api/v1/softwareapplication/getall", {
          withCredentials: true,
        })
        setApps(appsResponse.data.softwareApplications)

        const githubResponse = await axios.get("https://api.github.com/users/Tapu45")
        setGithubData(githubResponse.data)

        const leetcodeResponse = await axios.get("https://leetcode-stats-api.vercel.app/Rameswar45")
        setLeetcodeData(leetcodeResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const SkeletonCard = () => (
    <Card className="p-6 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
      <div className="animate-pulse">
        <div className="h-6 bg-slate-700/50 rounded-lg mb-4 w-3/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-700/50 rounded w-full"></div>
          <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
          <div className="h-4 bg-slate-700/50 rounded w-4/6"></div>
        </div>
      </div>
    </Card>
  )

  const ProgressBar = ({ value, max, color = "blue" }) => {
    const percentage = (value / max) * 100

    return (
      <div className="w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${
            color === "green"
              ? "from-emerald-500 to-green-400"
              : color === "yellow"
                ? "from-amber-500 to-yellow-400"
                : color === "red"
                  ? "from-red-500 to-pink-400"
                  : "from-blue-500 to-cyan-400"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </div>
    )
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue", delay = 0 }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      className="group"
    >
      <Card className="p-6 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-slate-600/50 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${
                color === "green"
                  ? "from-emerald-500/20 to-green-500/20"
                  : color === "yellow"
                    ? "from-amber-500/20 to-yellow-500/20"
                    : color === "red"
                      ? "from-red-500/20 to-pink-500/20"
                      : "from-blue-500/20 to-cyan-500/20"
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  color === "green"
                    ? "text-emerald-400"
                    : color === "yellow"
                      ? "text-amber-400"
                      : color === "red"
                        ? "text-red-400"
                        : "text-blue-400"
                }`}
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
          </div>
          <div className="space-y-2">
            <motion.p
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.5 }}
            >
              {value}
            </motion.p>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
        </div>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto p-8 space-y-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400"
            variants={floatingVariants}
            animate="animate"
          >
            Coding Journey
          </motion.h1>
          <motion.p
            className="text-xl text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Tracking progress across platforms and celebrating milestones
          </motion.p>
        </motion.div>

        {/* GitHub Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="flex items-center gap-3 justify-center">
            <Github className="w-8 h-8 text-slate-300" />
            <h2 className="text-3xl font-bold text-slate-200">GitHub Analytics</h2>
          </div>

          <AnimatePresence>
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </motion.div>
            ) : githubData ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                {/* GitHub Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    icon={GitBranch}
                    title="Repositories"
                    value={githubData.public_repos}
                    subtitle="Public repositories"
                    delay={0.1}
                  />
                  <StatCard
                    icon={Users}
                    title="Followers"
                    value={githubData.followers}
                    subtitle="GitHub followers"
                    color="green"
                    delay={0.2}
                  />
                  <StatCard
                    icon={Star}
                    title="Following"
                    value={githubData.following}
                    subtitle="Following developers"
                    color="yellow"
                    delay={0.3}
                  />
                </div>

                {/* GitHub Contributions Graph */}
                <motion.div variants={itemVariants} className="relative">
                  <Card className="p-8 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Calendar className="w-6 h-6 text-green-400" />
                        <h3 className="text-xl font-semibold text-slate-200">Contribution Activity</h3>
                      </div>
                      <div className="flex justify-center">
                        <motion.img
                          src={`https://ghchart.rshah.org/2196f3/Tapu45`}
                          alt="GitHub Contribution Graph"
                          className="w-full max-w-4xl rounded-lg"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.section>

        {/* LeetCode Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="flex items-center gap-3 justify-center">
            <Code className="w-8 h-8 text-slate-300" />
            <h2 className="text-3xl font-bold text-slate-200">LeetCode Progress</h2>
          </div>

          <AnimatePresence>
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <SkeletonCard />
                <SkeletonCard />
              </motion.div>
            ) : leetcodeData ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Problem Solving Card */}
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                  <Card className="p-8 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Target className="w-6 h-6 text-green-400" />
                        <h3 className="text-xl font-semibold text-slate-200">Problem Solving</h3>
                      </div>

                      <div className="flex items-center gap-6 mb-8">
                        <motion.div className="relative w-24 h-24" whileHover={{ scale: 1.1 }}>
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <span className="text-2xl font-bold text-white">{leetcodeData.totalSolved}</span>
                          </div>
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-blue-400/30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-lg text-slate-300 mb-2">Total Problems Solved</p>
                          <div className="text-sm text-slate-400">Keep pushing your limits!</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-emerald-400">Easy</span>
                          <span className="text-sm text-slate-300">{leetcodeData.easySolved}</span>
                        </div>
                        <ProgressBar
                          value={leetcodeData.easySolved}
                          max={leetcodeData.easySolved + 100}
                          color="green"
                        />

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-amber-400">Medium</span>
                          <span className="text-sm text-slate-300">{leetcodeData.mediumSolved}</span>
                        </div>
                        <ProgressBar
                          value={leetcodeData.mediumSolved}
                          max={leetcodeData.mediumSolved + 50}
                          color="yellow"
                        />

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-red-400">Hard</span>
                          <span className="text-sm text-slate-300">{leetcodeData.hardSolved}</span>
                        </div>
                        <ProgressBar value={leetcodeData.hardSolved} max={leetcodeData.hardSolved + 25} color="red" />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Rankings Card */}
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                  <Card className="p-8 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        <h3 className="text-xl font-semibold text-slate-200">Rankings & Achievements</h3>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                            <TrendingUp className="w-8 h-8 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Global Ranking</p>
                            <motion.p
                              className="text-2xl font-bold text-white"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              #{leetcodeData.ranking.toLocaleString()}
                            </motion.p>
                          </div>
                        </div>

                        <div className="h-px bg-slate-700/50" />

                        <div className="flex items-center gap-4">
                          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            <Award className="w-8 h-8 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Contest Rating</p>
                            <motion.p
                              className="text-2xl font-bold text-white"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 }}
                            >
                              {leetcodeData.contestRating}
                            </motion.p>
                          </div>
                        </div>

                        <motion.a
                          href="https://leetcode.com/Rameswar45/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-xl text-white font-medium group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View LeetCode Profile
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.section>

        {/* Footer Message */}
        <motion.div className="text-center py-12" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl rounded-full border border-slate-600/30"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Code className="w-5 h-5 text-blue-400" />
            </motion.div>
            <motion.span
              className="text-slate-300 font-medium"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              Continuously evolving through code
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MyApps
