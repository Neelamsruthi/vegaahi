import React from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaBookOpen, FaFire, FaLaptopCode, FaLightbulb, FaChalkboardTeacher } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const learningPaths = [
  {
    icon: <FaLaptopCode className="text-indigo-600 text-4xl mb-4" />,
    title: 'Web Development',
    desc: 'Master front-end and back-end technologies to build modern, responsive websites and applications.',
    details: 'Learn HTML, CSS, JavaScript, React, Node.js, databases, and deployment.'
  },
  {
    icon: <FaLightbulb className="text-yellow-500 text-4xl mb-4" />,
    title: 'Data Science & AI',
    desc: 'Dive into data analysis, machine learning, and AI to uncover insights and build smart systems.',
    details: 'Study Python, data visualization, statistics, machine learning models, and neural networks.'
  },
  {
    icon: <FaChalkboardTeacher className="text-green-600 text-4xl mb-4" />,
    title: 'Educational Technology',
    desc: 'Explore the intersection of teaching and technology to create impactful e-learning experiences.',
    details: 'Focus on instructional design, learning management systems, and interactive content creation.'
  },
  {
    icon: <FaBookOpen className="text-red-500 text-4xl mb-4" />,
    title: 'Business & Management',
    desc: 'Develop skills in leadership, strategy, marketing, and operations to excel in the business world.',
    details: 'Includes courses on entrepreneurship, project management, and data-driven decision making.'
  },
  {
    icon: <FaFire className="text-orange-500 text-4xl mb-4" />,
    title: 'Creative Arts',
    desc: 'Unlock your creativity with courses on design, multimedia, writing, and digital storytelling.',
    details: 'Learn graphic design, video production, creative writing, and UX/UI fundamentals.'
  },
  {
    icon: <FaUserFriends className="text-purple-600 text-4xl mb-4" />,
    title: 'Community & Collaboration',
    desc: 'Build strong teamwork and social learning skills to thrive in collaborative environments.',
    details: 'Focus on communication, networking, peer learning, and project collaboration tools.'
  },
];

const testimonials = [
  {
    quote: "This platform transformed my learning experience — interactive and social features kept me motivated.",
    name: "pawan Etukala.",
    role: "Full-Stack Developer",
  },
  {
    quote: "I quickly advanced my career thanks to tailored courses and amazing community support.",
    name: "sai pavan",
    role: "Data Scientist",
  },
  {
    quote: "The peer-powered progress tracking made all the difference in staying on track and connected.",
    name: "Dilip N .",
    role: "Educational Consultant",
  },
];

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-100 min-h-screen p-6 font-sans">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-24"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-sm">
          Learn Smarter, Together
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Personalized courses, interactive modules, and peer-powered progress tracking — all in one seamless e-learning platform.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-8 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg transition"
        >
          <Link to="/login">Get started</Link>
        </motion.button>
      </motion.section>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        {[{
          icon: <FaUserFriends className="text-indigo-600 text-3xl mb-3" />,
          title: 'Follow & Connect',
          desc: 'Follow peers and see what courses they’re learning to get personalized recommendations.',
        }, {
          icon: <FaBookOpen className="text-green-600 text-3xl mb-3" />,
          title: 'Tailored Courses',
          desc: 'Get curated courses based on your interests, past activity, and social engagement.',
        }, {
          icon: <FaFire className="text-red-500 text-3xl mb-3" />,
          title: 'Trending Topics',
          desc: 'Stay ahead with real-time course trends and community-driven content insights.',
        }].map((item, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            {item.icon}
            <h3 className="font-semibold text-xl">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Featured Learning Paths */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Discover Our Learning Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {learningPaths.map(({ icon, title, desc, details }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition duration-300"
            >
              {icon}
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-700 font-medium mb-1">{desc}</p>
              <p className="text-gray-500 text-sm">{details}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-24 bg-white py-16 rounded-xl shadow-inner"
      >
        <h2 className="text-3xl font-bold text-center mb-8">What Learners Say</h2>
        <div className="flex flex-col lg:flex-row gap-10 justify-center px-6">
          {testimonials.map(({ quote, name, role }, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-indigo-50 p-6 rounded-lg shadow-md max-w-md mx-auto"
            >
              <p className="text-gray-700 italic mb-4">“{quote}”</p>
              <p className="font-semibold text-indigo-600">{name}</p>
              <p className="text-gray-500 text-sm">{role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Join Community CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-24 py-16"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Elevate Your Learning?</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Join a global community of learners today. Discover, connect, and grow smarter—together.
        </p>
        <motion.button
          whileHover={{ scale: 1.07 }}
          className="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-purple-700 transition"
        >
          <Link to="/login">Join the Community</Link>
        </motion.button>
      </motion.div>

    </div>
  );
};

export default Home;
