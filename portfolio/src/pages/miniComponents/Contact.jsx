import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const formItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 50,
        damping: 15,
        delay: i * 0.1 
      },
    }),
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "https://backend-1-986s.onrender.com/api/v1/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setSenderName("");
        setSubject("");
        setMessage("");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <motion.div 
      className="w-full bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900 p-8 rounded-2xl shadow-xl text-blue-50 overflow-x-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="relative mb-12"
        variants={titleVariants}
      >
        <motion.h1
          className="flex gap-4 items-center text-[1.85rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
          variants={titleVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          CONTACT
          <span className="font-extrabold text-blue-400">ME</span>
        </motion.h1>
        <motion.span 
          className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-blue-500/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.span>
      </motion.div>

      <motion.form 
        onSubmit={handleMessage} 
        className="flex flex-col gap-7 p-4 sm:p-6 md:p-8 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-blue-500/10 shadow-lg"
        variants={containerVariants}
      >
        <motion.div 
          className="flex flex-col gap-2 px-1.5"
          custom={0}
          variants={formItemVariants}
        >
          <Label className="text-xl font-medium text-blue-200">Your Name</Label>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your Name"
              className="bg-slate-800/60 border-blue-500/20 py-6 px-5 text-blue-100 placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-400/30 transition-all"
              required
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex flex-col gap-2 px-1.5"
          custom={1}
          variants={formItemVariants}
        >
          <Label className="text-xl font-medium text-blue-200">Subject</Label>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="bg-slate-800/60 border-blue-500/20 py-6 px-5 text-blue-100 placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-400/30 transition-all"
              required
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex flex-col gap-2 px-1.5"
          custom={2}
          variants={formItemVariants}
        >
          <Label className="text-xl font-medium text-blue-200">Message</Label>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full min-h-[120px] rounded-md bg-slate-800/60 border-blue-500/20 py-3 px-5 text-blue-100 placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-400/30 transition-all resize-y"
              required
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex justify-end mt-4"
          custom={3}
          variants={formItemVariants}
        >
          {!loading ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                type="submit"
                className="w-full sm:w-52 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold tracking-wider py-6 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300"
              >
                SEND MESSAGE
              </Button>
            </motion.div>
          ) : (
            <motion.button
              disabled
              type="button"
              className="w-full sm:w-52 bg-slate-700 text-blue-200 font-medium rounded-lg py-6 flex items-center justify-center space-x-3 shadow-inner"
              initial={{ scale: 0.95 }}
              animate={{ 
                scale: [0.95, 1, 0.95],
                transition: { duration: 1.5, repeat: Infinity }
              }}
            >
              <motion.svg
                aria-hidden="true"
                className="w-5 h-5 text-blue-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </motion.svg>
              <span>Sending...</span>
            </motion.button>
          )}
        </motion.div>
      </motion.form>

      <motion.div 
        className="mt-8 text-center text-blue-300/70 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.p
          animate={{ 
            opacity: [0.7, 1, 0.7] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity 
          }}
        >
          I'll get back to you as soon as possible!
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Contact;